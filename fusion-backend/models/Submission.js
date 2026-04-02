import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CodingQuestion",
    required: true
  },

  

  code: String,
  language: String,
  status: String,
  passed: Number,
  total: Number,

  totalMarks: Number,
  maxMarks: Number,

  stepResults: [
    {
      label: String,
      passed: Boolean,
      marksAwarded: Number,
      marksTotal: Number
    }
  ],

  createdAt: { type: Date, default: Date.now }
});
export default mongoose.model("Submission", submissionSchema);
