import React from "react";
import { Link } from "react-router-dom";
import { SlLike } from "react-icons/sl";
import { LiaCommentsSolid } from "react-icons/lia";

function Comments() {
  const commentsVideo = new Array(12).fill(null);
  return (
    <div className="bg-gray-800 min-h-screen pt-4 space-y-4">
      {commentsVideo.map((_, idx) => {
        return (
          <div
            key={idx}
            className="bg-gray-700 rounded-md flex items-start max-w-[800px] mx-auto p-4 gap-4"
          >
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
                <p className="text-gray-100">
                  Like
                  <SlLike />
                </p>
                <p className="text-gray-100">
                  Comment
                  <LiaCommentsSolid />
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
        );
      })}
    </div>
  );
}

export default Comments;
