import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./PageStyles.css";

export default function SubmissionResult() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState("details");
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
  axios
    .get(`https://fusion-backend-testing.onrender.com/api/code/submission/${id}`)
    .then((res) => {
      console.log("FULL DATA:", res.data);   // 🔥 ADD
      console.log("SUBMISSION:", res.data.submission);   // 🔥 ADD
      console.log("STEP RESULTS:", res.data.submission?.stepResults);   // 🔥 ADD
      
      setData(res.data.submission);
    })
    .catch(console.error);
}, [id]);

  if (!data) return <h2 className="loading-text">Loading submission...</h2>;

  // runtime graph
  const runtimeMs = parseFloat(data.runtime) || 0;
  const maxRuntime = 100;
  const runtimeWidth = Math.max(
    10,
    Math.min(100, ((maxRuntime - runtimeMs) / maxRuntime) * 100)
  );

  return (
    <div className={`submission-page ${isDark ? "theme-dark" : "theme-light"}`}>
      
      {/* TOP BAR */}
      <div className="submission-topbar">
        <h1
          className={
            data.status === "Accepted"
              ? "status-badge success"
              : "status-badge fail"
          }
        >
          {data.status}
        </h1>

        <div className="topbar-right">
          <button
            className="history-btn"
            onClick={() => navigate("/submissions")}
          >
            View All Submissions
          </button>

          <button
            className="theme-toggle"
            onClick={() => setIsDark((prev) => !prev)}
          >
            {isDark ? "☀ Light" : "🌙 Dark"}
          </button>
        </div>
      </div>

      {/* TABS */}
      <div className="tabs-row">
        <button
          className={activeTab === "details" ? "tab active" : "tab"}
          onClick={() => setActiveTab("details")}
        >
          Details
        </button>
        <button
          className={activeTab === "code" ? "tab active" : "tab"}
          onClick={() => setActiveTab("code")}
        >
          Code
        </button>
        <button
          className={activeTab === "output" ? "tab active" : "tab"}
          onClick={() => setActiveTab("output")}
        >
          Output
        </button>
      </div>

      {/* DETAILS TAB */}
      {activeTab === "details" && (
        <div className="tab-content">

          {/* STATS */}
          <div className="stats-container">
            <div className="stat-card">
              <h4>Runtime</h4>
              <p>{data.runtime || "-"}</p>
            </div>

            <div className="stat-card">
              <h4>Memory</h4>
              <p>{data.memory || "-"}</p>
            </div>

            <div className="stat-card">
              <h4>Passed</h4>
              <p>{data.passed}/{data.total}</p>
            </div>
          </div>

          {/* 🔥 STEP EVALUATION */}
          {data.stepResults && (
            <div className="step-evaluation-box">
              <h3>Step Evaluation</h3>

              {data.stepResults.map((step, index) => (
                <div key={index} className="step-item">
                  <p>
                    <b>Step {index + 1}:</b> {step.label}
                  </p>

                  <p>
                    {step.passed ? "✅ Pass" : "❌ Fail"}{" "}
                    ({step.marksAwarded}/{step.maxMarks})
                  </p>
                </div>
              ))}

              <h2 className="total-score">
                Total Score: {data.totalMarks} / {data.maxMarks}
              </h2>
            </div>
          )}

          {/* RUNTIME GRAPH */}
          <div className="runtime-graph">
            <div className="runtime-graph-header">
              <span>Runtime distribution</span>
              <span>Your runtime: {data.runtime}</span>
            </div>

            <div className="runtime-bar-bg">
              <div
                className="runtime-bar-fill"
                style={{ width: `${runtimeWidth}%` }}
              />
            </div>
          </div>

        </div>
      )}

      {/* CODE TAB */}
      {activeTab === "code" && (
        <div className="tab-content">
          <h2 className="code-title">Submitted Code</h2>
          <pre className="submitted-code-box">
{data.code}
          </pre>
        </div>
      )}

      {/* OUTPUT TAB */}
      {activeTab === "output" && (
        <div className="tab-content">
          <h2 className="code-title">Output Summary</h2>

          <div className="output-box">
            {data.status === "Accepted" ? (
              <p>All testcases passed successfully ✅</p>
            ) : (
              <p>
                {data.passed} out of {data.total} testcases passed.
              </p>
            )}

            <p>
              <b>Language:</b> {data.language?.toUpperCase() || "C"}
            </p>

            <p>
              <b>Submitted at:</b>{" "}
              {new Date(data.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}