import React from "react";
import VideoCard from "../components/VideoCard";

function Home() {
  const videoCards = new Array(12).fill(null); // 12 sample cards

  return (
    <div className="bg-zinc-900 min-h-screen p-4">
      {/* Trending */}

      <div
        className="
          grid
          grid-cols-2
          sm:grid-cols-3
          md:grid-cols-4
          gap-4
          py-2
          overflow-x-auto
        "
      >
        {videoCards.map((_, idx) => (
          <VideoCard key={idx} />
        ))}
      </div>
    </div>
  );
}

export default Home;
