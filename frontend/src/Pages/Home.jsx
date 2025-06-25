import React, { useState } from "react";
import VideoCard from "../components/VideoCard";
import axiosInstance from "../axios.js";

function Home() {
  // const videoCards = new Array(12).fill(null); // 12 sample cards

  const [loading, setLoading] = useState(false);
  try {
    const res = axiosInstance.get("/videos/videos", { withCredentials: true });
    console.log(res.data);
    alert("Video fetch successfull");
  } catch (error) {
    console.error("Error in fetching", error);
  }

  return (
    <main className="bg-zinc-900 min-h-screen">
      {/* Trending */}

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
        {<VideoCard key={idx} />}
      </div>
    </main>
  );
}

export default Home;
