'use client';
import React from 'react';

function HowItWorksPage() {
  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-10">🚀 How Mockly Works</h1>

      <div className="space-y-8">

        {/* Step 1 */}
        <div className="bg-white shadow-md rounded-xl p-6 flex flex-col gap-2 border-l-4 border-blue-500">
          <h2 className="text-2xl font-semibold text-blue-700">🧠 Step 1: Start a Mock Interview</h2>
          <p className="text-gray-700">
            Head over to the <strong>"Start Interview"</strong> section. Choose your job role, description, and experience level.
            Our AI will generate personalized questions based on your input.
          </p>
        </div>

        {/* Step 2 */}
        <div className="bg-white shadow-md rounded-xl p-6 flex flex-col gap-2 border-l-4 border-green-500">
          <h2 className="text-2xl font-semibold text-green-700">🎤 Step 2: Answer Using Your Voice</h2>
          <p className="text-gray-700">
            Answer each question verbally. Your responses are converted to text using speech-to-text and saved for review.
            Don’t worry — we’re just here to help you improve!
          </p>
        </div>

        {/* Step 3 */}
        <div className="bg-white shadow-md rounded-xl p-6 flex flex-col gap-2 border-l-4 border-yellow-500">
          <h2 className="text-2xl font-semibold text-yellow-700">📋 Step 3: Get Feedback Instantly</h2>
          <p className="text-gray-700">
            Navigate to the <strong>"Feedback"</strong> section to see AI-generated feedback on your performance. 
            You’ll get a rating and improvement suggestions based on your response.
          </p>
        </div>

        {/* Step 4 */}
        <div className="bg-white shadow-md rounded-xl p-6 flex flex-col gap-2 border-l-4 border-purple-500">
          <h2 className="text-2xl font-semibold text-purple-700">📈 Step 4: Track Past Interviews</h2>
          <p className="text-gray-700">
            Visit the <strong>"Interview History"</strong> section to track all your previous mocks, including role, date, and feedback.
            It’s a great way to measure your growth over time.
          </p>
        </div>

        {/* Step 5 */}
        <div className="bg-white shadow-md rounded-xl p-6 flex flex-col gap-2 border-l-4 border-red-400">
          <h2 className="text-2xl font-semibold text-red-600">🔓 Want More?</h2>
          <p className="text-gray-700">
            Upgrade to the <strong>Premium Plan</strong> for advanced analytics, unlimited mocks, and personalized tips for cracking real interviews!
          </p>
        </div>

      </div>
    </div>
  );
}

export default HowItWorksPage;
