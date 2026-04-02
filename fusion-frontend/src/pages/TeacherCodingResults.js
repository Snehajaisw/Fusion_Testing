import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PageStyles.css";

export default function TeacherCodingResults() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios
      .get("https://fusion0-1.onrender.com/api/coding/results")
      .then((res) => setResults(res.data.results || []))
      .catch((err) => console.error("Fetch results error:", err));
  }, []);

  return (
    <div className="learn-container">
      <h1 className="learn-title">📊 All Coding Practice Results</h1>

      {results.length === 0 ? (
        <p>No student submissions yet.</p>
      ) : (
        <table className="result-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Student</th>
              <th>Email</th>
              <th>Question</th>
              <th>Score</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {results.map((r, i) => (
              <tr key={r._id}>
                <td>{i + 1}</td>
                <td>{r.userId?.name}</td>
                <td>{r.userId?.email}</td>
                <td>{r.questionId?.title}</td>
                <td>{r.totalMarks}/{r.maxMarks}</td>
                <td>
                  <span className={r.status === "Accepted" ? "badge-pass" : "badge-fail"}>
                    {r.status}
                  </span>
                </td>
                <td>{new Date(r.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
