export const analyzeResume = async (resumeFile, jobDescription) => {
  const formData = new FormData();
  formData.append("resume", resumeFile);
  formData.append("jobDescription", jobDescription);

  const BASE_URL = "https://ai-resume-backend-4jpi.onrender.com";
  try {
    const response = await fetch(`${BASE_URL}/api/resume/analyze`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = "Failed to analyze resume";
      
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.message || errorMessage;
      } catch (e) {
        console.error("Server returned non-JSON error:", errorText);
      }
      
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data.data;

  } catch (error) {
    console.error("API Fetch Error:", error.message);
    if (error.message === "Failed to fetch") {
      throw new Error("Could not connect to the server. Please check if the backend is awake.");
    }
    throw error;
  }
};
