import mongoose from "mongoose";

const performanceSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  rollNumber: { type: String, required: true },

  correct: { type: Number, required: true },
  wrong: { type: Number, required: true },
  accuracy: { type: Number, required: true },

  unit: { type: String, default: "Unit 1" },

  section: { type: String, required: true }, // ✅ ADD THIS

  date: { type: Date, default: Date.now }
});

export default mongoose.model("Performance", performanceSchema);
