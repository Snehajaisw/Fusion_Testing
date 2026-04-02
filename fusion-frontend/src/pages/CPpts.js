import React from "react";
import { Link } from "react-router-dom";
import "./PageStyles.css";

export default function CPPTs() {
  return (
    <div className="learn-container">
      <h1 className="learn-title">📊 C PPTs</h1>
      <p className="learn-text">
        Access all PowerPoint presentations for C Unit 1 topics here.
      </p>
      <button className="back-btn">
        <Link to="/unit1" style={{ color: "white", textDecoration: "none" }}>
          ⬅ Back to Unit 1
        </Link>
      </button>
    </div>
  );
}
