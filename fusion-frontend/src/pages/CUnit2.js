import React from "react";
import { useNavigate } from "react-router-dom";
import "./PageStyles.css";

export default function CUnit2() {
  const navigate = useNavigate();

  return (
    <div className="learn-container">
      <h1 className="learn-title">📘 Unit 2 Resources</h1>

      <p className="learn-text">
        Explore detailed materials for all C programming concepts in Unit 2.
      </p>

      {/* 📁 View Study Materials */}
      <h3 className="unit-heading" style={{ marginTop: "40px" }}>
        📁 View Study Materials
      </h3>

      <div
        className="button-container"
        style={{ gap: "20px", flexWrap: "wrap", justifyContent: "center" }}
      >
        {/* ✅ FIXED NOTES BUTTON */}
        <button
          className="unit-btn"
          onClick={() => navigate("/student/notes/c/2")}
        >
          📝 Notes
        </button>

        <button
          className="unit-btn"
          onClick={() => navigate("/learn-c/unit2/ppt")}
        >
          📊 PPTs
        </button>

        <button
          className="unit-btn"
          onClick={() => navigate("/learn-c/unit2/coding")}
        >
          💻 Coding Practice
        </button>

        <button
          className="unit-btn"
          onClick={() => navigate("/student-assignment?unit=2")}
        >
          🎯 Take Unit 2 Quiz
        </button>
      </div>

      {/* 🔙 Back Button */}
      <button
        className="back-btn"
        onClick={() => navigate("/learn-c")}
        style={{ marginTop: "40px" }}
      >
        ⬅ Back to Unit Selection
      </button>
    </div>
  );
}
