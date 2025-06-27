import { useState, useRef } from "react";
import { Link } from "react-router-dom";

function VideoCard({ video }) {
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const hoverTimeoutRef = useRef(null);

  // Work on mouse Enter on card
  const handleMouseEnter = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(true);
      videoRef.current?.play();
    }, 500);
  };

  // Work when mouse leave the card
  const handleMouseLeave = () => {
    clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = null;
    setIsHovered(false);
    videoRef.current?.pause();
    videoRef.current.currentTime = 0;
  };

  if (!video) return null;
  return (
    <Link to={`/videos/video/${video._id}`} className="bg-zinc-900 text-white">
      <div className="bg-zinc-900 text-white">
        <div className="p-2 ">
          {/* Video card */}
          <div className="flex flex-col cursor-pointer bg-zinc-950 max-w-[500px]">
            {/* Hover Container */}
            <div
              className="relative w-full h-[200px] "
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {/* Thumbnail */}
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-[200px] max-w-[500px] rounded-lg "
              />
              {/* Preview Video */}
              <video
                ref={videoRef}
                className={`absolute top-0 left-0 w-full h-[200px] rounded-lg object-cover transition-opacity duration-200 ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
                src={video.videoUrl}
                muted
                loop
                preload="none"
              />
            </div>

            {/* Info */}
            <p className="text-gray-200 text-xs mt-1">{video.title}</p>
            <p className="text-gray-300 text-xs">views: {video.views}</p>
            <div className="flex items-center gap-2">
              <img
                src={video.owner?.avatar}
                alt="Owner Avatar"
                className="rounded-full h-8 w-8"
              />
              <p className="text-xs text-white flex justify-center items-center">
                {video.owner?.fullName}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default VideoCard;
