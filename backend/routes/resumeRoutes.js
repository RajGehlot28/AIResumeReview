import express from "express";
import { analyzeWithAI } from "../services/aiService.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() }).single("resume");

router.post("/analyze", (req, res) => {
  upload(req, res, async (err) => {
    try {
      if(err) return res.status(400).json({ success: false, message: err.message });
      
      const { jobDescription } = req.body;
      const resumeFile = req.file;

      if(!jobDescription || !resumeFile) {
        return res.status(400).json({ success: false, message: "Missing Job description or resume file" });
      }

      const analysis = await analyzeWithAI(resumeFile.buffer, jobDescription);

      res.json({ success: true, data: analysis });

    } catch(error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
});

export default router;