import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./PageStyles.css";

export default function StudentAssignment() {
  const location = useLocation();

  // 🔥 FIX 1: Read unit from query params
  const query = new URLSearchParams(location.search);
  const selectedUnit = query.get("unit");

  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  const [studentName, setStudentName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [detailsFilled, setDetailsFilled] = useState(false);


  
  /* -------------------------------------------------------
        FETCH ASSIGNMENTS  (STUDENT API)
  -------------------------------------------------------- */
  useEffect(() => {
  const fetchAssignments = async () => {
    try {
      const res = await axios.get(
        `https://fusion-testingphase1.onrender.com/api/assignments/student?unit=${Number(selectedUnit)}&rollNumber=${rollNumber}`
      );

      console.log("Student assignments:", res.data);

      setAssignments(res.data.assignments || []);
    } catch (error) {
      console.error("❌ Error fetching assignments:", error);
    }
  };

  if (rollNumber) {
    fetchAssignments();
  }
}, [selectedUnit, rollNumber]);

  const handleAnswerChange = (qIndex, value) => {
  const updated = [...answers];
  updated[qIndex] = value;
  setAnswers(updated);
};
  const handleSubmit = async () => {
  try {
    const res = await axios.post(
      "https://fusion-testingphase1.onrender.com/api/assignments/performance",
      {
        studentName,
        rollNumber,
        answers: Object.values(answers),
        unit: selectedAssignment.unit,
        assignmentId: selectedAssignment._id
      }
    );

    if (!res.data.success) {
      alert(res.data.message);
      return;
    }

    // ✅ SHOW RESULT
    setResult(res.data.performance);

  } catch (err) {
    if (err.response?.data?.message) {
      alert(err.response.data.message);
      return;
    }
    console.error("❌ Error saving performance:", err);
  }
  
};
  const handleAssignmentClick = async (assignment) => {
    if (!rollNumber) return alert("Please enter your details first.");
    if (new Date() > new Date(assignment.deadline)) {
      return alert("Deadline is over! You cannot attempt this assignment.");
    }

    try {
      const res = await axios.post(
        "https://fusion-testingphase1.onrender.com/api/assignments/check",
        {
          rollNumber,
          unit: assignment.unit,
        }
      );

      if (res.data.attempted) {
        alert("You have already attempted this assignment!");
        return;
      }

      setSelectedAssignment(assignment);
    } catch (err) {
      console.log("❌ Error checking attempt:", err);
    }
  };

  return (
    <div className="learn-container">
      <h1 className="learn-title">🧩 Lab Quiz</h1>

      {/* DETAIL FORM */}
      {!detailsFilled && (
        <div className="file-card" style={{ padding: "25px" }}>
          <h2>Enter Your Details</h2>

          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Enter your Name"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="clean-input"
              required
            />

            <input
              type="text"
              placeholder="Enter your Roll Number"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              className="clean-input"
              required
            />
          </div>

          <button
            className="view-btn"
            onClick={() => {
              if (!studentName || !rollNumber)
                return alert("Please enter both name and roll number!");
              setDetailsFilled(true);
            }}
          >
            Continue 🚀
          </button>
        </div>
      )}

      {/* ASSIGNMENTS LIST */}
      {detailsFilled && !selectedAssignment && (
        <div>
          <h2>📚 Choose an Assignment</h2>

          {assignments.length === 0 && <p>No assignments available for this unit.</p>}

          {assignments.map((a, i) => {
            const deadline = new Date(a.deadline);
            const expired = new Date() > deadline;

            return (
              <div
                key={i}
                className="file-card"
                style={{ cursor: "pointer" }}
                onClick={() => handleAssignmentClick(a)}
              >
                <h3>📘 {a.title}</h3>
                <p>📝 {a.description}</p>
                <p>🔢 Questions: {a.questions.length}</p>
                <p>⏳ Deadline: {deadline.toLocaleString()}</p>

                <p style={{ color: expired ? "red" : "lightgreen" }}>
                  {expired ? "❌ Deadline Over" : "✔ Available"}
                </p>
              </div>
            );
          })}
        </div>
      )}

      {/* SHOW QUESTIONS */}
      {selectedAssignment && !result && (
        <>
          <h2>📘 Unit {selectedAssignment.unit} – Assignment</h2>

          {selectedAssignment.questions.map((q, index) => (
            <div
  key={index}
  className="file-card"
  style={{
    marginBottom: "20px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  }}
>
              <h3>{index + 1}.</h3>

<pre
  style={{
    background: "#1e1e1e",
    color: "#fff",
    padding: "10px",
    borderRadius: "8px",
    whiteSpace: "pre-wrap",
    fontFamily: "monospace",
    marginBottom: "10px"
  }}
>
  <code>{q.questionText}</code>
</pre>

             <input
  type="text"
  placeholder="Enter your answer"
  className="clean-input"
  value={answers[index] || ""}
  onChange={(e) => handleAnswerChange(index, e.target.value)}
  style={{
    width: "100%",
    boxSizing: "border-box"
  }}
/>
            </div>
          ))}

          <button className="view-btn" onClick={handleSubmit}>
            Submit Assignment
          </button>
        </>
      )}

      {/* RESULT */}
      {result && (
        <div className="result-card">
          <h3>📊 Your Performance</h3>
          <p>🧑‍🎓 Name: {studentName}</p>
          <p>📌 Roll No: {rollNumber}</p>
          <p>📘 Unit: {selectedAssignment.unit}</p>
          <p>✅ Correct: {result.correct}</p>
          <p>❌ Wrong: {result.wrong}</p>
          <p>🎯 Accuracy: {result.accuracy}%</p>

          <button
      className="view-btn"
      style={{ marginTop: "20px" }}
      onClick={() => {
        setResult(null);
        setSelectedAssignment(null);
        setAnswers([]);
        window.location.href = "/";
      }}
    >
      🚪 Logout
    </button>
        </div>
      )}
    </div>
  );
}
