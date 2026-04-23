import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./PageStyles.css";

export default function StudentAssignment() {
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const selectedUnit = query.get("unit");

  // 🔐 PASSKEY STATES
  const [showPasskeyModal, setShowPasskeyModal] = useState(false);
  const [enteredPasskey, setEnteredPasskey] = useState("");
  const [clickedAssignment, setClickedAssignment] = useState(null);

  const [loading, setLoading] = useState(false);

  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  const [studentName, setStudentName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [detailsFilled, setDetailsFilled] = useState(false);

  /* ---------------- FETCH ASSIGNMENTS ---------------- */
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const res = await axios.get(
          `https://fusion-testingphase1.onrender.com/api/assignments/student?unit=${Number(selectedUnit)}&rollNumber=${rollNumber}`
        );

        setAssignments(res.data.assignments || []);
      } catch (error) {
        console.error("❌ Error fetching assignments:", error);
      }
    };

    if (rollNumber) {
      fetchAssignments();
    }
  }, [selectedUnit, rollNumber]);

  /* ---------------- HANDLE ANSWERS ---------------- */
  const handleAnswerChange = (qIndex, value) => {
    const updated = [...answers];
    updated[qIndex] = value;
    setAnswers(updated);
  };

  /* ---------------- SUBMIT ---------------- */
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

      setResult(res.data.performance);
    } catch (err) {
      if (err.response?.data?.message) {
        alert(err.response.data.message);
        return;
      }
      console.error("❌ Error saving performance:", err);
    }
  };

  /* ---------------- VERIFY PASSKEY ---------------- */
  const verifyPasskey = async () => {
  if (!enteredPasskey.trim()) {
    return alert("Please enter passkey!");
  }

  if (!clickedAssignment) return;

  setLoading(true);

  try {
    const res = await axios.post(
      "https://fusion-testingphase1.onrender.com/api/assignments/verify-passkey",
      {
        assignmentId: clickedAssignment._id,
        passkey: enteredPasskey
      }
    );

    if (res.data.success) {
      const res2 = await axios.get(
        `https://fusion-testingphase1.onrender.com/api/assignments/${clickedAssignment._id}`
      );

      setSelectedAssignment(res2.data);
      setShowPasskeyModal(false);
      setEnteredPasskey("");
      setClickedAssignment(null);
    }

  } catch (err) {
    alert("❌ Wrong passkey!");
    setEnteredPasskey("");
  } finally {
    setLoading(false);
  }
};
  /* ---------------- CLICK ASSIGNMENT ---------------- */
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

      // 🔐 open passkey modal
      setClickedAssignment(assignment);
      setShowPasskeyModal(true);

    } catch (err) {
      console.log("❌ Error checking attempt:", err);
    }
  };

  return (
    <div className="learn-container">
      <h1 className="learn-title">ES Lab Quiz</h1>

      {/* DETAILS */}
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
            />

            <input
              type="text"
              placeholder="Enter your Roll Number"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              className="clean-input"
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

      {/* ASSIGNMENT LIST */}
      {detailsFilled && !selectedAssignment && (
        <div>
         <h2 className="assignment-heading">Choose the quiz according to your slot</h2>

          {assignments.map((a, i) => {
            const deadline = new Date(a.deadline);
            const expired = new Date() > deadline;

            return (
              <div
                key={i}
                className="file-card"
                onClick={() => handleAssignmentClick(a)}
                style={{ cursor: "pointer" }}
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

      {/* QUESTIONS */}
      {selectedAssignment && !result && (
        <>
          <h2>📘 Unit {selectedAssignment.unit} – Assignment</h2>

          {selectedAssignment.questions.map((q, index) => (
            <div key={index} className="file-card">
              <h3>{index + 1}.</h3>

              <pre>
                <code>{q.questionText}</code>
              </pre>

              <input
                type="text"
                placeholder="Enter your answer"
                value={answers[index] || ""}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
                className="clean-input"
              />
            </div>
          ))}

          <button className="view-btn" onClick={handleSubmit}>
            Submit 
          </button>
        </>
      )}

      {/* PASSKEY MODAL */}
      {showPasskeyModal && (
         <div className="passkey-overlay">
    <div className="passkey-modal">
  <div style={{
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999
  }}>
    
    <div style={{
      background: "#1e2a3a",
      padding: "30px",
      borderRadius: "12px",
      width: "300px",
      textAlign: "center"
    }}>
      
      <h3>🔐 Enter Passkey</h3>

      <input
  type="text"
  value={enteredPasskey}
  onChange={(e) => setEnteredPasskey(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") verifyPasskey();
  }}
  placeholder="Enter passkey"
/>

      <div style={{ marginTop: "15px" }}>
<button onClick={verifyPasskey} disabled={loading}>
  {loading ? "Checking..." : "Submit"}
</button>
        <button
          onClick={() => {
            setShowPasskeyModal(false);
            setClickedAssignment(null);
            setEnteredPasskey("");
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</div>
  </div>        
)}

      {/* RESULT */}
      {result && (
        <div className="result-card">
          <h3> Your Performance</h3>
          <p>Name: {studentName}</p>
          <p>Roll: {rollNumber}</p>
          <p>Correct: {result.correct}</p>
          <p>Wrong: {result.wrong}</p>
          <p>Accuracy: {result.accuracy}%</p>
        </div>
      )}
    </div>
  );
}