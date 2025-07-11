import React, { useEffect, useState } from "react";
import VideoCard from "../components/VideoCard";
import axiosInstance from "../axios";

// Simple VideoCard component jo video info show karega
// const VideoCard = ({ video }) => {
//   return (
//     <div style={{ border: "1px solid #ddd", marginBottom: 20, padding: 10, borderRadius: 5 }}>
//       <img 
//         src={video.thumbnail} 
//         alt={video.title} 
//         style={{ width: "100%", maxHeight: 200, objectFit: "cover", borderRadius: 5 }} 
//       />
//       <h3>{video.title}</h3>
//       <p>By: {video.owner?.username || "Unknown"}</p>
//       <p>Views: {video.views || 0}</p>
//       <p>Uploaded: {new Date(video.createdAt).toLocaleDateString()}</p>
//     </div>
//   );
// };

const HomePage = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const { data } = await axiosInstance.get("/videos/videos");
        setVideos(data.data);  // Assuming response format: { status, data: [...videos], message }
        setLoading(false);
      } catch (err) {
        setError("Failed to load videos.", err);
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) return <div>Loading videos...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={{ maxWidth: 800, margin: "auto", padding: 20 }}>
      <h1>All Videos</h1>
      {videos.length === 0 ? (
        <p>No videos found.</p>
      ) : (
        videos.map(video => <VideoCard key={video._id} video={video} />)
      )}
    </div>
  );
};

export default HomePage;
