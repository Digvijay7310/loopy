import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios";
import AOS from "aos";
import "aos/dist/aos.css";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axiosInstance.post("/users/login", formData, {
        withCredentials: true,
      });
      toast.success("Logged in successfully!");
      navigate("/users/profile");
    } catch (error) {
      const message = error.response?.data?.message || "Login failed";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 py-12 text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-zinc-900 p-8 rounded-lg border border-red-600 shadow-xl"
        data-aos="fade-up"
      >
        <h2 className="text-3xl font-bold text-center text-red-500 mb-6">
          Login to Loopy
        </h2>

        <div className="space-y-5">
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="bg-zinc-800 border border-gray-700 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="bg-zinc-800 border border-gray-700 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 transition-colors duration-300 font-semibold py-2 rounded"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>

        <p className="mt-6 text-sm text-center text-gray-400">
          Don’t have an account?{" "}
          <a href="/users/register" className="text-red-500 hover:underline">
            Register
          </a>
        </p>
      </form>
    </div>
  );
}

export default Login;
