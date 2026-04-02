import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  assignmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Assignment",
    required: true,
  },

  section: {
    type: String,
    required: true,
  },

  marks: {
    type: Number,
    required: true,
  },

}, { timestamps: true });

export default mongoose.model("Result", resultSchema);
