import React from "react";
import "./PageStyles.css";
import { useNavigate } from "react-router-dom";

export default function LearnC() {
  const navigate = useNavigate();

  return (
    <div className="learn-container">
      <h1 className="learn-title">C Language Learning Hub 💻</h1>
      <p className="learn-text">
        Welcome to the C Programming section. Choose a unit below to explore
        notes, practice questions, and assignments.
      </p>

      <div className="unit-container">
        <button className="unit-btn" onClick={() => navigate("/learn-c/unit1")}>
          Unit 1
        </button>
        <button className="unit-btn" onClick={() => navigate("/learn-c/unit2")}>
          Unit 2
        </button>
        <button className="unit-btn" onClick={() => navigate("/learn-c/unit3")}>
          Unit 3
        </button>
        <button className="unit-btn" onClick={() => navigate("/learn-c/unit4")}>
          Unit 4
        </button>
      </div>

      <button className="back-btn" onClick={() => navigate("/dashboard")}>
        ⬅ Back to Dashboard
      </button>
    </div>
  );
}
