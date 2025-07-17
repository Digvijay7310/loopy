import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios";
import { toast } from "react-toastify";
import AOS from "aos";
import "aos/dist/aos.css";

const DeleteAllVideoPage = () => {
  const [videos, setVideos] = useState([]);
  const [loadingVideos, setLoadingVideos] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  // Init AOS
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  // Fetch user videos
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axiosInstance.get("/videos/my-videos", {
          withCredentials: true,
        });
        setVideos(res.data.data);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load videos");
      } finally {
        setLoadingVideos(false);
      }
    };

    fetchVideos();
  }, []);

  // Delete all videos
  const handleDeleteAll = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete ALL your videos? This action cannot be undone."
    );
    if (!confirmed) return;

    setDeleting(true);
    try {
      await axiosInstance.delete("/videos/delete-all-videos", {
        withCredentials: true,
      });
      toast.success("All your videos have been deleted successfully!");
      navigate("/videos/my-videos");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete videos");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 pb-28">
      <h1
        className="text-3xl md:text-4xl font-bold mb-8 text-red-500 text-center"
        data-aos="fade-down"
      >
        Your Videos
      </h1>

      {loadingVideos ? (
        <div className="flex justify-center items-center h-[40vh]">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-red-600 border-opacity-60"></div>
        </div>
      ) : videos.length === 0 ? (
        <p className="text-center text-gray-400 text-lg" data-aos="fade-up">
          You have no uploaded videos.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-20">
          {videos.map((video, index) => (
            <div
              key={video._id}
              className="bg-zinc-900 rounded-lg overflow-hidden shadow-md hover:shadow-red-600 transition-shadow duration-300"
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >
              <img
                src={video.thumbnail}
                alt={`Thumbnail for ${video.title}`}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold truncate" title={video.title}>
                  {video.title}
                </h2>
                <p className="text-sm text-gray-400 mt-1 line-clamp-2">{video.description}</p>
                <p className="text-xs text-gray-500 mt-2">{video.views} views</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete All Button */}
      {videos.length > 0 && (
        <div className="fixed bottom-6 left-0 w-full flex justify-center px-6">
          <button
            onClick={handleDeleteAll}
            disabled={deleting}
            className="bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 py-3 px-8 rounded-lg font-semibold text-white shadow-lg"
          >
            {deleting ? "Deleting all videos..." : "Delete All My Videos"}
          </button>
        </div>
      )}
    </div>
  );
};

export default DeleteAllVideoPage;
