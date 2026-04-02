import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./PageStyles.css";

export default function ViewUploads() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUnit, setSelectedUnit] = useState("Unit 1");
  const navigate = useNavigate();

  // Fetch all uploaded files
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        console.log("📡 Fetching files from backend...");
        const res = await axios.get("https://fusion-testingphase1.onrender.com/api/files");
        console.log("✅ Files fetched successfully:", res.data);
        setFiles(res.data);
      } catch (error) {
        console.error("❌ Failed to load files:", error.response?.data || error.message);
        toast.error("⚠️ Failed to load files!");
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  // Delete file
  const handleDelete = async (filename) => {
    if (!window.confirm("Are you sure you want to delete this file?")) return;
    try {
      console.log("🗑️ Deleting file:", filename);
      await axios.delete(`https://fusion-testingphase1.onrender.com/api/files/${filename}`);

      setFiles(files.filter((f) => f.filename !== filename));
      toast.success("🗑️ File deleted successfully!");
    } catch (error) {
      console.error("❌ Failed to delete file:", error.response?.data || error.message);
      toast.error("❌ Failed to delete file!");
    }
  };

  // Corrected unit filter (works for all old + new uploads)
  const filteredFiles =
    selectedUnit === "All"
      ? files
      : files.filter((f) => {
          const unitMeta = f.metadata?.unit?.toString().trim(); // "Unit 1" or "1"
          const selectedNum = selectedUnit.replace("Unit ", "").trim(); // "1"
          return (
            unitMeta === selectedUnit || // matches "Unit 1"
            unitMeta === selectedNum // matches "1"
          );
        });

  if (loading)
    return <p className="learn-text">⏳ Loading uploaded files...</p>;

  return (
    <div className="learn-container">
      <h1 className="learn-title">📂 Uploaded Study Materials</h1>
      <p className="learn-text">
        View, download, or delete uploaded notes, PPTs, and assignments.
      </p>

      {/* Unit Filter Buttons */}
      <div className="unit-filter">
        {["Unit 1", "Unit 2", "Unit 3", "Unit 4"].map((unit) => (
          <button
            key={unit}
            className={`unit-btn ${selectedUnit === unit ? "active-unit" : ""}`}
            onClick={() => setSelectedUnit(unit)}
            style={{ margin: "0 10px" }}
          >
            {unit}
          </button>
        ))}
      </div>

      {/* Files Display */}
      {filteredFiles.length === 0 ? (
        <p className="learn-text">No uploaded files available yet.</p>
      ) : (
        <div className="files-list">
          {filteredFiles.map((file) => (
            <div key={file._id} className="file-card">
              <h3>{file.metadata?.title || file.filename}</h3>

              <p>
                📘 <b>Unit:</b> {file.metadata?.unit} <br />
                🗂️ <b>Category:</b> {file.metadata?.category} <br />
                👩‍🏫 <b>Uploaded By:</b> {file.metadata?.uploadedBy} <br />
                ⏰ <b>Date:</b>{" "}
                {new Date(file.uploadDate).toLocaleDateString("en-GB")}
              </p>

              <div className="file-actions">
                <a
                  href={`https://fusion-testingphase1.onrender.com/api/files/file/${file.filename}`}
                  target="_blank"
                  rel="noreferrer"
                  className="view-btn"
                >
                  📥 Download
                </a>

                <button
                  onClick={() => handleDelete(file.filename)}
                  className="delete-btn"
                >
                  ❌ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        className="back-btn"
        onClick={() => navigate("/teacher-dashboard")}
      >
        ⬅ Back to Dashboard
      </button>

      <ToastContainer theme="dark" />
    </div>
  );
}
