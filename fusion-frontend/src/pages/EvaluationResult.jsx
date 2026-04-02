import React from "react";

function EvaluationResult({ result }) {
  if (!result) return null;

  const {
    testcaseResults = [],
    stepResults = [],
    totalMarks,
    maxMarks,
    testcasesPassed,
    totalTestcases
  } = result;

  return (
    <div style={{ 
      padding: "16px", 
      background: "#f7f7f7", 
      borderRadius: "8px",
      marginTop: "20px",
      border: "1px solid #ccc"
    }}>
      
      <h2>Final Score: {totalMarks} / {maxMarks}</h2>

      <h3>Testcases ({testcasesPassed}/{totalTestcases} Passed)</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Input</th>
            <th style={thStyle}>Expected</th>
            <th style={thStyle}>Got</th>
            <th style={thStyle}>Status</th>
          </tr>
        </thead>
        <tbody>
          {testcaseResults.map((tc, i) => (
            <tr key={i}>
              <td style={tdStyle}>{tc.input}</td>
              <td style={tdStyle}>{tc.expected}</td>
              <td style={tdStyle}>{tc.got}</td>
              <td style={tdStyle}>
                <span style={{ color: tc.status === "Passed" ? "green" : "red" }}>
                  {tc.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ marginTop: "20px" }}>Step-by-Step Evaluation</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Step</th>
            <th style={thStyle}>Marks</th>
            <th style={thStyle}>Status</th>
          </tr>
        </thead>
        <tbody>
          {stepResults.map((s, i) => (
            <tr key={i}>
              <td style={tdStyle}>{s.label}</td>
              <td style={tdStyle}>{s.marksAwarded} / {s.marksTotal}</td>
              <td style={tdStyle}>
                <span style={{ color: s.passed ? "green" : "red" }}>
                  {s.passed ? "Passed" : "Failed"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "10px",
  background: "white"
};

const thStyle = {
  border: "1px solid #ddd",
  padding: "8px",
  background: "#eee"
};

const tdStyle = {
  border: "1px solid #ddd",
  padding: "8px"
};

export default EvaluationResult;
