import axios from "axios";

const Url = "https://ai-resume.westeurope.cloudapp.azure.com";

export const submitCv = async (pdfFile, extraInfo) => {
  const token = localStorage.getItem("auth_token");
  const formData = new FormData();
  formData.append("cv", pdfFile);
  formData.append("extraInfo", extraInfo);

  try {
    const response = await axios.post(`${Url}/process-cv`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.uuid;
  } catch (error) {
    console.error("Error submitting CV:", error);
    throw error;
  }
};

export const getPdfByUuid = async (uuid) => {
  try {
    const token = localStorage.getItem("auth_token");
    const response = await axios.get(`${Url}/export/cv/${uuid}`, {
      responseType: "blob",
      Authorization: `Bearer ${token}`,
    });

    const blobUrl = URL.createObjectURL(response.data);
    return blobUrl;
  } catch (error) {
    console.error("Error fetching the PDF:", error);
    throw error;
  }
};

export const fetchUserCvs = async (userId) => {
  try {
    const token = localStorage.getItem("auth_token");
    const response = await axios.get(`${Url}/export/cvs/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user's CVs:", error);
    throw error;
  }
};
