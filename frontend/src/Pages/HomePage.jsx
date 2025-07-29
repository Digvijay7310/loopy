import React, { useEffect, useState } from "react";
import VideoCard from "../components/VideoCard";
import axiosInstance from "../axios";
import AOS from "aos";
import "aos/dist/aos.css";
import { Helmet } from "react-helmet";

const HomePage = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize AOS animations
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
    <main className="min-h-screen bg-black text-gray-100 py-10 px-4 sm:px-6 lg:px-12">
<Helmet>
      <title>Home - Loopy</title>
      <meta
        name="description"
        content="Watch the latest and trending videos on YourSiteName. Explore diverse content and enjoy unlimited streaming."
      />
    </Helmet>

      {loading ? (
        <div
          role="status"
          aria-live="polite"
          className="flex justify-center items-center min-h-[30vh]"
        >
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-red-500" />
          <span className="sr-only">Loading videos...</span>
        </div>
      ) : error ? (
        <p className="text-center text-red-500 text-lg" role="alert">
          {error}
        </p>
      ) : videos.length === 0 ? (
        <p
          className="text-center text-gray-400 text-lg"
          data-aos="fade-up"
          aria-live="polite"
        >
          No videos found.
        </p>
      ) : (
        <section
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6"
          aria-label="Video list"
        >
          {videos.map((video, index) => (
            <div
              key={video._id}
              data-aos="zoom-in-up"
              data-aos-delay={index * 100}
              tabIndex={-1} // so it doesn't steal focus but still focusable programmatically
            >
              <VideoCard video={video} />
            </div>
          ))}
        </section>
      )}
    </main>
  );
};

export default HomePage;
