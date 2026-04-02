import React from "react";
import { useNavigate } from "react-router-dom";
import "./PageStyles.css";

export default function TeacherUnit1() {
  const navigate = useNavigate();

  return (
    <div className="learn-container">
      <h1 className="learn-title">📘 Unit 1 – Teacher Panel</h1>
      <p>Manage Unit 1 study materials, PPTs, assignments, and coding practice.</p>

      <div className="unit-filter">
        <button
          className="unit-btn purple"
          onClick={() => navigate("/teacher/unit1/upload-notes")}
        >
          📒 Upload Notes
        </button>

        <button
          className="unit-btn blue"
          onClick={() => navigate("/teacher/unit1/upload-ppt")}
        >
          📑 Upload PPT
        </button>

        <button
          className="unit-btn green"
          onClick={() => navigate("/teacher/unit1/assignments")}
        >
          🧠 Assignments
        </button>

        <button
  className="unit-btn orange"
  onClick={() => navigate("/teacher/unit1/coding")}
>
  💻 Coding Practice
</button>

      </div>
<button
  className="back-btn"
  style={{ marginTop: "80px" }}   // increased space
  onClick={() => navigate("/teacher/manage-c")}
>
  ⬅ Back to Manage C Language
</button>

    </div>
  );
}
