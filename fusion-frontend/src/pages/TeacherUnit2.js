import React from "react";
import { useNavigate } from "react-router-dom";
import "./PageStyles.css";

export default function TeacherUnit2() {
  const navigate = useNavigate();

  return (
    <div className="teacher-dashboard">
      <h1 className="dashboard-title">📘 Unit 2 – Teacher Panel</h1>
      <p className="dashboard-subtext">
        Manage Unit 2 study materials, PPTs, assignments, and coding practice.
      </p>

      <div className="button-container">

        {/* Upload Notes */}
        <button
          className="dashboard-btn purple"
          onClick={() => navigate("/teacher/unit2/upload-notes")}
        >
          📒 Upload Notes
        </button>

        {/* Upload PPT */}
        <button
          className="dashboard-btn blue"
          onClick={() => navigate("/teacher/unit2/upload-ppt")}
        >
          📑 Upload PPT
        </button>

        {/* Assignments */}
        <button
          className="dashboard-btn green"
          onClick={() => navigate("/teacher/unit2/assignments")}
        >
          🧠 Assignments
        </button>

        {/* Coding Practice */}
        <button
  className="unit-btn orange"
  onClick={() => navigate("/teacher/unit2/coding")}
>
  💻 Coding Practice
</button>


      </div>

      {/* Back Button */}
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
