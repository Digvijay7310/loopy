import React, { useState } from "react";
import VideoCard from "../components/VideoCard";
import axiosInstance from "../axios.js";
import { useEffect } from "react";
import Loading from "../components/Loading.jsx";

function Home() {
  // const videoCards = new Array(12).fill(null); // 12 sample cards
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axiosInstance.get("/videos/videos", {
          withCredentials: true,
        });
        setVideos(res.data.data);
        console.log("fetched videos", res.data.data);
      } catch (error) {
        console.error("Error in fetching", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <main className="bg-zinc-900 min-h-screen text-white">
      {loading ? (
        <Loading />
      ) : (
        <div
          className="
          grid
          grid-cols-2
          sm:grid-cols-3
          md:grid-cols-3
          lg:grid-cols-4
          py-2
          overflow-x-auto
        "
        >
          {videos.length > 0 ? (
            videos.map((video, idx) => (
              <VideoCard key={video._id || idx} video={video} />
            ))
          ) : (
            <div className="col-span-full text-center text-lg">
              No Video Found
            </div>
          )}
        </div>
      )}
      {/* Trending */}
    </main>
  );
}

export default Home;
