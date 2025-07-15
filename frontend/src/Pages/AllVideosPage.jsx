import { useEffect, useState } from "react";
import axiosInstance from "../axios";
import VideoCard from "./VideoCard";

function AllVideosPage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const res = await axiosInstance.get("/videos/videos", { withCredentials: true });
        setVideos(res.data.data); // assuming res.data.data contains videos array
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchVideos();
  }, []);

  if (loading) return <p className="text-center mt-10 text-white">Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto mt-8">
      <h1 className="text-gray-700 text-3xl font-bold mb-6 px-4">All Videos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 px-4">
        {videos.map((video) => (
          <VideoCard key={video._id} video={video} />
         
        ))}
      </div>
    </div>
  );
}

export default AllVideosPage;
