import React from "react";

function PageNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 px-6">
      <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl shadow-2xl p-10 max-w-md w-full flex flex-col items-center space-y-6">
        {/* Icon or Spinner */}
        <div className="h-20 w-20 rounded-full bg-red-600 flex items-center justify-center animate-pulse">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636L5.636 18.364M5.636 5.636l12.728 12.728" />
          </svg>
          
        </div>
        <svg
      viewBox="0 0 72 72"
      xmlns="http://www.w3.org/2000/svg"
      className="w-16 h-16"
    >
      <circle cx="36" cy="36" r="30" fill="#FCEA2B" />
      <circle cx="25" cy="30" r="3" fill="#000" />
      <circle cx="47" cy="30" r="3" fill="#000" />
      <path
        d="M26 48c4-6 16-6 20 0"
        stroke="#000"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M21 20c2 0 5-2 7-1s3 3 5 3 4-2 6-2 3 1 5 2"
        stroke="#000"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>

        {/* Title */}
        <h1 className="text-4xl font-bold text-white tracking-tight">Page Not Found</h1>

        {/* Description */}
        <p className="text-gray-300 text-center">
          Sorry, the page you’re looking for doesn’t exist. It might have been moved or deleted.
        </p>

        {/* CTA Button */}
        <a href="/users/">
          <button className="mt-4 bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-2 rounded-full transition duration-300">
            Go to Home
          </button>
        </a>
      </div>
    </div>
  );
}

export default PageNotFound;
