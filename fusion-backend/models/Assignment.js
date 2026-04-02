import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: String, required: true },
});

const assignmentSchema = new mongoose.Schema({
  unit: { type: Number, required: true },

  

  title: { type: String, required: true },
  description: { type: String, default: "" },

  deadline: { type: Date, default: null },

  maxMarks: { type: Number, default: 100 },
  isActive: { type: Boolean, default: true },

  questions: [questionSchema],

  // ✅ ADD THESE TWO FIELDS
  section: {
    type: String,
    required: true,
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  createdAt: { type: Date, default: Date.now },

});

export default mongoose.model("Assignment", assignmentSchema);
