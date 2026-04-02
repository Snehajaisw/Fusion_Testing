import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./PageStyles.css";

export default function TeacherAssignment() {
  const navigate = useNavigate();

  // ✅ 10 empty question templates
  const [questions, setQuestions] = useState(
    Array.from({ length: 10 }, () => ({
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
    }))
  );

  const [msg, setMsg] = useState("");

  // ✅ Handle change in question text
  const handleQuestionChange = (index, value) => {
    const updated = [...questions];
    updated[index].question = value;
    setQuestions(updated);
  };

  // ✅ Handle change in option text
  const handleOptionChange = (qIndex, optIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[optIndex] = value;
    setQuestions(updated);
  };

  // ✅ Handle correct answer change
  const handleCorrectChange = (qIndex, value) => {
    const updated = [...questions];
    updated[qIndex].correctAnswer = value;
    setQuestions(updated);
  };

  // ✅ Handle assignment submission (save to backend)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    // Check validation
    if (
      questions.some(
        (q) =>
          !q.question ||
          q.options.some((opt) => !opt) ||
          !q.correctAnswer
      )
    ) {
      setMsg("⚠️ Please fill all questions, options, and correct answers!");
      return;
    }

    try {
      const res = await axios.post("https://fusion-testingphase1.onrender.com/api/assignments", {
        questions,
      });
      console.log("✅ Assignment Saved:", res.data);
      setMsg("✅ Assignment published successfully!");
    } catch (error) {
      console.error("🔥 Error saving assignment:", error);
      setMsg("❌ Failed to publish assignment!");
    }
  };

  return (
    <div className="learn-container">
      <h1 className="learn-title">🧩 Create C Programming Assignment</h1>
      <p className="learn-text">
        Add 10 multiple-choice questions below. Each must have 4 options and 1
        correct answer.
      </p>

      <form onSubmit={handleSubmit} className="assignment-form">
        {questions.map((q, qIndex) => (
          <div key={qIndex} className="question-card">
            <h3>Question {qIndex + 1}</h3>
            <textarea
              className="question-input"
              placeholder="Enter question here..."
              value={q.question}
              onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
              required
            />

            {q.options.map((opt, optIndex) => (
              <input
                key={optIndex}
                type="text"
                placeholder={`Option ${optIndex + 1}`}
                value={opt}
                onChange={(e) =>
                  handleOptionChange(qIndex, optIndex, e.target.value)
                }
                required
              />
            ))}

            <input
              type="text"
              className="correct-input"
              placeholder="Enter correct answer exactly as above"
              value={q.correctAnswer}
              onChange={(e) => handleCorrectChange(qIndex, e.target.value)}
              required
            />
          </div>
        ))}

        <button type="submit" className="upload-btn">
          🚀 Publish Assignment
        </button>
      </form>

      <p
        className="message"
        style={{ color: msg.includes("✅") ? "limegreen" : "red" }}
      >
        {msg}
      </p>

      <button
        className="back-btn"
        onClick={() => navigate("/teacher-dashboard")}
      >
        ⬅ Back to Dashboard
      </button>
    </div>
  );
}
