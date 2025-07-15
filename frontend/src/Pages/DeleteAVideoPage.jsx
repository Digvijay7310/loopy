import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../axios";
import { toast } from "react-toastify";

const DeleteAVideoPage = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [video, setVideo] = useState(null);

  // Fetch video details to confirm deletion
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await axiosInstance.get(`/videos/video/${videoId}`, {
          withCredentials: true,
        });
        setVideo(res.data.data.video); // assuming API returns { video }
      } catch (error) {
        toast.error("Failed to load video details");
      }
    };
    fetchVideo();
  }, [videoId]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this video?")) return;

    setLoading(true);
    try {
      await axiosInstance.delete(`/videos/delete-my-video/${videoId}`, {
        withCredentials: true,
      });
      toast.success("Video deleted successfully");
      navigate("/videos/my-videos");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete video");
    } finally {
      setLoading(false);
    }
  };

  if (!video)
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
        <p>Loading video details...</p>
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4">
      <h1 className="text-3xl font-bold mb-6 text-red-600">Delete Video</h1>
      <div className="max-w-xl w-full bg-zinc-900 rounded-lg shadow-lg p-6 border border-red-600">
        <h2 className="text-xl font-semibold mb-2">{video.title}</h2>
        <p className="mb-4 text-gray-400">{video.description}</p>
        <img
          src={video.thumbnail}
          alt={video.title}
          className="mb-6 rounded-lg object-cover w-full max-h-64"
        />

        <button
          onClick={handleDelete}
          disabled={loading}
          className="w-full bg-red-700 hover:bg-red-800 transition-colors duration-300 py-3 rounded font-semibold text-white"
        >
          {loading ? "Deleting..." : "Delete Video"}
        </button>
      </div>
    </div>
  );
};

export default DeleteAVideoPage;
