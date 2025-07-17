import { useEffect, useState } from "react";
import axiosInstance from "../axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

function MyLikesPage() {
  const [likedVideos, setLikedVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  useEffect(() => {
    const fetchLikedVideos = async () => {
      try {
        const res = await axiosInstance.get("/videos/my-likes-videos", {
          withCredentials: true,
        });
        setLikedVideos(res.data.data);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load liked videos");
      } finally {
        setLoading(false);
      }
    };

    fetchLikedVideos();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p className="animate-pulse text-lg">Loading liked videos...</p>
      </div>
    );
  }

  if (!likedVideos.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4">
        <h2 className="text-3xl font-semibold mb-4 text-red-500">No liked videos found</h2>
        <p className="text-gray-400 text-center max-w-md">
          You haven't liked any videos yet. Watch and like videos to see them here.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-red-500 mb-10 text-center" data-aos="fade-down">
        My Liked Videos
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {likedVideos.map((video, index) => (
          <div
            key={video._id}
            onClick={() => navigate(`/videos/video/${video._id}`)}
            className="bg-zinc-900 rounded-lg overflow-hidden shadow-md hover:shadow-red-500 transition-shadow duration-300 cursor-pointer"
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2 text-red-400 line-clamp-2">
                {video.title}
              </h2>
              <p className="text-sm text-gray-400 line-clamp-3">
                {video.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyLikesPage;
