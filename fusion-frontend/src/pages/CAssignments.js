import React from "react";
import { Link } from "react-router-dom";
import "./PageStyles.css";

export default function CAssignments() {
  return (
    <div className="learn-container">
      <h1 className="learn-title">🧾 Assignments / Quizzes</h1>
      <p className="learn-text">
        Solve assignments and quizzes related to Unit 1 concepts.
      </p>
      <button className="back-btn">
        <Link to="/unit1" style={{ color: "white", textDecoration: "none" }}>
          ⬅ Back to Unit 1
        </Link>
      </button>
    </div>
  );
}
