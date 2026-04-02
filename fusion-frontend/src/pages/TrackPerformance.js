import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PageStyles.css";

export default function TrackPerformance() {
  const [tab, setTab] = useState("assignment"); // assignment | coding
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPerformance = async () => {
      try {
        setLoading(true);
        const endpoint =
          tab === "assignment"
            ? "https://fusion0-1.onrender.com/api/assignments/performance"
            : "https://fusion0-1.onrender.com/api/coding/performance";

        const res = await axios.get(endpoint);

        // API might send { success: true, performances: [...] }
        const data = res.data.performances || res.data || [];
        setRecords(data);
      } catch (error) {
        console.error("❌ Error fetching performance:", error);
        setRecords([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPerformance();
  }, [tab]);

  return (
    <div className="learn-container">
      <h1 className="learn-title">📊 Track Student Performance</h1>

      {/* Tabs for switching */}
      <div className="unit-filter">
        <button
          className={`unit-btn ${tab === "assignment" ? "active-unit" : ""}`}
          onClick={() => setTab("assignment")}
        >
          🧠 Assignments
        </button>
        <button
          className={`unit-btn ${tab === "coding" ? "active-unit" : ""}`}
          onClick={() => setTab("coding")}
        >
          💻 Coding Practice
        </button>
      </div>

      {/* Loading State */}
      {loading ? (
        <p className="learn-text">⏳ Loading performance data...</p>
      ) : records.length === 0 ? (
        <p className="learn-text">⚠️ No performance data found for {tab}.</p>
      ) : (
        <table className="performance-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Roll No.</th>
              <th>Correct</th>
              <th>Wrong</th>
              <th>Accuracy (%)</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r, i) => (
              <tr key={i}>
                <td>{r.studentName}</td>
                <td>{r.rollNumber}</td>
                <td>{r.correct}</td>
                <td>{r.wrong}</td>
                <td>{r.accuracy}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
