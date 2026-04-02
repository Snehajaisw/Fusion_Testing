import React, { useState } from "react";
import axios from "axios";
import "./PageStyles.css";

export default function UploadPage({ unit, course }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Notes");
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file!");
      return;
    }

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);

    // ✅ unit always numeric (1,2,3,4)
    const numericUnit = unit.toString().replace(/[^0-9]/g, "");
    formData.append("unit", numericUnit);

    // ✅ SUBJECT (cpp / c) — MOST IMPORTANT FIX
    formData.append("subject", course);

    formData.append("file", file);

    try {
      console.log("Uploading:", {
        subject: course,
        unit: numericUnit,
        category,
      });

      await axios.post("https://fusion0-1.onrender.com/api/files/upload", formData);
      setSuccess(true);
      setTitle("");
      setDescription("");
      setFile(null);
    } catch (error) {
      console.error("❌ Upload error:", error);
      alert("Upload failed!");
    }
  };

  return (
    <div className="upload-page">
      <h1 className="unit-title">
        📤 Upload Study Material (Unit {unit})
      </h1>

      <div className="upload-form">
        <input
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Enter Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Category */}
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Notes">Notes</option>
          <option value="PPT">PPT</option>
          <option value="Assignment">Assignment</option>
        </select>

        {/* Unit (locked) */}
        <select value={unit} disabled>
          <option>{unit}</option>
        </select>

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button onClick={handleUpload}>Upload</button>
      </div>

      {success && (
        <p
          style={{
            color: "lightgreen",
            marginTop: "15px",
            fontWeight: "bold",
          }}
        >
          ✔ Upload successful!
        </p>
      )}
    </div>
  );
}
