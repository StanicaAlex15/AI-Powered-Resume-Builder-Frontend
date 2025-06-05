import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPdfByUuid } from "../api/api";

// Cache pentru URL-uri blob
const pdfCache = new Map();

export const ViewCv = () => {
  const { uuid } = useParams();
  const [pdfUrl, setPdfUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const abortControllerRef = React.useRef(new AbortController());

  useEffect(() => {
    const controller = new AbortController();
    abortControllerRef.current = controller;

    const fetchPdf = async () => {
      setLoading(true);

      if (pdfCache.has(uuid)) {
        setPdfUrl(pdfCache.get(uuid));
        setLoading(false);
        return;
      }

      try {
        const url = await getPdfByUuid(uuid, controller.signal);
        pdfCache.set(uuid, url);
        setPdfUrl(url);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching PDF:", error);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    if (uuid) {
      fetchPdf();
    }

    return () => {
      controller.abort();
    };
  }, [uuid]);

  // useEffect(() => {
  //   return () => {
  //     if (pdfUrl) {
  //       URL.revokeObjectURL(pdfUrl);
  //     }
  //   };
  // }, [pdfUrl]);

  return (
    <div style={styles.container}>
      <h2>Refactored CV</h2>
      {loading ? (
        <div style={styles.loader}>
          <div className="spinner"></div>
          <p>Generating your CV...</p>
        </div>
      ) : (
        pdfUrl && (
          <iframe
            title="CV Preview"
            src={pdfUrl}
            loading="eager"
            width="100%"
            height="600px"
            style={{ border: "1px solid #ccc", borderRadius: "8px" }}
          />
        )
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "40px",
    maxWidth: "800px",
    margin: "auto",
  },
  loader: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px",
  },
};
