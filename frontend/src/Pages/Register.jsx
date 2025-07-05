import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
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
    setLoading(true);
    if(!form.fullName || !form.username || !form.avatar || !form.coverImage || !form.email || !form.password){
      alert("All fields are required")
      return
    }

    const formData = new FormData();
    for (const key in form) {
      if (form[key]) {
        formData.append(key, form[key]);
      }
    }

    try {
      const res = await axiosInstance.post("users/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true
      });

      const {accessToken, refreshToken, user} = res.data.data;
      setAccessToken(accessToken);
      setAuthUser(user);

      localStorage.setItem("accessToken", accessToken)
      localStorage.setItem("refreshToken", refreshToken)  
      
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      alert("User Register successfully");
      navigate("/users");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className=" bg-zinc-900 min-h-screen p-4 ">
      <div className="flex justify-center items-center">
        <form
          id="register"
          onSubmit={handleRegister}
          className="flex  justify-center items-center flex-col max-w-[500px] rounded-xl bg-zinc-800 p-8 "
        >
          <h2 className="text-3xl md:4xl pt-5 text-red-500 gap-1 mb-6 font-semibold text-shadow-2xs">
            Register
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 md:place-items-center">
            <label
              htmlFor="fullName"
              className="font-semibold text-white md:lg"
            >
              FullName:
            </label>
            <input
              name="fullName"
              id="fullName"
              type="text"
              value={form.fullName}
              autoComplete="on"
              onChange={handleOnChange}
              placeholder="FullName"
              className="bg-zinc-800 mb-2 w-[250px] px-4 py-2 rounded-lg text-gray-100 outline-0 x  ring-1 ring-red-600 "
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
              autoComplete="on"
              onChange={handleOnChange}
              placeholder="Enter username"
              className="bg-zinc-800 mb-2 w-[250px] px-4 py-2 rounded-lg text-gray-100 outline-0 ring-1 ring-red-600 "
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 md:place-items-center">
            <label htmlFor="email" className="font-semibold text-white">
              Email:
            </label>
            <input
              name="email"
              type="email"
              // id="email"
              autoComplete="on"
              value={form.email}
              onChange={handleOnChange}
              placeholder="Enter Email"
              className="bg-zinc-800 mb-2 w-[250px] px-4 py-2 rounded-lg text-gray-100 outline-0 ring-1 ring-red-600 "
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
              autoComplete="on"
              value={form.password}
              onChange={handleOnChange}
              placeholder="Enter Password"
              className="bg-zinc-800 mb-2 w-[250px] px-4 py-2 rounded-lg text-gray-100 outline-0 ring-1 ring-red-600 "
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 md:place-items-center">
            <label htmlFor="avatar" className="font-semibold text-white">
              Avatar:
            </label>
            <input
              type="file"
              name="avatar"
              autoComplete="on"
              onChange={handleOnChange}
              accept="image/*"
              id="avatar"
              className="bg-zinc-800 cursor-pointer mb-2 w-[250px] px-4 py-2 rounded-lg text-gray-100 outline-0 ring-1 ring-red-600 "
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 md:place-items-center">
            <label htmlFor="coverImage" className="font-semibold text-white">
              CoverImage:
            </label>
            <input
              type="file"
              name="coverImage"
              autoComplete="on"
              onChange={handleOnChange}
              accept="image/*"
              id="coverImage"
              className="bg-zinc-800 cursor-pointer mb-2 w-[250px] px-4 py-2 rounded-lg text-gray-100 outline-0 ring-1 ring-red-600 "
            />
          </div>

          <button
            type="submit"
            // id="register"
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
    </main>
  );
}

export default Register;
