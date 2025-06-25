import React from "react";

function PageNotFound() {
  return (
    <div className="min-h-screen p-4 bg-zinc-900 ">
      <div className="flex justify-center items-center flex-col">
        <div className="h-[300px] w-[300px] inset-2 animate-spin rounded-full bg-linear-210 bg-gradient-to-tl from-red-400 to-red-900">
          <div className=" bg-gradient-to-r from-lime-500 to-sky-400 h-[200px] w-[200px] rounded-full inset-6 animate-pulse"></div>
        </div>
        <p className="text-white text-center">
          The page you are searching for is not available or may be deleted
        </p>
        <p className="text-white font-light">
          Click Here to Redirect to Home Page{" "}
          <a href="/users/">
            <button className="bg-red-600 px-5 py-1 cursor-pointer rounded">
              Home
            </button>
          </a>
        </p>
      </div>
    </div>
  );
}

export default PageNotFound;
