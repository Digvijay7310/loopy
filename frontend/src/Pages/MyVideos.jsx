import React from "react";
import { SlLike } from "react-icons/sl";
import { LiaCommentsSolid } from "react-icons/lia";
import { Link } from "react-router-dom";

function MyVideos() {
  const myVideos = new Array(4).fill(null);
  return (
    <main className="bg-zinc-800 min-h-screen flex flex-col pt-4 ">
      {myVideos.map((_, idx) => {
        return (
          <div
            key={idx}
            className="bg-zinc-950 mb-3 rounded-md md:max-w-[500px] max-h-[130px] flex items-start mx-auto px-4 py-2 gap-2"
          >
            {/* Thumbnail */}
            <img
              src="https://up.yimg.com/ib/th?id=OIP.TcVLBkYGTO7F-M2i2N31EgHaEK&pid=Api&rs=1&c=1&qlt=95&w=203&h=114"
              alt="Thumbnail"
              className="h-24 w-40 rounded-lg object-cover flex-shrink-0 border border-amber-200  "
            />

            {/* Content */}
            <div className="flex justify-center flex-col flex-grow">
              <p className=" text-white text-xs sm:sm md:lg">
                This is a new video sharing Platform
              </p>
              <div className="flex gap-6 mt-2 text-gray-300 font-medium text-xs">
                <SlLike className="text-gray-100" />

                <LiaCommentsSolid className="text-gray-100" />
              </div>
              <div className="flex items-center gap-3 mt-1">
                <img
                  src="https://icon-library.com/images/user-png-icon/user-png-icon-16.jpg"
                  alt="User profile"
                  className="h-7 w-7 rounded-full"
                />
                <div className="flex flex-col">
                  <p className="text-gray-400 text-[8px] md:text-xs">
                    Views: 500
                  </p>
                  <Link className="text-white text-xs sm:sm md:lg font-semibold">
                    Digvijay Kumar
                  </Link>
                  <p className="text-gray-400 text-xs">20 June 2025</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </main>
  );
}

export default MyVideos;
