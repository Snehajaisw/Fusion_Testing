import express from "express";
import { createEvenOddQuestion } from "../controllers/seedController.js";

const router = express.Router();

router.post("/add-even-odd", createEvenOddQuestion);

export default router;
