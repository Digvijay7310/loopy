import React, { useState, useEffect } from "react";
import VideoCard from "../components/VideoCard";
import axiosInstance from "../axios.js";
import Loading from "../components/Loading.jsx";

function Home() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axiosInstance.get("/videos/videos", {
          withCredentials: true,
        });
        setVideos(res.data.data);
        console.log("Fetched videos:", res.data.data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <main className="bg-zinc-900 min-h-screen text-white px-4 sm:px-6 lg:px-8">
      {loading ? (
        <Loading />
      ) : (
        <div className="max-w-screen-xl mx-auto py-6">
          {videos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {videos.map((video, idx) => (
                <VideoCard key={video._id || idx} video={video} />
              ))}
            </div>
          ) : (
            <div className="text-center text-lg py-10">No Videos Found</div>
          )}
        </div>
      )}
    </main>
  );
}

export default Home;
