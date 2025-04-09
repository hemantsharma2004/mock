'use client';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { Button } from '../../../../../../components/ui/button';
import { Mic, Volume2, Loader2 } from 'lucide-react';
import useSpeechToText from 'react-hook-speech-to-text';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useUser } from '@clerk/nextjs';
import toast, { Toaster } from 'react-hot-toast';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

function RecordAnsSection({ mockInterviewQuestions, activeQuestionIndex, interviewData }) {
  const [webcamReady, setWebcamReady] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const accumulatedTranscript = useRef('');
  const { user } = useUser();
  const [isSaving, setIsSaving] = useState(false);

  const {
    startSpeechToText,
    stopSpeechToText,
    isRecording,
    results,
    setResults,
    supported,
  } = useSpeechToText({
    timeout: 10000,
    continuous: true,
    crossBrowser: true,
  });

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if (supported && results.length > 0) {
      accumulatedTranscript.current = results.map(r => r.transcript).join(' ');
    }
  }, [results]);

  useEffect(() => {
    if (!supported && transcript) {
      accumulatedTranscript.current = transcript;
    }
  }, [transcript]);

  const getGeminiFeedback = async (question, answer) => {
    setIsLoading(true);
    try {
      const prompt = `
        Analyze this interview response professionally:

        QUESTION: ${question}
        ANSWER: ${answer}

        Provide:
        1. Rating (1-10)
        2. Concise feedback (3-5 bullet points)

        Return ONLY a valid JSON object with this structure:
        {
          "rating": number,
          "feedback": string
        }

        Do not include any additional text or markdown formatting. Only the pure JSON object.
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      let text = response.text().trim().replaceAll('`', '');

      if (text.startsWith('json')) {
        text = text.slice(4).trim();
      }

      const parsed = JSON.parse(text);

      await saveAnswerToDatabase(
        mockInterviewQuestions[activeQuestionIndex],
        answer,
        parsed
      );

      toast.success('Answer saved successfully!');
      setResults([]);
      setUserAnswer(answer); // ✅ Now update state after saving
    } catch (error) {
      console.error("Error in feedback/generation:", error);

      await saveAnswerToDatabase(
        mockInterviewQuestions[activeQuestionIndex],
        answer,
        { rating: null, feedback: "Feedback not generated due to an error." }
      );

      toast.error('Answer saved, but failed to generate detailed feedback.');
    } finally {
      setIsLoading(false);
    }
  };

  const saveAnswerToDatabase = async (questionData, answer, feedbackData) => {
    setIsSaving(true);
    try {
      console.log("Saving to DB:", {
        question: questionData.question,
        userAnswer: answer,
        correctAns: questionData.answer,
        feedback: feedbackData.feedback,
        rating: feedbackData.rating,
      });

      const res = await fetch('/api/save-answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mockIdRef: interviewData?.mockId,
          question: questionData.question,
          correctAns: questionData.answer,
          userAns: answer,
          feedback: feedbackData.feedback,
          rating: feedbackData.rating,
          userEmail: user?.primaryEmailAddress?.emailAddress,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to save data');
      }
    } catch (error) {
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  const handleRecordAnswer = async () => {
    if (isRecording || listening) {
      if (supported) {
        stopSpeechToText();
      } else {
        SpeechRecognition.stopListening();
      }

      setTimeout(async () => {
        const finalAnswer = accumulatedTranscript.current;

        if (finalAnswer.trim().length > 0) {
          await getGeminiFeedback(
            mockInterviewQuestions[activeQuestionIndex]?.question,
            finalAnswer
          );
        } else {
          toast.error("No answer detected. Please try again.");
        }
      }, 800);
    } else {
      accumulatedTranscript.current = '';
      if (supported) {
        startSpeechToText();
      } else {
        resetTranscript();
        SpeechRecognition.startListening({ continuous: true });
      }
    }
  };

  const handleShowAnswer = () => {
    alert(`Recorded Answer:\n\n${userAnswer}`);
  };

  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(userAnswer);
      speechSynthesis.speak(utterance);
    } else {
      alert("Text-to-Speech is not supported in this browser.");
    }
  };

  if (!supported && !browserSupportsSpeechRecognition) {
    return <div className="text-red-500 p-4">Speech recognition is not supported in this browser 😥</div>;
  }

  return (
    <div className='flex items-center justify-center flex-col'>
      <Toaster position="top-right" />

      <div className="relative flex flex-col justify-center items-center bg-black rounded-lg p-5 mt-20 gap-10 h-[380px] w-full max-w-xl">
        {!webcamReady && (
          <Image
            width={200}
            height={200}
            src="https://img.freepik.com/free-psd/webcam-isolated-transparent-background_191095-32019.jpg?w=360"
            alt="Camera Logo"
            className="absolute z-20"
          />
        )}

        <Webcam
          mirrored
          onUserMedia={() => setWebcamReady(true)}
          videoConstraints={{
            width: 640,
            height: 400,
            facingMode: 'user',
          }}
          style={{
            height: 500,
            width: '100%',
            borderRadius: '10px',
            zIndex: 10,
          }}
        />
      </div>

      <div className="flex gap-4 mt-6">
        <Button
          variant={isRecording || listening ? "destructive" : "outline"}
          onClick={handleRecordAnswer}
          disabled={isLoading}
        >
          {(isRecording || listening) ? (
            <span className="flex items-center gap-2">
              <Mic className="h-4 w-4" /> Stop Recording
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Mic className="h-4 w-4" /> Record Answer
            </span>
          )}
        </Button>

        {userAnswer && (
          <>
            <Button onClick={handleShowAnswer} variant="outline">
              Show Answer
            </Button>
            <Button variant="ghost" onClick={handleSpeak}>
              <Volume2 className="h-4 w-4 mr-2" /> Play
            </Button>
          </>
        )}
      </div>

      {isLoading && (
        <div className="mt-6 flex items-center gap-2 text-blue-600">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Saving and analyzing your answer...</span>
        </div>
      )}
    </div>
  );
}

export default RecordAnsSection;
