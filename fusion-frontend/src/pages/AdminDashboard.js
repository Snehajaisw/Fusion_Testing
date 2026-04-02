import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PageStyles.css";

export default function AdminDashboard() {
  const [pendingTeachers, setPendingTeachers] = useState([]);
  const [approvedTeachers, setApprovedTeachers] = useState([]);

  useEffect(() => {
    fetchPending();
    fetchApproved();
  }, []);

  const fetchPending = async () => {
    try {
      const res = await axios.get(
        "https://fusion-backend-testing.onrender.com/api/auth/pending-teachers"
      );
      setPendingTeachers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchApproved = async () => {
    try {
      const res = await axios.get(
        "https://fusion-backend-testing.onrender.com/api/auth/approved-teachers"
      );
      setApprovedTeachers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const approveTeacher = async (id) => {
    try {
      await axios.put(
        `https://fusion-backend-testing.onrender.com/api/auth/approve/${id}`
      );

      fetchPending();
      fetchApproved();
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("fusionUser");
    window.location.href = "/login";
  };

  return (
    <div className="admin-container">

      <div className="admin-header">
        <h1 className="admin-title">Admin Dashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* 🔹 Pending Teachers */}
      <h2 style={{ marginTop: "30px" }}>Pending Teachers</h2>
      {pendingTeachers.length === 0 ? (
        <div className="empty-state">No pending teachers</div>
      ) : (
        <div className="teacher-grid">
          {pendingTeachers.map((teacher) => (
            <div className="teacher-card" key={teacher._id}>
              <h3>{teacher.name}</h3>
              <p>{teacher.email}</p>
              <button
                className="approve-btn"
                onClick={() => approveTeacher(teacher._id)}
              >
                Approve
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 🔹 Approved Teachers */}
      <h2 style={{ marginTop: "50px" }}>Approved Teachers</h2>
      {approvedTeachers.length === 0 ? (
        <div className="empty-state">No approved teachers yet</div>
      ) : (
        <div className="teacher-grid">
          {approvedTeachers.map((teacher) => (
  <div className="teacher-card approved" key={teacher._id}>
    <h3>{teacher.name}</h3>
    <p>{teacher.email}</p>

<p>
  <strong>Branch:</strong>{" "}
  {teacher.sections?.join(", ") || teacher.extraField}
</p>
    <p style={{ color: "green" }}>✔ Approved</p>
  </div>
))}

        </div>
      )}
    </div>
  );
}
