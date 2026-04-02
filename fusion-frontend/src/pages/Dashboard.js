import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./PageStyles.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("fusionUser"));

  useEffect(() => {
    if (!userData) {
      navigate("/login");
    }
  }, [userData, navigate]);

  if (!userData) return null;

  const role = userData?.role || "student";

  return (
    <div className="dashboard-container">

      {/* 🔥 HEADER BAR */}
      <div className="dashboard-header">

        {/* LEFT SIDE PROFILE */}
        <div className="header-profile">
          <div className="profile-avatar">
            {userData?.name?.charAt(0).toUpperCase()}
          </div>

          <div className="profile-details">
            <h4>{userData?.name}</h4>
            <p>{userData?.email}</p>
            <span className="branch-text">
              Branch: {userData?.section}
            </span>
          </div>
        </div>

        {/* RIGHT SIDE LOGOUT */}
        <button
          className="header-logout"
          onClick={() => {
            localStorage.removeItem("fusionUser");
            navigate("/login");
          }}
        >
          🚪 Logout
        </button>
      </div>

      {/* 🔽 MAIN CONTENT */}
      <div className="dashboard-content">

        <h1 className="dashboard-title">
          Welcome to <span className="fusion-text">Fusion Dashboard</span> 🎓
        </h1>

        <p className="dashboard-subtext">
          You are logged in as <strong>{role}</strong>.
        </p>

        <h3 className="unit-heading">💻 Learn & Practice</h3>

        <div className="button-container">
          <button
            className="learn-btn c-btn"
            onClick={() => navigate("/learn-c")}
          >
            Learn C Language
          </button>

          <button
            className="learn-btn cpp-btn"
            onClick={() => navigate("/learn-cpp")}
          >
            Learn C++
          </button>
        </div>

        <h3 className="unit-heading">🏆 Coding Performance</h3>

        <div className="button-container">
          <button
            className="learn-btn"
            onClick={() => navigate("/leaderboard")}
          >
            🏆 View Leaderboard
          </button>
        </div>

      </div>
    </div>
  );
}