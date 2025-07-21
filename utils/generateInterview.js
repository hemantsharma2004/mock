import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateInterviewQuestions(prompt) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY); // ✅ NOT NEXT_PUBLIC

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const responseText = result.response.candidates?.[0]?.content?.parts?.[0]?.text || "";

    return responseText;
  } catch (error) {
    console.error("❌ Gemini generation failed:", error);
    throw error;
  }
}
