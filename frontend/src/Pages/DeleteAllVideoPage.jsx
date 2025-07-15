import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios";
import { toast } from "react-toastify";

const DeleteAllVideoPage = () => {
  const [videos, setVideos] = useState([]);
  const [loadingVideos, setLoadingVideos] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  // Fetch all user videos on mount
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
    <div className="min-h-screen bg-black text-white p-6 flex flex-col">
      <h1 className="text-3xl font-bold mb-6 text-red-600">Your Videos</h1>

      {loadingVideos ? (
        <p className="text-center text-gray-400">Loading videos...</p>
      ) : videos.length === 0 ? (
        <p className="text-center text-gray-400">You have no uploaded videos.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {videos.map((video) => (
            <div
              key={video._id}
              className="bg-zinc-900 rounded overflow-hidden shadow-lg hover:shadow-red-600 transition-shadow duration-300"
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-3">
                <h2 className="text-lg font-semibold truncate" title={video.title}>
                  {video.title}
                </h2>
                <p className="text-sm text-gray-400 mt-1 truncate">{video.description}</p>
                <p className="text-xs text-gray-500 mt-2">{video.views} views</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete All Videos button at bottom */}
      {videos.length > 0 && (
        <div className="fixed bottom-6 left-0 w-full flex justify-center px-6">
          <button
            onClick={handleDeleteAll}
            disabled={deleting}
            className="bg-red-700 hover:bg-red-800 transition-colors duration-300 py-3 px-10 rounded font-semibold text-white shadow-lg"
          >
            {deleting ? "Deleting all videos..." : "Delete All My Videos"}
          </button>
        </div>
      )}
    </div>
  );
};

export default DeleteAllVideoPage;
