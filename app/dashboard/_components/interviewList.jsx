'use client';
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react';
import { eq, desc } from 'drizzle-orm';
import { db } from '../../../utils/db';
import { MockInterview } from '../../../utils/schema';
import { useRouter } from 'next/navigation';

function InterviewList() {
  const { user, isLoaded } = useUser();
  const [interviewList, setInterviewList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && user?.primaryEmailAddress?.emailAddress) {
      GetInterviewList();
    }
  }, [isLoaded, user]);

  const GetInterviewList = async () => {
    try {
      const result = await db
        .select({
          jobPosition: MockInterview.jobPosition,
          jobExperience: MockInterview.jobExperience,
          createdAt: MockInterview.createdAt,
          mockId: MockInterview.mockId,
        })
        .from(MockInterview)
        .where(eq(MockInterview.createdBy, user.primaryEmailAddress.emailAddress))
        .orderBy(desc(MockInterview.id));

      setInterviewList(result);
    } catch (error) {
      console.error('Error fetching interviews:', error);
    }
  };

  return (
    <div className="mt-10">
      <h2 className="font-semibold text-xl mb-6">📋 Previous Mock Interviews</h2>

      {interviewList.length === 0 ? (
        <p className="text-gray-500">No interviews found.</p>
      ) : (
        <div className="flex flex-wrap gap-5">
          {interviewList.map((item, index) => (
            <div
              key={index}
              className="bg-blue-100 text-blue-900 rounded-xl p-4 w-full sm:w-[48%] md:w-[30%] shadow-md flex flex-col justify-between"
            >
              <div className="mb-4 space-y-1">
                <h3 className="text-lg font-bold">
                  🧑‍💼 Role: <span className="ml-1">{item.jobPosition}</span>
                </h3>
                <p className="text-sm text-blue-800">
                  🧪 Experience: <span className="ml-1">{item.jobExperience}</span>
                </p>
                <p className="text-xs text-blue-700">
                  📅 Created on: {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="mt-4 flex justify-between gap-2">
              <button
  onClick={() => router.push(`/dashboard/interview/${item.mockId}/feedback`)}
  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md text-sm"
>
  📝 Feedback
</button>
                <button
                  onClick={() => router.push(`/dashboard/interview/${item.mockId}`)}
                  className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md text-sm"
                >
                  🚀 Start
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default InterviewList;
