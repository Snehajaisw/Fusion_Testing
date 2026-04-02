import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function TeacherUnit2Results() {
  const [assignments, setAssignments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://fusion0-1.onrender.com/api/assignments/unit/Unit 2")
      .then((res) => setAssignments(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="teacher-dashboard">
      <h1 className="dashboard-title">📊 Unit 2 – Assignment Results</h1>

      {assignments.length === 0 ? (
        <p>No assignments found.</p>
      ) : (
        assignments.map((a) => (
          <div key={a._id} className="file-card">
            <h3>{a.description}</h3>
            <p>
              <strong>Deadline:</strong> {new Date(a.deadline).toLocaleString()}
            </p>

            <button
              className="dashboard-btn green"
              onClick={() => navigate(`/teacher/unit2/results/${a._id}`)}
            >
              📄 View Results
            </button>
          </div>
        ))
      )}
    </div>
  );
}
