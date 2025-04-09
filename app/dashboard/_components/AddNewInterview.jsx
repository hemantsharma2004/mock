"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { LoaderCircle } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { db } from "../../../utils/db"; 
import { MockInterview } from "../../../utils/schema";
import { v4 as uuidv4 } from 'uuid';

// ✅ API Setup for AI Model
import { GoogleGenerativeAI } from "@google/generative-ai"; 
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro-exp-03-25" });

function AddNewInterview() {
   const [openDialog, setOpenDialog] = useState(false);
   const [jobPosition, setJobPositon] = useState("");
   const [jobDesc, setJobDesc] = useState("");
   const [jobExperience, setJobExperience] = useState("");
   const [loading, setLoading] = useState(false);
   const [questions, setQuestions] = useState([]);
   const { user } = useUser();
   const router = useRouter();

   const onSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      
      console.log("Generating for:", jobPosition, jobDesc, jobExperience);
      
      const InputPrompt = `Job position: ${jobPosition}, Job description: ${jobDesc}, Experience: ${jobExperience} years. 
      Generate ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview questions with answers in **valid JSON array format**. 
      DO NOT include markdown formatting (no triple backticks). Return raw JSON only, like this:
      [
         {"question": "What is React?", "answer": "React is a JavaScript library for building UIs."},
         {"question": "What is useState?", "answer": "useState is a React Hook for state management."}
      ]`;

      try {
         const result = await model.generateContent(InputPrompt);
         let responseText = await result.response.text();

         console.log("🔹 Raw API Response:", responseText);

         // ✅ Remove any unexpected backticks or markdown
         responseText = responseText.replace(/```json|```/g, "").trim();

         // ✅ Ensure it is parsed as an array
         let parsedData = JSON.parse(responseText);

         // ✅ Check if it's an array (Fix if needed)
         if (!Array.isArray(parsedData)) {
            parsedData = Object.values(parsedData).map(item => JSON.parse(item));
         }

         console.log("✅ Final Parsed Data:", parsedData);
         setQuestions(parsedData);

         // ✅ Save to Database
         const resp = await db.insert(MockInterview).values({
            mockId: uuidv4(),
            jsonMockResp: JSON.stringify(parsedData),
            jobPosition,
            jobDesc,
            jobExperience,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format("DD-MM-yyyy"),
         }).returning({mockId:MockInterview.mockId});

         console.log("Inserted ID:", resp);

         if (resp) {
            setOpenDialog(false);
            router.push('/dashboard/interview/' + resp[0]?.mockId);
         }
         
      } catch (error) {
         console.error("❌ Error fetching interview questions:", error);
      }

      setLoading(false);
   };

   return (
      <div>
         {/* Add New Interview Button */}
         <div className="border rounded-lg p-10 bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
            onClick={() => setOpenDialog(true)}>
            <h2 className="text-lg text-center">+ Add New</h2>
         </div>

         {/* Dialog Box for Adding Details */}
         <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent className="max-w-3xl">
               <DialogHeader>
                  <DialogTitle className="text-2xl">Tell us more about your job Interview</DialogTitle>
                  <DialogDescription>
                     <form onSubmit={onSubmit}>
                        <div>
                           <h2>Add details about your job position, description, and years of experience</h2>

                           <div className="mt-7 my-3">
                              <label>Job role/Job position</label>
                              <input 
                                 type="text" 
                                 placeholder="Ex: Full Stack Developer"
                                 required
                                 className="mt-2 border p-2 w-full rounded-lg"
                                 onChange={(event) => setJobPositon(event.target.value)} />
                           </div>

                           <div className="mt-7 my-3">
                              <label>Job description/ Tech stack in short</label>
                              <textarea
                                 placeholder="React, Angular, Node.js, MySQL, etc."
                                 required
                                 className="mt-2 border p-2 w-full rounded-lg"
                                 onChange={(event) => setJobDesc(event.target.value)} />
                           </div>

                           <div className="mt-7 my-3">
                              <label>Years of experience</label>
                              <input 
                                 type="number"
                                 placeholder="Ex: 5"
                                 required
                                 max="25"
                                 className="mt-2 border p-2 w-full rounded-lg"
                                 onChange={(event) => setJobExperience(event.target.value)} />
                           </div>
                        </div>

                        <div className="flex gap-5 justify-end">
                           <Button type="button" variant="ghost" onClick={() => setOpenDialog(false)}>Cancel</Button>
                           <Button type="submit" disabled={loading} >
                              {loading ? <><LoaderCircle className="animate-spin" /> Generating from AI </> : "Start Interview"}
                           </Button>
                        </div>

                     </form>
                  </DialogDescription>
               </DialogHeader>
            </DialogContent>
         </Dialog>

        
         </div>
    
   );
}

export default AddNewInterview;
