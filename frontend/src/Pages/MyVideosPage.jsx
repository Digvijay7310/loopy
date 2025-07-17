import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../axios";
import VideoCard from "../components/VideoCard";
import AOS from "aos";
import "aos/dist/aos.css";

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
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-red-500 mb-10 text-center" data-aos="fade-down">
        Your Uploaded Videos
      </h1>

      {loading ? (
        <p className="text-center text-gray-400 animate-pulse">Loading...</p>
      ) : videos.length === 0 ? (
        <p className="text-center text-gray-500">No videos uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, idx) => (
            <div key={video._id} data-aos="fade-up" data-aos-delay={idx * 100}>
              <VideoCard video={video} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyVideosPage;
