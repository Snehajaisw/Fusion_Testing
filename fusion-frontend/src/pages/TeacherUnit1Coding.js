import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PageStyles.css";

export default function TeacherUnit1Coding() {

  // ✅ NEW: Separate title and description
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // 🔹 Multiple Testcases
  const [testcases, setTestcases] = useState([
    { input: "", output: "", visible: true },
  ]);

  // 🔹 Step-by-step evaluation rules
  const [steps, setSteps] = useState([]);

  const [allQuestions, setAllQuestions] = useState([]);

  // ============================
  // 🔥 FETCH ALL GLOBAL PRACTICE QUESTIONS
  // ============================
  const fetchQuestions = async () => {
    try {
      const res = await axios.get(
        "https://fusion0-1.onrender.com/api/coding/practice?language=c"
      );
      setAllQuestions(res.data.questions || []);
    } catch (error) {
      console.error("Error loading questions:", error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  // ============================
  // 🔥 ADD MORE TESTCASE
  // ============================
  const addMoreTestcase = () => {
    setTestcases([...testcases, { input: "", output: "", visible: true }]);
  };

  // ============================
  // 🔥 ADD / REMOVE STEP
  // ============================
  const addStep = () => {
    setSteps([
      ...steps,
      {
        label: "",
        type: "code-contains",
        value: "",
        minPassed: "",
        marks: 1,
      },
    ]);
  };

  const removeStep = (index) => {
    const updated = [...steps];
    updated.splice(index, 1);
    setSteps(updated);
  };

  const updateStepField = (index, field, value) => {
    const updated = [...steps];
    updated[index] = { ...updated[index], [field]: value };
    setSteps(updated);
  };

  // ============================
  // 🔥 ADD QUESTION (GLOBAL)
  // ============================
  const handleSubmit = async () => {

    if (!title || !description)
      return alert("Please enter title and problem statement!");

    // Testcase validation
    for (let tc of testcases) {
      if (!tc.input || !tc.output) {
        return alert("Please fill all testcase fields!");
      }
    }

    // Step validation
    for (let s of steps) {
      if (!s.label || !s.type) {
        return alert("Please fill all evaluation step fields or remove empty ones.");
      }
      if (!s.marks || Number(s.marks) <= 0) {
        return alert("Marks in each step should be > 0");
      }
      if (
        (s.type === "code-contains" || s.type === "code-regex") &&
        !s.value
      ) {
        return alert("Please provide 'value' for code-based steps.");
      }
      if (s.type === "min-testcases-pass" && !s.minPassed) {
        return alert("Please provide 'minimum testcases to pass' for that step.");
      }
    }

    try {
      await axios.post("https://fusion0-1.onrender.com/api/coding/add", {
        title: title,               // ✅ short heading
        description: description,   // ✅ full question
        language: "c",

        testcases: testcases.map((tc) => ({
          input: tc.input,
          expectedOutput: tc.output,
          visible: tc.visible,
        })),

        evaluationSteps: steps.map((s) => ({
          label: s.label,
          type: s.type,
          value:
            s.type === "all-testcases-pass" ? undefined : (s.value || ""),
          minPassed:
            s.type === "min-testcases-pass"
              ? Number(s.minPassed || 0)
              : undefined,
          marks: Number(s.marks || 0),
        })),
      });

      alert("✅ Global Coding Practice Question Added!");

      setTitle("");
      setDescription("");
      setTestcases([{ input: "", output: "", visible: true }]);
      setSteps([]);
      fetchQuestions();

    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  // ============================
  // 🔥 DELETE QUESTION
  // ============================
  const deleteQuestion = async (id) => {
    if (!window.confirm("Delete this question?")) return;

    try {
      await axios.delete(`https://fusion0-1.onrender.com/api/coding/delete/${id}`);
      fetchQuestions();
      alert("Question deleted!");
    } catch (err) {
      console.error("Delete error:", err);
      alert("Error deleting question");
    }
  };

  return (
    <div className="learn-container">
      <h1 className="learn-title">💻 Add Global Coding Practice Question</h1>

      {/* ✅ QUESTION TITLE */}
      <input
        className="clean-input"
        value={title}
        placeholder="Enter question title (e.g. Reverse an Array)"
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* ✅ FULL DESCRIPTION */}
      <textarea
        className="clean-input"
        style={{ marginTop: "10px" }}
        value={description}
        placeholder="Enter full problem statement..."
        onChange={(e) => setDescription(e.target.value)}
      />

      {/* ---------- MULTIPLE TESTCASES ---------- */}
      <h3 style={{ marginTop: "20px" }}>🧪 Testcases</h3>

      {testcases.map((tc, index) => (
        <div key={index} className="tc-box" style={{ marginBottom: "15px" }}>
          <textarea
            className="clean-input"
            placeholder={`Testcase ${index + 1} Input`}
            value={tc.input}
            onChange={(e) => {
              const updated = [...testcases];
              updated[index].input = e.target.value;
              setTestcases(updated);
            }}
          />

          <textarea
            className="clean-input"
            placeholder={`Testcase ${index + 1} Output`}
            value={tc.output}
            onChange={(e) => {
              const updated = [...testcases];
              updated[index].output = e.target.value;
              setTestcases(updated);
            }}
          />

          <label style={{ marginTop: "5px", display: "block" }}>
            <input
              type="checkbox"
              checked={tc.visible}
              onChange={(e) => {
                const updated = [...testcases];
                updated[index].visible = e.target.checked;
                setTestcases(updated);
              }}
            />{" "}
            Visible to Students
          </label>
        </div>
      ))}

      <button className="view-btn" onClick={addMoreTestcase}>
        ➕ Add More Testcase
      </button>

      {/* ---------- STEP-BY-STEP RULES ---------- */}
      <h3 style={{ marginTop: "30px" }}>🧩 Step-by-Step Evaluation Rules</h3>

      {steps.map((step, index) => (
        <div
          key={index}
          className="tc-box"
          style={{ marginBottom: "15px", padding: "15px" }}
        >
          <div style={{ marginBottom: "8px" }}>
            <label>Step Label</label>
            <input
              className="clean-input"
              value={step.label}
              placeholder="e.g. Uses scanf()"
              onChange={(e) =>
                updateStepField(index, "label", e.target.value)
              }
            />
          </div>

          <div style={{ marginBottom: "8px" }}>
            <label>Step Type</label>
            <select
              className="clean-input"
              value={step.type}
              onChange={(e) => updateStepField(index, "type", e.target.value)}
            >
              <option value="code-contains">Code contains substring</option>
              <option value="code-regex">Code matches regex</option>
              <option value="all-testcases-pass">All testcases pass</option>
              <option value="min-testcases-pass">
                Minimum testcases passed
              </option>
            </select>
          </div>

          {(step.type === "code-contains" || step.type === "code-regex") && (
            <div style={{ marginBottom: "8px" }}>
              <label>Value</label>
              <input
                className="clean-input"
                value={step.value}
                placeholder={
                  step.type === "code-contains"
                    ? 'e.g. "scanf" or "%"'
                    : "e.g. /if\\s*\\(/"
                }
                onChange={(e) =>
                  updateStepField(index, "value", e.target.value)
                }
              />
            </div>
          )}

          {step.type === "min-testcases-pass" && (
            <div style={{ marginBottom: "8px" }}>
              <label>Minimum testcases to pass</label>
              <input
                className="clean-input"
                type="number"
                min="1"
                value={step.minPassed}
                onChange={(e) =>
                  updateStepField(index, "minPassed", e.target.value)
                }
              />
            </div>
          )}

          <div style={{ marginBottom: "8px" }}>
            <label>Marks</label>
            <input
              className="clean-input"
              type="number"
              min="1"
              value={step.marks}
              onChange={(e) =>
                updateStepField(index, "marks", e.target.value)
              }
            />
          </div>

          <button
            className="back-btn"
            style={{ background: "#ff4d4d", color: "white" }}
            onClick={() => removeStep(index)}
          >
            🗑 Remove Step
          </button>
        </div>
      ))}

      <button className="view-btn" style={{ marginTop: "5px" }} onClick={addStep}>
        ➕ Add Evaluation Step
      </button>

      {/* ---------- SUBMIT ---------- */}
      <button
        className="view-btn"
        style={{ marginTop: "15px" }}
        onClick={handleSubmit}
      >
        ✔ Add Coding Question
      </button>

      {/* ---------- SHOW ALL QUESTIONS ---------- */}
      <h2 style={{ marginTop: "40px" }}>📋 All Global Coding Practice Questions</h2>

      {allQuestions.length === 0 ? (
        <p>No questions added yet.</p>
      ) : (
        <div className="questions-grid">
          {allQuestions.map((q) => (
            <div className="question-card" key={q._id}>
              <h3>{q.title}</h3>

              <p><b>Description:</b> {q.description}</p>

              <b>Testcases:</b>
              {q.testcases?.map((tc, i) => (
                <p key={i}>
                  <b>TC {i + 1}:</b> <br />
                  <b>Input:</b> {tc.input} <br />
                  <b>Expected:</b> {tc.expected}
                </p>
              ))}

              {q.evaluationSteps?.length > 0 && (
                <>
                  <b>Steps:</b>
                  {q.evaluationSteps.map((s, i) => (
                    <p key={i}>
                      <b>Step {i + 1}:</b> {s.label} ({s.type}) – Marks:{" "}
                      {s.marks}
                    </p>
                  ))}
                </>
              )}

              <button
                className="back-btn"
                style={{ background: "#ff4d4d", color: "white" }}
                onClick={() => deleteQuestion(q._id)}
              >
                🗑 Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
