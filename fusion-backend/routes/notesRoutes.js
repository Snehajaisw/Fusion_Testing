import express from "express";
import {
  upload,
  uploadFile,
  getFilteredFiles,
  getAllFiles,
  getFile,
  deleteFile
} from "../controllers/fileController.js";

const router = express.Router();

// =========================================================
//                  TEACHER: UPLOAD FILE
// =========================================================
router.post("/upload", upload.single("file"), uploadFile);

// =========================================================
//        🔥 STUDENT: COMMON FILTER API (LMS CORE)
// =========================================================
// Example:
// /api/notes/filter?subject=cpp&unit=2&category=Notes
// /api/notes/filter?subject=c&unit=4&category=Coding
router.get("/filter", getFilteredFiles);

// =========================================================
//                  (OPTIONAL) GET ALL FILES
// =========================================================
router.get("/", getAllFiles);

// =========================================================
//                  DOWNLOAD FILE
// =========================================================
router.get("/file/:filename", getFile);

// =========================================================
//                  DELETE FILE
// =========================================================
router.delete("/file/:filename", deleteFile);

export default router;
