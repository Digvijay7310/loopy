import React, { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "../axios";

const UpdateProfile = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    avatar: null,       // file object
    coverImage: null,   // file object
  });

  // For showing current avatar and coverImage preview
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch user profile on component mount
    const fetchProfile = async () => {
      try {
        const { data } = await axiosInstance.get("users/profile", {
          withCredentials: true,
        });
        const user = data.data;
        setFormData(prev => ({
          ...prev,
          fullName: user.fullName || "",
        }));
        setAvatarPreview(user.avatar || null);
        setCoverPreview(user.coverImage || null);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = e => {
    if (e.target.name === "avatar" || e.target.name === "coverImage") {
      const file = e.target.files[0];
      if (file) {
        setFormData(prev => ({ ...prev, [e.target.name]: file }));

        // Show preview immediately on file select
        const reader = new FileReader();
        reader.onloadend = () => {
          if (e.target.name === "avatar") setAvatarPreview(reader.result);
          if (e.target.name === "coverImage") setCoverPreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const formPayload = new FormData();
      formPayload.append("fullName", formData.fullName);
      if (formData.avatar) formPayload.append("avatar", formData.avatar);
      if (formData.coverImage) formPayload.append("coverImage", formData.coverImage);

      const res = await axiosInstance.put(
        "users/update-profile",
        formPayload,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setMessage("Profile updated successfully!");
    } catch (err) {
      setError("Failed to update profile.");
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>Full Name:</label><br />
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ marginTop: 10 }}>
          <label>Avatar (image):</label><br />
          {avatarPreview && (
            <img
              src={avatarPreview}
              alt="Avatar Preview"
              style={{ width: 100, height: 100, borderRadius: "50%", objectFit: "cover", marginBottom: 5 }}
            />
          )}
          <input
            type="file"
            name="avatar"
            accept="image/*"
            onChange={handleChange}
          />
        </div>

        <div style={{ marginTop: 10 }}>
          <label>Cover Image:</label><br />
          {coverPreview && (
            <img
              src={coverPreview}
              alt="Cover Preview"
              style={{ width: "100%", maxHeight: 150, objectFit: "cover", borderRadius: 8, marginBottom: 5 }}
            />
          )}
          <input
            type="file"
            name="coverImage"
            accept="image/*"
            onChange={handleChange}
          />
        </div>

        <button type="submit" disabled={loading} style={{ marginTop: 20 }}>
          {loading ? "Updating..." : "Update Profile"}
        </button>

        {message && <p style={{ color: "green", marginTop: 10 }}>{message}</p>}
        {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}
      </form>
    </div>
  );
};

export default UpdateProfile;
