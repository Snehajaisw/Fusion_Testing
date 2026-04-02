import React from "react";
import { useNavigate } from "react-router-dom";
import "./PageStyles.css";  // ⭐ Same styling as C page

export default function ManageCppLanguage() {
  const navigate = useNavigate();

  return (
    <div className="learn-container">
      <h1 className="learn-title">📘 Manage C++ Language</h1>
      <p>Manage your C++ language units, assignments, and student progress below.</p>

      {/* 🧩 Manage Units Section */}
      <h3 className="unit-heading" style={{ marginTop: "40px" }}>
        📘 Manage C++ Language Units
      </h3>

      <div className="button-container">
        <button className="unit-btn" onClick={() => navigate("/teacher/cpp/unit1")}>
          Unit 1
        </button>
        <button className="unit-btn" onClick={() => navigate("/teacher/cpp/unit2")}>
          Unit 2
        </button>
        <button className="unit-btn" onClick={() => navigate("/teacher/cpp/unit3")}>
          Unit 3
        </button>
        <button className="unit-btn" onClick={() => navigate("/teacher/cpp/unit4")}>
          Unit 4
        </button>
      </div>

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
