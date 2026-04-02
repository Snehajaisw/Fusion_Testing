import React from "react";
import { useNavigate } from "react-router-dom";
import "./PageStyles.css";

export default function ManageCLanguage() {
  const navigate = useNavigate();

  return (
    <div className="learn-container">
      <h1 className="learn-title">📘 Manage C Language</h1>
      <p>Manage your C language units, assignments, and student progress below.</p>

      {/* 🧩 Manage Units Section */}
      <h3 className="unit-heading" style={{ marginTop: "40px" }}>
        📘 Manage C Language Units
      </h3>

      <div className="button-container">
        <button className="unit-btn" onClick={() => navigate("/teacher/unit1")}>
          Unit 1
        </button>
        <button className="unit-btn" onClick={() => navigate("/teacher/unit2")}>
          Unit 2
        </button>
        <button className="unit-btn" onClick={() => navigate("/teacher/unit3")}>
          Unit 3
        </button>
        <button className="unit-btn" onClick={() => navigate("/teacher/unit4")}>
          Unit 4
        </button>
      </div>

      {/* ❌ Assignment section REMOVED */}

      <button
        className="back-btn"
        onClick={() => navigate("/teacher-dashboard")}
        style={{ marginTop: "50px" }}
      >
        ⬅ Back to Teacher Dashboard
      </button>
    </div>
  );
}
