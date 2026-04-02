import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PageStyles.css";

export default function CUnit3Notes() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://fusion0-1.onrender.com/api/notes/filter", {
        params: {
          subject: "c",      // 🔥 C language
          unit: 3,           // 🔥 Unit 3
          category: "Notes"  // 🔥 Notes
        }
      })
      .then((res) => {
        if (res.data.success && res.data.files.length > 0) {
          setFile(res.data.files[0].filename);
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
      <h1 className="learn-title">📝 C – Unit 3 Notes</h1>
      <p className="learn-text">
        Download detailed study notes uploaded by your teacher.
      </p>

      {loading ? (
        <p style={{ marginTop: "20px" }}>Loading notes...</p>
      ) : !file ? (
        <p style={{ marginTop: "20px" }}>No notes uploaded yet.</p>
      ) : (
        <iframe
          src={`https://fusion0-1.onrender.com/api/notes/file/${file}`}
          className="pdf-viewer"
          title="Unit 3 Notes"
        ></iframe>
      )}
    </div>
  );
}
