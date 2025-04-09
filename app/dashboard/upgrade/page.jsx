'use client';
import React from 'react';

function PlanData() {
  return (
    <div className="p-10 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Choose Your Plan</h1>
      <div className="flex flex-col md:flex-row gap-6 justify-center">
        
        {/* Basic Plan */}
        <div className="bg-white shadow-lg rounded-xl p-6 border-2 border-blue-300 flex-1 max-w-sm hover:scale-105 transition">
          <h2 className="text-xl font-bold text-blue-700 mb-2">🧑‍💼 Basic Plan</h2>
          <p className="text-gray-600 mb-4">Perfect for beginners and casual users</p>
          <h3 className="text-2xl font-extrabold text-blue-900 mb-4">Free</h3>
          <ul className="text-sm text-gray-700 mb-6 space-y-2">
            <li>✅ 3 Mock Interviews per week</li>
            <li>✅ Basic Feedback</li>
            <li>✅ Access to Interview Questions</li>
          </ul>
          <button className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition">
            Choose Basic
          </button>
        </div>

        {/* Premium Plan */}
        <div className="bg-white shadow-lg rounded-xl p-6 border-2 border-yellow-400 flex-1 max-w-sm hover:scale-105 transition">
          <h2 className="text-xl font-bold text-yellow-600 mb-2">👑 Premium Plan</h2>
          <p className="text-gray-600 mb-4">For serious job seekers & pros</p>
          <h3 className="text-2xl font-extrabold text-yellow-700 mb-4">$9.99 / month</h3>
          <ul className="text-sm text-gray-700 mb-6 space-y-2">
            <li>🚀 Unlimited Mock Interviews</li>
            <li>🧠 AI-Powered Feedback</li>
            <li>📊 Performance Analytics</li>
            <li>📁 Save & Revisit History</li>
            <li>🎯 Personalized Questions</li>
          </ul>
          <button className="w-full py-2 px-4 bg-yellow-500 text-white font-medium rounded-lg hover:bg-yellow-600 transition">
            Upgrade to Premium
          </button>
        </div>

      </div>
    </div>
  );
}

export default PlanData;
