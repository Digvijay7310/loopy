import React, { useState, useEffect } from "react";
import axios from "axios";
import axiosInstance from "../axios";

const generateCaptcha = () => {
  const a = Math.floor(Math.random() * 10) + 1;
  const b = Math.floor(Math.random() * 10) + 1;
  return {
    question: `${a} x ${b}`,
    answer: (a * b).toString(),
  };
};

function LogoutPage() {
  const [captcha, setCaptcha] = useState({ question: "", answer: "" });
  const [userInput, setUserInput] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  // Generate captcha on page load
  useEffect(() => {
    const newCaptcha = generateCaptcha();
    setCaptcha(newCaptcha);
  }, []);

  const checkCaptcha = () => {
    if (userInput.trim() === captcha.answer) {
      setIsVerified(true);
      alert("CAPTCHA Verified ✅");
    } else {
      alert("❌ Wrong answer. Try again.");
      setUserInput("");
      setIsVerified(false);
      setCaptcha(generateCaptcha()); // regenerate captcha
    }
  };

  const handleLogout = async () => {
    try {
      const res = await axiosInstance.post(
        "users/logout",
        {},
        { withCredentials: true }
      );
      alert("✅ Logged out successfully");
      //window.location.href = "/login"; // or use navigate()
    } catch (err) {
      console.error("Logout failed:", err);
      alert("❌ Logout failed");
    }
  };

  return (
    <div>
      <h2>Logout Confirmation</h2>

      <p>Solve CAPTCHA to enable logout:</p>
      <p><strong>{captcha.question}</strong></p>

      <input
        type="text"
        value={userInput}
        placeholder="Answer"
        onChange={(e) => setUserInput(e.target.value)}
      />
      <button onClick={checkCaptcha}>Verify</button>

      <br /><br />

      <button onClick={handleLogout} disabled={!isVerified}>
        Logout
      </button>
    </div>
  );
}

export default LogoutPage;
