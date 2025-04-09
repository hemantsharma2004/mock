import { Lightbulb, Volume2 } from 'lucide-react';
import React from 'react';

function QuestionsSection({ mockInterviewQuestions, activeQuestionIndex }) {

   const textToSpeach=(text)=>{
     if('speechSynthesis' in window){
       const speech= new SpeechSynthesisUtterance(text);
       window.speechSynthesis.speak(speech);
     }
     else{
       alert('Sorry your browser doesnt support text to speech')
     }
   }

  return mockInterviewQuestions&&(
    <div className="p-5 border rounded-lg my-10">
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>

        {mockInterviewQuestions &&
          mockInterviewQuestions.map((question, index) => (
         <h2
         className={`p-2 rounded-full gap-5 text-xs md:text-sm text-center cursor-pointer ${
          activeQuestionIndex === index ? 'bg-blue-600 text-white' : 'bg-secondary'
        }`}
         key={index}
          >
          Question #{index + 1}
          </h2>     
             ))}
      </div>

      <h2 className='my-5 text-md md:text-lg '>{mockInterviewQuestions[activeQuestionIndex]?.question}</h2>
      <Volume2 className='cursor-pointer' onClick={()=>textToSpeach(mockInterviewQuestions[activeQuestionIndex]?.question)} />

      <div className='border rounded-lg p-5 bg-blue-100 mt-20'>
        <h2 className='flex gap-2 items-center text-blue-500'>
          <Lightbulb/>
          <strong>NOTE:</strong>
        </h2>
        <h2 className='text-sm text-blue-400 my-2'>CLick on the Record Answer when you wan tto answer the question. At the end of the interview we will give you the feedback along with correct answer for each of question and your answer to compare it</h2>

      </div>

    </div>
  );
}

export default QuestionsSection;
