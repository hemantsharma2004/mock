'use client'
import React, { useEffect, useState } from 'react'
import { MockInterview } from '../../../../utils/schema';
import { db } from '../../../../utils/db';
import Webcam from 'react-webcam';
import { Lightbulb, WebcamIcon } from 'lucide-react';
import { eq } from 'drizzle-orm';
import { Button } from '../../../../components/ui/button';
import Link from 'next/link';

function Interview({ params }) {

    const [interviewData, setInterviewData] = useState(null);
    const [webCamEnable, setWebCamEnable] = useState(false);

    useEffect(() => {
        console.log(params.interviewId);
        getInterviewDetails();
    }, []);

    const getInterviewDetails = async () => {
        const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, params.interviewId));
        console.log(result);
        setInterviewData(result[0]);
    }

    return (
        <div className="my-8 ">
            <h2 className="font-bold text-3xl text-primary mb-6  items-center">Let's Get Started</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-5xl">

                {/* Left Section: Job Details */}
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col p-6 rounded-lg border bg-white shadow-lg gap-4">
                        <h2 className="text-lg font-medium">
                            <strong className="text-primary">Job Role/ Position: </strong>
                            {interviewData?.jobPosition || "Loading..."}
                        </h2>
                        <h2 className="text-lg font-medium">
                            <strong className="text-primary">Tech Stack: </strong>
                            {interviewData?.jobDesc || "Loading..."}
                        </h2>
                        <h2 className="text-lg font-medium">
                            <strong className="text-primary">Experience Required: </strong>
                            {interviewData?.jobExperience || "Loading..."}
                        </h2>
                    </div>

                    {/* Information Box */}
                    <div className="p-5 border border-yellow-500 bg-yellow-200 shadow-md rounded-lg w-full max-w-lg mt-5">
                        <h2 className="flex gap-2 items-center text-yellow-700 font-semibold">
                            <Lightbulb className="h-6 w-6" />
                            <strong>Information</strong>
                        </h2>
                        <p className="mt-3 text-yellow-800">
                            Enable Video cam and Microphone to start your AI-generated Mock interview. 
                            It has 5 questions that you can answer, and at the end, you will get a report of your performance.
                            <br /><br />
                            <strong>NOTE:</strong> We will <span className="underline">never</span> record your video. 
                            Webcam access can be disabled at any time if you want.
                        </p>
                    </div>

                </div>

                {/* Right Section: Webcam */}
                <div className="flex flex-col items-center gap-6">
                    {webCamEnable ? (
                        <Webcam
                            onUserMedia={() => setWebCamEnable(true)}
                            onUserMediaError={() => setWebCamEnable(false)}
                            mirrored={true}
                            className="rounded-lg border shadow-lg"
                            style={{ height: 300, width: 300 }}
                        />
                    ) : (
                        <>
                            <WebcamIcon className="h-72 w-full my-2 p-20  bg-secondary rounded-xl border shadow-lg" />
                            <Button variant="ghost" onClick={() => setWebCamEnable(true)} className="bg-primary hover:bg-primary-dark px-6 py-3  text-white font-medium rounded-lg shadow-md">
                                Enable Webcam & Microphone
                            </Button>
                        </>
                    )}
                </div>

            </div>

            <div className='flex justify-end items-end'>
                <Link href={'/dashboard/interview/'+params.interviewId+'/start'}>
                <Button >Start Interview</Button>
                </Link>
            </div>
        </div>
    );
}

export default Interview;
