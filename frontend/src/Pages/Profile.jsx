import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import axiosInstance from "../axios";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Loading from "../components/Loading";
import { LuLogOut, LuSearchX } from "react-icons/lu";
import Video from "./Video";
import VideoCard from "../components/VideoCard";

function profile() {
  const videos = new Array(4).fill(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axiosInstance.get("users/profile"); // No need to set headers
        setProfile(res.data.data);
      } catch (error) {
        console.error("Failed to fetch profile", error);
      }
    };

    fetchUserProfile();
  }, []);

  if (!profile) {
    return (
      <div className="bg-zinc-900 flex justify-center items-center">
        <Loading />
      </div>
    );
  }
  return (
    <div className="bg-zinc-900 min-h-screen">
      <div className="p-4">
        {/* Account */}
        <div className="bg-zinc-800 flex justify-evenly gap-4 py-2  w-[100%] overflow-x-auto ">
          <NavLink
            to="/profile"
            className="text-white text-xs sm:text-sm cursor-pointer flex justify-center items-center px-3 py-0.5 hover:px-3 hover:py-0.5 bg-zinc-900 hover:bg-red-600 hover:rounded-lg transition-all duration-150"
          >
            All
          </NavLink>
          <NavLink
            to="/videos/my-videos"
            className="text-white text-xs sm:text-sm cursor-pointer flex justify-center items-center px-3 py-0.5 hover:px-3 hover:py-0.5 bg-zinc-900 hover:bg-red-600 hover:rounded-lg transition-all duration-150"
          >
            Your Videos
          </NavLink>
          <NavLink
            to="/users/my-likes"
            className="text-white text-xs sm:text-sm cursor-pointer flex justify-center items-center px-3 py-0.5 hover:px-3 hover:py-0.5 bg-zinc-900 hover:bg-red-600 hover:rounded-lg transition-all duration-150"
          >
            My Likes
          </NavLink>
          <NavLink
            to="/users/my-comments"
            className="text-white text-xs sm:text-sm cursor-pointer flex justify-center items-center px-3 py-0.5 hover:px-3 hover:py-0.5 bg-zinc-900 hover:bg-red-600 hover:rounded-lg transition-all duration-150"
          >
            My Comments
          </NavLink>
        </div>
        {/* Profile */}
        <div className="flex items-center justify-center bg-zinc-800 ">
          <div className="bg-center bg-cover flex justify-center items-center mt-2 w-full flex-col min-w-[200px] max-w-[500px] rounded ">
            {/* Add Cover image*/}
            <div
              className="h-[150px] object-contain text-white relative min-w-[400px] sm:w-[600px] sm:h-[200px] md:w-[800px] md:h-[250px] flex justify-center items-center shadow-xl shadow-gray-700 "
              style={{
                backgroundImage: `url(${profile.coverImage} )`,
              }}
            >
              <img
                src={profile.avatar}
                alt="Avatar"
                className="h-[100px] text-white w-[100px] absolute top-[30px] rounded-full shadow-xl shadow-gray-700 "
              />
            </div>

            <Link className="flex items-center mb-2 text-lg md:text-xl text-blue-600 hover:text-blue-700">
              {profile.email}
              <br />
            </Link>
            <p className="bg-zinc-700 rounded-md p-3 flex items-center justify-center text-white text-xs mb-2">
              I'm a passionate content creator who loves turning ideas into
              engaging visuals and stories. Whether it's video editing,
              photography, or storytelling, I enjoy crafting content that
              inspires, entertains,
            </p>

            <p className="flex items-center justify-center text-white mb-1.5">
              Username: {profile.username}
            </p>
            {/* FullName */}
            <p className="flex items-center justify-center text-white mb-1.5">
              FullName: {profile.fullName}
            </p>

            <p className="flex items-center justify-center text-white mb-1.5">
              {/* {profile.fullName} */}
              Total Views: 1234
            </p>

            <p className="flex items-center justify-center text-white mb-1.5">
              {/* {profile.fullName} */}
              Account Based: 1234
            </p>

            <button className="flex items-center justify-center bg-red-600 w-[200px] rounded-xl hover:bg-red-700 py-1 px-3.5 mb-2">
              <Link
                to="/users/update-profile"
                className="text-white flex justify-center items-center"
              >
                <LuSearchX /> Edit Your Profile
              </Link>
            </button>
          </div>
        </div>
        {/* Video card */}
        <div className="grid grid-cols-2 ">
          {videos.map((_, idx) => (
            <div key={idx}>
              <VideoCard />
            </div>
          ))}
        </div>
        <button className="flex items-center justify-center mt-5 bg-red-600 w-[200px] rounded-xl hover:bg-red-700 py-1 px-3.5 mb-2">
          <Link
            to="/users/update-profile"
            className="text-white flex justify-center items-center"
          >
            <LuLogOut /> Logout
          </Link>
        </button>
      </div>
    </div>
  );
}

export default profile;
