import React from "react";
import "./PageStyles.css";

export default function CUnit4() {
  return (
    <div className="learn-container">
      <h1 className="learn-title">📘 Unit 4 Resources</h1>
      <p className="learn-text">
        Explore detailed materials for all C programming concepts in Unit 4.
      </p>

      <h3 className="learn-subtitle">📁 View Study Materials</h3>

      <div className="unit-buttons">
        <button
          className="unit-btn blue-btn"
          onClick={() => window.location.href = "/student/notes/c/4"}

        >
          📝 Notes
        </button>

        <button
          className="unit-btn blue-btn"
          onClick={() => window.location.href = "/learn-c/unit4/ppt"}

        >
          📄 PPTs
        </button>

        <button
          className="unit-btn blue-btn"
          onClick={() => (window.location.href = "/unit4/coding")}
        >
          💻 Coding Practice
        </button>

        <button
  className="unit-btn blue-btn"
  onClick={() => (window.location.href = "/student-assignment?unit=4")}
>
  🎯 Take Unit 4 Quiz
</button>

      </div>

      <button
        className="back-btn"
        onClick={() => (window.location.href = "/learn-c")}
      >
        ⬅ Back to Unit Selection
      </button>
    </div>
  );
}
