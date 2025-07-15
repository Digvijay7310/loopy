import { Link } from "react-router-dom";
import { FiShare2 } from "react-icons/fi";

function VideoCard({ video }) {
  return (
    <div className="group w-full lg:max-w-[600px] lg:h-[450px]">
      <Link to={`/videos/video/${video._id}`} className="block h-full" aria-label={video.title}>
        {/* Thumbnail */}
        <div className="relative w-full pb-[56.25%] lg:pb-0 lg:h-[75%] overflow-hidden rounded-lg bg-zinc-900 shadow-md group-hover:brightness-90 transition duration-200">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </div>

        {/* Info section */}
        <div className="flex mt-3 px-1 lg:mt-4 lg:px-2 h-[25%]">
          <img
            src={video.owner?.avatar || "/default-avatar.png"}
            alt={video.owner?.username}
            className="w-11 h-11 rounded-full object-cover flex-shrink-0 mr-3"
          />
          <div className="flex flex-col flex-grow min-w-0">
            <h3 className="text-white font-semibold text-sm lg:text-base line-clamp-2 leading-tight">
              {video.title}
            </h3>
            <p className="text-gray-400 text-xs mt-1 truncate">
              {video.owner?.username} &nbsp;•&nbsp; {video.views} views
            </p>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              navigator.clipboard.writeText(window.location.origin + `/videos/video/${video._id}`);
              alert("Video URL copied to clipboard!");
            }}
            aria-label="Share video"
            className="text-gray-400 ml-3 hover:text-red-600 transition-colors duration-200"
          >
            <FiShare2 size={20} />
          </button>
        </div>
      </Link>
    </div>
  );
}

export default VideoCard;
