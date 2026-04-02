import express from "express";
import {
  addCodingQuestion,
  getCodingQuestions,
  deleteCodingQuestion,
  evaluateCode,
  getAllCodingResults,
       
   updateCodingQuestion          // ✅ ADDED
} from "../controllers/codingController.js";
import { submitCode } from "../controllers/evaluateCodeController.js";

import { getLeaderboard } from "../controllers/leaderboardController.js";
import { getSubmissionById } from "../controllers/submitCodeController.js";


const router = express.Router();

// -------------------------------------------------
// ➕ Add GLOBAL coding practice question (Teacher)
// -------------------------------------------------
router.post("/add", addCodingQuestion);

// -------------------------------------------------
// 📥 Get GLOBAL coding practice questions (Student)
// Example: /api/coding/practice?language=c
// -------------------------------------------------
router.get("/practice", getCodingQuestions);

// -------------------------------------------------
// 📄 Get single submission (IMPORTANT 🔥)
// -------------------------------------------------
router.get("/submission/:id", getSubmissionById);
// -------------------------------------------------
// ❌ Delete coding question
// -------------------------------------------------
router.delete("/delete/:id", deleteCodingQuestion);

// -------------------------------------------------
// ▶ Run / evaluate code (no DB save)
// -------------------------------------------------
router.post("/run", evaluateCode);

// -------------------------------------------------
// 📤 Submit coding result (save to DB)
// -------------------------------------------------
router.post("/submit", submitCode);

// -------------------------------------------------
// 🏆 Leaderboard
// -------------------------------------------------
router.get("/leaderboard", getLeaderboard);

// -------------------------------------------------
// 📊 Teacher – Get all students coding results
// -------------------------------------------------
router.get("/results", getAllCodingResults);
router.put("/update/:id", updateCodingQuestion);

export default router;
