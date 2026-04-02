import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./PageStyles.css";

export default function CUnit4Ppt() {
  const [ppts, setPpts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPPTs = async () => {
      try {
        console.log("📡 Fetching C Unit 4 PPTs...");

        const res = await axios.get("https://fusion0-1.onrender.com/api/notes/filter", {
          params: {
            subject: "c",    // 🔥 C language
            unit: 4,         // 🔥 Unit 4
            category: "PPT"  // 🔥 PPT
          }
        });

        if (res.data.success) {
          setPpts(res.data.files);
        } else {
          setPpts([]);
        }
      } catch (error) {
        console.error("❌ Error fetching Unit 4 PPTs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPPTs();
  }, []);

  if (loading) {
    return <p className="learn-text">⏳ Loading PPTs for Unit 4...</p>;
  }

  return (
    <div className="learn-container">
      <h1 className="learn-title">📊 C – Unit 4 PPTs</h1>
      <p className="learn-text">
        Here are all the PPTs uploaded by your teacher for Unit 4.
      </p>

      {ppts.length === 0 ? (
        <p className="learn-text">No PPTs available yet for Unit 4.</p>
      ) : (
        <div className="files-list">
          {ppts.map((ppt) => (
            <div key={ppt._id} className="file-card">
              <h3>{ppt.metadata?.title || ppt.filename}</h3>

              <p>
                👩‍🏫 <b>Uploaded By:</b>{" "}
                {ppt.metadata?.uploadedBy || "Teacher"} <br />
                📘 <b>Unit:</b> {ppt.metadata?.unit} <br />
                📅 <b>Date:</b>{" "}
                {ppt.uploadDate
                  ? new Date(ppt.uploadDate).toLocaleDateString("en-GB")
                  : "N/A"}
              </p>

              <div className="file-actions">
                <a
                  href={`https://fusion0-1.onrender.com/api/notes/file/${ppt.filename}`}
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

      <button className="back-btn" onClick={() => navigate("/learn-c/unit4")}>
        ⬅ Back to Unit 4
      </button>
    </div>
  );
}
