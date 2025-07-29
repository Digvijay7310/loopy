import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../axios";
import { Helmet } from "react-helmet";
import AOS from "aos";
import "aos/dist/aos.css";

function UpdateProfilePage() {
  const [fullName, setFullName] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Get current user profile to prefill
  const fetchProfile = async () => {
    try {
      const res = await axiosInstance.get("/users/profile", { withCredentials: true });
      const data = res.data.data;
      setFullName(data.fullName);
      setAvatarPreview(data.avatar);
      setCoverPreview(data.coverImage);
    } catch (err) {
      toast.error("Failed to load profile info");
    }
  };

  useEffect(() => {
    fetchProfile();
    AOS.init({ duration: 700, once: true });
  }, []);

  // Handle form submit
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("fullName", fullName);
      if (avatarFile) formData.append("avatar", avatarFile);
      if (coverFile) formData.append("coverImage", coverFile);

      const res = await axiosInstance.put("/users/update-profile", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Profile updated successfully!");
      fetchProfile(); // refresh data
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10">
      <Helmet>
        <title>Update Profile | Loopy</title>
        <meta name="description" content="Update your profile details including avatar and cover image" />
      </Helmet>

      <div className="max-w-3xl mx-auto bg-gray-900 p-6 rounded-lg shadow-xl" data-aos="fade-up">
        <h2 className="text-2xl font-bold mb-6 text-center">Update Your Profile</h2>

        <form onSubmit={handleUpdate} className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-gray-300 mb-1">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter full name"
            />
          </div>

          {/* Avatar Upload */}
          <div>
            <label className="block text-gray-300 mb-1">Avatar (Profile Picture)</label>
            {avatarPreview && (
              <img
                src={avatarPreview}
                alt="Current Avatar"
                className="h-20 w-20 rounded-full mb-2 object-cover border"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                setAvatarFile(file);
                setAvatarPreview(URL.createObjectURL(file));
              }}
              className="text-sm text-gray-300"
            />
          </div>

          {/* Cover Image Upload */}
          <div>
            <label className="block text-gray-300 mb-1">Cover Image</label>
            {coverPreview && (
              <img
                src={coverPreview}
                alt="Current Cover"
                className="h-32 w-full object-cover rounded mb-2"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                setCoverFile(file);
                setCoverPreview(URL.createObjectURL(file));
              }}
              className="text-sm text-gray-300"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded transition"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateProfilePage;
