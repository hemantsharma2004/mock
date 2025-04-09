'use client';
import React, { useEffect, useState } from 'react';
import { UserAnswer } from '../../../../../utils/schema';
import { eq } from 'drizzle-orm';
import { db } from '../../../../../utils/db';
import { Button } from '../../../../../components/ui/button';
import { useRouter } from 'next/navigation';

function Feedback({ params }) {
  const [feedbackList, setFeedbackList] = useState([]);
  const [averageRating, setAverageRating] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const router = useRouter();

  useEffect(() => {
    getFeedback();
  }, []);

  const getFeedback = async () => {
    try {
      const result = await db
        .select()
        .from(UserAnswer)
        .where(eq(UserAnswer.mockIdRef, params.interviewId))
        .orderBy(UserAnswer.id);

      const limitedResult = result.slice(0, 5);
      setFeedbackList(limitedResult);

      console.log('Fetched feedback:', limitedResult); // Debug log

      const totalRating = limitedResult.reduce((sum, item) => {
        const rawRating = item.rating || 0;
        const clampedRating = Math.min(10, Math.max(0, rawRating));

        if (rawRating > 10) {
          console.warn(`⚠️ Rating too high: ${rawRating} for question ID ${item.id}`);
        }

        return sum + clampedRating;
      }, 0);

      const avg = limitedResult.length > 0 ? (totalRating / limitedResult.length).toFixed(1) : null;
      setAverageRating(avg);
    } catch (error) {
      console.error('Error fetching feedback:', error);
    }
  };

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold text-green-600 mb-2">Interview Feedback</h2>
      <p className="text-xl font-semibold mb-4">Here’s your performance for this test:</p>

      {averageRating && (
        <div className="mb-6 text-lg text-primary font-medium bg-blue-50 rounded-lg px-4 py-2 w-fit shadow">
          <span className="font-bold text-blue-800">🌟 Overall Rating:</span>{' '}
          <span className="text-blue-700">{averageRating}/10</span>
        </div>
      )}

      <p className="text-sm text-gray-600 mb-8">
        Below are the 5 questions you answered, including your answers, correct ones, and feedback for improvement.
      </p>

      <div className="space-y-4">
        {feedbackList.map((item, index) => {
          const safeRating = Math.min(10, Math.max(0, item.rating || 0));

          return (
            <div key={item.id} className="border rounded-xl bg-white shadow-md overflow-hidden">
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full text-left px-6 py-4 bg-gray-100 hover:bg-gray-200 transition flex justify-between items-center"
              >
                <h3 className="text-lg font-bold text-blue-700">
                  Question {index + 1}
                </h3>
                <span className="text-sm bg-yellow-100 text-yellow-800 font-medium px-3 py-1 rounded-md">
                  ⭐ Rating: {safeRating}/10
                </span>
              </button>

              {activeIndex === index && (
                <div className="px-6 py-4 space-y-3 border-t">
                  <p className="text-gray-800">
                    <span className="font-semibold">Q:</span> {item.question}
                  </p>
                  <p className="bg-green-100 text-green-800 px-4 py-2 rounded-md">
                    <span className="font-semibold">✔ Correct Answer:</span> {item.correctAns}
                  </p>

                  {/* ✅ Display user's answer safely */}
                  <p className="bg-red-100 text-red-800 px-4 py-2 rounded-md">
                    <span className="font-semibold">🧑‍💻 Your Answer:</span>{' '}
                    {item.userAns ? item.userAns : 'No answer provided'}
                  </p>

                  <p className="text-gray-700">
                    <span className="font-semibold">📢 Feedback:</span> {item.feedback}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <Button className="mt-5 ml-2" onClick={() => router.replace('/dashboard')}>
        Go Home
      </Button>
    </div>
  );
}

export default Feedback;
