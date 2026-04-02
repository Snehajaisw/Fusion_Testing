import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Editor from "@monaco-editor/react";
import "./PageStyles.css";

export default function CUnit2CodingQuestion() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState(null);
  const [code, setCode] = useState(`#include <stdio.h>

int main() {
    // Write your C code here
    return 0;
}`);

  useEffect(() => {
    axios
      .get(`https://fusion0-1.onrender.com/api/coding/question/${id}`)
      .then((res) => setQuestion(res.data.question))
      .catch((err) => console.error(err));
  }, [id]);

  const runCode = async () => {
    try {
      const res = await axios.post("https://fusion0-1.onrender.com/api/coding/run", {
        code,
        language: "c",
        testcases: question.testcases,
      });

      alert("OUTPUT:\n" + res.data.output.join("\n"));
    } catch (err) {
      alert("Error running code!");
    }
  };

  if (!question) return <h2>Loading...</h2>;

  return (
    <div className="coding-question-container">
      <div className="left-section">
        <h1>{question.title}</h1>
        <p>{question.description}</p>

        <h3>📘 Testcases</h3>

        {question.testcases.map((tc, idx) => (
          <div key={idx} className="testcase-box">
            <p><b>Input:</b> {tc.input}</p>
            <p><b>Expected Output:</b> {tc.expected}</p>
          </div>
        ))}

        <button className="back-btn" onClick={() => navigate("/learn-c/unit2/coding")}>
          ⬅ Back
        </button>
      </div>

      <div className="right-section">
        <Editor
          height="380px"
          language="c"
          value={code}
          onChange={(value) => setCode(value)}
        />

        <button className="run-btn" onClick={runCode}>▶ Run Code</button>
      </div>
    </div>
  );
}
