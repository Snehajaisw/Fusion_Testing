import { Link } from "react-router-dom";
import "./PageStyles.css";

export default function Home() {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="fusion-title">FUSION</h1>
        <p className="fusion-tagline">
          A Teaching learning assessment for programming languages
        </p>

        <div className="fusion-buttons">
          <Link to="/login">
            <button className="fusion-btn login-btn">Login</button>
          </Link>

          {/* 🔑 Replaced Signup with Set Password */}
         <Link to="/register">
  <button className="fusion-btn signup-btn">Register</button>
</Link>

        </div>
      </div>

      <div className="fusion-bg-letter">F</div>
    </div>
  );
}
