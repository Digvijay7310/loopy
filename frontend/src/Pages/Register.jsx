import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { setAuthUser, setAccessToken } = useAuth();

  const handleOnChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const navigate = useNavigate();

  const handleRegister = async () => {
    e.preventDefault();
    try {
      const res = await axios.post("/register", form);
      setAuthUser(res.data.data.user);
      setAccessToken(res.data.data.accessToken);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res.data.data.accessToken}`;
      alert("user register successfull");
      navigate("/dashboard");
    } catch (error) {
      alert(error.res?.data?.message || "Registration failed");
    }
  };
  return (
    <div>
      <form onSubmit={handleRegister}>
        <h2>Register</h2>
        <input
          name="email"
          type="email"
          onChange={handleOnChange}
          placeholder="Enter Email"
        />
        <input
          name="password"
          type="password"
          onChange={handleOnChange}
          placeholder="Enter Password"
        />
        <button type="submit"> Register</button>
      </form>
    </div>
  );
}

export default Register;
