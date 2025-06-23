import React from "react";
import WatchVideo from "../components/WatchVideo";
import VideoCard from "../components/VideoCard";

function Video() {
  const videos = new Array(10).fill(null);
  return (
    <div className="bg-zinc-900">
      <div>
        <WatchVideo />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3  rounded-md">
        {videos.map((_, idx) => (
          <div key={idx}>
            <VideoCard />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Video;
