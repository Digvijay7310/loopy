import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../axios";
import { toast } from "react-toastify";
import AOS from "aos";
import "aos/dist/aos.css";

const DeleteAVideoPage = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [video, setVideo] = useState(null);

  // Init AOS
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  // Fetch video details
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await axiosInstance.get(`/videos/video/${videoId}`, {
          withCredentials: true,
        });
        setVideo(res.data.data.video);
      } catch (error) {
        toast.error("Failed to load video details");
      }
    };
    fetchVideo();
  }, [videoId]);

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this video?");
    if (!confirmed) return;

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

  if (!video) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
        <p className="text-gray-300 animate-pulse">Loading video details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-10">
      <div
        className="w-full max-w-xl bg-zinc-900 border border-red-600 rounded-xl shadow-lg p-6"
        data-aos="fade-up"
      >
        <h1 className="text-3xl font-bold text-red-500 text-center mb-6">
          Delete This Video
        </h1>

        <h2 className="text-xl font-semibold mb-2 truncate">{video.title}</h2>
        <p className="text-gray-400 mb-4 line-clamp-3">{video.description}</p>

        <img
          src={video.thumbnail}
          alt={`Thumbnail for ${video.title}`}
          className="rounded-lg object-cover w-full max-h-64 mb-6"
        />

        <button
          onClick={handleDelete}
          disabled={loading}
          className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 transition-colors duration-300 py-3 rounded font-semibold text-white"
        >
          {loading ? "Deleting..." : "Delete Video"}
        </button>
      </div>
    </div>
  );
};

export default DeleteAVideoPage;
