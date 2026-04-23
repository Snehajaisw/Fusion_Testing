import mongoose from "mongoose";
import bcrypt from "bcrypt";

// ================= QUESTION SCHEMA =================
const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: String, required: true },
});

// ================= ASSIGNMENT SCHEMA =================
const assignmentSchema = new mongoose.Schema({
  unit: { type: Number, required: true },

  title: { type: String, required: true },
  description: { type: String, default: "" },

  deadline: { type: Date, default: null },

  maxMarks: { type: Number, default: 100 },
  isActive: { type: Boolean, default: true },

  questions: [questionSchema],

  section: {
    type: String,
    required: true,
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  // 🔐 PASSKEY (hashed)
  passkey: {
    type: String,
    required: true,
  },

  // 🔐 whether passkey is required or not
  passkeyRequired: {
    type: Boolean,
    default: true,
  },

  // ⏳ optional expiry (slot based quiz)
  passkeyExpiresAt: {
    type: Date,
  },

  // 🚫 attempt tracking (optional but useful)
  attemptedBy: [
    {
      studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      attempts: {
        type: Number,
        default: 0,
      },
    },
  ],

  createdAt: { type: Date, default: Date.now },
});


// ================= 🔐 HASH PASSKEY BEFORE SAVE =================
assignmentSchema.pre("save", async function (next) {
  if (!this.isModified("passkey")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.passkey = await bcrypt.hash(this.passkey, salt);
    next();
  } catch (err) {
    next(err);
  }
});


// ================= EXPORT =================
export default mongoose.model("Assignment", assignmentSchema);