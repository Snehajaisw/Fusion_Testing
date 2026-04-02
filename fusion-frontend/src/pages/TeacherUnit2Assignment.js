import React from "react";
import { useNavigate } from "react-router-dom";
import "./PageStyles.css";

export default function TeacherUnit2Assignment() {
  const navigate = useNavigate();

  return (
    <div className="teacher-dashboard">
      <h1 className="dashboard-title">🧠 Unit 2 – Assignments</h1>
      <p className="dashboard-subtext">
        Create, manage, and review student performance for Unit 2 assignments.
      </p>

      <div className="button-container">
        <button
          className="dashboard-btn purple"
          onClick={() => navigate("/teacher/create-assignment?unit=2")}
        >
          ✳ Create Assignment
        </button>

        <button
  className="dashboard-btn blue"
  onClick={() => navigate("/teacher/unit2/assignment-manage?unit=2")}
>
  📁 Manage Assignments
</button>


        <button
          className="dashboard-btn green"
          onClick={() => navigate("/teacher/unit2/results")}
        >
          📊 View Assignment Results
        </button>
      </div>

      <button
        className="back-btn"
        style={{ marginTop: "40px" }}
        onClick={() => navigate("/teacher/unit2")}
      >
        ⬅ Back to Unit 2
      </button>
    </div>
  );
}
