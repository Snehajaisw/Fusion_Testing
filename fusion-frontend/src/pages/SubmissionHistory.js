import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PageStyles.css";

export default function SubmissionHistory() {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId") || "dummyUser";

  useEffect(() => {
    axios
      .get(`https://fusion0-1.onrender.com/api/code/submissions/user/${userId}`)
      .then((res) => {
        setSubs(res.data.submissions || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <h2 className="loading-text">Loading submissions...</h2>;

  return (
    <div className="history-wrapper">
      <h1>Your Submissions</h1>

      {subs.length === 0 && <p>No submissions yet.</p>}

      {subs.length > 0 && (
        <table className="history-table">
          <thead>
            <tr>
              <th>Status</th>
              <th>Runtime</th>
              <th>Memory</th>
              <th>Passed</th>
              <th>Date</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {subs.map((s) => (
              <tr key={s._id}>
                <td className={s.status === "Accepted" ? "green-text" : "red-text"}>
                  {s.status}
                </td>
                <td>{s.runtime}</td>
                <td>{s.memory}</td>
                <td>
                  {s.passed}/{s.total}
                </td>
                <td>{new Date(s.createdAt).toLocaleString()}</td>
                <td>
                  <a href={`/submission/${s._id}`} className="view-link">
                    Open
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
