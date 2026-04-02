import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./PageStyles.css";

export default function CUnit1PPT() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        console.log("📡 Fetching C Unit 1 PPTs...");

        const res = await axios.get("https://fusion0-1.onrender.com/api/notes/filter", {
          params: {
            subject: "c",     // 🔥 C language
            unit: 1,          // 🔥 Unit 1
            category: "PPT"   // 🔥 PPT
          }
        });

        if (res.data.success) {
          setFiles(res.data.files);
        } else {
          setFiles([]);
        }

      } catch (error) {
        console.error("❌ Error fetching PPTs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  if (loading) return <p className="learn-text">⏳ Loading PPTs...</p>;

  return (
    <div className="learn-container">
      <h1 className="learn-title">📊 C – Unit 1 PPTs</h1>
      <p className="learn-text">
        Here are all the PPTs uploaded by your teacher for Unit 1.
      </p>

      {files.length === 0 ? (
        <p className="learn-text">⚠️ No PPTs uploaded yet for Unit 1.</p>
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
                  ? new Date(file.uploadDate).toLocaleDateString("en-GB")
                  : "N/A"}
              </p>

              <div className="file-actions">
                <a
                  href={`https://fusion0-1.onrender.com/api/notes/file/${file.filename}`}
                  target="_blank"
                  rel="noreferrer"
                  className="view-btn"
                >
                  📥 View / Download
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      <button className="back-btn" onClick={() => navigate("/learn-c/unit1")}>
        ⬅ Back to Unit 1
      </button>
    </div>
  );
}
