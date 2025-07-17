import { useEffect, useState } from "react";
import axiosInstance from "../axios";
import { toast } from "react-toastify";

function UpdateProfilePage() {
  const [formData, setFormData] = useState({
    fullName: "",
    avatar: null,
    coverImage: null,
  });

  const [initialProfile, setInitialProfile] = useState({});
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Helper: Preview generator
  const createPreview = (file) => file && URL.createObjectURL(file);

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

        setInitialProfile({
          fullName: user.fullName,
          avatar: user.avatar,
          coverImage: user.coverImage,
        });

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

      // Optional: add file size/type validation
      if (file.size > 2 * 1024 * 1024) {
        toast.error(`${name} must be less than 2MB`);
        return;
      }

      setFormData((prev) => ({ ...prev, [name]: file }));

      if (name === "avatar") setAvatarPreview(createPreview(file));
      if (name === "coverImage") setCoverImagePreview(createPreview(file));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const isFormUnchanged =
    formData.fullName === initialProfile.fullName &&
    formData.avatar === null &&
    formData.coverImage === null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormUnchanged) {
      toast.info("No changes to update.");
      return;
    }

    setLoading(true);

    try {
      const updateForm = new FormData();

      if (formData.fullName && formData.fullName !== initialProfile.fullName) {
        updateForm.append("fullName", formData.fullName);
      }
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
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block mb-1 text-gray-300">Full Name</label>
          <input
            id="fullName"
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full bg-zinc-800 border border-gray-700 rounded px-4 py-2"
          />
        </div>

        {/* Avatar Upload */}
        <div>
          <label htmlFor="avatar" className="block mb-1 text-gray-300">Avatar</label>
          <input
            id="avatar"
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

        {/* Cover Image Upload */}
        <div>
          <label htmlFor="coverImage" className="block mb-1 text-gray-300">Cover Image</label>
          <input
            id="coverImage"
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

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || isFormUnchanged}
          className="w-full py-2 bg-red-600 hover:bg-red-700 transition rounded font-semibold disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
}

export default UpdateProfilePage;
