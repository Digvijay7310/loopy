import React from "react";

const dummySuggestions = [
  {
    id: 1,
    avatar: "/th.jpg",
    title: "Video One",
    thumbnail: "/thumbnail.jpg",
    views: "500 views",
    username: "Hello",
  },
  {
    id: 2,
    avatar: "/th.jpg",
    title: "Video Two",
    thumbnail: "/thumbnail.jpg",
    views: "500 views",
    username: "Hello",
  },
  {
    id: 3,
    avatar: "/th.jpg",
    title: "Video Three",
    thumbnail: "/thumbnail.jpg",
    views: "500 views",
    username: "Hello",
  },
  {
    id: 4,
    avatar: "/th.jpg",
    title: "Video Four",
    thumbnail: "/thumbnail.jpg",
    views: "500 views",
    username: "Hello",
  },
];

function SuggestionVideo() {
  return (
    <div className="bg-zinc-900 py-6">
      <h2 className="text-white text-xl font-bold mb-4 px-4">Suggested Videos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 px-4">
        {dummySuggestions.map((video) => (
          <div
            key={video.id}
            className="bg-zinc-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300"
          >
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-3">
              <h3 className="text-white font-semibold text-base mb-2">{video.title}</h3>
              <div className="flex items-center gap-3">
                <img
                  src={video.avatar}
                  alt="avatar"
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div className="flex flex-col text-sm text-gray-300">
                  <span className="font-medium">{video.username}</span>
                  <span className="text-xs">{video.views}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SuggestionVideo;
