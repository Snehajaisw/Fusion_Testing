import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./PageStyles.css";

export default function SetPassword() {
  const [rollNumber, setRollNumber] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSetPassword = async (e) => {
    e.preventDefault();
    setMsg("");

    // 🔥 basic validation
    if (!rollNumber || !password) {
      return setMsg("Please fill all fields");
    }

    try {
      const res = await axios.post("https://fusion0-1.onrender.com/api/auth/set-password", {
  rollNumber: rollNumber.trim(),
  password: password.trim(),
});

      setMsg(res.data.msg || "✅ Password set successfully!");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {
      console.log(err.response?.data); // 🔥 debug
      setMsg(err.response?.data?.msg || "Error setting password");
    }
  };

  return (
    <div className="login-page">
      <div className="form-card">
        <h2>Set Password (First Time)</h2>

        <form onSubmit={handleSetPassword}>
          <input
            type="text"
            placeholder="Roll Number"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Create Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Set Password</button>
        </form>

        <p
          className="message"
          style={{
            color: msg.includes("success") ? "limegreen" : "rgb(255,80,80)",
          }}
        >
          {msg}
        </p>
      </div>
    </div>
  );
}