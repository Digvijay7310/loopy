import React, { useState } from "react";
import axios from "axios";
import axiosInstance from "../axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosInstance.post("/users/login", formData, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true // to receive cookies
      });

      alert("Login successful!");
      console.log(res.data.data);
    } catch (err) {
      console.error(err);
      alert("Login failed! Invalid credentials.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
