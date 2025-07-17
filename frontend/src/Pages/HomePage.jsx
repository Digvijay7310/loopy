import React, { useEffect, useState } from "react";
import VideoCard from "../components/VideoCard";
import axiosInstance from "../axios";
import AOS from "aos";
import "aos/dist/aos.css";

const HomePage = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const { data } = await axiosInstance.get("/videos/videos");
        setVideos(data.data);
      } catch (err) {
        setError("Failed to load videos.");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-800 text-gray-100 py-10 sm:px-6 lg:px-12">
      <div className="">
        {loading ? (
          <div className="flex justify-center items-center min-h-[30vh]">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
          </div>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : videos.length === 0 ? (
          <p className="text-center text-gray-500 text-lg" data-aos="fade-up">
            No videos found.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {videos.map((video, index) => (
              <div key={video._id} data-aos="zoom-in-up" data-aos-delay={index * 100}>
                <VideoCard video={video} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
