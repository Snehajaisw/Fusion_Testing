import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./PageStyles.css";

export default function CUnit4Assignments() {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([]);

  const unit = new URLSearchParams(window.location.search).get("unit");

  useEffect(() => {
    axios
      .get("https://fusion0-1.onrender.com/api/assignments", {
        params: {
          unit: unit,     // Unit 4
          subject: "c"    // 🔥 ONLY C assignments
        }
      })
      .then((res) => {
        setAssignments(res.data.assignments || []);
      })
      .catch((err) => console.error("Error fetching assignments:", err));
  }, [unit]);

  return (
    <div className="teacher-unit-container">
      <h1 className="dashboard-title">
        MCQ Assignments – <span className="fusion-text">C Unit {unit}</span>
      </h1>

      {assignments.length === 0 ? (
        <div className="no-assignments">
          No assignments available for this unit.
        </div>
      ) : (
        <div className="assignment-list">
          {assignments.map((a) => (
            <div key={a._id} className="assignment-card">
              <h3>{a.title}</h3>
              <p>{a.description}</p>

              <button
                className="attempt-btn"
                onClick={() =>
                  navigate(`/student/attempt-assignment/${a._id}`)
                }
              >
                ▶ Attempt Assignment
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        className="back-button"
        onClick={() => navigate("/student/unit4")}
      >
        ⬅ Back
      </button>
    </div>
  );
}
