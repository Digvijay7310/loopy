import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../axios";
import VideoCard from "../components/VideoCard";

function MyVideosPage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyVideos = async () => {
    try {
      const res = await axiosInstance.get("/videos/my-videos", {
        withCredentials: true,
      });

      setVideos(res.data.data || []);
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to fetch videos";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyVideos();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8">
      <h1 className="text-3xl font-bold text-red-500 mb-6 text-center">
        Your Uploaded Videos
      </h1>

      {loading ? (
        <p className="text-center text-gray-400">Loading...</p>
      ) : videos.length === 0 ? (
        <p className="text-center text-gray-400">No videos uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
}

export default MyVideosPage;
