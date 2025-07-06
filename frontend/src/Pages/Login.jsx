import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import AuthLoading from "../components/AuthLoading";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { setAuthUser } = useAuth();
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axiosInstance.post("users/login", form, {
        withCredentials: true,
      });

      const { user } = res.data.data;
      setAuthUser(user);

      toast.success("Login Successful!");
      navigate("/users");
    } catch (error) {
      setError(error?.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 p-4">
      <div className="bg-white/5 border border-white/10 rounded-lg shadow-xl p-6 backdrop-blur-sm w-full max-w-md">
        <form onSubmit={handleLogin} className="flex flex-col space-y-4">
          <h2 className="text-3xl font-bold text-center text-red-600">Login</h2>
          <p className="text-sm text-center text-white">
            Welcome back! Please enter your credentials.
          </p>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <div>
            <label htmlFor="email" className="block text-white mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleOnChange}
              placeholder="Enter your email"
              required
              className="w-full px-3 py-2 bg-zinc-900 border border-red-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-white mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleOnChange}
              placeholder="Enter your password"
              required
              className="w-full px-3 py-2 bg-zinc-900 border border-red-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-red-400 mt-1 text-sm underline"
            >
              {showPassword ? "Hide Password" : "Show Password"}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg font-semibold transition duration-200 ${
              loading
                ? "bg-red-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-500 text-white"
            }`}
          >
            {loading ? <div className="h-6 w-6 p-0.5"><AuthLoading/></div> : "Login"}
          </button>

          <p className="text-white text-sm text-center">
            Don't have an account?{" "}
            <Link to="/users/register" className="text-red-500 hover:underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}

export default Login;
