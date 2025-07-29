import { useEffect, useState } from "react";
import axiosInstance from "../axios";
import VideoCard from "./VideoCard";
import AOS from "aos";
import "aos/dist/aos.css";

function AllVideosPage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const res = await axiosInstance.get("/videos/videos", { withCredentials: true });
        setVideos(res.data.data);
      } catch (err) {
        console.error("Failed to fetch videos", err);
      } finally {
        setLoading(false);
      }
    }
    fetchVideos();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-red-600 border-opacity-60"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
      <h1
        className="text-3xl sm:text-4xl font-bold text-black mb-8 text-center"
        data-aos="fade-up"
      >
        All Videos
      </h1>

      {videos.length === 0 ? (
        <p className="text-center text-gray-500 text-lg" data-aos="fade-up">
          No videos available at the moment.
        </p>
      ) : (
        <div className="bg-zinc-900 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map((video, index) => (
            <div key={video._id} data-aos="zoom-in-up" data-aos-delay={index * 100}>
              <VideoCard video={video} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllVideosPage;
