import React, { useState } from "react";
import axios from "axios";
import "./PageStyles.css";

export default function TeacherUnit1UploadPPT() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!title || !description || !file) {
      return alert("Please fill all fields!");
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);

    // ⭐ Correct category
    formData.append("category", "PPT");

    // ⭐ FIXED: Save unit as "1"
    formData.append("unit", "1");

    formData.append("file", file);

    try {
      // ⭐ FIXED: Correct API endpoint
      await axios.post("https://fusion0-1.onrender.com/api/files/upload", formData);

      alert("PPT Uploaded Successfully!");
      setTitle("");
      setDescription("");
      setFile(null);
    } catch (error) {
      console.error(error);
      alert("Upload failed!");
    }
  };

  return (
    <div className="learn-container">
      <h1 className="learn-title">📤 Upload PPT (Unit 1)</h1>

      <div className="upload-card">
        <input
          type="text"
          className="clean-input"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="clean-input"
          placeholder="Enter Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select className="clean-input" disabled>
          <option>PPT</option>
        </select>

        <select className="clean-input" disabled>
          <option>1</option>
        </select>

        <input
          type="file"
          className="clean-input"
          accept=".pdf,.ppt,.pptx"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button className="view-btn" onClick={handleUpload}>
          Upload
        </button>

        <button
          className="back-btn"
          onClick={() => (window.location.href = "/teacher/unit1")}
        >
          ⬅ Back to Unit 1
        </button>
      </div>
    </div>
  );
}
