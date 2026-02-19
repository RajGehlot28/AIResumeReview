import React, { useState } from "react";
import { analyzeResume } from "../services/api";
import AnalysisResult from "./AnalysisResult";
import "./ResumeUpload.css";

const ResumeUpload = () => {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => setResumeFile(e.target.files[0]);
  const handleJDChange = (e) => setJobDescription(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!resumeFile) {
      setError("Please upload a resume");
      return;
    }
    if(!jobDescription) {
      setError("Please enter a job description.");
      return;
    }

    setError("");
    setLoading(true);
    setAnalysis(null);

    try {
      const result = await analyzeResume(resumeFile, jobDescription);
      setAnalysis(result);
    } catch(err) {
      console.error(err);
      setError(err.message || "Failed to analyze resume.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if(!analysis) return;

    let textContent = `Overall Score: ${analysis.score}/100\n\n`;
    const appendSection = (title, items) => {
      textContent += `${title}:\n`;
      items.forEach((item) => {
        textContent += `- ${item}\n`;
      });
      textContent += `\n`;
    };

    appendSection("Strengths", analysis.strengths);
    appendSection("Weaknesses", analysis.weaknesses);
    appendSection("Missing Skills", analysis.missing_skills);
    appendSection("Recommended Keywords", analysis.recommended_keywords);
    appendSection("Suggestions", analysis.suggestions);

    const blob = new Blob([textContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "resume_analysis.txt";
    a.click();
    URL.revokeObjectURL(url);
  };


  return (
    <div className="resume-upload-container">
      <form className="resume-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Upload Resume (PDF/DOCX)</label>
          <input type="file" accept=".pdf,.docx" onChange={handleFileChange} />
        </div>
        <div className="form-group">
          <label>Job Description</label>
          <textarea
            value={jobDescription}
            onChange={handleJDChange}
            placeholder="Paste job description here..."
            rows={6}
          />
        </div>
        <button type="submit" className="analyze-btn" disabled={loading}>
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}

      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Analyzing your resume...</p>
        </div>
      )}

      {analysis && (
        <div className="analysis-section">
          <AnalysisResult data={analysis} />
          <button onClick={handleDownload} className="download-btn">
            Download Analysis
          </button>
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;