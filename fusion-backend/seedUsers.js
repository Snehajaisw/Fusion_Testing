import fs from "fs";
import csv from "csv-parser";
import mongoose from "mongoose";
import User from "./models/user.js";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config();

// 🔥 connect DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const users = [];

fs.createReadStream("users.csv")
  .pipe(csv())
  .on("data", (row) => {
    users.push(row);
  })
  .on("end", async () => {
    try {
      console.log("📂 Raw CSV sample:", users[0]);

      // 🔥 STEP 1: clean CSV data
      const formattedUsers = users
        .map((u) => {
          const clean = {};

          for (let key in u) {
            clean[key.trim()] = u[key];
          }

          return {
            rollNumber: clean.rollNumber?.trim(),
            name: clean.name?.trim(),
            email: clean.email?.trim().toLowerCase(),
            role: clean.role?.trim(),
            section: clean.section || null,
            sections: clean.sections
              ? clean.sections.split("|")
              : [],
            password: null, // 🔥 IMPORTANT
            passwordSet: false,
            isApproved: clean.role?.trim() === "teacher" ? false : true, // auto approve students
          };
        })
        .filter((u) => u.name && u.email && u.role);

      // 🔥 STEP 2: insert users (without deleting existing ones)
      await User.insertMany(formattedUsers, { ordered: false })
        .then(() => console.log("✅ CSV Users inserted"))
        .catch((err) => console.log("⚠️ Some users skipped (duplicates)"));

      // 🔥 STEP 3: create/update admin (ALWAYS SAFE)
      const hashedPassword = await bcrypt.hash("admin123", 10);

      await User.findOneAndUpdate(
        { email: "admin@fusion.com" },
        {
          name: "Super Admin",
          role: "admin",
          password: hashedPassword,
          passwordSet: true,
          isApproved: true,
        },
        { upsert: true, new: true }
      );

      console.log("✅ Admin ensured");

      console.log("🎉 Seeding completed successfully");
      mongoose.connection.close();

    } catch (err) {
      console.error("❌ ERROR:", err);
      mongoose.connection.close();
    }
  });