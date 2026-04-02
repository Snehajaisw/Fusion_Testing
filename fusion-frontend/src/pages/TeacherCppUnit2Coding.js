import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PageStyles.css";

export default function TeacherUnit2Coding() {

  // 🔹 Title + Description
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");

  // 🔹 Multiple Testcases
  const [testcases, setTestcases] = useState([
    { input: "", output: "", visible: true },
  ]);

  // 🔹 Step-by-step evaluation rules
  const [steps, setSteps] = useState([]);

  const [allQuestions, setAllQuestions] = useState([]);

  // ============================
  // 🔥 FETCH ALL QUESTIONS
  // ============================
  const fetchQuestions = async () => {
    try {
      const res = await axios.get(
  "https://fusion0-1.onrender.com/api/coding/practice",
  { params: { language: "c" } }
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
  // 🔥 ADD QUESTION
  // ============================
  const handleSubmit = async () => {

    if (!title || !question) {
      return alert("Please enter title and question description!");
    }

    for (let tc of testcases) {
      if (!tc.input || !tc.output) {
        return alert("Please fill all testcase fields!");
      }
    }

    for (let s of steps) {
      if (!s.label || !s.type) {
        return alert("Please fill all evaluation step fields.");
      }
      if (!s.marks || Number(s.marks) <= 0) {
        return alert("Marks should be greater than 0");
      }
    }

    try {
      await axios.post("https://fusion0-1.onrender.com/api/coding/add", {

        

        // 🔹 Correct Title + Description
        title: title,
        description: question,

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
            s.type === "all-testcases-pass"
              ? undefined
              : (s.value || ""),
          minPassed:
            s.type === "min-testcases-pass"
              ? Number(s.minPassed || 0)
              : undefined,
          marks: Number(s.marks || 0),
        })),
      });

      alert("✅ Coding Question Added!");

      setTitle("");
      setQuestion("");
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
      await axios.delete(
        `https://fusion0-1.onrender.com/api/coding/delete/${id}`
      );

      fetchQuestions();

      alert("Question deleted!");

    } catch (err) {
      console.error("Delete error:", err);
      alert("Error deleting question");
    }
  };

  return (
    <div className="learn-container">

      <h1 className="learn-title">
        💻 Add Coding Practice Question (Unit 2)
      </h1>

      {/* ---------- TITLE ---------- */}
      <input
        className="clean-input"
        value={title}
        placeholder="Enter Question Title..."
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* ---------- DESCRIPTION ---------- */}
      <textarea
        className="clean-input"
        value={question}
        placeholder="Enter full coding question description..."
        onChange={(e) => setQuestion(e.target.value)}
      />

      {/* ---------- TESTCASES ---------- */}
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
            />
            Visible to Students
          </label>

        </div>
      ))}

      <button className="view-btn" onClick={addMoreTestcase}>
        ➕ Add More Testcase
      </button>

      {/* ---------- STEP RULES ---------- */}
      <h3 style={{ marginTop: "30px" }}>
        🧩 Step-by-Step Evaluation Rules
      </h3>

      {steps.map((step, index) => (
        <div key={index} className="tc-box">

          <input
            className="clean-input"
            placeholder="Step Label"
            value={step.label}
            onChange={(e) =>
              updateStepField(index, "label", e.target.value)
            }
          />

          <select
         

            className="clean-input"
            value={step.type}
            onChange={(e) =>
              updateStepField(index, "type", e.target.value)
            }
          >
            <option value="code-contains">
              Code contains substring
            </option>
            <option value="code-regex">
              Code matches regex
            </option>
            <option value="all-testcases-pass">
              All testcases pass
            </option>
            <option value="min-testcases-pass">
              Minimum testcases passed
            </option>
          </select>
          {(step.type === "code-contains" || step.type === "code-regex") && (
  <input
    className="clean-input"
    placeholder='e.g. "scanf" or "%"'
    value={step.value || ""}
    onChange={(e) =>
      updateStepField(index, "value", e.target.value)
    }
  />
)}

{/* MIN TESTCASE FIELD */}
{step.type === "min-testcases-pass" && (
  <input
    className="clean-input"
    type="number"
    placeholder="Minimum testcases required"
    value={step.minPassed || ""}
    onChange={(e) =>
      updateStepField(index, "minPassed", e.target.value)
    }
  />
)}
          

          <input
            className="clean-input"
            type="number"
            value={step.marks}
            onChange={(e) =>
              updateStepField(index, "marks", e.target.value)
            }
          />

          <button
            className="back-btn"
            onClick={() => removeStep(index)}
          >
            🗑 Remove Step
          </button>

        </div>
      ))}

      <button className="view-btn" onClick={addStep}>
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

      {/* ---------- ALL QUESTIONS ---------- */}
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
