import { useState, useEffect } from "react";
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

  // Clean up previews to avoid memory leaks
  useEffect(() => {
    return () => {
      if (videoPreview) URL.revokeObjectURL(videoPreview);
      if (thumbnailPreview) URL.revokeObjectURL(thumbnailPreview);
    };
  }, [videoPreview, thumbnailPreview]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files.length > 0) {
      const file = files[0];

      // Basic file size check
      if (name === "videoUrl" && file.size > 50 * 1024 * 1024) {
        return toast.error("Video must be under 50MB");
      }

      if (name === "thumbnail" && file.size > 5 * 1024 * 1024) {
        return toast.error("Thumbnail must be under 5MB");
      }

      setFormData((prev) => ({ ...prev, [name]: file }));

      const previewUrl = URL.createObjectURL(file);
      if (name === "videoUrl") setVideoPreview(previewUrl);
      if (name === "thumbnail") setThumbnailPreview(previewUrl);
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

        {/* Thumbnail */}
        <div className="space-y-2">
          <label htmlFor="thumbnail" className="text-gray-400">Thumbnail Image:</label>
          <input
            id="thumbnail"
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

        {/* Video File */}
        <div className="space-y-2">
          <label htmlFor="videoUrl" className="text-gray-400">Video File (MP4/WebM):</label>
          <input
            id="videoUrl"
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

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-red-600 hover:bg-red-700 font-semibold rounded transition-colors duration-300 disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload Video"}
        </button>
      </form>
    </div>
  );
}

export default VideoUpload;
