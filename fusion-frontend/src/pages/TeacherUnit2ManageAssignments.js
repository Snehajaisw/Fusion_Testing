import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PageStyles.css";

export default function TeacherUnit2ManageAssignments() {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const res = await axios.get(
        "https://fusion-testingphase1.onrender.com/api/assignments/unit/2"
      );
      setAssignments(res.data.assignments || []);
    } catch (error) {
      console.error("❌ Error fetching Unit 2 assignments", error);
    }
  };

  const deleteAssignment = async (id) => {
    if (!window.confirm("Delete this assignment?")) return;

    try {
      await axios.delete(`https://fusion-testingphase1.onrender.com/api/assignments/${id}`);
      fetchAssignments();
    } catch (error) {
      alert("Error deleting assignment");
    }
  };

  return (
    <div className="learn-container">
      <h1 className="learn-title">📁 Manage Unit 2 Assignments</h1>

      {assignments.length === 0 ? (
        <p style={{ color: "white" }}>No assignments found for Unit 2.</p>
      ) : (
        assignments.map((a) => (
          <div key={a._id} className="file-card">

            {/* ⭐ Assignment Description */}
            <h2 style={{ color: "#00e0ff", marginBottom: "10px" }}>
              {a.description || "Untitled Assignment"}
            </h2>

            {/* ⭐ Deadline */}
            <p style={{ color: "white" }}>
              <strong>Deadline:</strong>{" "}
              {a.deadline
                ? new Date(a.deadline).toLocaleString()
                : "No deadline set"}
            </p>

            {/* ⭐ Uploaded Date */}
            <p style={{ color: "white" }}>
              <strong>Uploaded on:</strong>{" "}
              {a.createdAt
                ? new Date(a.createdAt).toLocaleString()
                : "Unknown"}
            </p>

            {/* ⭐ Unit */}
            <p style={{ color: "white" }}>
              <strong>Unit:</strong> {a.unit}
            </p>

            {/* ❌ Delete Button */}
            <button
              className="delete-btn"
              onClick={() => deleteAssignment(a._id)}
            >
              ❌ Delete Assignment
            </button>
          </div>
        ))
      )}
    </div>
  );
}
