import mongoose from "mongoose";

// ----------------------
// Testcases Schema
// ----------------------
const testcaseSchema = new mongoose.Schema({
  input: { type: String, required: true },
  expected: { type: String, required: true },
});

// ----------------------
// Evaluation Steps Schema
// ----------------------
const evaluationStepSchema = new mongoose.Schema({
    stepId: { type: String, required: true },   // ✅ ADD THIS

  label: { type: String, required: true },
  type: {
    type: String,
    enum: ["code-contains", "code-regex", "all-testcases-pass", "min-testcases-pass"],
    required: true,
  },
  value: { type: String, default: "" },
  minPassed: { type: Number, default: 0 },
  marks: { type: Number, required: true },
});

// ----------------------
// Coding Question Schema
// ----------------------
const codingQuestionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },

  // ✅ practice / assignment
  category: { type: String, enum: ["practice", "assignment"], default: "practice" },

  // ✅ unit only if assignment, not needed for practice
  unit: { type: String },

  language: {
    type: String,
    enum: ["c", "cpp"],
    required: true,
  },

  testcases: {
    type: [testcaseSchema],
    default: [],
  },

  evaluationSteps: {
    type: [evaluationStepSchema],
    default: [],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("CodingQuestion", codingQuestionSchema);
