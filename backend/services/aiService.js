import OpenAI from "openai";
import pdf from "@cedrugs/pdf-parse";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const analyzeWithAI = async (fileBuffer, jobDescription) => {
  let resumeText = "";

  // Extracting Text using the modern fork
  try {
    const pdfData = await pdf(fileBuffer);
    resumeText = pdfData.text ? pdfData.text.trim() : "";
  } catch(error) {
    console.error("PDF extraction failed:", error);
    throw new Error("Failed to read the PDF file.");
  }

  if(!resumeText || resumeText.length < 50) {
    throw new Error("Resume content is too short or unreadable.");
  }

  // Prompting to AI
  const analysisPrompt = `
You are a high-precision ATS evaluation engine.
Compare the Resume Text against the Job Description.

SCORING RULES:
- Score 0-100 based on keyword matching and experience relevance.
- Identify strengths and clear gaps.
- Suggest 3-5 specific keywords to add.

JD:
${jobDescription}

Resume Text:
${resumeText}

Return ONLY a valid JSON object:
{
  "score": number,
  "matched_skills": [],
  "missing_skills": [],
  "recommended_keywords": [],
  "strengths": [],
  "weaknesses": [],
  "suggestions": []
}
`;

  // AI Request
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a professional ATS system. Output JSON only." },
      { role: "user", content: analysisPrompt }
    ],
    response_format: { type: "json_object" },
    temperature: 0.1
  });

  // Parsing and returning
  try {
    return JSON.parse(response.choices[0].message.content);
  } catch(err) {
    throw new Error("AI output was not valid JSON.");
  }
};