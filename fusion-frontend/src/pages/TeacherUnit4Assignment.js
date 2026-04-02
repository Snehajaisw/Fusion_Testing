import React from "react";
import "./PageStyles.css"; // same CSS as Unit 3

export default function TeacherUnit4Assignment() {
  return (
    <div className="learn-container">

      <h1 className="learn-title">🧠 Unit 4 – Assignments</h1>
      <p className="learn-text">
        Create, manage, and review student performance for Unit 4 assignments.
      </p>

      <div className="unit-buttons">
        <button
          className="unit-btn purple-btn"
          onClick={() => (window.location.href = "/teacher/create-assignment")}
        >
          ✳ Create Assignment
        </button>

        <button
          className="unit-btn blue-btn"
          onClick={() => (window.location.href = "/teacher/unit4/assignment-manage")}
        >
          📁 Manage Assignments
        </button>

        <button
          className="unit-btn green-btn"
          onClick={() => (window.location.href = "/teacher/unit4/results")}
        >
          📊 View Assignment Results
        </button>
      </div>

      <button
        className="back-btn"
        onClick={() => (window.location.href = "/teacher/unit4")}
      >
        ⬅ Back to Unit 4
      </button>

    </div>
  );
}
