export const analyzeResume = async (resumeFile, jobDescription) => {
  const formData = new FormData();
  formData.append("resume", resumeFile);
  formData.append("jobDescription", jobDescription);

  const response = await fetch(`${process.env.REACT_APP_API_URL || "http://localhost:5000"}/api/resume/analyze`, {
    method: "POST",
    body: formData
  });

  if(!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Failed to analyze resume");
  }

  const data = await response.json();
  return data.data;
};