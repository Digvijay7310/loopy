import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../axios";
import AOS from "aos";
import "aos/dist/aos.css";
import { LuEye, LuEyeOff } from "react-icons/lu";
import LoginLoading from "../components/LoginLoading";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [seePassword, setSeePassword] = useState(false);

  const {setUser} = useContext(AuthContext)

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const togglePassword = () => {
    setSeePassword(prev => !prev);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
     const res =  await axiosInstance.post("/users/login", formData, {
        withCredentials: true,
      });

      setUser(res.data.user)
      console.log(res.data.user)
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
        id="login-form"
        aria-label="login form"
      >
        <h2 className="text-3xl font-bold text-center text-red-500 mb-6" aria-label="login to loopy">
          Login to Loopy
        </h2>

        <div className="space-y-5">
          <div className="flex flex-col">
            <label htmlFor="Email" className="text-sm mb-1" aria-label="Email for login">
              Email
            </label>
          
              <input
              type="email"
              name="email"
              placeholder="Enter your Email"
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
              type={seePassword ? "text" : "password"}               
              name="password"
              placeholder="Enter your password"
              className="bg-zinc-800 relative border border-gray-700 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
            className="relative"
            onClick={togglePassword}>{seePassword? <LuEye/> : <LuEyeOff /> }</button>
            </div>
          

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 transition-colors duration-300 font-semibold py-2 rounded"
          >
            {loading ? <LoginLoading/> : "Login"}
          </button>
        </div>

        <p className="mt-6 text-sm text-center text-gray-400">
          Don’t have an account?{" "}
          <Link to="/users/register" className="text-red-500 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
