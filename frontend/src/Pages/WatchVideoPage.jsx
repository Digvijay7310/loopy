import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../axios";
import { toast } from "react-toastify";
import VideoPlayer from "../components/WatchVideo/VideoPlayer";
import VideoActions from "../components/WatchVideo/VideoActions";
import VideoDescription from "../components/WatchVideo/VideoDescripion";
import CommentsSection from "../components/WatchVideo/CommentsSection";
import SuggestedVideos from "../components/WatchVideo/SuggestedVideo";
import LoginLoading from "../components/LoginLoading";
import { Helmet } from "react-helmet";

function WatchVideoPage() {
  const { videoId } = useParams();
  const navigate = useNavigate();

  const [videoData, setVideoData] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [comments, setComments] = useState([]);
  const [likesCount, setLikesCount] = useState(0);
  const [likedByUser, setLikedByUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [postingComment, setPostingComment] = useState(false);

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
        toast.error("Failed to load video");
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
    if (!newComment.trim()) return toast.warn("Comment cannot be empty");

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

  if (loading) return <div className="min-h-screen bg-black text-white flex items-center justify-center"><LoginLoading /> </div>;

  return (
    <div className="min-h-screen bg-black text-white sm:px-4 sm:py-6 w-full mx-auto">
      <Helmet>
      <title>{videoData.title} | YourSiteName</title>
      <meta name="description" content={videoData.description} />
      <meta property="og:title" content={videoData.title} />
      <meta property="og:description" content={videoData.description} />
      <meta property="og:image" content={videoData.thumbnail || ''} />
      <meta property="og:url" content={window.location.href} />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>


      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <VideoPlayer videoUrl={videoData.videoUrl} />
          <h1 className="text-lg font-bold mb-2">{videoData.title}</h1>
          <VideoActions
            likedByUser={likedByUser}
            likesCount={likesCount}
            onLike={toggleLike}
            onShare={handleShare}
            views={videoData.views}
            createdAt={videoData.createdAt}
          />
          <VideoDescription description={videoData.description} />
          <CommentsSection
            comments={comments}
            onCommentPost={postComment}
            postingComment={postingComment}
            newComment={newComment}
            setNewComment={setNewComment}
          />
        </div>
        <SuggestedVideos relatedVideos={relatedVideos} onVideoClick={(id) => navigate(`/videos/video/${id}`)} />
      </div>
    </div>
  );
}

export default WatchVideoPage;
