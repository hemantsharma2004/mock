'use client';
import React, { useState } from 'react';

function Questions() {
  const [question, setQuestion] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const faqData = [
    {
      question: "What is Mockly?",
      answer: "Mockly is an AI-based mock interview platform that helps you practice interviews for different roles.",
    },
    {
      question: "Is it free to use?",
      answer: "Yes, basic features are free. We also offer a premium plan for advanced feedback and unlimited mocks.",
    },
    {
      question: "How do I get feedback?",
      answer: "After completing a mock interview, head to the 'Feedback' section to see detailed suggestions.",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Question:", question);
    setSubmitted(true);
    setQuestion('');
  };

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">📘 Frequently Asked Questions</h1>

      {/* FAQ Section */}
      <div className="space-y-6">
        {faqData.map((faq, idx) => (
          <div key={idx} className="bg-white p-4 shadow rounded-lg">
            <h2 className="font-semibold text-lg text-blue-700">❓ {faq.question}</h2>
            <p className="text-gray-700 mt-1">{faq.answer}</p>
          </div>
        ))}
      </div>

      {/* Divider */}
      <hr className="my-10 border-t-2 border-blue-100" />

      {/* Doubt Submission Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-center text-blue-500">💬 Still have a question?</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <textarea
            rows="4"
            placeholder="Type your question or doubt here..."
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
          <button
            type="submit"
            className="self-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
          >
            🚀 Submit Question
          </button>
          {submitted && (
            <p className="text-green-600 text-center mt-2">✅ Your question has been submitted!</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Questions;
