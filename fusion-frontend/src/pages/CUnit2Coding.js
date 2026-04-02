import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import Editor from "@monaco-editor/react";
import "./PageStyles.css";

export default function CUnit2Coding() {
  const [questions, setQuestions] = useState([]);
  const [selected, setSelected] = useState(null);

  const [language, setLanguage] = useState("c");
  const [code, setCode] = useState("");

  const [result, setResult] = useState(null);

  const [canSubmit, setCanSubmit] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const templates = useMemo(() => ({
  c: `#include <stdio.h>

int main() {
    // Write your C code here
    return 0;
}`,
  cpp: `#include <iostream>
using namespace std;

int main() {
    // Write your C++ code here
    return 0;
}`
}), []);


  const getStorageKey = (qId, lang) => `fusion_code_unit2_${qId}_${lang}`;

  // 🔥 Fetch coding questions for C – Unit 2
  // 🔥 Fetch GLOBAL coding questions (C language)
useEffect(() => {
  axios
    .get("https://fusion0-1.onrender.com/api/coding/practice", {
      params: { language: "c" },
    })
    .then((res) => {
      console.log("CODING QUESTIONS:", res.data.questions);
      setQuestions(res.data.questions);
    })
    .catch((err) => {
      console.error("CODING FETCH ERROR:", err);
    });
}, []);



  useEffect(() => {
    if (selected) {
      const saved = localStorage.getItem(
        getStorageKey(selected._id, language)
      );

      if (saved) setCode(saved);
      else setCode(templates[language]);

      setResult(null);
      setCanSubmit(false);
    }
    // eslint-disable-next-line
  }, [selected, language, templates]);

  const handleCodeChange = (val) => {
    setCode(val);
    if (selected)
      localStorage.setItem(
        getStorageKey(selected._id, language),
        val
      );
  };

  // -------------------- RUN CODE --------------------
  const runCode = async () => {
    if (!selected) {
      alert("Select a question first!");
      return;
    }

    try {
      setIsRunning(true);
      setCanSubmit(false);

      const res = await axios.post("https://fusion0-1.onrender.com/api/code/run", {
        code,
        language,
        questionId: selected._id,
      });

      setResult(res.data);

      if (
        res.data.success &&
        res.data.testcasesPassed === res.data.totalTestcases
      ) {
        setCanSubmit(true);
      }
    } catch (err) {
      console.error(err);
      alert("Run error");
    } finally {
      setIsRunning(false);
    }
  };

  // -------------------- SUBMIT CODE --------------------
  const handleSubmit = async () => {
    if (!selected) return alert("Select a question first!");
    if (!result) return alert("Run your code first!");
    if (!canSubmit) return alert("Submit only after all testcases pass!");

    try {
      setIsSubmitting(true);

      const payload = {
        code,
        language,
        questionId: selected._id,
        userId: localStorage.getItem("userId") || "dummyUser",
        testcasesPassed: result.testcasesPassed,
        totalTestcases: result.totalTestcases,
      };

      const res = await axios.post(
        "https://fusion0-1.onrender.com/api/code/submit",
        payload
      );

      if (res.data.success) {
        alert("✅ Accepted!");

        if (res.data.submissionId)
          window.location.href = `/submission/${res.data.submissionId}`;
      } else {
        alert(res.data.message || "Submit failed");
      }
    } catch (err) {
      console.error(err);
      alert("Submit failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    alert("Copied!");
  };

  const downloadCode = () => {
    const blob = new Blob([code], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = `solution.${language === "c" ? "c" : "cpp"}`;
    a.click();
  };

  const resetTemplate = () => {
    setCode(templates[language]);
  };

  return (
    <div className="coding-container">
      {!selected && (
        <div className="question-list">
          <h1 className="learn-title">💻 Coding Practice — C Unit 2</h1>

          {questions.map((q) => (
            <div
              key={q._id}
              className="question-card"
              onClick={() => {
                setSelected(q);
                setLanguage(q.language || "c");
                setResult(null);
                setCanSubmit(false);
              }}
            >
              <h3>{q.title}</h3>
              <p>{q.description.substring(0, 100)}...</p>
            </div>
          ))}
        </div>
      )}

      {selected && (
        <div className="leetcode-layout">
          {/* LEFT SIDE */}
          <div className="left-panel">
            <h2>{selected.title}</h2>
            <p className="question-desc">{selected.description}</p>

            <h3>🧪 Testcases</h3>
            {selected.testcases?.map((tc, i) => (
              <div key={i} className="sample-box">
                <p>
                  <b>Testcase {i + 1}</b>
                </p>
                <p>Input: {tc.input}</p>
                <p>Expected: {tc.expected}</p>
              </div>
            ))}
          </div>

          {/* RIGHT SIDE */}
          <div className="right-panel">
            <div className="editor-top-row">
              <select
                className="language-select"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="c">C</option>
                <option value="cpp">C++</option>
              </select>

              <button className="editor-utility-btn" onClick={resetTemplate}>
                Reset
              </button>
              <button className="editor-utility-btn" onClick={copyCode}>
                Copy
              </button>
              <button className="editor-utility-btn" onClick={downloadCode}>
                Download
              </button>
            </div>

            <div style={{ height: "420px" }}>
              <Editor
                height="100%"
                theme="vs-dark"
                language={language}
                value={code}
                onChange={handleCodeChange}
              />
            </div>

            <div className="editor-buttons">
              <button className="run-btn" onClick={runCode} disabled={isRunning}>
                {isRunning ? "Running..." : "▶ Run Code"}
              </button>

              <button
                className={
                  canSubmit ? "submit-btn enabled" : "submit-btn disabled"
                }
                disabled={!canSubmit || isSubmitting}
                onClick={handleSubmit}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>

              <button
                className="back-btn"
                onClick={() => {
                  setSelected(null);
                  setResult(null);
                }}
              >
                ⬅ Back
              </button>
            </div>

            {result && (
              <div className="results-box">
                <h3>Results</h3>
                <p>
                  Passed: {result.testcasesPassed}/{result.totalTestcases}
                </p>

                {result.results?.map((r, i) => (
                  <div key={i} className="testcase-card">
                    <p>
                      <b>Testcase {i + 1}</b>
                    </p>
                    <p>Input: {r.input}</p>
                    <p>Expected: {r.expected}</p>
                    <p>Got: {r.got}</p>
                    <p>Status: {r.status}</p>
                  </div>
                ))}

                {result.stepResults && (
                  <div style={{ marginTop: "20px" }}>
                    <h3>Step-by-Step Evaluation</h3>

                    <table className="result-table">
                      <thead>
                        <tr>
                          <th>Step</th>
                          <th>Marks</th>
                          <th>Status</th>
                        </tr>
                      </thead>

                      <tbody>
                        {result.stepResults.map((s, index) => (
                          <tr key={index}>
                            <td>{s.label}</td>
                            <td>
                              {s.marksAwarded}/{s.marksTotal}
                            </td>
                            <td>
                              <span
                                className={
                                  s.passed ? "badge-pass" : "badge-fail"
                                }
                              >
                                {s.passed ? "Passed" : "Failed"}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <div className="final-score-box">
                      Final Score: {result.totalMarks} / {result.maxMarks}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
