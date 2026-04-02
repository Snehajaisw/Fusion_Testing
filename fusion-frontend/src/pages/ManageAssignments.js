import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";import "./PageStyles.css";

export default function ManageAssignments() {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);

  // ✅ Always store UNIT as NUMBER
  const unit = Number(query.get("unit")) || 1;

  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
  const fetchAssignments = async () => {
    try {
      const res = await axios.get(
        `https://fusion-backend-testing.onrender.com/api/assignments/all?unit=${unit}`
      );

      console.log("FULL RESPONSE:", res.data);

      setAssignments(res.data.assignments || []);
    } catch (error) {
      console.error("❌ Error fetching assignments", error);
    }
  };

  fetchAssignments();
}, [unit]);

  const deleteAssignment = async (id) => {
    if (!window.confirm("Are you sure you want to delete this assignment?"))
      return;

    try {
      await axios.delete(`https://fusion-backend-testing.onrender.com/api/assignments/${id}`);
      alert("Assignment deleted!");

      setAssignments(assignments.filter((a) => a._id !== id));
    } catch (error) {
      alert("Failed to delete assignment");
    }
  };

  return (
    <div className="learn-container">
      <h1 className="learn-title">📁 Manage Unit {unit} Assignments</h1>

      {assignments.length === 0 ? (
        <p style={{ color: "white" }}>No assignments found for Unit {unit}.</p>
      ) : (
        assignments.map((a) => (
          <div key={a._id} className="file-card">
            <h2 style={{ color: "#00e0ff" }}>{a.title}</h2>

            <p style={{ color: "white" }}>
              <strong>Description:</strong> {a.description}
            </p>

            <p style={{ color: "white" }}>
              <strong>Deadline:</strong>{" "}
              {a.deadline
                ? new Date(a.deadline).toLocaleString()
                : "No deadline set"}
            </p>

            <button
              className="delete-btn"
              onClick={() => deleteAssignment(a._id)}
            >
              ❌ Delete Assignment
            </button>
            <button
  className="view-btn"
  onClick={() => navigate(`/teacher/assignment-results/${a._id}`)}
>
  📊 View Results
</button>
          </div>
        ))
      )}
    </div>
  );
}
