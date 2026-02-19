import React from "react";
import "./AnalysisResult.css";

const AnalysisResult = ({ data }) => {
  const { score, missing_skills, recommended_keywords, strengths, weaknesses, suggestions } = data;

  const renderList = (title, items, highlight = false) => (
    <div className="analysis-card">
      <h3>{title}</h3>
      <ul>
        {items.map((item, i) => (
          <li key={i} className={highlight ? "highlight" : ""}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="analysis-result-container">
      <h2>Resume Analysis</h2>
      <p className="score">
        Overall Score: <strong>{score}/100</strong>
      </p>
      {renderList("Strengths", strengths)}
      {renderList("Weaknesses", weaknesses)}
      {renderList("Missing Skills", missing_skills, true)}
      {renderList("Recommended Keywords", recommended_keywords)}
      {renderList("Suggestions", suggestions)}
    </div>
  );
};

export default AnalysisResult;