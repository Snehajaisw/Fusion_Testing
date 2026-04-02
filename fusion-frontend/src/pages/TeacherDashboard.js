import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./PageStyles.css";

export default function TeacherDashboard() {
  const navigate = useNavigate();
  const teacher = JSON.parse(localStorage.getItem("fusionUser"));

  // ✅ Route protection
  useEffect(() => {
    if (!teacher) {
      alert("Please login first!");
      navigate("/login");
      return;
    }

    if (teacher.role !== "teacher") {
      alert("Access denied! Only teachers can access this dashboard.");
      navigate("/dashboard");
    }
  }, [teacher, navigate]);

  return (
    <div className="teacher-dashboard">
      {/* ✅ Header */}
      <h1 className="dashboard-title">
        Welcome to <span className="fusion-text">Teacher Dashboard 🎓</span>
      </h1>
      <p className="dashboard-subtext">
        Hello, <b>{teacher?.name}</b>! You are logged in as a{" "}
        <b>{teacher?.role}</b>.
      </p>

      {/* ✅ Choose a Subject Section */}
      <h3 className="unit-heading" style={{ marginTop: "30px" }}>
        📚 Manage Courses
      </h3>
      <p className="dashboard-subtext">
        Select a programming language to manage units, assignments, and student performance.
      </p>

      <div className="button-container">
        <button
          className="learn-btn c-btn"
          onClick={() => navigate("/teacher/manage-c")}
        >
          Manage C Language
        </button>

        <button
          className="learn-btn cpp-btn"
          onClick={() => navigate("/teacher/manage-cpp")}
        >
          Manage C++ Language
        </button>
      </div>

      {/* ✅ Logout Button */}
      <button
        className="logout-btn"
        style={{ marginTop: "40px" }}
        onClick={() => {
          localStorage.clear();
          navigate("/login");
        }}
      >
        🚪 Logout
      </button>
    </div>
  );
}
