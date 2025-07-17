import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FaShare } from "react-icons/fa"

function VideoCard({ video }) {
  const [isHovered, setIsHovered] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const timerRef = useRef(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    timerRef.current = setTimeout(() => setShowPreview(true), 700);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setShowPreview(false);
    clearTimeout(timerRef.current);
  };

  return (
    <div
      className="bg-zinc-900 group w-full lg:max-w-[600px]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link to={`/videos/video/${video._id}`} className="block" aria-label={video.title}>
        {/* Thumbnail container */}
        <div className="relative w-full pb-[56.25%] overflow-hidden rounded-lg bg-zinc-900 shadow-md group-hover:brightness-90 transition duration-200">
          {!showPreview && (
            <img
              src={video.thumbnail}
              alt={video.title}
              className="absolute top-0 left-0 w-full h-full object-cover"
              draggable={false}
            />
          )}

          {showPreview && (
            <video
              src={video.previewUrl || video.videoUrl} // previewUrl if available
              autoPlay
              muted
              loop
              playsInline
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
          )}
        </div>

        {/* Info section */}
        <div className=" flex mt-3 px-1 lg:mt-4 lg:px-2 h-[25%] items-center">
          <img
            src={video.owner?.avatar || "/default-avatar.png"}
            alt={video.owner?.username}
            className="w-11 h-11 rounded-full object-cover flex-shrink-0 mr-3"
            draggable={false}
          />
          <div className="flex flex-col flex-grow min-w-0">
            <h3 className="text-white font-semibold text-sm lg:text-base line-clamp-2 leading-tight">
              {video.title}
            </h3>
            <p className="text-gray-400 text-xs mt-1 truncate">
              {video.owner?.username} &nbsp;•&nbsp; {video.views.toLocaleString()} views
            </p>
          </div>
          <button
        onClick={() => {
          navigator.clipboard.writeText(window.location.origin + `/videos/video/${video._id}`);
          alert("Video URL copied to clipboard!");
        }}
        aria-label="Share video"
        className="text-gray-400 mt-2 hover:text-red-600 transition-colors duration-200"
      >
        <FaShare/>
      </button>
          {/* Move share button outside Link to prevent navigation */}
        </div>
        
      </Link>

      {/* Share button outside Link to avoid navigation */}
      
    </div>
  );
}


export default VideoCard