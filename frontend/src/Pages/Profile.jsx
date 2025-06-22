import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import axiosInstance from "../axios";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Loading from "../components/Loading";

function profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axiosInstance.get("/profile"); // No need to set headers
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
    <div className="bg-zinc-900 min-h-screen px-6">
      {/* Account */}
      <div className="bg-zinc-800 flex justify-evenly gap-4 py-2  w-full ">
        <NavLink
          to="/profile"
          className="text-white text-sm cursor-pointer px-3.5 py-1 hover:px-3.5 hover:py-1 hover:bg-green-500 hover:rounded-lg  transition-all"
        >
          All
        </NavLink>
        <NavLink
          to="/api/v1/videos/my-videos"
          className="text-white text-sm cursor-pointer px-3.5 py-1 hover:px-3.5 hover:py-1 hover:bg-green-500 hover:rounded-lg  transition-all"
        >
          Your Videos
        </NavLink>
      </div>
      {/* Profile */}
      <div className="flex items-center justify-center ">
        <div className="bg-center bg-cover flex justify-center items-center mt-2 w-full flex-col min-w-[200px] max-w-[500px] rounded shadow-xl shadow-gray-700 ">
          {/* Add Cover image*/}
          <div
            className="h-[150px] relative w-full flex justify-center items-center"
            style={{
              backgroundImage: `url(${profile.coverImage} )`,
            }}
          >
            <img
              src={profile.avatar}
              alt="Avatar"
              className="h-[100px] w-[100px] absolute top-[30px] rounded-full flex items-center justify-center"
            />
          </div>

          <Link className="flex items-center mb-2  text-red-600 hover:text-red-700">
            {profile.email}
            <br />
          </Link>
          <p className="bg-gradient-to-b from-zinc-800 to-zinc-500 rounded px-0.5 py-1 flex items-center text-center justify-center text-white text-xs mb-2">
            I'm a passionate content creator who loves turning ideas into
            engaging visuals and stories. Whether it's video editing,
            photography, or storytelling, I enjoy crafting content that
            inspires, entertains,
          </p>

          <p className="flex items-center justify-center text-white">
            {profile.username}
          </p>

          <p className="flex items-center justify-center text-white">
            {profile.fullName}
          </p>

          <button className="flex items-center justify-center bg-red-600 w-[200px] rounded-xl hover:bg-red-700 py-1 px-3.5 mb-2">
            <Link to="/api/v1/users/update-profile" className="text-white">
              Edit Your Profile
            </Link>
          </button>
        </div>
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 flex-wrap gap-5 mt-3">
          <div className="bg-gray-600 rounded-xl mb-4 md: w-[200px]">
            <p className="text-xl text-center text-white">Your upload Video</p>
            <div className="bg-gray-700 rounded-md flex flex-col items-center max-w-[800px] mx-auto py-2 ">
              <img
                src="https://up.yimg.com/ib/th?id=OIP.TcVLBkYGTO7F-M2i2N31EgHaEK&pid=Api&rs=1&c=1&qlt=95&w=203&h=114"
                alt="Thumbnail"
                className=" w-[100px] h-[40px]  rounded-lg object-cover"
              />

              <div className="flex flex-col">
                <p className="text-xs text-white">
                  This is a new video sharing Platform
                </p>
                <div className="flex gap-6 mt-2 text-gray-300 font-medium text-xs">
                  <p className="text-white cursor-pointer transform transition-colors hover:text-gray-200">
                    <SlLike className="text-white cursor-pointer transform transition-colors hover:text-gray-200" />
                  </p>
                  <p className="text-white cursor-pointer transform transition-colors hover:text-gray-200">
                    <LiaCommentsSolid className="text-white cursor-pointer transform transition-colors hover:text-gray-200" />
                  </p>
                </div>
                <div className="flex items-center gap-3 mt-4">
                  <img
                    src="https://icon-library.com/images/user-png-icon/user-png-icon-16.jpg"
                    alt="User profile"
                    className="h-5 w-5 rounded-full"
                  />
                  <Link className="text-[8px] text-white">Digvijay kumar</Link>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-600 rounded-xl mb-4">
            <p className="text-xl text-center text-white">Your watched Video</p>
            <div className="bg-gray-700 rounded-md flex flex-col items-center max-w-[800px] mx-auto py-2 ">
              <img
                src="https://up.yimg.com/ib/th?id=OIP.TcVLBkYGTO7F-M2i2N31EgHaEK&pid=Api&rs=1&c=1&qlt=95&w=203&h=114"
                alt="Thumbnail"
                className=" w-[100px] h-[40px]  rounded-lg object-cover"
              />

              <div className="flex flex-col">
                <p className="text-xs text-white">
                  This is a new video sharing Platform
                </p>
                <div className="flex gap-6 mt-2 text-gray-300 font-medium text-xs">
                  <p className="text-white cursor-pointer transform transition-colors hover:text-gray-200">
                    <SlLike className="text-white cursor-pointer transform transition-colors hover:text-gray-200" />
                  </p>
                  <p className="text-white cursor-pointer transform transition-colors hover:text-gray-200">
                    <LiaCommentsSolid className="text-white cursor-pointer transform transition-colors hover:text-gray-200" />
                  </p>
                </div>
                <div className="flex items-center gap-3 mt-4">
                  <img
                    src="https://icon-library.com/images/user-png-icon/user-png-icon-16.jpg"
                    alt="User profile"
                    className="h-5 w-5 rounded-full"
                  />
                  <Link className="text-[8px] text-white">Digvijay kumar</Link>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-600 rounded-xl mb-4">
            <p className="text-xl text-center text-white">Your Like Video</p>
            <div className="bg-gray-700 rounded-md flex flex-col items-center max-w-[800px] mx-auto py-2 ">
              <img
                src="https://up.yimg.com/ib/th?id=OIP.TcVLBkYGTO7F-M2i2N31EgHaEK&pid=Api&rs=1&c=1&qlt=95&w=203&h=114"
                alt="Thumbnail"
                className=" w-[100px] h-[40px]  rounded-lg object-cover"
              />

              <div className="flex flex-col">
                <p className="text-xs text-white">
                  This is a new video sharing Platform
                </p>
                <div className="flex gap-6 mt-2 text-gray-300 font-medium text-xs">
                  <p className="text-white cursor-pointer transform transition-colors hover:text-gray-200">
                    <SlLike className="text-white cursor-pointer transform transition-colors hover:text-gray-200" />
                  </p>
                  <p className="text-white cursor-pointer transform transition-colors hover:text-gray-200">
                    <LiaCommentsSolid className="text-white cursor-pointer transform transition-colors hover:text-gray-200" />
                  </p>
                </div>
                <div className="flex items-center gap-3 mt-4">
                  <img
                    src="https://icon-library.com/images/user-png-icon/user-png-icon-16.jpg"
                    alt="User profile"
                    className="h-5 w-5 rounded-full"
                  />
                  <Link className="text-[8px] text-white">Digvijay kumar</Link>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-600 rounded-xl mb-4">
            <p className="text-xl text-center text-white">Your Comment Video</p>
            <div className="bg-gray-700 rounded-md flex flex-col items-center max-w-[800px] mx-auto py-2 ">
              <img
                src="https://up.yimg.com/ib/th?id=OIP.TcVLBkYGTO7F-M2i2N31EgHaEK&pid=Api&rs=1&c=1&qlt=95&w=203&h=114"
                alt="Thumbnail"
                className=" w-[100px] h-[40px]  rounded-lg object-cover"
              />

              <div className="flex flex-col">
                <p className="text-xs text-white">
                  This is a new video sharing Platform
                </p>
                <div className="flex gap-6 mt-2 text-gray-300 font-medium text-xs">
                  <p className="text-white cursor-pointer transform transition-colors hover:text-gray-200">
                    <SlLike className="text-white cursor-pointer transform transition-colors hover:text-gray-200" />
                  </p>
                  <p className="text-white cursor-pointer transform transition-colors hover:text-gray-200">
                    <LiaCommentsSolid className="text-white cursor-pointer transform transition-colors hover:text-gray-200" />
                  </p>
                </div>
                <div className="flex items-center gap-3 mt-4">
                  <img
                    src="https://icon-library.com/images/user-png-icon/user-png-icon-16.jpg"
                    alt="User profile"
                    className="h-5 w-5 rounded-full"
                  />
                  <Link className="text-[8px] text-white">Digvijay kumar</Link>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default profile;
