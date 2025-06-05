import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserCvs } from "../api/api"; // import funcția

export const History = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const userId = localStorage.getItem("auth_token");

  useEffect(() => {
    if (!userId) return;

    const fetchFiles = async () => {
      try {
        setLoading(true);
        const data = await fetchUserCvs(userId);
        setFiles(data);
      } catch (error) {
        console.error("Error fetching CV history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, [userId]);

  const handleCardClick = (file) => {
    const uuid = file.metadata?.uuid ?? file._id;
    navigate(`/view-cv/${uuid}`);
  };

  if (loading) return <p>Loading CV history...</p>;
  if (files.length === 0) return <p>No CVs found for this user.</p>;

  return (
    <div style={styles.container}>
      <h2>CV History</h2>
      <div style={styles.grid}>
        {files.map((file) => (
          <div
            key={file._id}
            style={styles.card}
            onClick={() => handleCardClick(file)}
          >
            <h3>{file.filename}</h3>
            <p>Uploaded: {new Date(file.uploadDate).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "40px",
    maxWidth: "800px",
    margin: "auto",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "16px",
  },
  card: {
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
    padding: "20px",
    cursor: "pointer",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    transition: "transform 0.2s ease",
  },
};
