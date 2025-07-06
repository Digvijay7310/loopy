import React from "react";

function AuthLoading() {
  return (
        <div className="flex justify-center items-center">
      <div className="relative w-6 h-6">
        <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-red-800 animate-spin"></div>
        <div className="absolute inset-2 rounded-full bg-white"></div>
      </div>
    </div>

  );
}

export default AuthLoading;
