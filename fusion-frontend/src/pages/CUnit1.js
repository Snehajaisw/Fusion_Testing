import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./PageStyles.css";

export default function CUnit1() {
  const navigate = useNavigate();
  const location = useLocation();

  // 🔥 Detect language from URL
  const isCpp = location.pathname.includes("learn-cpp");
  const language = isCpp ? "cpp" : "c";

  const user = JSON.parse(localStorage.getItem("fusionUser"));
  const role = user?.role || "student";

  return (
    <div className="learn-container">
      <h1 className="learn-title">📘 Unit 1 Resources</h1>
      <p className="learn-text">
        Explore detailed materials for all {language.toUpperCase()} programming concepts in Unit 1.
      </p>

      <h3 className="unit-heading" style={{ marginTop: "40px" }}>
        📁 View Study Materials
      </h3>

      <div className="button-container">
        <button
          className="unit-btn"
          onClick={() => navigate(`/learn-${language}/unit1/notes`)}
        >
          📝 Notes
        </button>

        <button
          className="unit-btn"
          onClick={() => navigate(`/learn-${language}/unit1/ppt`)}
        >
          📊 PPTs
        </button>

        {role === "teacher" && (
          <button
            className="unit-btn"
            onClick={() => navigate(`/learn-${language}/unit1/assignments`)}
          >
            📂 Assignments
          </button>
        )}

        <button
          className="unit-btn"
          onClick={() => navigate(`/learn-${language}/unit1/coding`)}
        >
          💻 Coding Practice
        </button>
      </div>

      <h3 className="unit-heading" style={{ marginTop: "40px" }}>
        🧠 Attempt Unit 1 Assignment Quiz
      </h3>

      <div className="button-container">
        <button
          className="dashboard-btn purple"
          onClick={() => navigate(`/student-assignment?unit=1`)}
        >
          🎯 Take Unit 1 Assignment Quiz
        </button>
      </div>

      <button
        className="back-btn"
        onClick={() => navigate(`/learn-${language}`)}
        style={{ marginTop: "40px" }}
      >
        ⬅ Back to Unit Selection
      </button>
    </div>
  );
}
