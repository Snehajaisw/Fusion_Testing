import React from "react";
import { useNavigate } from "react-router-dom";
import "./PageStyles.css";

export default function TeacherUnit1Assignment() {
  const navigate = useNavigate();

  return (
    <div className="learn-container">
      <h1 className="learn-title">🧠 Unit 1 – Assignments</h1>
      <p style={{ marginBottom: "30px" }}>
        Create, manage, and review student performance for Unit 1 assignments.
      </p>

      <div className="unit-filter">
        {/* Create Assignment */}
        <button
          className="unit-btn purple"
          onClick={() => navigate("/teacher/create-assignment?unit=1")}
        >
          ✳ Create Assignment
        </button>

        {/* Manage Assignments */}
        <button
          className="unit-btn blue"
          onClick={() => navigate("/teacher/unit1/manage-assignments?unit=1")}
        >
          📁 Manage Assignments
        </button>

        {/* View Results */}
        <button
          className="unit-btn green"
          onClick={() => navigate("/teacher/unit1/results")}
        >
          📊 View Assignment Results
        </button>
      </div>

      <button
        className="back-btn"
        style={{ marginTop: "40px" }}
        onClick={() => navigate("/teacher/unit1")}
      >
        ⬅ Back to Unit 1
      </button>
    </div>
  );
}
