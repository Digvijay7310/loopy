import React from "react";
import { Link, NavLink } from "react-router-dom";
import { SlLike } from "react-icons/sl";
import { LiaCommentsSolid } from "react-icons/lia";

function profile() {
  return (
    <div className="bg-gray-800 min-h-screen px-6">
      {/* Account */}
      <div className="bg-gray-600 grid grid-flow-col md:grid-cols-2 gap-4 py-2 place-items-center w-full">
        <NavLink
          to="/history"
          className="text-white text-sm cursor-pointer px-3.5 py-1 hover:px-3.5 hover:py-1 hover:bg-green-500 hover:rounded-lg  transition-all"
        >
          All
        </NavLink>
        <NavLink
          to="/history"
          className="text-white text-sm cursor-pointer px-3.5 py-1 hover:px-3.5 hover:py-1 hover:bg-green-500 hover:rounded-lg  transition-all"
        >
          Your Videos
        </NavLink>
        <NavLink
          to="/history"
          className="text-white text-sm cursor-pointer px-3.5 py-1 hover:px-3.5 hover:py-1 hover:bg-green-500 hover:rounded-lg  transition-all"
        >
          History
        </NavLink>
      </div>
      {/* Profile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex justify-center w-full flex-col min-w-[200px] max-w-[500px]">
          {/* Add background image*/}
          <img
            src="https://pluspng.com/img-png/png-user-icon-icons-logos-emojis-users-2400.png"
            alt="Avatar"
            className="h-[200px] w-[200px] rounded-full flex items-center justify-center border border-red-500"
          />
          <Link>
            <span className="flex items-center justify-center text-red-600 hover:text-red-700">
              kumardigvijay377@gmail.com
            </span>
            <br />
          </Link>
          <p className="flex items-center justify-center text-white text-sm">
            I'm a passionate content creator who loves turning ideas into
            engaging visuals and stories. Whether it's video editing,
            photography, or storytelling, I enjoy crafting content that
            inspires, entertains,
          </p>
          <br />
          <p className="flex items-center justify-center text-white ">
            Username
          </p>
          <br />
          <p className="flex items-center justify-center text-white ">
            FullName
          </p>
          <br />
          <button className="flex items-center justify-center bg-red-600 w-[200px] rounded-xl hover:bg-red-700 py-1 px-3.5">
            <Link className="text-white">Edit Your Profile</Link>
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 flex-wrap gap-3 mt-3">
          {/* Recent Video */}
          <div className="bg-gray-600 rounded-xl mb-4">
            <p className="text-2xl text-center text-white">
              Your Recent upload Video
            </p>
            <div className="bg-gray-700 rounded-md flex flex-col sm:flex-row items-start max-w-[800px] mx-auto p-4 gap-4">
              {/* Thumbnail */}
              <img
                src="https://up.yimg.com/ib/th?id=OIP.TcVLBkYGTO7F-M2i2N31EgHaEK&pid=Api&rs=1&c=1&qlt=95&w=203&h=114"
                alt="Thumbnail"
                className="h-auto w-40 sm:h-24 rounded-lg object-cover"
              />

              {/* Content */}
              <div className="flex flex-col">
                <p className="text-sm text-white">
                  This is a new video sharing Platform
                </p>
                <div className="flex gap-6 mt-2 text-gray-300 font-medium text-xs">
                  <p className="text-white cursor-pointer transform transition-colors hover:text-gray-200">
                    Likes
                    <SlLike className="text-white cursor-pointer transform transition-colors hover:text-gray-200" />
                  </p>
                  <p className="text-white cursor-pointer transform transition-colors hover:text-gray-200">
                    Comments
                    <LiaCommentsSolid className="text-white cursor-pointer transform transition-colors hover:text-gray-200" />
                  </p>
                </div>
                <div className="flex items-center gap-3 mt-4">
                  <img
                    src="https://icon-library.com/images/user-png-icon/user-png-icon-16.jpg"
                    alt="User profile"
                    className="h-7 w-7 rounded-full"
                  />
                  <div className="flex flex-col">
                    <Link className="text-white text-sm font-semibold">
                      Digvijay Kumar
                    </Link>
                    <p className="text-gray-400 text-xs">20 June 2025</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Recent Watch Video */}
          <div className="bg-gray-600 rounded-xl">
            <p className="text-2xl text-center text-white">
              Your Watch History
            </p>
            <div className="bg-gray-700 rounded-md flex items-start max-w-[800px] mx-auto p-4 gap-4">
              {/* Thumbnail */}
              <img
                src="https://up.yimg.com/ib/th?id=OIP.TcVLBkYGTO7F-M2i2N31EgHaEK&pid=Api&rs=1&c=1&qlt=95&w=203&h=114"
                alt="Thumbnail"
                className="h-24 w-40 rounded-lg object-cover flex-shrink-0"
              />

              {/* Content */}
              <div className="flex flex-col flex-grow">
                <p className="text-sm text-white">
                  This is a new video sharing Platform
                </p>
                <div className="flex gap-6 mt-2 text-gray-300 font-medium text-xs">
                  <p className="text-white cursor-pointer transform transition-colors hover:text-gray-200">
                    Likes
                    <SlLike className="text-white cursor-pointer transform transition-colors hover:text-gray-200" />
                  </p>
                  <p className="text-white cursor-pointer transform transition-colors hover:text-gray-200">
                    Comments
                    <LiaCommentsSolid className="text-white cursor-pointer transform transition-colors hover:text-gray-200" />
                  </p>
                </div>
                <div className="flex items-center gap-3 mt-4">
                  <img
                    src="https://icon-library.com/images/user-png-icon/user-png-icon-16.jpg"
                    alt="User profile"
                    className="h-7 w-7 rounded-full"
                  />
                  <div className="flex flex-col">
                    <Link className="text-white text-sm font-semibold">
                      Digvijay Kumar
                    </Link>
                    <p className="text-gray-400 text-xs">20 June 2025</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Recent Like Video */}
          <div className="bg-gray-600 rounded-xl">
            <p className="text-2xl text-center text-white">Your Likes Video</p>
            <div className="bg-gray-700 rounded-md flex items-start max-w-[800px] mx-auto p-4 gap-4">
              {/* Thumbnail */}
              <img
                src="https://up.yimg.com/ib/th?id=OIP.TcVLBkYGTO7F-M2i2N31EgHaEK&pid=Api&rs=1&c=1&qlt=95&w=203&h=114"
                alt="Thumbnail"
                className="h-24 w-40 rounded-lg object-cover flex-shrink-0"
              />

              {/* Content */}
              <div className="flex flex-col flex-grow">
                <p className="text-sm text-white">
                  This is a new video sharing Platform
                </p>
                <div className="flex gap-6 mt-2 text-gray-300 font-medium text-xs">
                  <p className="text-white cursor-pointer transform transition-colors hover:text-gray-200">
                    Likes
                    <SlLike className="text-white cursor-pointer transform transition-colors hover:text-gray-200" />
                  </p>
                  <p className="text-white cursor-pointer transform transition-colors hover:text-gray-200">
                    Comments
                    <LiaCommentsSolid className="text-white cursor-pointer transform transition-colors hover:text-gray-200" />
                  </p>
                </div>
                <div className="flex items-center gap-3 mt-4">
                  <img
                    src="https://icon-library.com/images/user-png-icon/user-png-icon-16.jpg"
                    alt="User profile"
                    className="h-7 w-7 rounded-full"
                  />
                  <div className="flex flex-col">
                    <Link className="text-white text-sm font-semibold">
                      Digvijay Kumar
                    </Link>
                    <p className="text-gray-400 text-xs">20 June 2025</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Recent Comment Video */}
          <div className="bg-gray-600 rounded-xl">
            <p className="text-2xl text-center text-white">
              Your Commented Videos
            </p>
            <div className="bg-gray-700 rounded-md flex items-start max-w-[800px] mx-auto p-4 gap-4">
              {/* Thumbnail */}
              <img
                src="https://up.yimg.com/ib/th?id=OIP.TcVLBkYGTO7F-M2i2N31EgHaEK&pid=Api&rs=1&c=1&qlt=95&w=203&h=114"
                alt="Thumbnail"
                className="h-24 w-40 rounded-lg object-cover flex-shrink-0"
              />

              {/* Content */}
              <div className="flex flex-col flex-grow">
                <p className="text-sm text-white">
                  This is a new video sharing Platform
                </p>
                <div className="flex gap-6 mt-2 text-gray-300 font-medium text-xs">
                  <p className="text-white cursor-pointer transform transition-colors hover:text-gray-200">
                    Likes
                    <SlLike className="text-white cursor-pointer transform transition-colors hover:text-gray-200" />
                  </p>
                  <p className="text-white cursor-pointer transform transition-colors hover:text-gray-200">
                    Comments
                    <LiaCommentsSolid className="text-white cursor-pointer transform transition-colors hover:text-gray-200" />
                  </p>
                </div>
                <div className="flex items-center gap-3 mt-4">
                  <img
                    src="https://icon-library.com/images/user-png-icon/user-png-icon-16.jpg"
                    alt="User profile"
                    className="h-7 w-7 rounded-full"
                  />
                  <div className="flex flex-col">
                    <Link className="text-white text-sm font-semibold">
                      Digvijay Kumar
                    </Link>
                    <p className="text-gray-400 text-xs">20 June 2025</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default profile;
