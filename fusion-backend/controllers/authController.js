import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.js";

dotenv.config();


// =================== SIGNUP ===================
export const signup = async (req, res) => {
  try {
    const { name, email, password, role, sections, rollNumber, section } = req.body;

    console.log("📥 Signup Request Received:", req.body);

    if (!name || !email || !password || !role) {
      return res.status(400).json({ msg: "All required fields must be filled" });
    }

    if (role === "admin") {
      return res.status(403).json({ msg: "Admin cannot be created publicly" });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const finalRole =
  process.env.TEST_MODE === "true" && role === "student"
    ? "test_student"
    : role;

const newUser = new User({
  name,
  email: normalizedEmail,
  password: hashedPassword,
  role: finalRole,
  sections: finalRole === "teacher" ? sections : undefined,
  rollNumber:
    finalRole === "student" || finalRole === "test_student"
      ? rollNumber
      : undefined,
  section:
    finalRole === "student" || finalRole === "test_student"
      ? section
      : undefined,
});

    await newUser.save();

    return res.status(200).json({
      msg: role === "teacher"
        ? "Registration request sent. Wait for admin approval."
        : "Signup successful!",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });

  } catch (error) {
    console.error("🔥 Signup Error:", error);
    return res.status(500).json({
      msg: "Signup failed, try again!",
      error: error.message,
    });
  }
};



// =================== LOGIN ===================
export const login = async (req, res) => {
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
        { rollNumber: cleanIdentifier }
      ]
    });

    if (!user) {
      return res.status(400).json({ msg: "User not found!" });
    }

    // ✅ STUDENT: password set nahi hai
    if (user.role === "student" && !user.password) {
      return res.status(400).json({
        msg: "Please set your password first"
      });
    }

    // ✅ TEACHER: approval required
    if (user.role === "teacher" && !user.isApproved) {
      return res.status(403).json({
        msg: "Wait for admin approval"
      });
    }

    const isMatch = await bcrypt.compare(password.trim(), user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials!" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      msg: "Login successful",
      token,
      user
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Login failed" });
  }
};