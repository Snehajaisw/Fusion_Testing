import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function AssignmentResultTable() {
  const { assignmentId } = useParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios.get(`https://fusion-backend-testing.onrender.com/api/submissions/assignment/${assignmentId}`)
      .then((res) => setResults(res.data))
      .catch((err) => console.log(err));
  }, [assignmentId]);

  return (
    <div className="teacher-dashboard">
      <h1 className="dashboard-title">📄 Assignment Results</h1>

      {results.length === 0 ? (
        <p>No results submitted yet.</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
            color: "white",
          }}
        >
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Score</th>
              <th>Total Questions</th>
              <th>Submitted At</th>
            </tr>
          </thead>

          <tbody>
            {results.map((r) => (
              <tr key={r._id}>
                <td>{r.studentName}</td>
                <td>{r.score}</td>
                <td>{r.total}</td>
                <td>{new Date(r.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
