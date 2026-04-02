import React from "react";
import { useNavigate } from "react-router-dom";
import "./PageStyles.css";

export default function CUnit1Assignments() {
  const navigate = useNavigate();

  return (
    <div className="learn-container">
      <h1 className="learn-title">🧩 C – Unit 1 Assignments</h1>
      <p className="learn-text">
        Attempt the latest MCQ assignments for C Unit 1.
      </p>

      <div className="button-container">
        <button
          className="dashboard-btn purple"
          onClick={() => navigate("/student-assignment?unit=1&subject=c")}
        >
          🎯 Go to Unit 1 Assignment
        </button>
      </div>
    </div>
  );
}
