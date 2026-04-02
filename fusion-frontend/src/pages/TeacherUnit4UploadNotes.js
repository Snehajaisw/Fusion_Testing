import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./PageStyles.css";

export default function TeacherUnit4UploadNotes({ course = "c" }) {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert("Please select a file!");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", desc);
    formData.append("category", "Notes");
    formData.append("unit", "4");

    // 🔥 REQUIRED
    formData.append("subject", course);

    formData.append("file", file);

    console.log("Uploading:", {
      subject: course,
      unit: "4",
      category: "Notes",
    });

    await axios.post("https://fusion0-1.onrender.com/api/files/upload", formData);

    setSuccess(true);
  };

  return (
    <div className="upload-page">
      <h1 className="unit-title">📘 Upload Study Material (Unit 4)</h1>

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

        <select value="Notes" disabled>
          <option>Notes</option>
        </select>

        <select value="4" disabled>
          <option>Unit 4</option>
        </select>

        <input type="file" onChange={(e) => setFile(e.target.files[0])} />

        <button onClick={handleUpload}>Upload</button>
      </div>

      {success && (
        <p style={{ color: "#00ff00", marginTop: "15px", fontWeight: "bold" }}>
          ✔ Upload successful!
        </p>
      )}

      {success && (
        <button
          className="back-button"
          style={{ marginTop: "10px" }}
          onClick={() => navigate("/view-uploads")}
        >
          📂 View Uploaded Study Materials
        </button>
      )}

      <button
        className="back-button"
        onClick={() => navigate("/teacher/unit4")}
      >
        ⬅ Back to Unit 4
      </button>
    </div>
  );
}
