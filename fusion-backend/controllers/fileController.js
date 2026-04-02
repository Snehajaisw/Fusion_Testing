import mongoose from "mongoose";
import Grid from "gridfs-stream";
import multer from "multer";
import dotenv from "dotenv";
import { GridFSBucket } from "mongodb";
import { Readable } from "stream";

dotenv.config();

const mongoURI = process.env.MONGO_URI;

// ==================== CONNECT TO MONGO ====================
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const conn = mongoose.connection;

let gfs, gridfsBucket;

conn.once("open", () => {
  gridfsBucket = new GridFSBucket(conn.db, { bucketName: "uploads" });
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
  console.log("✅ GridFS Ready");
});

// ==================== MULTER ====================
const storage = multer.memoryStorage();
export const upload = multer({ storage });

// =========================================================
//                  UPLOAD FILE
// =========================================================
export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, msg: "No file uploaded" });
    }

    const readableStream = new Readable();
    readableStream.push(req.file.buffer);
    readableStream.push(null);

    let unit = String(req.body.unit || "").trim();
    if (!unit.toLowerCase().includes("unit")) {
      unit = "Unit " + unit;
    }

   const metadata = {
  title: req.body.title || req.file.originalname,
  description: req.body.description || "",
  category: (req.body.category || "").toLowerCase(),
  unit: unit.toLowerCase(),
  subject: req.body.subject ? req.body.subject.toLowerCase() : "c", // 👈 TEMP DEFAULT
  uploadedBy: req.body.uploadedBy || "Unknown Teacher",
};



    console.log("📥 Upload metadata:", metadata);

    const uploadStream = gridfsBucket.openUploadStream(
      req.file.originalname,
      {
        contentType: req.file.mimetype,
        metadata,
      }
    );

    readableStream.pipe(uploadStream);

    uploadStream.on("finish", () => {
      res.status(200).json({
        success: true,
        msg: "File uploaded successfully",
        file: {
          id: uploadStream.id,
          filename: uploadStream.filename,
        },
      });
    });

    uploadStream.on("error", (err) =>
      res.status(500).json({
        success: false,
        msg: "Upload failed",
        error: err.message,
      })
    );
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Upload error",
      error: error.message,
    });
  }
};

// =========================================================
//      🔥 COMMON FILTER API (LMS CORE ENGINE)
// =========================================================
export const getFilteredFiles = async (req, res) => {
  try {
    let { subject, unit, category } = req.query;

    if (!subject || !unit || !category) {
      return res.status(400).json({
        success: false,
        msg: "subject, unit and category are required",
      });
    }

    // 🔥 Normalize inputs
    subject = subject.toLowerCase().trim();
    category = category.toLowerCase().trim();

    if (!unit.toLowerCase().includes("unit")) {
      unit = "unit " + unit;
    } else {
      unit = unit.toLowerCase();
    }

    const files = await conn.db
  .collection("uploads.files")
  .find({
    "metadata.subject": { $regex: new RegExp("^" + subject + "$", "i") },
    "metadata.unit": { $regex: new RegExp("^" + unit + "$", "i") },
    "metadata.category": { $regex: new RegExp("^" + category + "$", "i") },
  })
  .sort({ uploadDate: -1 })
  .toArray();


    res.status(200).json({
      success: true,
      files,
    });

  } catch (error) {
    console.error("❌ Error fetching filtered files:", error);
    res.status(500).json({
      success: false,
      msg: "Error fetching filtered files",
      error: error.message,
    });
  }
};

// =========================================================
//              GET FILES BY UNIT (OLD - OPTIONAL)
// =========================================================
export const getFilesByUnit = async (req, res) => {
  try {
    let { subject, unit } = req.query;

    if (!subject || !unit) {
      return res.status(400).json({
        msg: "subject and unit are required",
      });
    }

    if (!unit.toLowerCase().includes("unit")) {
      unit = "Unit " + unit;
    }

    const files = await conn.db
      .collection("uploads.files")
      .find({
        "metadata.subject": subject,
        "metadata.unit": unit,
        "metadata.category": "Notes",
      })
      .toArray();

    return res.status(200).json(files);
  } catch (error) {
    res.status(500).json({
      msg: "Error fetching files",
      error: error.message,
    });
  }
};

// =========================================================
//                  GET ALL FILES
// =========================================================
export const getAllFiles = async (req, res) => {
  try {
    const files = await gfs.files.find().toArray();
    res.status(200).json(files);
  } catch (error) {
    res.status(500).json({
      msg: "Error fetching files",
      error: error.message,
    });
  }
};

// =========================================================
//                  DOWNLOAD FILE
// =========================================================
export const getFile = async (req, res) => {
  try {
    const { filename } = req.params;

    const file = await conn.db
      .collection("uploads.files")
      .findOne({ filename });

    if (!file) {
      return res.status(404).json({ msg: "File not found" });
    }

    const downloadStream =
      gridfsBucket.openDownloadStreamByName(filename);

    res.set("Content-Type", file.contentType);
    downloadStream.pipe(res);
  } catch (error) {
    res.status(500).json({
      msg: "Download error",
      error: error.message,
    });
  }
};

// =========================================================
//                  DELETE FILE
// =========================================================
export const deleteFile = async (req, res) => {
  try {
    const { filename } = req.params;

    const file = await conn.db
      .collection("uploads.files")
      .findOne({ filename });

    if (!file) {
      return res.status(404).json({ msg: "File not found" });
    }

    await gridfsBucket.delete(file._id);

    res.status(200).json({ msg: "File deleted successfully!" });
  } catch (error) {
    res.status(500).json({
      msg: "Delete error",
      error: error.message,
    });
  }
};
