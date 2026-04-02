import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./PageStyles.css";

export default function StudentNotes() {
  const { subject, unitId } = useParams();
  const navigate = useNavigate();

  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        console.log("📡 Fetching notes:", subject, unitId);

        const res = await axios.get(
          "https://fusion-testingphase1.onrender.com/api/files/filter",
          {
            params: {
              subject,          // c / cpp
              unit: unitId,     // 1
              category: "notes" // REQUIRED
            }
          }
        );

        // backend sends { success, files }
        setFiles(res.data.files || []);

      } catch (err) {
        console.error("❌ Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [subject, unitId]);

  if (loading) return <p className="learn-text">⏳ Loading notes...</p>;

  return (
    <div className="learn-container">
      <h1 className="learn-title">
        📘 {subject.toUpperCase()} – Unit {unitId} Notes
      </h1>

      {files.length === 0 ? (
        <p className="learn-text">⚠️ No notes available.</p>
      ) : (
        <div className="files-list">
          {files.map((file) => (
            <div className="file-card" key={file._id}>
              <h3>{file.metadata?.title}</h3>

              <p>
                📂 <b>Category:</b> {file.metadata?.category}<br />
                👩‍🏫 <b>Uploaded By:</b> {file.metadata?.uploadedBy}<br />
                📅 <b>Date:</b>{" "}
                {new Date(file.uploadDate).toLocaleDateString("en-GB")}
              </p>

              <a
                className="view-btn"
                href={`https://fusion-testingphase1.onrender.com/api/files/download/${file.filename}`}
                target="_blank"
                rel="noreferrer"
              >
                📥 View / Download
              </a>
            </div>
          ))}
        </div>
      )}

      <button className="back-btn" onClick={() => navigate(-1)}>
        ⬅ Back
      </button>
    </div>
  );
}
