import express from "express";
import {
  upload,
  uploadFile,
  getAllFiles,
  getFilesByUnit,
  getFile,
  getFilteredFiles
} from "../controllers/fileController.js";


import mongoose from "mongoose";
import Grid from "gridfs-stream";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// ------------------------------------------
//  MongoDB connection for GridFS
// ------------------------------------------
const mongoURI = process.env.MONGO_URI;

const conn = mongoose.createConnection(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let gfs;
conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
  console.log("✅ GridFS initialized inside fileRoutes.js");
});

// ------------------------------------------
// 1️⃣ Upload a file
// ------------------------------------------
router.post("/upload", upload.single("file"), uploadFile);

// ------------------------------------------
// 2️⃣ Get ALL uploaded files
// ------------------------------------------
router.get("/", getAllFiles);

// ------------------------------------------
// 3️⃣ Get files by UNIT (Unit 1, Unit 2, etc.)
// ------------------------------------------
// ✨ FIXED: case-insensitive matching
router.get("/unit/:unit", async (req, res) => {
  try {
    if (!gfs) return res.status(500).json({ msg: "GridFS not initialized" });

    let { unit } = req.params;
    unit = unit.trim().toLowerCase();

    const files = await gfs.files
      .find({
        "metadata.unit": { $regex: new RegExp("^" + unit + "$", "i") },
      })
      .toArray();

    res.json(files);
  } catch (error) {
    console.error("🔥 Error fetching unit files:", error);
    res.status(500).json({ msg: "Failed to fetch files" });
  }
});

// ------------------------------------------
// 4️⃣ Download file by FILENAME
// ------------------------------------------
router.get("/download/:filename", getFile);

// ------------------------------------------
// 7️⃣ FILTER FILES (subject + unit + category)
// ------------------------------------------
router.get("/filter", getFilteredFiles);


// ------------------------------------------
// 5️⃣ Delete file by FILENAME
// ------------------------------------------
router.delete("/:filename", async (req, res) => {
  try {
    if (!gfs) {
      return res.status(500).json({ msg: "GridFS not ready" });
    }

    const { filename } = req.params;

    const file = await gfs.files.findOne({ filename });
    if (!file) {
      return res.status(404).json({ msg: "File not found" });
    }

    await gfs.files.deleteOne({ _id: file._id });
    await conn.db.collection("uploads.chunks").deleteMany({ files_id: file._id });

    console.log(`🗑️ Deleted → ${filename}`);

    res.json({ success: true, msg: "File deleted successfully" });
  } catch (error) {
    console.error("❌ Delete Error:", error);
    res.status(500).json({ success: false, msg: "Failed to delete file" });
  }
});

// ------------------------------------------
// 6️⃣ Debug Route (optional but useful)
// ------------------------------------------
router.get("/raw/all", async (req, res) => {
  try {
    const files = await gfs.files.find().toArray();
    res.json(files);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch raw files" });
  }
});

export default router;
