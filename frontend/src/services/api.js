export const analyzeResume = async (resumeFile, jobDescription) => {
  const formData = new FormData();
  formData.append("resume", resumeFile);
  formData.append("jobDescription", jobDescription);

  const response = await fetch(`${"https://ai-resume-backend-4jpi.onrender.com/", {
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
