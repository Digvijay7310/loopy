import React from "react";
import { Link } from "react-router-dom";

function VideoCard() {
  return (
    <div className="cursor-pointer flex flex-col rounded-xl p-2 bg-zinc-950 hover:shadow-lg transition-shadow duration-300">
      <div className=" rounded-2xl overflow-hidden">
        <img
          src="https://up.yimg.com/ib/th?id=OIP.TcVLBkYGTO7F-M2i2N31EgHaEK&pid=Api&rs=1&c=1&qlt=95&w=203&h=114"
          alt="Video thumbnail"
          className="object-cover w-full h-full"
        />
      </div>
      <p className="text-white text-sm font-semibold mt-2 line-clamp-2">
        This video is made for design purpose only made by Digvijay Kumar, first
        creator of Loopy
      </p>
      <p className="text-gray-400 text-xs mt-1">500 views</p>

      <div className="flex items-center gap-3 mt-3">
        <img
          src="https://icon-library.com/images/user-png-icon/user-png-icon-16.jpg"
          alt="Channel profile"
          className="h-8 w-8 rounded-full border-2 border-red-600"
        />
        <div>
          <Link to="/" className="text-gray-200 text-sm font-medium">
            Digvijay Kumar
          </Link>
          <p className="text-gray-500 text-xs">20 June 2025</p>
        </div>
      </div>
    </div>
  );
}

function Home() {
  const videoCards = new Array(12).fill(null); // 12 sample cards

  return (
    <div className="bg-zinc-900 min-h-screen p-4">
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          gap-6
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
