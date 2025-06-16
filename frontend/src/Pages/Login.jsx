import React, { useState } from "react";
import axios from "../axios.js";
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
      const res = await axios.post(
        "/login",
        {
          form,
        },
        { withCredentials: true }
      );
      setAuthUser(res.data.data.user);
      setAccessToken(res.data.data.accessToken);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res.data.data.accessToken}`;
      alert("login Successfull");
      navigate("/");
    } catch (error) {
      setError(
        "Login failed, please try again later",
        error?.res?.data?.message
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center flex-col bg-gradient-to-r from-indigo-100 to-blue-100">
      <h3 className="text-4xl">Loopy</h3>

      <form
        id="loginForm"
        onSubmit={handleLogin}
        className="bg-white  p-8 rounded-xl shadow-xl w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Welcome back
        </h1>
        {error && (
          <p className="text-red-600 mb-4" aria-live="assertive">
            {error}
          </p>
        )}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-xl font-semibold mb-2"
            htmlFor="email"
            name="email"
          >
            Email:{" "}
          </label>
          <input
            id="email"
            name="email"
            autoComplete="email"
            type="email"
            onChange={handleOnChange}
            placeholder="Enter Email Address"
            required
            className="w-full px-4 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <br />
          <br />
          <label
            htmlFor="password"
            name="password"
            className="block text-gray-700 text-xl font-semibold mb-2"
          >
            Password:
          </label>
          <div className="flex items-center">
            <input
              id="password"
              name="password"
              autoComplete="current-password"
              type={showPassword ? "text" : "password"}
              onChange={handleOnChange}
              placeholder="Enter Password"
              className="w-full px-4 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="mt-2 text-blue-600"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-lg font-semibold cursor-pointer transition duration-200 ${
            loading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <br />
        <p className="text-blue-500 text-sm text-center">
          Don't have an account{" "}
          <Link className="text-red-600" to="/register">
            Register
          </Link>{" "}
        </p>
      </form>
    </div>
  );
}

export default Login;
