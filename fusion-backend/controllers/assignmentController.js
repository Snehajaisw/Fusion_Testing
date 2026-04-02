import Assignment from "../models/Assignment.js";
import Performance from "../models/Performance.js";

/* ================================================================
   🧩 TEACHER: CREATE ASSIGNMENT
================================================================ */
import User from "../models/user.js";

export const createAssignment = async (req, res) => {
  try {
    const { unit, subject, title, description, questions, deadline, teacherId, section } = req.body;

    if (!title || !unit  || !section)
      return res.status(400).json({
        success: false,
        message: "Unit, subject, title and section are required!",
      });

    if (!deadline)
      return res.status(400).json({
        success: false,
        message: "Deadline is required!",
      });

    if (!questions || !questions.length)
      return res.status(400).json({
        success: false,
        message: "Questions are missing!",
      });

    // ✅ Verify teacher is allowed for this section
    const teacher = await User.findById(teacherId);

    if (!teacher || !teacher.sections.includes(section)) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to create quiz for this section",
      });
    }

    const formattedQuestions = questions.map((q) => ({
      questionText: q.questionText || "",
      options: q.options || [],
      correctAnswer: q.correctAnswer || "",
    }));

    const newAssignment = new Assignment({
      unit: Number(unit),
      title,
      description: description || "",
      deadline: new Date(deadline),
      questions: formattedQuestions,

      // ⭐ MOST IMPORTANT
      section: section.toUpperCase().trim(),
      createdBy: teacherId,

      createdAt: new Date(),
    });

    await newAssignment.save();

    res.status(201).json({
      success: true,
      message: "Assignment created successfully!",
    });

  } catch (error) {
    console.error("❌ Error creating assignment:", error);
    res.status(500).json({
      success: false,
      message: "Error creating assignment",
      error: error.message,
    });
  }
};

/* ================================================================
   👩‍🏫 TEACHER: GET ALL ASSIGNMENTS (FILTERABLE)
================================================================ */
export const getAllAssignments = async (req, res) => {
  try {
    const { unit, section } = req.query;

    const filter = {};
    if (unit) filter.unit = Number(unit);
    if (section) filter.section = section;
    

    const assignments = await Assignment.find(filter).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      assignments,
    });
  } catch (error) {
    console.error("❌ Error fetching assignments:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching assignments",
      error: error.message,
    });
  }
};

/* ================================================================
   👩‍🏫 TEACHER: GET ASSIGNMENTS BY UNIT + SUBJECT
================================================================ */
export const getAssignmentsByUnit = async (req, res) => {
  try {
    const unit = Number(req.params.unit);

    if (isNaN(unit)) {
      return res.status(400).json({
        success: false,
        message: "Invalid unit number",
      });
    }

    const assignments = await Assignment.find({
      unit,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      assignments,
    });

  } catch (error) {
    console.error("❌ Error fetching assignments by unit:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching assignments",
      error: error.message,
    });
  }
};
/* ================================================================
   👩‍🎓 STUDENT: GET ASSIGNMENTS (UNIT + SUBJECT)
================================================================ */
export const getAssignment = async (req, res) => {
  try {
    const { unit, rollNumber } = req.query;

    if (!rollNumber) {
      return res.status(400).json({
        success: false,
        message: "Roll number required",
      });
    }

    const numericUnit = Number(unit);

    // ✅ VERY IMPORTANT
    const student = await User.findOne({
      rollNumber: rollNumber.trim()
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    console.log("Student section:", student.section);

    const assignments = await Assignment.find({
      unit: numericUnit,
      section: { 
  $regex: new RegExp(`^${student.section.trim()}$`, "i") 
}
    });

    console.log("Assignments:", assignments);

    res.status(200).json({
      success: true,
      assignments,
    });

  } catch (error) {
    console.error("❌ Error in getAssignment:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching assignments",
      error: error.message,
    });
  }
};

/* ================================================================
   🧠 STUDENT: SAVE PERFORMANCE (UNIT + SUBJECT SAFE)
================================================================ */
export const savePerformance = async (req, res) => {
  try {
    const { studentName, rollNumber, answers, unit,  } = req.body;
    const numericUnit = Number(unit);

    // ✅ Get student section
    const student = await User.findOne({ rollNumber });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    // ✅ Find assignment ONLY of that section
    const assignment = await Assignment.findOne({
      unit: numericUnit,
      section: student.section,   // ⭐ LOCK
    });

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: "No assignment found for your section",
      });
    }

    const alreadyAttempted = await Performance.findOne({
      rollNumber,
      unit: numericUnit,
    
    });

    if (alreadyAttempted)
      return res.status(400).json({
        success: false,
        message: "You have already attempted this assignment!",
      });

    let correct = 0;
    assignment.questions.forEach((q, i) => {
      const studentAns =
        answers[i]?.toString().trim().toLowerCase() || "";
      const actualAns = q.correctAnswer
        .toString()
        .trim()
        .toLowerCase();
      if (studentAns === actualAns) correct++;
    });

    const wrong = assignment.questions.length - correct;
    const accuracy = assignment.questions.length
      ? (correct / assignment.questions.length) * 100
      : 0;

    const performance = new Performance({
      studentName,
      rollNumber,
      correct,
      wrong,
      accuracy,
      unit: numericUnit,
      section: student.section,   // ⭐ SAVE SECTION
    });

    await performance.save();

    res.status(200).json({
      success: true,
      message: "Performance saved!",
      performance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error saving performance",
      error: error.message,
    });
  }
};

/* ================================================================
   👩‍🏫 TEACHER: GET PERFORMANCE LIST (FILTERABLE)
================================================================ */
export const getAllPerformances = async (req, res) => {
  try {
    const { unit, section } = req.query;

    console.log("API HIT ✅");

    // 🔥 SIMPLE QUERY (NO COMPLEX FILTER)
    const performances = await Performance.find({
      unit: Number(unit),
      section: section
    });

    console.log("DATA FOUND:", performances);

    res.status(200).json({
      success: true,
      performances
    });

  } catch (error) {
    console.error("ERROR:", error);  // 🔥 IMPORTANT

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/* ================================================================
   ❌ TEACHER: DELETE ASSIGNMENT
================================================================ */
export const deleteAssignment = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedAssignment = await Assignment.findByIdAndDelete(id);

    if (!deletedAssignment)
      return res.status(404).json({
        success: false,
        message: "Assignment not found!",
      });

    res.status(200).json({
      success: true,
      message: "🗑 Assignment deleted successfully!",
    });
  } catch (error) {
    console.error("❌ Error deleting assignment:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting assignment",
      error: error.message,
    });
  }
};
