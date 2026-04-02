import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },

  email: { type: String, required: true, unique: true },

  password: { type: String },
  passwordSet: { type: Boolean, default: false },

  role: {
    type: String,
    enum: ["student", "admin", "teacher", "test_student"],
    required: true,
  },

  // ✅ FIXED (no "this" used)
  isApproved: {
    type: Boolean,
    default: true, // default sabke liye true
  },

  // 👇 students
  rollNumber: { type: String },
  section: { type: String },

  // 👇 teachers
  sections: {
    type: [String],
    default: [],
  },

  extraField: { type: String },

  totalAccepted: { type: Number, default: 0 },

}, { timestamps: true });

export default mongoose.model("User", userSchema);