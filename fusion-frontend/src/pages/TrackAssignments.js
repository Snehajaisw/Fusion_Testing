import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PageStyles.css";

export default function TrackAssignments() {
  const [performances, setPerformances] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://fusion0-1.onrender.com/api/assignments/performance");
        setPerformances(res.data);
      } catch (error) {
        console.error("❌ Error fetching performance data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="learn-container">
      <h1 className="learn-title">📊 Assignment Performance</h1>
      <p className="learn-text">
        View how your students performed in the MCQ assignments.
      </p>

      <table className="performance-table">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Roll Number</th>
            <th>Correct</th>
            <th>Wrong</th>
            <th>Accuracy (%)</th>
          </tr>
        </thead>
        <tbody>
          {performances.length > 0 ? (
            performances.map((p, index) => (
              <tr key={index}>
                <td>{p.studentName}</td>
                <td>{p.rollNumber}</td>
                <td>{p.correct}</td>
                <td>{p.wrong}</td>
                <td>{p.accuracy}%</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No student performance data yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
