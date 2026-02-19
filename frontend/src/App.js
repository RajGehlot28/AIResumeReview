import React, { useState } from "react";
import ResumeUpload from "./components/ResumeUpload";
import AnalysisResult from "./components/AnalysisResult";

function App() {
  const [analysis, setAnalysis] = useState(null);

  return (
    <div style={{ maxWidth: "800px", margin: "2rem auto", fontFamily: "Arial, sans-serif" }}>
      <h1>AI Resume Analyzer</h1>
      <ResumeUpload setAnalysis={setAnalysis} />
      {analysis && <AnalysisResult analysis={analysis} />}
    </div>
  );
}

export default App;