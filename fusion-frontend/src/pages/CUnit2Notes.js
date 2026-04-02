import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PageStyles.css";

export default function CUnit2Notes() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://fusion-testingphase1.onrender.com/api/notes/filter", {
        params: {
          subject: "c",      // 🔥 C course
          unit: 2,           // 🔥 Unit 2
          category: "Notes"  // 🔥 Notes
        }
      })
      .then((res) => {
        if (res.data.success && res.data.files.length > 0) {
          setFile(res.data.files[0].filename); // latest uploaded file
        } else {
          setFile(null);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="learn-container">
      <h1 className="learn-title">📝 C – Unit 2 Notes</h1>
      <p className="learn-text">
        Download detailed study notes uploaded by your teacher.
      </p>

      {loading ? (
        <p style={{ marginTop: "20px" }}>Loading notes...</p>
      ) : !file ? (
        <p style={{ marginTop: "20px" }}>No notes uploaded yet.</p>
      ) : (
        <iframe
          src={`https://fusion-testingphase1.onrender.com/api/notes/file/${file}`}
          className="pdf-viewer"
          title="Unit 2 Notes"
        ></iframe>
      )}
    </div>
  );
}
