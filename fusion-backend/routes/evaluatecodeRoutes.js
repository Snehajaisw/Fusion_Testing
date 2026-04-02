import express from "express";
import { evaluateCode, runSingleTestcase  , submitCode} from "../controllers/evaluateCodeController.js";
import Submission from "../models/Submission.js";
import CodingQuestion from "../models/CodingQuestion.js";
import { getLeaderboard } from "../controllers/leaderboardController.js";

const router = express.Router();

/* ---------- RUN CODE (already used by Run button) ---------- */
router.post("/run", evaluateCode);
router.get("/leaderboard", getLeaderboard);
router.post("/submit", submitCode);

/* ---------- SUBMIT CODE (called on Submit click) ---------- */
router.post("/submit", async (req, res) => {
  try {
    const { code, language, questionId, userId } = req.body;

    const question = await CodingQuestion.findById(questionId);
    if (!question) {
      return res.json({ success: false, message: "Question not found" });
    }

    let passed = 0;
    const total = question.testcases.length;

    for (let tc of question.testcases) {
      const input = tc.input || tc.sampleInput || "";
      const expected = (tc.expected || tc.sampleOutput || "").toString().trim();

      const output = await runSingleTestcase(code, language, input);
      output = output
  ? Buffer.from(output, "base64").toString("utf-8")
  : "";

output = output.trim();

      if (output.trim() === expected.trim()) passed++;
    }

    const status = passed === total ? "Accepted" : "Wrong Answer";

    const submission = await Submission.create({
      userId,
      questionId,
      code,
      language,
      status,
      passed,
      total,
      runtime: "4ms",
      memory: "14MB",
    });

    return res.json({
      success: true,
      submissionId: submission._id,
      status,
      passed,
      total,
      runtime: submission.runtime,
      memory: submission.memory,
    });
  } catch (err) {
    console.error("SUBMIT ERROR:", err);
    return res.json({ success: false, message: "Submit failed" });
  }
});

/* ---------- SINGLE SUBMISSION (result page) ---------- */
router.get("/submission/:id", async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);
    if (!submission) {
      return res.json({ success: false, message: "Submission not found" });
    }
    return res.json({ success: true, submission });
  } catch (err) {
    console.error("GET SUBMISSION ERROR:", err);
    return res.json({ success: false, message: "Error fetching submission" });
  }
});

/* ---------- SUBMISSION HISTORY FOR A USER ---------- */
router.get("/submissions/user/:userId", async (req, res) => {
  try {
    const submissions = await Submission.find({ userId: req.params.userId })
      .sort({ createdAt: -1 });

    return res.json({ success: true, submissions });
  } catch (err) {
    console.error("GET USER SUBMISSIONS ERROR:", err);
    return res.json({ success: false, message: "Error fetching submissions" });
  }
});

export default router;
