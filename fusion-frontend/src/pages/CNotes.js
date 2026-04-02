import React from "react";
import { Link } from "react-router-dom";
import "./PageStyles.css";

export default function CNotes() {
  return (
    <div className="learn-container">
      <h1 className="learn-title">📘 C Notes</h1>
      <p className="learn-text">
        Here you'll find detailed notes for all C programming concepts in Unit 1.
      </p>
      <button className="back-btn">
        <Link to="/unit1" style={{ color: "white", textDecoration: "none" }}>
          ⬅ Back to Unit 1
        </Link>
      </button>
    </div>
  );
}
