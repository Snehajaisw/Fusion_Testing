import React from "react";
import { useNavigate } from "react-router-dom";
import "./PageStyles.css";

export default function Register() {
  const navigate = useNavigate();

  return (
    <div className="login-page">
      <div className="form-card">
        <h2>Select Registration Type</h2>

        <button
          className="role-btn"
          onClick={() => navigate("/set-password")}
        >
          Register as Student
        </button>

        <button
          className="role-btn"
          onClick={() => navigate("/teacher-signup")}
        >
          Register as Teacher
        </button>
      </div>
    </div>
  );
}
