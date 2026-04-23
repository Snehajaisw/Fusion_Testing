import express from "express";
import {
  createAssignment,
  getAssignment,        // Student fetch (with ?unit= )
  getAllAssignments,    // Teacher fetch all
  deleteAssignment,
  savePerformance,
  getAllPerformances,
  getAssignmentsByUnit,
   verifyPasskey   // Teacher fetch by unit
} from "../controllers/assignmentController.js";

import Performance from "../models/Performance.js";
import Assignment from "../models/Assignment.js";

const router = express.Router();

/* -------------------------------------------------------------------------- */
/* 🧩 TEACHER ROUTES */
/* -------------------------------------------------------------------------- */

/* ➕ Create a new assignment */
router.post("/create", createAssignment);
router.post("/verify-passkey", verifyPasskey);
/* 📘 Get all assignments (Teacher panel) */
router.get("/all", getAllAssignments);

/* 🔍 Teacher: Get assignments by UNIT */
router.get("/unit/:unit", getAssignmentsByUnit);
router.get("/student", getAssignment);

/* 🧠 Save student performance */
router.post("/performance", savePerformance);

/* 📊 Get all performances */
router.get("/performance", getAllPerformances);



/* 🗑 Delete an assignment */
router.delete("/:id", deleteAssignment);

router.get("/:id", async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: "Assignment not found",
      });
    }

    res.status(200).json(assignment);
  } catch (error) {
    console.error("Error fetching assignment:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});



/* -------------------------------------------------------------------------- */
/* 👩‍🎓 STUDENT ROUTES */
/* -------------------------------------------------------------------------- */

/*
  📋 Student fetch assignments  
  correct endpoint the frontend MUST call:
  GET https://fusion-testingphase1.onrender.com/api/assignments/student?unit=3
*/




/* -------------------------------------------------------------------------- */
/* ⭐ Check if student already attempted */
/* -------------------------------------------------------------------------- */
router.post("/check", async (req, res) => {
  try {
    const { rollNumber, unit } = req.body;

    if (!rollNumber || !unit) {
      return res.status(400).json({
        attempted: false,
        message: "Missing roll number or unit",
      });
    }

    const attempt = await Performance.findOne({ rollNumber, unit });

    if (attempt) {
      return res.json({ attempted: true });
    }

    return res.json({ attempted: false });

  } catch (error) {
    console.error("🔥 Error checking performance:", error);
    return res.status(500).json({
      attempted: false,
      error: error.message,
    });
  }
});



export default router;
