import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    fileUrl: { type: String, required: true },
    unit: { type: String, required: true }, // Example: "Unit 1"
    category: { type: String, required: true }, // Notes / PPT / Assignment
    uploadedBy: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("File", fileSchema);
