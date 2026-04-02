import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./PageStyles.css";

export default function TeacherUnit3UploadPPT() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(false); // NEW

  const handleUpload = async () => {
    if (!file) return alert("Please select a PPT!");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", desc);
    formData.append("category", "PPT");   // FIXED
    formData.append("unit", 3);
    formData.append("file", file);

    await axios.post("https://fusion0-1.onrender.com/api/files/upload", formData); // FIXED URL

    setSuccess(true); // show success message
  };

  return (
    <div className="upload-page">
      <h1 className="unit-title">📊 Upload PPT (Unit 3)</h1>

      <div className="upload-form">
        <input
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Enter Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

        <select value="PPT" disabled>
          <option>PPT</option>
        </select>

        <select value="3" disabled>
          <option>Unit 3</option>
        </select>

        <input type="file" onChange={(e) => setFile(e.target.files[0])} />

        <button onClick={handleUpload}>Upload</button>
      </div>

      {/* SUCCESS MESSAGE */}
      {success && (
        <p style={{ color: "#00ff00", marginTop: "15px", fontWeight: "bold" }}>
          ✔ PPT uploaded successfully!
        </p>
      )}

      {/* VIEW UPLOADED MATERIALS (optional) */}
      {success && (
        <button
          className="back-button"
          onClick={() => navigate("/view-uploads")}
        >
          📂 View Uploaded Materials
        </button>
      )}

      <button
        className="back-button"
        onClick={() => navigate("/teacher/unit3")}
      >
        ⬅ Back to Unit 3
      </button>
    </div>
  );
}
