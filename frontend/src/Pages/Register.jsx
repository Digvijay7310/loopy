import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../axios";

function Register() {
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    avatar: "",
    coverImage: "",
  });
  const { setAuthUser, setAccessToken } = useAuth();
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in form) {
      if (form[key]) {
        formData.append(key, form[key]);
      }
    }

    try {
      const res = await axiosInstance.post("/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setAuthUser(res.data.data.user);
      setAccessToken(res.data.data.accessToken);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res.data.data.accessToken}`;
      alert("User Register successfully");
      navigate("/api/v1/users/profile");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };
  return (
    <div>
      <form onSubmit={handleRegister}>
        <h2>Register</h2>
        <input
          name="fullName"
          type="text"
          value={form.fullName}
          autoComplete="off"
          onChange={handleOnChange}
          placeholder="FullName"
        />
        <br />
        <input
          name="username"
          value={form.username}
          type="text"
          autoComplete="off"
          onChange={handleOnChange}
          placeholder="Enter username"
        />
        <br />
        <input
          name="email"
          type="email"
          autoComplete="off"
          value={form.email}
          onChange={handleOnChange}
          placeholder="Enter Email"
        />
        <br />
        <input
          name="password"
          type="password"
          autoComplete="off"
          value={form.password}
          onChange={handleOnChange}
          placeholder="Enter Password"
        />
        <br />
        <input
          type="file"
          name="avatar"
          autoComplete="off"
          onChange={handleOnChange}
          accept="image/*"
          id="avatar"
        />
        <br />
        <input
          type="file"
          name="coverImage"
          autoComplete="off"
          onChange={handleOnChange}
          accept="image/*"
          id="coverImage"
        />
        <br />
        <button type="submit"> Register</button>
      </form>
    </div>
  );
}

export default Register;
