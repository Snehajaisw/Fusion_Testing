import React, { useState } from "react";
import axios from "axios";
import "./PageStyles.css";

export default function TeacherSignup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sections, setSections] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSignup = async (e) => {
  e.preventDefault();

  console.log("Submitting:", { name, email, sections, password, confirmPassword });

  if (!name.trim() || !email.trim() || !sections.trim() || !password.trim() || !confirmPassword.trim()) {
    setMsg("All fields are required");
    return;
  }

  if (password !== confirmPassword) {
    setMsg("Passwords do not match");
    return;
  }

  try {
    await axios.post("https://fusion0-1.onrender.com/api/auth/signup", {
      name,
      email,
      role: "teacher",
      password,
      sections: sections.split(",").map(s => s.trim())
    });

    setMsg("Signup successful! Wait for admin approval.");

  } catch (err) {
    setMsg(err.response?.data?.msg || "Signup failed");
  }
};

  return (
    <div className="login-page">
      <div className="form-card">
        <h2>Teacher Signup</h2>

        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Sections (e.g. A,B,C)"
            value={sections}
            onChange={(e) => setSections(e.target.value)}
            required
          />

          {/* 🔥 NEW PASSWORD FIELD */}
          <input
            type="password"
            placeholder="Create Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit">Submit Request</button>
        </form>

        <p className="message">{msg}</p>
      </div>
    </div>
  );
}