import React from "react";
import { useNavigate } from "react-router-dom";
import "./PageStyles.css";

export default function TeacherUnit3() {
  const navigate = useNavigate();

  return (
    <div className="teacher-dashboard">
      <h1 className="dashboard-title">📘 Unit 3 – Teacher Panel</h1>
      <p className="dashboard-subtext">
        Manage Unit 3 study materials, PPTs, assignments, and coding practice.
      </p>

      <div className="button-container">
        {/* ✅ Correct Route */}
        <button
          className="dashboard-btn purple"
          onClick={() => navigate("/teacher/unit3/upload-notes")}
        >
          📒 Upload Notes
        </button>

        {/* ❗ FIXED: made it consistent with other units */}
        <button
          className="dashboard-btn blue"
          onClick={() => navigate("/teacher/unit3/upload-ppt")}
        >
          📑 Upload PPT
        </button>

        {/* ❗ FIXED: clean and hyphen format */}
        <button
          className="dashboard-btn green"
          onClick={() => navigate("/teacher/unit3/assignments")}
        >
          🧠 Assignments
        </button>

        {/* ❗ FIXED: consistent naming */}
        <button
  className="unit-btn orange"
  onClick={() => navigate("/teacher/unit3/coding")}
>
  💻 Coding Practice
</button>

      </div>

      <button
        className="back-btn"
        style={{ marginTop: "40px" }}
        onClick={() => navigate("/teacher/manage-c")}
      >
        ⬅ Back to Manage C Language
      </button>
    </div>
  );
}
