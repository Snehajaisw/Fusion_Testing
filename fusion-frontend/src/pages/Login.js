import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./PageStyles.css";
export default function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const res = await axios.post("https://fusion-backend-testing.onrender.com/api/auth/login",{
        identifier: identifier.trim(),
        password,
      });

      localStorage.setItem("fusionUser", JSON.stringify(res.data.user));
localStorage.setItem("token", res.data.token);   // 🔥 STORE TOKEN


      setMsg("✅ Login successful!");

      const user = res.data.user;

if (user.role === "admin") {
  navigate("/admin-dashboard");
} 
else if (user.role === "teacher") {
  // ✅ Teacher → Unit 3 Assignments page
  navigate("/teacher/unit/3/assignments");
} 
else {
  // ✅ Student → Unit 3 MCQ Assignment page
  navigate("/student-assignment?unit=3");
}

    } catch (err) {
      setMsg(err.response?.data?.msg || "Invalid credentials, try again!");
    }
  };

  return (
    <div className="login-page">
      <div className="form-card">
        <h2>Login</h2>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email or Roll Number"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>

        <p
          className="message"
          style={{
            color: msg.includes("successful") ? "limegreen" : "rgb(255,80,80)",
          }}
        >
          {msg}
        </p>

        <p>
  First time user?{" "}
  <span
    onClick={() => navigate("/register")}
    style={{ color: "#4da6ff", cursor: "pointer", fontWeight: "600" }}
  >
    Register
  </span>
</p>
      </div>
    </div>
  );
}
