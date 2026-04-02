import React, { useEffect, useState , useMemo } from "react";
import axios from "axios";
import Editor from "@monaco-editor/react";

import "./PageStyles.css";

export default function CUnit1Coding() {
  const [questions, setQuestions] = useState([]);
  const [selected, setSelected] = useState(null);

  const [language, setLanguage] = useState("c");
  const [code, setCode] = useState("// Write your C / C++ code here...");
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
}`,
  python: `# Write your Python code here

def main():
    pass

if __name__ == "__main__":
    main()
`
}), []);

  const getStorageKey = (qId, lang) => `fusion_code_${qId}_${lang}`;

  useEffect(() => {
    if (selected) {
      const saved = localStorage.getItem(getStorageKey(selected._id, language));
      if (saved) setCode(saved);
      else setCode(templates[language]);
    }
  }, [selected, language, templates]);

  const handleCodeChange = (value) => {
    const updated = value || "";
    setCode(updated);
    if (selected) {
      localStorage.setItem(getStorageKey(selected._id, language), updated);
    }
  };

  // 🔥 Fetch coding questions
  useEffect(() => {
  axios
    .get(`https://fusion0-1.onrender.com/api/coding/practice?language=${language}`)
    .then((res) => setQuestions(res.data.questions || []))
    .catch(console.error);
}, [language]);


  // -------------------- RUN CODE --------------------
  const runCode = async () => {
  if (!selected) {
    alert("Select a question first!");
    return;
  }

  try {
    setIsRunning(true);
    setCanSubmit(false);

    const res = await axios.post("https://fusion-backend-testing.onrender.com/api/coding/run", {
      code,
      language,
      questionId: selected._id,
    });

    console.log("FULL RESPONSE:", res);

    // ✅ Safety check
    if (!res || !res.data) {
      alert("No response from server");
      return;
    }

    setResult(res.data);

    const allPassed =
      res.data.testcasesPassed === res.data.totalTestcases;

    setCanSubmit(allPassed);

  } catch (err) {
    console.error("Run error:", err);
    alert("Run failed (check backend)");
  } finally {
    setIsRunning(false);
  }
};
  // -------------------- SUBMIT CODE --------------------
  const handleSubmit = async () => {
    if (!selected) {
      alert("Select a question first!");
      return;
    }

    if (!result) {
      alert("Run your code at least once before submitting.");
      return;
    }

    if (!canSubmit) {
      alert("You can submit only when all testcases pass.");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        code,
        language,
        questionId: selected._id,
userId: localStorage.getItem("userId") || "guest_user",
        // ✅ corrected keys for backend
        passed: result.testcasesPassed,
total: result.totalTestcases,


        totalMarks: result.totalMarks,
        maxMarks: result.maxMarks,
      };

const res = await axios.post("https://fusion-backend-testing.onrender.com/api/code/submit", payload);
      if (res.data && res.data.success) {
        alert("✅ Accepted! All testcases passed.");

        if (res.data.submissionId) {
          window.location.href = `/submission/${res.data.submissionId}`;
        }
      } else {
        alert(res.data?.message || "❌ Submit failed on server.");
      }
    } catch (err) {
      console.error("Submit error:", err);
      alert("Submit failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    alert("Code copied!");
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
    if (selected) {
      localStorage.setItem(
        getStorageKey(selected._id, language),
        templates[language]
      );
    }
  };

  return (
    <div className="coding-container">
      {!selected && (
        <div className="question-list">
          <h1 className="learn-title">💻 Coding Practice — C</h1>

          {questions.map((q, index) => (
            <div
              key={q._id}
              className="question-card"
              onClick={() => {
                setSelected(q);
                setLanguage(q.language || "c");
                setResult(null);
                setCanSubmit(false);
              }}
              style={{ display: "flex", alignItems: "center", gap: "16px" }}
            >
              <div
                style={{
                  minWidth: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #38bdf8, #06b6d4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "700",
                  color: "#021526",
                  fontSize: "16px",
                  boxShadow: "0 0 12px rgba(56,189,248,0.6)",
                }}
              >
                {index + 1}
              </div>

              <h3 style={{ margin: 0 }}>{q.title}</h3>
            </div>
          ))}
        </div>
      )}

      {selected && (
        <div className="leetcode-layout">
          {/* LEFT PANEL */}
          <div className="left-panel">
            <h2>{selected.title}</h2>
            <p className="question-desc">{selected.description}</p>

            <h3>🧪 Testcases</h3>

            {selected.testcases?.map((tc, idx) => (
              <div key={idx} className="sample-box">
                <p>
                  <b>Testcase {idx + 1}</b>
                </p>
                <p>
                  <b>Input:</b> {tc.input}
                </p>
                <p>
                  <b>Expected Output:</b> {tc.expected}
                </p>
              </div>
            ))}
          </div>

          {/* RIGHT PANEL */}
          <div className="right-panel">
            <div className="language-row">
              <select
                className="language-select"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="c">C</option>
                <option value="cpp">C++</option>
                <option value="python">Python</option>
              </select>

              <button className="editor-action-btn" onClick={resetTemplate}>
                Reset
              </button>
              <button className="editor-action-btn" onClick={copyCode}>
                Copy
              </button>
              <button className="editor-action-btn" onClick={downloadCode}>
                Download
              </button>
            </div>

            <div style={{ height: "420px", maxHeight: "420px" }}>
             <Editor
  height="100%"
  theme="vs-dark"
  language={
    language === "cpp"
      ? "cpp"
      : language === "c"
      ? "c"
      : "python"
  }
  value={code}
  onChange={handleCodeChange}
/>
</div>
            <div className="editor-buttons">
              <button
                className="run-btn"
                onClick={runCode}
                disabled={isRunning}
              >
                {isRunning ? "Running..." : "▶ Run Code"}
              </button>

              <button
                className={
                  canSubmit ? "submit-btn enabled" : "submit-btn disabled"
                }
                onClick={handleSubmit}
                disabled={!canSubmit || isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>

              <button
                className="back-btn"
                onClick={() => {
                  setSelected(null);
                  setResult(null);
                  setCanSubmit(false);
                }}
              >
                ⬅ Back
              </button>
            </div>

            {result && (
              <div className="results-box">
                <h3>Results</h3>
                <p>
   Passed: {result.testcasesPassed} / {result.totalTestcases}
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
