import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./PageStyles.css";

export default function Signup() {
  const [role, setRole] = useState("student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [extraField, setExtraField] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    if (password !== confirmPassword) {
      setMsg("❌ Passwords do not match!");
      return;
    }

    try {
      console.log("➡️ Sending signup data:", {
        name,
        email,
        password,
        role,
        extraField,
      });

      const res = await axios.post("https://fusion0-1.onrender.com/api/auth/signup", {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: password.trim(),
        role,
        extraField: extraField.trim(),
      });

      console.log("✅ Signup successful:", res.data);

      // ✅ Save user directly in localStorage (same as login)
      localStorage.setItem("fusionUser", JSON.stringify(res.data.user));

      setMsg("✅ Signup successful! Redirecting...");

      // ✅ Redirect automatically based on role
      setTimeout(() => {
        if (res.data.user.role === "teacher") {
          navigate("/teacher-dashboard");
        } else {
          navigate("/dashboard");
        }
      }, 1000);
    } catch (err) {
      console.error("❌ Signup Error:", err.response?.data || err.message);
      setMsg(err.response?.data?.msg || "Signup failed, try again!");
    }
  };

  return (
    <div className="signup-page">
      {/* Role Toggle */}
      <div className="role-toggle">
        <button
          className={role === "student" ? "active" : ""}
          onClick={() => setRole("student")}
          type="button"
        >
          Student Signup
        </button>
        <button
          className={role === "teacher" ? "active" : ""}
          onClick={() => setRole("teacher")}
          type="button"
        >
          Teacher Signup
        </button>
      </div>

      {/* Signup Form */}
      <div className="form-card">
        <h2>{role === "student" ? "Student Signup" : "Teacher Signup"}</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          {role === "student" ? (
            <input
              type="text"
              placeholder="Roll Number"
              value={extraField}
              onChange={(e) => setExtraField(e.target.value)}
              required
            />
          ) : (
            <input
              type="text"
              placeholder="Teacher ID"
              value={extraField}
              onChange={(e) => setExtraField(e.target.value)}
              required
            />
          )}

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
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

          <button type="submit">Create Account</button>
        </form>

        {/* Message */}
        <p
          className="message"
          style={{
            color: msg.includes("successful") ? "limegreen" : "rgb(255,80,80)",
          }}
        >
          {msg}
        </p>

        <p className="bottom-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
