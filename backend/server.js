import 'dotenv/config';
import express from "express";
import resumeRoutes from "./routes/resumeRoutes.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors({origin: "http://localhost:3000"}));

app.use("/api/resume", resumeRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});