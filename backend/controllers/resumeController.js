import { analyzeWithAI } from "../services/aiService.js";

export const analyzeResume = async (req, res) => {
  try {
    const { jobDescription } = req.body;
    const resumeFile = req.file;

    if(!jobDescription) {
      return res.status(400).json({
        success: false,
        message: "Job description is required"
      });
    }

    if(!resumeFile) {
      return res.status(400).json({
        success: false,
        message: "Resume file is required"
      });
    }

    const analysis = await analyzeWithAI(resumeFile.buffer, jobDescription);

    let parsedAnalysis;
    try {
      parsedAnalysis = JSON.parse(analysis);
    } catch {
      return res.status(500).json({
        success: false,
        message: "Invalid JSON returned from AI service"
      });
    }

    res.json({ success: true, data: parsedAnalysis });

  } catch(error) {
    console.error("Error:", error);

    if(error.message.includes("timeout") || error.message.includes("rate limit")) {
      return res.status(503).json({
        success: false,
        message: "AI service is currently busy. Please try again later."
      });
    }

    res.status(500).json({ success: false, error: error.message });
  }
};