import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../axios";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    avatar: null,
    coverImage: null,
  });

  const [loading, setLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "avatar") {
      setFormData((prev) => ({ ...prev, avatar: files[0] }));
      setAvatarPreview(URL.createObjectURL(files[0]));
    } else if (name === "coverImage") {
      setFormData((prev) => ({ ...prev, coverImage: files[0] }));
      setCoverPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.avatar || !formData.coverImage) {
      toast.error("Please upload both avatar and cover image.");
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    setLoading(true);
    try {
      await axiosInstance.post("/users/register", data, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Registered successfully!");
      navigate("/users/profile");
    } catch (error) {
      const message = error.response?.data?.message || "Registration failed";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-zinc-900 p-8 rounded-lg shadow-lg border border-red-600"
      >
        <h2 className="text-3xl font-bold text-center text-red-500 mb-6">
          Register on Loopy
        </h2>

        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            name="fullName"
            onChange={handleChange}
            value={formData.fullName}
            placeholder="Full Name"
            className="input-field"
            required
          />
          <input
            type="text"
            name="username"
            onChange={handleChange}
            value={formData.username}
            placeholder="Username"
            className="input-field"
            required
          />
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
            placeholder="Email"
            className="input-field"
            required
          />
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={formData.password}
            placeholder="Password"
            className="input-field"
            required
          />

          <div>
            <label className="block mb-1 text-sm">Avatar (Profile Photo)</label>
            <input
              type="file"
              name="avatar"
              onChange={handleChange}
              accept="image/*"
              className="input-file"
              required
            />
            {avatarPreview && (
              <img
                src={avatarPreview}
                alt="Avatar Preview"
                className="mt-2 rounded-full w-24 h-24 object-cover border-2 border-red-600"
              />
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm">Cover Image</label>
            <input
              type="file"
              name="coverImage"
              onChange={handleChange}
              accept="image/*"
              className="input-file"
              required
            />
            {coverPreview && (
              <img
                src={coverPreview}
                alt="Cover Preview"
                className="mt-2 rounded-lg w-full h-32 object-cover"
              />
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 transition-colors duration-300 font-semibold py-2 rounded text-white"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </div>

        <p className="text-sm text-white mt-6 text-center">
          Already registered?{" "}
          <Link to="/users/login" className="text-red-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
