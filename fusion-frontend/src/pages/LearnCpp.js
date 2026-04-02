import React from "react";
import { useNavigate } from "react-router-dom";
import "./PageStyles.css";

export default function LearnCpp() {
  const navigate = useNavigate();

  return (
    <div className="learn-container">
      <h1 className="learn-title">⚙️ C++ Learning Hub</h1>

      <p className="learn-text">
        Dive into C++ fundamentals — classes, objects, OOP, templates, STL, and more.
        Enhance your programming skills with structured learning materials.
      </p>

      <h3 className="unit-heading" style={{ marginTop: "40px" }}>
        📘 Select a Unit to Begin
      </h3>

      <div className="button-container">

        {/* Unit 1 */}
        <button
          className="unit-btn"
          onClick={() => navigate("/learn-cpp/unit1")}
        >
          📗 Unit 1 — C++ Basics
        </button>

        {/* Unit 2 */}
        <button
          className="unit-btn"
          onClick={() => navigate("/learn-cpp/unit2")}
        >
          📘 Unit 2 — Object-Oriented Programming
        </button>

        {/* Unit 3 */}
        <button
          className="unit-btn"
          onClick={() => navigate("/learn-cpp/unit3")}
        >
          📙 Unit 3 — Advanced OOP + Templates
        </button>

        {/* Unit 4 */}
        <button
          className="unit-btn"
          onClick={() => navigate("/learn-cpp/unit4")}
        >
          📕 Unit 4 — STL + File Handling
        </button>

      </div>

      <button
        className="back-btn"
        onClick={() => navigate("/dashboard")}
        style={{ marginTop: "40px" }}
      >
        ⬅ Back to Dashboard
      </button>
    </div>
  );
}
