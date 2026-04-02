import React from "react";
import { Link } from "react-router-dom";
import "./PageStyles.css";

export default function CCodingPractice() {
  return (
    <div className="learn-container">
      <h1 className="learn-title">💻 Coding Practice</h1>
      <p className="learn-text">
        Practice your C coding skills with live compiler-based exercises.
      </p>
      <button className="back-btn">
        <Link to="/unit1" style={{ color: "white", textDecoration: "none" }}>
          ⬅ Back to Unit 1
        </Link>
      </button>
    </div>
  );
}
