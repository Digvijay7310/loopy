import React, { useState } from "react";
import axiosInstance from "../axios.js";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { setAuthUser, setAccessToken } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleOnChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axiosInstance.post(
        "users/login",

        form,

        { withCredentials: true }
      );
      console.log(res.data);
      setAuthUser(res.data.message.user);
      setAccessToken(res.data.message.accessToken);
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res.data.message.accessToken}`;

      console.log("Login successfull", res.data);

      alert("login Successfull");
      navigate("/users/profile");
    } catch (error) {
      setError(
        "Login failed, please try again later",
        error?.response?.data?.message
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="min-h-screen flex flex-col items-center bg-zinc-900">
      <form
        id="loginForm"
        onSubmit={handleLogin}
        className="bg-zinc-800  p-8 rounded-xl shadow-xl w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-center text-red-600 mb-6">
          Welcome back
        </h1>
        {error && (
          <p className="text-red-600 mb-4" aria-live="assertive">
            {error}
          </p>
        )}
        <div className="mb-4">
          <label
            className="block text-white text-xl font-semibold mb-2"
            htmlFor="email"
            name="email"
          >
            Email:{" "}
          </label>
          <input
            id="email"
            name="email"
            autoComplete="on"
            type="email"
            onChange={handleOnChange}
            placeholder="Enter Email Address"
            required
            className="w-full text-white px-4 py-2 border border-red-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          <br />
          <br />
          <label
            htmlFor="password"
            name="password"
            className="block text-white text-xl font-semibold mb-2"
          >
            Password:
          </label>
          <div className="flex items-center">
            <input
              id="password"
              name="password"
              autoComplete="on"
              type={showPassword ? "text" : "password"}
              onChange={handleOnChange}
              placeholder="Enter Password"
              className="w-full text-white px-4 py-2 border border-red-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="mt-2 text-red-600"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-lg font-semibold cursor-pointer transition duration-200 ${
            loading
              ? "bg-red-400 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-500 text-white"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <br />
        <p className="text-white text-sm text-center">
          Don't have an account ?{" "}
          <Link className="text-red-600" to="/api/v1/users/register">
            Register
          </Link>{" "}
        </p>
      </form>
    </main>
  );
}

export default Login;
