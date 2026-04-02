import React from "react";
import { useNavigate } from "react-router-dom";
import "./PageStyles.css";

export default function TeacherUnit4() {
  const navigate = useNavigate();

  return (
    <div className="teacher-dashboard">
      <h1 className="dashboard-title">📘 Unit 4 – Teacher Panel</h1>
      <p className="dashboard-subtext">
        Manage Unit 4 study materials, PPTs, assignments, and coding practice.
      </p>

      <div className="button-container">
        <button
          className="dashboard-btn purple"
          onClick={() => navigate("/teacher/unit4/upload-notes")}
        >
          📒 Upload Notes
        </button>

        <button
          className="dashboard-btn blue"
          onClick={() => navigate("/teacher/unit4/upload-ppt")}
        >
          📑 Upload PPT
        </button>

        <button
          className="dashboard-btn green"
          onClick={() => navigate("/teacher/unit4/assignments")}
        >
          🧠 Assignments
        </button>

        <button
  className="unit-btn orange"
  onClick={() => navigate("/teacher/unit4/coding")}
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
