import React, { useEffect, useState } from "react";
import axios from "axios";
import "./pages/PageStyles.css";

export default function Leaderboard() {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://fusion0-1.onrender.com/api/code/leaderboard")
      .then((res) => {
        setUsers(res.data.leaders);   // IMPORTANT FIX
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <h2 className="loading-text">Loading Leaderboard...</h2>;

  return (
    <div className="leaderboard-page">
      <h1 className="leaderboard-title">🏆 Leaderboard</h1>

      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>User</th>
            <th>Accepted</th>
            <th>Total</th>
            <th>Accuracy</th>
            <th>Last Submission</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u, i) => (
            <tr key={i}>
              <td>#{i + 1}</td>
              <td>{u.username || u._id || "User"}</td>
              <td className="green-text">{u.accepted}</td>
              <td>{u.totalSubmissions}</td>
              <td>{u.accuracy}%</td>
              <td>{new Date(u.lastSubmission).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
