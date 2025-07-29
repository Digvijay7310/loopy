import { LuThumbsUp, LuShare2 } from "react-icons/lu";

function VideoActions({ likedByUser, likesCount, onLike, onShare, views, createdAt }) {
  return (
    <div className="flex items-center justify-between text-gray-400 mb-4">
      <div>
        <span>{views.toLocaleString()} views</span> •{" "}
        <span>{new Date(createdAt).toLocaleDateString()}</span>
      </div>
      <div className="flex gap-4">
        <button onClick={onLike} className="flex items-center gap-2 px-3 py-1">
          <LuThumbsUp className={likedByUser ? "text-red-500" : "text-gray-400"} size={20} />
          <span>{likesCount}</span>
        </button>
        <button onClick={onShare} className="flex items-center gap-2 px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded">
          <LuShare2 size={18} />
          Share
        </button>
      </div>
    </div>
  );
}

export default VideoActions;
