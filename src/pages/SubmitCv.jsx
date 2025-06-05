import React, { useState } from "react";
import { submitCv } from "../api/api";
import { useNavigate } from "react-router-dom";

export const SubmitCv = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [extraInfo, setExtraInfo] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!pdfFile) {
      alert("Please upload a PDF file.");
      return;
    }

    setLoading(true);

    try {
      const uuid = await submitCv(pdfFile, extraInfo);
      console.log(uuid);
      await new Promise((resolve) => setTimeout(resolve, 5000));
      navigate(`/view-cv/${uuid}`);
    } catch (error) {
      alert("Error send the file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Submit Your CV</h2>
      <div style={styles.formGroup}>
        <label>Upload PDF:</label>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setPdfFile(e.target.files[0])}
        />
      </div>
      <div style={styles.formGroup}>
        <label>Additional Info:</label>
        <textarea
          rows="4"
          style={styles.textarea}
          placeholder="What should be updated?"
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
        />
      </div>
      <button style={styles.button} onClick={handleSubmit}>
        Submit
      </button>

      {loading && (
        <div style={styles.loadingOverlay}>
          <div style={styles.loadingBox}>Loading, please wait...</div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "40px",
    maxWidth: "600px",
    margin: "auto",
    position: "relative",
  },
  formGroup: {
    marginBottom: "20px",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    resize: "vertical",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  loadingOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  loadingBox: {
    backgroundColor: "#fff",
    padding: "20px 40px",
    borderRadius: "10px",
    fontSize: "18px",
    fontWeight: "bold",
    boxShadow: "0 0 10px rgba(0,0,0,0.2)",
  },
};
