import React, { useState } from "react";
import axiosInstance from "../axios";
import { redirect, useNavigate } from "react-router-dom";
import Login from "./Login";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });

  const [avatar, setAvatar] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
//   const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "avatar") {
      setAvatar(files[0]);
    } else if (name === "coverImage") {
      setCoverImage(files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!avatar || !coverImage) {
      return alert("Both avatar and cover image are required.");
    }

    const data = new FormData();
    data.append("fullName", formData.fullName);
    data.append("username", formData.username);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("avatar", avatar);
    data.append("coverImage", coverImage);

    try {
      const res = await axiosInstance.post("/users/register", data, {
       
        withCredentials: true, // to receive cookies if needed
      });

      alert("User registered successfully!");
      console.log(res.data.data);
      redirect(<Login />)
    //   navigate("/users/login");

    } catch (err) {
      console.error(err);
      alert("Registration failed!");
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div>
        <label>Full Name:</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
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

      <div>
        <label>Avatar:</label>
        <input
          type="file"
          name="avatar"
          accept="image/*"
          onChange={handleFileChange}
          required
        />
      </div>

      <div>
        <label>Cover Image:</label>
        <input
          type="file"
          name="coverImage"
          accept="image/*"
          onChange={handleFileChange}
          required
        />
      </div>

      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
