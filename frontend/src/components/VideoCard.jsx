import { useState, useRef } from "react";
import { Link } from "react-router-dom";

function VideoCard() {
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const hoverTimeoutRef = useRef(null);

  const handleMouseEnter = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(true);
      videoRef.current?.play();
    }, 500);
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = null;
    setIsHovered(false);
    videoRef.current?.pause();
    videoRef.current.currentTime = 0;
  };
  return (
    <div className="bg-zinc-900 px-4 text-white">
      <div className="p-2">
        {/* Video card */}
        <div className="flex flex-col  bg-zinc-950 max-w-[500px]">
          {/* Hover Container */}
          <div
            className="relative w-full h-[200px] "
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Thumbnail */}
            <img
              src="https://up.yimg.com/ib/th?id=OIP.TcVLBkYGTO7F-M2i2N31EgHaEK&pid=Api&rs=1&c=1&qlt=95&w=203&h=114"
              alt="thumbnail"
              className="w-full h-[200px] max-w-[500px] rounded-lg "
            />
            <video
              ref={videoRef}
              className={`absolute top-0 left-0 w-full h-[200px] rounded-lg object-cover transition-opacity duration-200 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
              src="../../video.mp4"
              muted
              loop
              preload="none"
            />
          </div>

          {/* Info */}
          <p className="text-gray-200 text-xs mt-1">
            This video is made for design purpose only made by Digvijay Kumar,
            first creator of Loopy
          </p>
          <p className="text-gray-300 text-xs">Views: 500</p>
          <div className="flex items-center gap-2">
            <img
              src="https://icon-library.com/images/user-png-icon/user-png-icon-16.jpg"
              alt="avatar"
              className="rounded-full h-8 w-8"
            />
            <p className="text-xs text-white">Digvijay kumar</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoCard;
