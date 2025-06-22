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
  const [loading, setLoading] = useState(false);

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
    setLoading(false);

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
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className=" bg-zinc-900 min-h-screen ">
      <form
        onSubmit={handleRegister}
        className="flex justify-center items-center flex-col rounded-2xl"
      >
        <h2 className="text-3xl md:4xl pt-5 text-red-500 gap-1 mt-5 font-semibold text-shadow-2xs">
          Register
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 md:place-items-center">
          <label htmlFor="fullName" className="font-semibold text-white md:lg">
            FullName:
          </label>
          <input
            name="fullName"
            id="fullName"
            type="text"
            value={form.fullName}
            autoComplete="off"
            onChange={handleOnChange}
            placeholder="FullName"
            className="bg-zinc-800 mb-2 w-[250px] px-4 py-2 rounded-lg text-gray-100 outline-0 focus:ring-1 focus:ring-red-600 focus:transform-border"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 md:place-items-center">
          <label htmlFor="username" className="font-semibold text-white">
            Username:
          </label>
          <input
            name="username"
            id="username"
            value={form.username}
            type="text"
            autoComplete="off"
            onChange={handleOnChange}
            placeholder="Enter username"
            className="bg-zinc-800 mb-2 w-[250px] px-4 py-2 rounded-lg text-gray-100 outline-0 focus:ring-1 focus:ring-red-600 focus:transform-border"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 md:place-items-center">
          <label htmlFor="email" className="font-semibold text-white">
            Email:
          </label>
          <input
            name="email"
            type="email"
            id="email"
            autoComplete="off"
            value={form.email}
            onChange={handleOnChange}
            placeholder="Enter Email"
            className="bg-zinc-800 mb-2 w-[250px] px-4 py-2 rounded-lg text-gray-100 outline-0 focus:ring-1 focus:ring-red-600 focus:transform-border"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 md:place-items-center">
          <label htmlFor="password" className="font-semibold text-white">
            Password:
          </label>
          <input
            name="password"
            type="password"
            id="password"
            autoComplete="off"
            value={form.password}
            onChange={handleOnChange}
            placeholder="Enter Password"
            className="bg-zinc-800 mb-2 w-[250px] px-4 py-2 rounded-lg text-gray-100 outline-0 focus:ring-1 focus:ring-red-600 focus:transform-border"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 md:place-items-center">
          <label htmlFor="avatar" className="font-semibold text-white">
            Avatar:
          </label>
          <input
            type="file"
            name="avatar"
            autoComplete="off"
            onChange={handleOnChange}
            accept="image/*"
            id="avatar"
            className="bg-zinc-800 cursor-pointer mb-2 w-[250px] px-4 py-2 rounded-lg text-gray-100 outline-0 focus:ring-1 focus:ring-red-600 focus:transform-border"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 md:place-items-center">
          <label htmlFor="coverImage" className="font-semibold text-white">
            CoverImage:
          </label>
          <input
            type="file"
            name="coverImage"
            autoComplete="off"
            onChange={handleOnChange}
            accept="image/*"
            id="coverImage"
            className="bg-zinc-800 cursor-pointer mb-2 w-[250px] px-4 py-2 rounded-lg text-gray-100 outline-0 focus:ring-1 focus:ring-red-600 focus:transform-border"
          />
        </div>

        <button
          type="submit"
          id="register"
          name="register"
          disabled={loading}
          className={`mt-3 text-white bg-red-600 hover:bg-red-500 cursor-pointer px-5 py-1.5 rounded-lg hover-bg-red-700 transition-all${
            loading ? "cursor-not-allowed bg-red-400" : "cursor-pointer"
          }`}
        >
          {" "}
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}

export default Register;
