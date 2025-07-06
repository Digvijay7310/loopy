import { LuUpload } from "react-icons/lu";

function Uploading() {
  return (
    <div className="bg-zinc-900 p-4 min-h-screen text-white">
      <div className=" p-4 text-2xl shadow-2xl shadow-zinc-800 flex flex-col justify-center items-center rounded-full">
        {/* Bouncing upload icon */}
        <LuUpload className="inset-0 animate-bounce text-2xl sm:text-3xl md:text-4xl" />

        <p className="text-white text-sm sm:text-lg md:text-xl">Your Video Uploading</p>
      </div>
    </div>
  );
}

export default Uploading;
