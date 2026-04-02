import React from "react";
import { useNavigate } from "react-router-dom";
import "./PageStyles.css";

export default function TeacherCppUnit2() {
  const navigate = useNavigate();

  return (
    <div className="learn-container">
      <h1 className="learn-title">📘 C++ Unit 3 – Teacher Panel</h1>
      <p>Manage Unit 3 C++ notes, PPTs, assignments, and coding practice.</p>

      <div className="button-container">
        <button className="unit-btn" onClick={() => navigate("/teacher/cpp/unit3/upload-notes")}>  Upload Notes</button>
        <button className="unit-btn" onClick={() => navigate("/teacher/cpp/unit3/upload-ppt")}> Upload PPT </button>
        <button className="unit-btn" onClick={() => navigate("/teacher/cpp/unit3/assignments")}>  Assignments</button>
        <button className="unit-btn" onClick={() => navigate("/teacher/cpp/unit3/coding")}> Coding Practice</button>
      </div>

      <button 
        className="back-btn"
        onClick={() => navigate("/teacher/manage-cpp")}
        style={{ marginTop: "50px" }}
      >
        ⬅ Back to Manage C++ Language
      </button>
    </div>
  );
}
