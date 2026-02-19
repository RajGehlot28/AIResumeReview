import 'dotenv/config';
import express from "express";
import resumeRoutes from "./routes/resumeRoutes.js";
import cors from "cors";

const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use(cors({
  origin: "*", 
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

app.get("/", (req, res) => {
  res.send("AI Resume Reviewer API is Running Successfully!");
});

app.use("/api/resume", resumeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
