import React from "react";
import { useNavigate } from "react-router-dom";
import "./PageStyles.css";

export default function TeacherCodingHome() {
  const navigate = useNavigate();

  return (
    <div className="learn-container" style={{ textAlign: "center" }}>
      <h1 className="learn-title">💻 Coding Practice – Teacher Panel</h1>
      <p style={{ color: "#ccc" }}>
        Manage global coding questions and view students coding performance
      </p>

      <div style={{ marginTop: "40px", display: "flex", justifyContent: "center", gap: "30px" }}>
        
        <div
          className="question-card"
          style={{ cursor: "pointer", width: "260px" }}
          onClick={() => navigate("/teacher/coding/add")}
        >
          <h2>➕ Add Coding Questions</h2>
          <p>Create global coding practice questions.</p>
        </div>

        <div
          className="question-card"
          style={{ cursor: "pointer", width: "260px" }}
          onClick={() => navigate("/teacher/coding/results")}
        >
          <h2>📊 Coding Results</h2>
          <p>View all students coding scores.</p>
        </div>

      </div>
    </div>
  );
}
