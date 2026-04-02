import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/user.js";
import jwt from "jsonwebtoken";


const router = express.Router();

// ✅ SET PASSWORD (first time only)
router.post("/set-password", async (req, res) => {
  try {
    const { rollNumber, email, password } = req.body;

    if (!password) {
      return res.status(400).json({ msg: "Password required" });
    }

    const user = await User.findOne({
      $or: [{ rollNumber }, { email }],
    });

    if (!user) {
      return res.status(404).json({ msg: "User not found in system" });
    }

    if (user.passwordSet) {
      return res.status(400).json({ msg: "Password already set. Please login." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.passwordSet = true;

    await user.save();

    res.status(200).json({ msg: "Password set successfully. You can now login." });

  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});


// ✅ SIGNUP ROUTE
router.post("/signup", async (req, res) => {
  console.log("🧩 Signup attempt:", req.body);

  try {
    const { name, email, password, role, sections } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role,
      sections,
      isApproved: role === "teacher" ? false : true,
      passwordSet: true
    });

    await newUser.save();

    res.status(200).json({
      msg:
        role === "teacher"
          ? "Registration request sent. Wait for admin approval."
          : "Signup successful",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });

  } catch (error) {
    console.error("❌ Signup error:", error);
    res.status(500).json({ msg: "Signup failed" });
  }
});
router.post("/login", async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }

    const cleanIdentifier = identifier.trim();
    console.log("LOGIN TRY:", cleanIdentifier);

    const user = await User.findOne({
      $or: [
        { email: cleanIdentifier.toLowerCase() },
        { rollNumber: cleanIdentifier },
        
      ],
    });
     console.log("USER FOUND:", user);
     
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    if (!user.passwordSet) {
      return res.status(400).json({ msg: "Please set your password first" });
    }

    // ✅ TEACHER APPROVAL CHECK
if (user.role === "teacher" && !user.isApproved){
      return res.status(403).json({
        msg: "Your account is pending admin approval"
      });
    }

const isMatch = await bcrypt.compare(password.trim(), user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign(
  { id: user._id, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: "1d" }
);

res.status(200).json({
  msg: "Login successful",
  token,
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    section: user.section,      // for student
    sections: user.sections     // for teacher
  },
});

  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// Approve teacher
router.put("/approve/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user || user.role !== "teacher") {
      return res.status(404).json({ msg: "Teacher not found" });
    }

user.isApproved = true;
    await user.save();

    res.json({ msg: "Teacher approved successfully" });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Get all pending teachers
// Get all pending teachers
router.get("/pending-teachers", async (req, res) => {
  try {
    console.log("Fetching pending teachers...");

    const teachers = await User.find({
      role: "teacher",
      isApproved: false
    });

    console.log("Pending teachers found:", teachers.length);

    res.json(teachers);
  } catch (err) {
    console.error("Error fetching teachers:", err);
    res.status(500).json({ msg: err.message });
  }
});
// Get all approved teachers
router.get("/approved-teachers", async (req, res) => {
  try {
    const teachers = await User.find({
      role: "teacher",
      isApproved: true
    });

    res.json(teachers);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});




export default router;
