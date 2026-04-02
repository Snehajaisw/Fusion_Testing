import Submission from "../models/Submission.js";
import CodingQuestion from "../models/CodingQuestion.js";

export const submitCode = async (req, res) => {
  try {
    const {
      
      code,
      language,
      questionId,
      assignmentId,   // ✅ ADD THIS
      testcasesPassed,
      totalTestcases
    } = req.body;
    const userId = req.user.id; 
    if (!userId || !questionId)
      return res.status(400).json({ success: false, message: "Missing data" });

    const question = await CodingQuestion.findById(questionId);
    if (!question)
      return res.status(404).json({ success: false, message: "Question not found" });

    const status =
      testcasesPassed === totalTestcases ? "Accepted" : "Wrong Answer";

    // ✅ STEP EVALUATION START
    let stepResults = [];
let totalMarks = 0;

const allTestCasesPassed = testcasesPassed === totalTestcases;

if (question.steps && question.steps.length > 0) {
  question.steps.forEach((step) => {
    let passed = false;

    if (step.type === "Code contains substring") {
      passed = code.includes(step.value);
    }

    if (step.type === "Code matches regex") {
      const regex = new RegExp(step.value);
      passed = regex.test(code);
    }

    if (step.type === "All testcases pass") {
      passed = allTestCasesPassed;
    }

    const marksAwarded = passed ? step.marks : 0;
    totalMarks += marksAwarded;

    stepResults.push({
      label: step.label,
      passed,
      marksAwarded,
      maxMarks: step.marks
    });
  });
}

const maxMarks = question.steps
  ? question.steps.reduce((sum, step) => sum + step.marks, 0)
  : 0;

    // ✅ SAVE EVERYTHING
    const submission = await Submission.create({
      userId,
      questionId,
      code,
      language,
      status,
      passed: testcasesPassed,
      total: totalTestcases,
      assignmentId,

      totalMarks,
      maxMarks,
      stepResults   // 🔥 THIS WAS MISSING
    });

    return res.json({
      success: true,
      submissionId: submission._id,
      status,
      totalMarks,
      maxMarks,
      stepResults   // 🔥 send to frontend
    });

  } catch (err) {
    console.error("❌ Submit Error:", err);
    return res.status(500).json({ success: false, message: "Submit failed" });
  }
};
export const getSubmissionById = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: "Submission not found"
      });
    }

    console.log("DB SUBMISSION:", submission); // 🔥 debug

    res.json({
      success: true,
      submission
    });

  } catch (err) {
    console.error("GET SUBMISSION ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};