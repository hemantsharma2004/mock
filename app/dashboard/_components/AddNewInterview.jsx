"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { LoaderCircle } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { db } from "../../../utils/db";
import { MockInterview } from "../../../utils/schema";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast"; // ✅ Toast import

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

    const prompt = `Job position: ${jobPosition}, Job description: ${jobDesc}, Experience: ${jobExperience} years. 
Generate ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT || 5} interview questions with answers in valid JSON array format. 
DO NOT include markdown formatting. Output example:
[
  {"question": "What is React?", "answer": "React is a JS library for building UIs"},
  ...
]`;

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to generate interview questions");

      const cleanedText = data.text.replace(/```json|```/g, "").trim();
      const parsedData = JSON.parse(cleanedText);

      setQuestions(parsedData);

      const resp = await db.insert(MockInterview).values({
        mockId: uuidv4(),
        jsonMockResp: JSON.stringify(parsedData),
        jobPosition,
        jobDesc,
        jobExperience,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format("DD-MM-yyyy"),
      }).returning({ mockId: MockInterview.mockId });

      if (resp) {
        setOpenDialog(false);
        router.push("/dashboard/interview/" + resp[0]?.mockId);
      }
    } catch (error) {
      console.error("❌ Error generating interview questions:", error);

      if (error.message.includes("Too Many Requests")) {
        toast.error("Gemini API rate limit exceeded. Please try again later.");
      } else {
        toast.error("Gemini failed: " + error.message);
      }
    }

    setLoading(false);
  };



  return (
    <div>
      {/* Add New Interview Button */}
      <div
        className="border rounded-lg p-10 bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="text-lg text-center">+ Add New</h2>
      </div>

      {/* Dialog Box for Adding Details */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Tell us more about your job Interview</DialogTitle>
            <DialogDescription>
              Add details about your job position, description, and years of experience
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={onSubmit}>
            <div className="mt-7 my-3">
              <label>Job role/Job position</label>
              <input
                type="text"
                placeholder="Ex: Full Stack Developer"
                required
                className="mt-2 border p-2 w-full rounded-lg"
                onChange={(event) => setJobPositon(event.target.value)}
              />
            </div>

            <div className="mt-7 my-3">
              <label>Job description/ Tech stack in short</label>
              <textarea
                placeholder="React, Angular, Node.js, MySQL, etc."
                required
                className="mt-2 border p-2 w-full rounded-lg"
                onChange={(event) => setJobDesc(event.target.value)}
              />
            </div>

            <div className="mt-7 my-3">
              <label>Years of experience</label>
              <input
                type="number"
                placeholder="Ex: 5"
                required
                max="25"
                className="mt-2 border p-2 w-full rounded-lg"
                onChange={(event) => setJobExperience(event.target.value)}
              />
            </div>

            <div className="flex gap-5 justify-end mt-6">
              <Button type="button" variant="ghost" onClick={() => setOpenDialog(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <LoaderCircle className="animate-spin" /> Generating from AI
                  </>
                ) : (
                  "Start Interview"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
