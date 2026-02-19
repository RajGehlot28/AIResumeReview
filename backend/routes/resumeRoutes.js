import express from "express";
import { analyzeWithAI } from "../services/aiService.js";
import multer from "multer";

const router = express.Router();

const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

router.post("/analyze", upload.single("resume"), async (req, res) => {
  try {
    const { jobDescription } = req.body;
    const resumeFile = req.file;

    // Validation
    if (!jobDescription || !resumeFile) {
      return res.status(400).json({ 
        success: false, 
        message: "Missing Job description or resume file" 
      });
    }

    console.log(`Analyzing resume: ${resumeFile.originalname}`);

    const analysis = await analyzeWithAI(resumeFile.buffer, jobDescription);

    res.json({ success: true, data: analysis });
  } catch (error) {
    console.error("Route Error:", error.message);
    res.status(500).json({ 
      success: false, 
      message: "An error occurred during analysis",
      error: error.message 
    });
  }
});
export default router;
