import { LuUpload } from "react-icons/lu";

function Uploading() {
  return (
    <div className="bg-zinc-900 p-4 min-h-screen text-white flex justify-center items-center">
      <div className=" p-10 text-2xl shadow-2xl shadow-zinc-700 flex flex-col justify-center items-center rounded-full">
        {/* Bouncing upload icon */}
        <LuUpload className="inset-0 animate-bounce text-4xl" />

        <p className="text-white">Your Video Uploading</p>
      </div>
    </div>
  );
}

export default Uploading;
