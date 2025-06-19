import React from "react";

function Home() {
  const videoCards = new Array(8).fill(null); // Simulate multiple cards

  return (
    <div className="bg-gray-700 min-h-screen py-8 px-4">
      <div className="flex flex-wrap justify-start gap-6">
        {videoCards.map((_, index) => (
          <div
            key={index}
            className="bg-gray-900 w-full sm:w-[48%] md:w-[31%] lg:w-[23%] rounded-md shadow-md overflow-hidden"
          >
            {/* Thumbnail */}
            <div className="w-full h-[170px] bg-gray-800">
              <img
                src="https://i.ytimg.com/vi/omNHraNRaKs/maxresdefault.jpg"
                alt="Video Thumbnail"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Details */}
            <div className="p-3 text-white">
              <p className="text-sm font-semibold mb-1 line-clamp-2">
                This is a new video sharing platform for Loopy
              </p>
              <p className="text-xs text-gray-400 mb-3">Views: 5000</p>

              {/* Author Info */}
              <div className="flex items-center gap-3">
                <img
                  src="https://tse4.mm.bing.net/th?id=OIP.AlIScK6urTegkZ178dAAGgHaHa&pid=Api&P=0&h=220"
                  alt="avatar"
                  className="w-9 h-9 rounded-full object-cover"
                />
                <p className="text-sm">Digvijay Kumar</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
