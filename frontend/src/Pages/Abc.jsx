import React from "react";
import { useState } from "react";
import ArrowUp from "../components/ArrowUp";

function abc() {
  const [activeTab, setActiveTab] = useState("videos");

  const user = {
    name: "Digvijay kumar",
    username: "loopy_digvijay",
    avatarUrl: "../../public/th.jpg",
    bio: "Exploring code and creativity and nature lover Coding enthusasit. Every time eager to grow and eager to learn new tools and technologies currently learning mern stack with ai to build next generation prodduction level",
    followers: 100,
    following: 120,
    coverImage: "../../public/thumbnail.jpg",
    videos: [
      { id: 1, thumbnail: "../../public/thumbnail.jpg" },
      { id: 2, thumbnail: "../../public/thumbnail.jpg" },
    ],
    likedVideo: [],
  };
  return (
    <div className="bg-zinc-900 p-4 min-h-screen">
      <div className="max-w-4xl mx-auto bg-zinc-800 p-4">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-3">
          <img
            src={user.coverImage}
            alt="Cover image"
            className="w-full max-h-[25vh]"
          />
          <img
            src={user.avatarUrl}
            alt="avatar url"
            className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
          />
          <h2 className="text-2xl text-white font-bold">{user.name}</h2>
          <p className="text-gray-200">@{user.username}</p>
          <p className="text-sm text-gray-200 max-w-sm">{user.bio}</p>

          <button className="mt-3 px-4 py-1.5 text-sm rounded-xl bg-red-600 text-white hover:bg-red-700">
            Edit Profile
          </button>
        </div>

        {/* Tabs */}
        <div className="mt-6 flex justify-center gap-4 border-b bg-zinc-800">
          {["videos", "liked", "settings"].map((tab) => (
            <button
              key={tab}
              className={`pb-2 px-4 text-sm font-medium border-b-2 ${
                activeTab === tab
                  ? "border-red-600 text-red-600"
                  : "border-transparent text-gray-500"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "videos" && "My Videos"}
              {tab === "liked" && "Liked Videos"}
              {tab === "settings" && "Settings"}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === "vidoes" && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {user.videos.map((video) => (
                <div
                  key={video.id}
                  className="w-full aspect-video bg-gray-200 rounded-lg overflow-hidden shadow hover:scale-[1.02] transistion"
                >
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-[100px] h-[100px] object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          {activeTab === "settings" && (
            <div className="max-w-md mx-auto space-y-4">
              <h3 className="text-lg font-semibold mb-2 text-white">
                Edit Profile
              </h3>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-2 rounded outline-0 focus:ring ring-red-600"
              />
              <textarea
                placeholder="Bio"
                className="w-full p-2 rounded text-white outline-0 focus:ring ring-red-600"
              />
              <input type="file" accept="image/*" className="w-full" />
              <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                Save Changes
              </button>
            </div>
          )}
        </div>
        <ArrowUp />
      </div>
    </div>
  );
}

export default abc;
