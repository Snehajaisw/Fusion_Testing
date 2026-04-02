import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();

// ⭐ GET PPTS OF ANY UNIT (Dynamic)
router.get("/unit/:unitId", (req, res) => {
  const unit = req.params.unitId;

  const pptFolder = path.join(
    process.cwd(),
    "uploads",
    `unit${unit}`,
    "ppt"
  );

  if (!fs.existsSync(pptFolder)) {
    return res.json({ success: false, files: [] });
  }

  fs.readdir(pptFolder, (err, files) => {
    if (err || files.length === 0) {
      return res.json({ success: false, files: [] });
    }

    res.json({
      success: true,
      files: files, // return all PPT files
    });
  });
});

export default router;
