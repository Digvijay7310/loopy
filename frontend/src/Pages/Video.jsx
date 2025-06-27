import React from "react";
import WatchVideo from "../components/WatchVideo";
import VideoCard from "../components/VideoCard";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axiosInstance from "../axios";
import Loading from "../components/Loading";

function Video() {
  const { id } = useParams();
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axiosInstance.get(`videos/video/${id}`);
        setVideoData(res.data.data);
      } catch (error) {
        console.error("Failed to fetch");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  if (loading) return <Loading />;
  if (!videoData) return <div className="text-white"> Vidoe not found</div>;

  const { video, relatedVideo } = videoData;
  return (
    <main className="bg-zinc-900 min-h-screen text-white">
      <div>
        <WatchVideo video={video} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3  rounded-md">
        {relatedVideo && relatedVideo.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 rounded-md">
            {relatedVideo.map((v) => (
              <VideoCard key={v._id} video={v} />
            ))}
          </div>
        ) : (
          <p className="text-center py-4 text-gray-300">
            No related videos found.
          </p>
        )}
      </div>
    </main>
  );
}

export default Video;
