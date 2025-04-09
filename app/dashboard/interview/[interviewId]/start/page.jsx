'use client';

import React, { useEffect, useState, use } from 'react';
import { MockInterview } from '../../../../../utils/schema';
import { db } from '../../../../../utils/db';
import { eq } from 'drizzle-orm';
import QuestionsSection from './_components/QuestionsSection';
import RecordAnsSection from './_components/RecordAnsSection';
import { Button } from '../../../../../components/ui/button';
import Link from 'next/link';


function StartInterview({ params: paramsPromise }) {
    const params = use(paramsPromise);
    const [interviewData, setInterviewData] = useState(null);
    const [mockInterviewQuestions, setMockInterviewQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeQuestionIndex, setActiveQuestionIndex]=useState(0);

    useEffect(() => {
        getInterviewDetails();
    }, []);

    const safeJSONParse = (data) => {
        try {
            return JSON.parse(data);
        } catch (error) {
            console.log("❌ JSON Parsing Error:", error.message, "\nInvalid Data:", data);
            return null;
        }
    };

    const getInterviewDetails = async () => {
        try {
            const result = await db
                .select()
                .from(MockInterview)
                .where(eq(MockInterview.mockId, params.interviewId));

            if (!result || result.length === 0) {
                console.error("❌ No interview found with the given ID");
                setLoading(false);
                return;
            }

            console.log("✅ Database Response:", result[0]);

            let jsonMockResp = result[0].jsonMockResp;

            // ✅ Try parsing once
            if (typeof jsonMockResp === "string") {
                jsonMockResp = safeJSONParse(jsonMockResp);
            }

            // ✅ If still a string, try parsing again (fixes double-encoding issues)
            if (typeof jsonMockResp === "string") {
                jsonMockResp = safeJSONParse(jsonMockResp);
            }

            // ❌ If parsing failed, stop execution
            if (!jsonMockResp) {
                setLoading(false);
                return;
            }

            // ✅ Ensure it's an array
            if (!Array.isArray(jsonMockResp)) {
                console.error("❌ Parsed data is not an array:", jsonMockResp);
                setLoading(false);
                return;
            }

            console.log("✅ Final Parsed Data (Questions Array):", jsonMockResp);
            setMockInterviewQuestions(jsonMockResp);
            setInterviewData(result[0]);
        } catch (error) {
            console.error("❌ Error fetching interview details:", error);
        }

        setLoading(false);
    };

    return (
        <div>
            

            <div className="flex flex-col md:flex-row w-full">
  <div className="w-full md:w-1/2">
    <QuestionsSection
      mockInterviewQuestions={mockInterviewQuestions}
      activeQuestionIndex={activeQuestionIndex}
    />
  </div>

  <div className="w-full md:w-1/2">
    <RecordAnsSection 
     mockInterviewQuestions={mockInterviewQuestions}
      activeQuestionIndex={activeQuestionIndex}
       interviewData={interviewData} />
  </div>
</div>

      <div className='flex justify-end gap-6'>

      {activeQuestionIndex > 0 && (
    <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}>
      Previous Question
    </Button>
  )}

  {activeQuestionIndex < mockInterviewQuestions.length - 1 ? (
    <Button onClick={() => setActiveQuestionIndex(prev => prev + 1)}>
      Next Question
    </Button>
  ) : (
    <Link href={`/dashboard/interview/${interviewData?.mockId}/feedback`}>
  <Button>
    End Interview
  </Button>
</Link>

  )}
        </div>



        </div>
    );
}

export default StartInterview;
