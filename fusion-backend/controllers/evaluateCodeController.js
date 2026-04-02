import axios from "axios";
import CodingQuestion from "../models/CodingQuestion.js";
import Submission from "../models/Submission.js";

/* ------------------------------
   Normalize Output
------------------------------*/
const normalize = (str) => {
  if (!str) return "";
  return str
    .toString()
    .replace(/\n/g, " ") 
    .replace(/\r/g, "")
    .replace(/\n/g, "")
    .replace(/\t/g, "")
    .replace(/\u00A0/g, "")
    .replace(/\u200B/g, "")
    .replace(/\s+/g, " ")   // 🔥 remove extra spaces
    .trim();
};
/* -----------------------------------------
   Strip ONLY comments (safe for regex)
------------------------------------------*/
const stripComments = (src = "") =>
  src
    .replace(/\/\/.*$/gm, "") // single-line
    .replace(/\/\*[\s\S]*?\*\//g, ""); // block

/* -----------------------------------------
   Normalize code for accurate contains()
------------------------------------------*/
const normalizeForContains = (src = "") =>
  stripComments(src).toLowerCase().replace(/\s+/g, "");

/* ============================================================
   MAIN: Evaluate Code
============================================================ */
export const evaluateCode = async (req, res) => {
  try {
    const { code, language, questionId } = req.body;

    const question = await CodingQuestion.findById(questionId);
    if (!question)
      return res.json({ success: false, message: "Question not found" });

    let langId;
const lang = language.toLowerCase();

if (lang === "c") langId = 50;
else if (lang === "cpp") langId = 54;
else if (lang === "python") langId = 63;
else return res.json({ success: false, message: "Unsupported language" });
    let passed = 0;
    const total = question.testcases.length;
    const testcaseResults = [];

    /* ----------------------------------------------------------
       RUN TESTCASES
    ---------------------------------------------------------- */
    for (let tc of question.testcases) {
      const input = tc.input || "";
      const expected = (tc.expected || "")
  .toString()
  .replace(/\n/g, " ")
  .replace(/\r/g, "")
  .replace(/\s+/g, " ")
  .trim();

      const submitRes = await axios.post(
        "https://ce.judge0.com/submissions/?base64_encoded=true&wait=false",
        {
          source_code: Buffer.from(code).toString("base64"),
          language_id: langId,
          stdin: Buffer.from(input).toString("base64"),
        }
      );

      const token = submitRes.data.token;
      let result;

      while (true) {
        const poll = await axios.get(
          `https://ce.judge0.com/submissions/${token}?base64_encoded=true`
        );
        result = poll.data;

        if (result.status.id !== 1 && result.status.id !== 2) break;
        console.log("FULL RESULT:", result);
      }

      let rawOutput = "";

if (result.stdout) {
  rawOutput = Buffer.from(result.stdout, "base64").toString("utf8");
} else if (result.stderr) {
  rawOutput = Buffer.from(result.stderr, "base64").toString("utf8");
} else if (result.compile_output) {
  rawOutput = Buffer.from(result.compile_output, "base64").toString("utf8");
}

      const output = rawOutput;

// 🔥 FINAL FIX (newline + format safe)
const normalizeString = (str) =>
  str
    .toString()
    .replace(/\n/g, " ")
    .replace(/\r/g, "")
    .replace(/\s+/g, " ")
    .trim();

const cleanOutput = normalizeString(output);
const cleanExpected = normalizeString(expected);

// 🔥 FINAL HARD FIX (remove ALL hidden chars)
const finalOutput = cleanOutput.replace(/\s/g, "");
const finalExpected = cleanExpected.replace(/\s/g, "");

console.log("FINAL OUTPUT:", `"${finalOutput}"`);
console.log("FINAL EXPECTED:", `"${finalExpected}"`);

const isCorrect = finalOutput === finalExpected;

      if (isCorrect) passed++;

      testcaseResults.push({
        input,
        expected,
        got: output,
        status: isCorrect ? "Passed" : "Failed",
      });
    }

    /* ----------------------------------------------------------
       AUTO-GENERATE STEP IF MISSING
    ---------------------------------------------------------- */
    if (!question.evaluationSteps || question.evaluationSteps.length === 0) {
      question.evaluationSteps = [
        {
          type: "all-testcases-pass",
          label: "All Testcases Passed",
          marks: question.testcases.length,
        },
      ];
    }

    /* ----------------------------------------------------------
       FIXED: Better Code Normalization
    ---------------------------------------------------------- */
    const normalizedCode = normalizeForContains(code);
    const codeWithoutComments = stripComments(code);

    /* ----------------------------------------------------------
       STEP-BY-STEP EVALUATION (FIXED)
    ---------------------------------------------------------- */
    let totalMarks = 0;
    let maxMarks = 0;
    const stepResults = [];

    for (const step of question.evaluationSteps) {
      maxMarks += step.marks;
      let stepPassed = false;

      // 1) CONTAINS check using cleaned but reliable code
      if (step.type === "code-contains") {
        const val = normalizeForContains(step.value || "");
        stepPassed = normalizedCode.includes(val);
      }

      // 2) REGEX check on raw code without comments
      else if (step.type === "code-regex") {
        try {
          const regex = new RegExp(step.value, "mi");
          stepPassed = regex.test(codeWithoutComments);
        } catch (e) {
          console.error("Invalid regex:", step.value, e);
          stepPassed = false;
        }
      }

      // 3) All testcases passed
      else if (step.type === "all-testcases-pass") {
        stepPassed = Number(passed) === Number(total);
      }

      // 4) Minimum testcases passed
      else if (step.type === "min-testcases-pass") {
        stepPassed = Number(passed) >= Number(step.minPassed);
      }

      stepResults.push({
        label: step.label,
        marksAwarded: stepPassed ? step.marks : 0,
        marksTotal: step.marks,
        passed: stepPassed,
      });

      if (stepPassed) totalMarks += step.marks;
    }

    /* ----------------------------------------------------------
       FINAL RESULT
    ---------------------------------------------------------- */
    return res.json({
      success: true,
      testcasesPassed: passed,
      totalTestcases: total,
      results: testcaseResults,
      stepResults,
      totalMarks,
      maxMarks,
    });

  } catch (error) {
    console.error("❌ BACKEND ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/* ============================================================
   RUN SINGLE TESTCASE
============================================================ */
export const runSingleTestcase = async (code, language, input) => {
  try {
let langId;
const lang = (language || "").toString().toLowerCase();

if (lang === "c") langId = 50;
else if (lang === "cpp") langId = 54;
else if (lang === "python") langId = 63;
else throw new Error("Unsupported language");
    const submitRes = await axios.post(
      "https://ce.judge0.com/submissions/?base64_encoded=true&wait=false",
      {
        source_code: Buffer.from(code).toString("base64"),
        language_id: langId,
        stdin: Buffer.from(input).toString("base64"),
      }
    );

    const token = submitRes.data.token;
    let result;

    while (true) {
      const poll = await axios.get(
        `https://ce.judge0.com/submissions/${token}?base64_encoded=true`
      );
      result = poll.data;

      if (result.status.id !== 1 && result.status.id !== 2) break;
    }

    const output = result.stdout
      ? Buffer.from(result.stdout, "base64").toString("utf8").trim()
      : "";

    return output;

  } catch (err) {
    console.error("❌ runSingleTestcase Error:", err);
    return "";
  }
};

/* ============================================================
   SUBMIT CODE (FINAL)
============================================================ */
export const submitCode = async (req, res) => {
  try {
    const { code, language, questionId, userId } = req.body;

    const fakeReq = { body: { code, language, questionId } };
    const fakeRes = { json: (data) => data };

    const evaluation = await evaluateCode(fakeReq, fakeRes);

    const passed = evaluation.testcasesPassed;
    const total = evaluation.totalTestcases;

    const submission = await Submission.create({
  userId,
  questionId,
  code,
  language,
  passedCount: passed,
  totalCount: total,
  status: passed === total ? "Accepted" : "Wrong Answer",
  totalMarks: evaluation.totalMarks,
  maxMarks: evaluation.maxMarks,
  stepResults: evaluation.stepResults   // 🔥🔥 ADD THIS
});

    return res.json({
      success: true,
      submissionId: submission._id,
      status: submission.status,
      passed,
      total,
      totalMarks: evaluation.totalMarks,
      maxMarks: evaluation.maxMarks,
    });

  } catch (error) {
    console.error("❌ SUBMIT ERROR:", error);
    return res.status(500).json({ success: false, message: "Submit failed" });
  }
};
