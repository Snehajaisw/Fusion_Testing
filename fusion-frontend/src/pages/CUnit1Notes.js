import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PageStyles.css";

export default function CUnit1Notes() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://fusion-testingphase1.onrender.com/api/notes/filter", {
        params: {
          subject: "c",      // 🔥 C language
          unit: 1,           // 🔥 Unit 1
          category: "Notes"  // 🔥 Notes
        }
      })
      .then((res) => {
        if (res.data.success) {
          setFiles(res.data.files);
        } else {
          setFiles([]);
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
      <h1 className="learn-title">📘 C – Unit 1 Notes</h1>
      <p className="learn-text">Here are the notes uploaded by your teacher.</p>

      {loading ? (
        <p>⏳ Loading notes...</p>
      ) : files.length === 0 ? (
        <p>No notes available yet for Unit 1.</p>
      ) : (
        <div className="files-list">
          {files.map((file) => (
            <div key={file._id} className="file-card">
              <h3>{file.metadata?.title || file.filename}</h3>

              <p>
                👩‍🏫 <b>Uploaded By:</b>{" "}
                {file.metadata?.uploadedBy || "Teacher"} <br />
                📅 <b>Date:</b>{" "}
                {file.uploadDate
                  ? new Date(file.uploadDate).toLocaleDateString()
                  : "N/A"}
              </p>

              <a
                href={`https://fusion-testingphase1.onrender.com/api/notes/file/${file.filename}`}
                className="view-btn"
                target="_blank"
                rel="noreferrer"
              >
                📥 View / Download
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
