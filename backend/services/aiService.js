import OpenAI from "openai";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pdf = require("@cedrugs/pdf-parse");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const analyzeWithAI = async (fileBuffer, jobDescription) => {
  let resumeText = "";

  try {
    const pdfData = await pdf(fileBuffer);
    resumeText = pdfData.text ? pdfData.text.trim() : "";
  } catch (error) {
    console.error("PDF extraction failed:", error);
    throw new Error("Could not extract text from the PDF. Ensure it's not password protected.");
  }

  if (!resumeText || resumeText.length < 50) {
    throw new Error("The resume appears to be empty or an image-based PDF (OCR not supported).");
  }

  const analysisPrompt = `
    You are a professional ATS expert. Compare this Resume against the Job Description.
    
    JD: ${jobDescription}
    Resume: ${resumeText}

    Output valid JSON with: score (number), matched_skills (array), missing_skills (array), 
    recommended_keywords (array), strengths (array), weaknesses (array), suggestions (array).
  `;

  try {
    const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are an ATS system. Respond only in JSON format." },
      { role: "user", content: analysisPrompt }
    ],
    response_format: { type: "json_object" },
    temperature: 0.1
  }, {
    timeout: 30000
  });

    const result = response.choices[0].message.content;
    return JSON.parse(result);

  } catch (err) {
    console.error("OpenAI or Parsing Error:", err.message);
    if (err.message.includes("apiKey")) {
      throw new Error("Backend Error: OpenAI API Key is missing or invalid.");
    }
    throw new Error("The AI failed to analyze the resume. Please try again in a moment.");
  }
};
