import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../axios";
import { toast } from "react-toastify";
import LoginLoading from "../components/LoginLoading";
import { LiaComment, LiaComments } from "react-icons/lia";
import { LuShare2, LuThumbsUp, LuSend, LuBookOpen, LuBookCheck } from "react-icons/lu";
import { FaCommentAlt } from "react-icons/fa";

function CommentInput({ value, onChange, onSubmit, disabled }) {
  return (
    <div className="flex items-center gap-2 mb-6">
      <textarea
        className="flex-1 p-2 rounded-md bg-gray-800 text-white resize-none"
        rows={1}
        placeholder="Add a comment..."
        value={value}
        onChange={onChange}
        disabled={disabled}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSubmit();
          }
        }}
      />
      <button
        onClick={onSubmit}
        disabled={disabled || !value.trim()}
        className="p-2 rounded bg-red-600 hover:bg-red-700 disabled:opacity-50 flex items-center justify-center"
        aria-label="Post Comment"
        title="Post Comment"
      >
        <LuSend size={20} />
      </button>
    </div>
  );
}

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
  const [newComment, setNewComment] = useState("");
  const [postingComment, setPostingComment] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [showComments, setShowComments] = useState(true);

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const res = await axiosInstance.get(`/videos/video/${videoId}`, {
          withCredentials: true,
        });

        const { video, relatedVideos, comments, likesCount, likeByUser } =
          res.data.data;

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

  const toggleLike = async () => {
    try {
      setLikedByUser((prev) => !prev);
      setLikesCount((prev) => (likedByUser ? prev - 1 : prev + 1));
      await axiosInstance.post(`/videos/video/${videoId}/like`, null, {
        withCredentials: true,
      });
    } catch {
      setLikedByUser((prev) => !prev);
      setLikesCount((prev) => (likedByUser ? prev + 1 : prev - 1));
      toast.error("Failed to update like");
    }
  };

  const postComment = async () => {
    if (!newComment.trim()) {
      toast.warn("Comment cannot be empty");
      return;
    }
    setPostingComment(true);
    try {
      const res = await axiosInstance.post(
        `/videos/video/${videoId}/comment`,
        { text: newComment.trim() },
        { withCredentials: true }
      );
      setComments((prev) => [res.data.data, ...prev]);
      setNewComment("");
      toast.success("Comment posted");
    } catch {
      toast.error("Failed to post comment");
    } finally {
      setPostingComment(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Video URL copied to clipboard");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <LoginLoading />
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
    <div className="min-h-screen bg-black text-white sm:px-4 sm:py-6 w-full mx-auto">
      <div className="flex flex-col lg:flex-row gap-8">
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

          <h1 className="text-lg font-bold mb-2">{videoData.title}</h1>

          {/* Channel Info */}
          <div className="flex items-center gap-3 mb-4">
            <img
              src={videoData.owner?.avatar || "/default-avatar.png"}
              alt={videoData.owner?.username}
              onError={(e) => (e.target.src = "/default-avatar.png")}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1">
              <p className="font-semibold text-xl">{videoData.owner?.username}</p>
            </div>
            <button
              className="ml-auto px-4 py-1 bg-gray-800 hover:bg-gray-700 rounded transition"
              onClick={() =>
                toast.info(subscribed ? "Unsubscribed" : "Subscribed")
              }
            >
              {subscribed ? "Subscribed" : "Subscribe"}
            </button>
          </div>

          {/* Stats & Actions */}
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
              <button
                onClick={toggleLike}
                className="flex items-center gap-2 px-3 py-1 rounded bg-transparent"
                aria-label="Like video"
              >
                <LuThumbsUp
                  size={20}
                  className={`transition-colors ${
                    likedByUser ? "text-red-500" : "text-gray-400"
                  }`}
                />
                <span>{likesCount}</span>
              </button>

              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-3 py-1 rounded bg-gray-800 hover:bg-gray-700"
              >
                <LuShare2 size={18} />
                Share
              </button>
            </div>
          </div>

          {/* Description toggle */}
          <div className="mb-4">
            <button
              onClick={() => setShowDescription((prev) => !prev)}
              className="text-sm text-red-500 mb-2"
            >
              {showDescription ? "Hide Description": "Show Description"}
            </button>
            {showDescription && (
              <p className="bg-gray-900 p-4 rounded whitespace-pre-line">
                {videoData.description}
              </p>
            )}
          </div>

          {/* Comments Section */}
          <div>
            <div className="flex items-center justify-evenly mb-2">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <LiaComments size={20} /> Comments
              </h2>
              <button
                onClick={() => setShowComments((prev) => !prev)}
                className="text-sm text-red-500"
              >
                {showComments ? "Hide": "Show" }
              </button>
            </div>

            {showComments && (
              <>
                {/* New comment input */}
                <CommentInput
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onSubmit={postComment}
                  disabled={postingComment}
                  minLength={3}
                  className="border-0 outline-0"

                />

                {/* Existing comments */}
                {comments.length === 0 ? (
                  <p className="text-gray-400">No comments yet.</p>
                ) : (
                  <ul className="space-y-4 max-h-96 overflow-y-auto p-2">
                    {comments.map((comment) => (
                      <li
                        key={comment._id}
                        className="bg-zinc-900 p-3 rounded flex items-start gap-3"
                      >
                        <img
                          src={comment.commentBy.avatar || "/default-avatar.png"}
                          alt={comment.commentBy.username}
                          onError={(e) =>
                            (e.target.src = "/default-avatar.png")
                          }
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-semibold">
                            {comment.commentBy.username}
                          </p>
                          <p className="text-white">{comment.text}</p>
                          <p className="text-xs text-gray-300">
                            {new Date(comment.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </div>
        </div>

        {/* Suggested Videos */}
        <aside className="w-full lg:w-96">
          <h3 className="text-xl font-semibold mb-4 text-red-500">
            Suggested Videos
          </h3>
          {relatedVideos.length === 0 ? (
            <p className="text-gray-400">No suggestions available.</p>
          ) : (
            <div className="flex flex-col gap-4 overflow-y-auto max-h-[80vh]">
              {relatedVideos.map((vid) => (
                <div
                  key={vid._id}
                  onClick={() => navigate(`/videos/video/${vid._id}`)}
                  tabIndex={0}
                  onKeyDown={(e) =>
                    e.key === "Enter" && navigate(`/videos/video/${vid._id}`)
                  }
                  className="cursor-pointer flex gap-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                  role="button"
                >
                  <img
                    src={vid.thumbnail}
                    alt={vid.title}
                    className="w-40 h-24 rounded object-cover"
                  />
                  <div className="flex flex-col justify-between">
                    <h4 className="font-semibold text-white">{vid.title}</h4>
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <img
                        src={vid.owner?.avatar || "/default-avatar.png"}
                        alt={vid.owner?.username}
                        onError={(e) => (e.target.src = "/default-avatar.png")}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span>{vid.owner?.username}</span>
                    </div>
                    <p className="text-gray-200 text-sm">{vid.views} views</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

export default WatchVideoPage;
