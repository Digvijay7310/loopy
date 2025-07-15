import { useEffect, useState } from "react";
import axiosInstance from "../axios";
import { toast } from "react-toastify";

function UpdateProfilePage() {
  const [formData, setFormData] = useState({
    fullName: "",
    avatar: null,
    coverImage: null,
  });
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get("/users/profile", {
          withCredentials: true,
        });
        const user = res.data.data;

        setFormData((prev) => ({
          ...prev,
          fullName: user.fullName || "",
        }));
        setAvatarPreview(user.avatar);
        setCoverImagePreview(user.coverImage);
      } catch (err) {
        toast.error("Failed to load profile");
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files.length > 0) {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        [name]: file,
      }));
      const previewURL = URL.createObjectURL(file);
      if (name === "avatar") setAvatarPreview(previewURL);
      if (name === "coverImage") setCoverImagePreview(previewURL);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updateForm = new FormData();
      if (formData.fullName) updateForm.append("fullName", formData.fullName);
      if (formData.avatar) updateForm.append("avatar", formData.avatar);
      if (formData.coverImage) updateForm.append("coverImage", formData.coverImage);

      const res = await axiosInstance.put("/users/update-profile", updateForm, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success(res.data.message || "Profile updated successfully!");
    } catch (err) {
      console.error("Update error:", err);
      const msg = err?.response?.data?.message || "Internal Server Error. Try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl font-bold text-red-500 mb-6">Update Profile</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 border border-red-600 shadow-xl rounded-lg p-6 w-full max-w-xl space-y-6"
        encType="multipart/form-data"
      >
        <div>
          <label className="block mb-1 text-gray-300">Full Name</label>
          <input
            type="text"
            name="fullName"
            className="w-full bg-zinc-800 border border-gray-700 rounded px-4 py-2"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-300">Avatar</label>
          <input
            type="file"
            name="avatar"
            accept="image/*"
            onChange={handleChange}
            className="w-full text-white"
          />
          {avatarPreview && (
            <img
              src={avatarPreview}
              alt="Avatar Preview"
              className="w-20 h-20 rounded-full mt-2 object-cover"
            />
          )}
        </div>

        <div>
          <label className="block mb-1 text-gray-300">Cover Image</label>
          <input
            type="file"
            name="coverImage"
            accept="image/*"
            onChange={handleChange}
            className="w-full text-white"
          />
          {coverImagePreview && (
            <img
              src={coverImagePreview}
              alt="Cover Preview"
              className="w-full h-40 mt-2 object-cover rounded"
            />
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-red-600 hover:bg-red-700 transition rounded font-semibold"
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
}

export default UpdateProfilePage;
