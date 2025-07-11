import React, { useState } from "react";
import axiosInstance from "../axios";

const VideoUpload = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !videoFile || !thumbnailFile) {
      alert("Title, video, and thumbnail are required.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("videoUrl", videoFile);
    formData.append("thumbnail", thumbnailFile);

    try {
      setUploading(true);
      const res = await axiosInstance.post("/videos/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true, // in case auth is required via cookies
      });

      alert("Video uploaded successfully!");
      console.log("Upload response:", res.data.data);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Video upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <h2>Upload a Video</h2>

      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div>
        <label>Video File:</label>
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setVideoFile(e.target.files[0])}
          required
        />
      </div>

      <div>
        <label>Thumbnail Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setThumbnailFile(e.target.files[0])}
          required
        />
      </div>

      <button type="submit" disabled={uploading}>
        {uploading ? "Uploading..." : "Upload Video"}
      </button>
    </form>
  );
};

export default VideoUpload;
