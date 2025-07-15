import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../axios";

function VideoUpload() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    videoUrl: null,
    thumbnail: null,
  });

  const [videoPreview, setVideoPreview] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, [name]: file }));

      if (name === "videoUrl") setVideoPreview(URL.createObjectURL(file));
      if (name === "thumbnail") setThumbnailPreview(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, videoUrl, thumbnail } = formData;

    if (!title || !description || !videoUrl || !thumbnail) {
      return toast.error("All fields are required.");
    }

    const payload = new FormData();
    payload.append("title", title);
    payload.append("description", description);
    payload.append("videoUrl", videoUrl);
    payload.append("thumbnail", thumbnail);

    setLoading(true);
    try {
      const res = await axiosInstance.post("/videos/upload", payload, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success(res.data.message || "Video uploaded successfully!");
      navigate("/videos/my-videos");
    } catch (err) {
      const msg = err.response?.data?.message || "Upload failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-black text-white p-4 pt-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-zinc-900 border border-red-600 rounded-lg p-6 space-y-5 shadow-lg"
      >
        <h2 className="text-3xl font-bold text-red-500 text-center">Upload Video</h2>

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full px-4 py-2 bg-zinc-800 text-white rounded border border-zinc-700 focus:ring-2 focus:ring-red-500"
          required
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          rows={4}
          className="w-full px-4 py-2 bg-zinc-800 text-white rounded border border-zinc-700 focus:ring-2 focus:ring-red-500 resize-none"
          required
        />

        <div className="space-y-2">
          <label className="text-gray-400">Thumbnail Image:</label>
          <input
            type="file"
            name="thumbnail"
            accept="image/*"
            onChange={handleChange}
            className="text-white"
            required
          />
          {thumbnailPreview && (
            <img
              src={thumbnailPreview}
              alt="Thumbnail Preview"
              className="w-48 h-28 object-cover border border-red-500 rounded mt-2"
            />
          )}
        </div>

        <div className="space-y-2">
          <label className="text-gray-400">Video File (MP4/WebM):</label>
          <input
            type="file"
            name="videoUrl"
            accept="video/*"
            onChange={handleChange}
            className="text-white"
            required
          />
          {videoPreview && (
            <video
              src={videoPreview}
              controls
              className="w-full max-h-64 mt-2 rounded border border-red-500"
            />
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-red-600 hover:bg-red-700 font-semibold rounded transition-colors duration-300"
        >
          {loading ? "Uploading..." : "Upload Video"}
        </button>
      </form>
    </div>
  );
}

export default VideoUpload;
