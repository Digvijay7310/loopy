import React, { useEffect, useState } from "react";
import VideoCard from "../components/VideoCard";  // VideoCard component ko import karo
import axiosInstance from "../axios";

const MyVideosPage = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMyVideos = async () => {
      try {
        // Agar token cookie me nahi hai to use localStorage ya context se le sakte hain
        // Yaha assume karte hain cookie me accessToken set hai and backend reads it
        const { data } = await axiosInstance.get("videos/my-videos", {
          withCredentials: true, // Cookies ke liye zaruri
        });

        setVideos(data.data); // assume response structure: { status, data: [...videos], message }
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch your videos.", err);
        setLoading(false);
      }
    };

    fetchMyVideos();
  }, []);

  if (loading) return <div>Loading your videos...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={{ maxWidth: 800, margin: "auto", padding: 20 }}>
      <h1>My Uploaded Videos</h1>
      {videos.length === 0 ? (
        <p>You haven't uploaded any videos yet.</p>
      ) : (
        videos.map(video => <VideoCard key={video._id} video={video} />)
      )}
    </div>
  );
};

export default MyVideosPage;
