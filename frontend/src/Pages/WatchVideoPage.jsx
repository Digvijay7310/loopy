import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../axios";
import { toast } from "react-toastify";

function WatchVideoPage() {
  const { videoId } = useParams();
  const navigate = useNavigate();

  const [videoData, setVideoData] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [comments, setComments] = useState([]);
  const [likesCount, setLikesCount] = useState(0);
  const [likedByUser, setLikedByUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const [videoLoading, setVideoLoading] = useState(true);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const res = await axiosInstance.get(`/videos/video/${videoId}`, {
          withCredentials: true,
        });

        const { video, relatedVideos, comments, likesCount, likeByUser } = res.data.data;

        setVideoData(video);
        setRelatedVideos(relatedVideos);
        setComments(comments);
        setLikesCount(likesCount);
        setLikedByUser(likeByUser);
      } catch (err) {
        const msg = err.response?.data?.message || "Failed to load video";
        toast.error(msg);
        navigate("/videos");
      } finally {
        setLoading(false);
      }
    };

    fetchVideoData();
  }, [videoId, navigate]);

  // Like toggle function (stub — replace with API call)
  const toggleLike = async () => {
    try {
      if (likedByUser) {
        setLikesCount((c) => c - 1);
      } else {
        setLikesCount((c) => c + 1);
      }
      setLikedByUser(!likedByUser);
    } catch {
      toast.error("Failed to update like");
    }
  };

  // Subscribe toggle with toast fixed to show correct message
  const toggleSubscribe = () => {
    setSubscribed((prev) => {
      toast.info(prev ? "Unsubscribed" : "Subscribed");
      return !prev;
    });
  };

  // Share button copies URL
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Video URL copied to clipboard");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading video...
      </div>
    );
  }

  if (!videoData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Video not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-4 py-6 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Video & Info */}
        <div className="flex-1">
          <div className="w-full aspect-video bg-black rounded-md overflow-hidden shadow-lg mb-4 relative">
            {videoLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-10">
                <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
              </div>
            )}
            <video
              src={videoData.videoUrl}
              controls
              autoPlay
              onLoadStart={() => setVideoLoading(true)}
              onCanPlay={() => setVideoLoading(false)}
              onError={() => {
                setVideoLoading(false);
                toast.error("Failed to load video");
              }}
              className="w-full h-full object-cover bg-black"
            />
          </div>

          <h1 className="text-2xl font-bold mb-2">{videoData.title}</h1>

          <div className="flex items-center justify-between text-gray-400 mb-4">
            <div>
              <span>{videoData.views.toLocaleString()} views</span> •{" "}
              <span>
                {new Date(videoData.createdAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>

            <div className="flex gap-4">
              {/* Like Button */}
              <button
                onClick={toggleLike}
                className={`flex items-center gap-2 px-3 py-1 rounded ${
                  likedByUser ? "bg-red-600" : "bg-gray-800 hover:bg-gray-700"
                } transition-colors`}
                aria-label="Like video"
                aria-pressed={likedByUser}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill={likedByUser ? "currentColor" : "none"}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  {/* Thumbs up icon */}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 9l-4 4m0 0l-4-4m4 4V3"
                  />
                </svg>
                {likesCount}
              </button>

              {/* Share Button */}
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded transition-colors"
                aria-label="Share video"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 8a3 3 0 00-6 0v1m6-1v7a3 3 0 11-6 0v-1"
                  />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12h.01" />
                </svg>
                Share
              </button>

              {/* Subscribe Button */}
              <button
                onClick={toggleSubscribe}
                className={`flex items-center gap-2 px-3 py-1 rounded ${
                  subscribed ? "bg-red-600" : "bg-gray-800 hover:bg-gray-700"
                } transition-colors`}
                aria-label="Subscribe to owner"
                aria-pressed={subscribed}
              >
                {subscribed ? "Subscribed" : "Subscribe"}
              </button>
            </div>
          </div>

          {/* Description */}
          <p className="bg-gray-900 p-4 rounded-md whitespace-pre-line mb-6">{videoData.description}</p>

          {/* Comments */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Comments</h2>
            {comments.length === 0 ? (
              <p className="text-gray-400">No comments yet.</p>
            ) : (
              <ul className="space-y-4 max-h-96 overflow-y-auto">
                {comments.map((comment) => (
                  <li
                    key={comment._id}
                    className="bg-gray-900 p-3 rounded flex items-start gap-3"
                  >
                    <img
                      src={comment.commentBy.avatar || "/default-avatar.png"}
                      alt={comment.commentBy.username}
                      onError={(e) => (e.target.src = "/default-avatar.png")}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold">{comment.commentBy.username}</p>
                      <p className="text-gray-300">{comment.text}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(comment.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Suggested Videos */}
        <aside className="w-full lg:w-96">
          <h3 className="text-xl font-semibold mb-4 text-red-500">Suggested Videos</h3>
          {relatedVideos.length === 0 ? (
            <p className="text-gray-400">No suggestions available.</p>
          ) : (
            <div className="flex flex-col gap-4 overflow-y-auto max-h-[80vh]">
              {relatedVideos.map((vid) => (
                <div
                  key={vid._id}
                  onClick={() => navigate(`/videos/video/${vid._id}`)}
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && navigate(`/videos/video/${vid._id}`)}
                  className="cursor-pointer flex gap-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                  role="button"
                  aria-label={`Watch ${vid.title}`}
                >
                  <img
                    src={vid.thumbnail}
                    alt={vid.title}
                    className="w-40 h-24 rounded object-cover"
                  />
                  <div className="flex flex-col justify-between">
                    <h4 className="font-semibold text-white">{vid.title}</h4>
                    <p className="text-gray-400 text-sm">{vid.owner.username}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </aside>
      </div>

      {/* Loader styles */}
      <style>{`
        .loader {
          border-top-color: #f87171;
          animation: spinner 1s linear infinite;
        }
        @keyframes spinner {
          to {transform: rotate(360deg);}
        }
      `}</style>
    </div>
  );
}

export default WatchVideoPage;
