import CodingQuestion from "../models/CodingQuestion.js";
import axios from "axios";
import Submission from "../models/Submission.js";

import User from "../models/user.js";

/* 1️⃣ ADD CODING PRACTICE QUESTION */
export const addCodingQuestion = async (req, res) => {
  try {
    const { title, description, language, testcases, evaluationSteps } = req.body;

    if (!title || !description || !language) {
      return res.status(400).json({
        success: false,
        message: "title, description and language are required",
      });
    }

    const cleanedTestcases = (testcases || []).map((tc) => ({
      input: tc.input || "",
      expected: tc.expectedOutput || tc.expected || "",
    }));

    const cleanedSteps = (evaluationSteps || []).map((s, index) => ({
      stepId: s.stepId || `step_${index}`,
      label: s.label,
      type: s.type,
      value: s.type === "all-testcases-pass" ? undefined : s.value || "",
      minPassed:
        s.type === "min-testcases-pass" ? Number(s.minPassed || 0) : undefined,
      marks: Number(s.marks || 0),
    }));

    const newQ = new CodingQuestion({
      title,
      description,
      language,
      category: "practice",
      testcases: cleanedTestcases,
      evaluationSteps: cleanedSteps,
    });

    await newQ.save();
    res.json({ success: true, message: "Practice question saved successfully!" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

/* 2️⃣ GET QUESTIONS */
export const getCodingQuestions = async (req, res) => {
  try {
    const { language } = req.query;

    const questions = await CodingQuestion.find({
      language,
      category: "practice",
    }).sort({ createdAt: -1 });

    res.json({ success: true, questions });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

/* 3️⃣ DELETE QUESTION */
export const deleteCodingQuestion = async (req, res) => {
  try {
    await CodingQuestion.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

/* 4️⃣ EVALUATE CODE */
export const evaluateCode = async (req, res) => {
  try {
    console.log("🔥 evaluateCode API HIT");
    const { code, language, questionId } = req.body;

    let langId;

    if (language === "c") {
      langId = 50;
    } 
    else if (language === "cpp") {
      langId = 54;
    } 
    else if (language === "python") {
      langId = 71;
    } 
    else {
      return res.json({ success: false, message: "Unsupported language" });
    }

    const question = await CodingQuestion.findById(questionId);
    if (!question) return res.json({ success: false });

    let passed = 0;
    let total = question.testcases.length;
    let results = [];

    for (let tc of question.testcases) {
      const submit = await axios.post(
        "https://ce.judge0.com/submissions/?base64_encoded=true&wait=false",
        {
          source_code: Buffer.from(code).toString("base64"),
          language_id: langId,
          stdin: Buffer.from(tc.input).toString("base64"),
        }
      );

      const token = submit.data.token;
      let outputData;

      while (true) {
        const poll = await axios.get(
          `https://ce.judge0.com/submissions/${token}?base64_encoded=true`
        );
        outputData = poll.data;
        if (outputData.status.id > 2) break;
      }
      console.log("Language:", language);
      console.log("LangId:", langId);
      console.log("Judge0 Status:", outputData.status);
      console.log("Stdout:", outputData.stdout);
      console.log("Stderr:", outputData.stderr);

      const output = outputData.stdout
        ? Buffer.from(outputData.stdout, "base64").toString().trim().toLowerCase()
        : "";

      const expected = tc.expected.trim().toLowerCase();
      const correct = output === expected;

      if (correct) passed++;

      results.push({
        input: tc.input,
        expected,
        got: output,
        status: correct ? "Passed" : "Failed",
      });
    }

// ✅ STEP EVALUATION ADD (PASTE HERE)
let stepResults = [];
let totalMarks = 0;

const allPassed = passed === total;

if (question.evaluationSteps && question.evaluationSteps.length > 0) {
  question.evaluationSteps.forEach((step) => {
    let isPassed = false;

    if (step.type === "Code contains substring") {
      isPassed = code.includes(step.value);
    }

    if (step.type === "Code matches regex") {
      const regex = new RegExp(step.value);
      isPassed = regex.test(code);
    }

    if (step.type === "all-testcases-pass") {
      isPassed = allPassed;
    }

    const marksAwarded = isPassed ? step.marks : 0;
    totalMarks += marksAwarded;

    stepResults.push({
      label: step.label,
      passed: isPassed,
      marksAwarded,
      marksTotal: step.marks
    });
  });
}

res.json({
  success: true,
  testcasesPassed: passed,
  totalTestcases: total,
  results,
  stepResults,   // 🔥 ADD
  totalMarks     // 🔥 ADD
});
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
/* 5️⃣ TEACHER RESULTS */
export const updateCodingQuestion = async (req, res) => {
  try {

    await CodingQuestion.findByIdAndUpdate(
      req.params.id,
      req.body
    );

    res.json({ success: true });

  } catch (err) {
    res.status(500).json({ success: false });
  }
};
export const getAllCodingResults = async (req, res) => {
  try {
    const results = await Submission.find()
      .populate("userId", "name email")
      .populate("questionId", "title")
      .sort({ createdAt: -1 });

    res.json({ success: true, results });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};


