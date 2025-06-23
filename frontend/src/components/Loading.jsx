import React from "react";

function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-900 text-white">
      {/* Pulsing Play Button */}
      <div className="relative w-20 h-20">
        <div className="absolute opacity-50 rounded-full bg-red-600 animate-ping">
          <div className="relative flex items-center justify-center bg-red-500 rounded-full w-20 h-20">
            <svg
              className="w-8 h-8 text-white "
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M6 4l12 6-12 6V4z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Loading Text */}
      <p className="mt-5 text-sm text-gray-300">
        Loading your video experience...
      </p>
    </div>
  );
}

export default Loading;
