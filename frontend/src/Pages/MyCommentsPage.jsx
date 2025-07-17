import { useEffect, useState } from "react";
import axiosInstance from "../axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

function MyCommentsPage() {
  const [commentsData, setCommentsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axiosInstance.get("/videos/my-comments-videos", {
          withCredentials: true,
        });
        setCommentsData(res.data.data);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load comments");
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p className="text-lg animate-pulse">Loading your comments...</p>
      </div>
    );
  }

  if (!commentsData.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4">
        <h2 className="text-3xl font-semibold mb-4 text-red-500">No Comments Found</h2>
        <p className="text-gray-400 text-center max-w-md">
          You haven't commented on any videos yet. Watch and share your thoughts to see them here.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-red-500 mb-10 text-center" data-aos="fade-down">
        My Comments
      </h1>

      <div className="flex flex-col gap-10">
        {commentsData.map((video, index) => (
          <div
            key={video._id}
            data-aos="fade-up"
            data-aos-delay={index * 100}
            className="flex flex-col md:flex-row bg-zinc-900 rounded-md overflow-hidden shadow-lg hover:shadow-red-500 transition-shadow duration-300"
          >
            {/* Thumbnail */}
            <img
              src={video.thumbnail}
              alt={video.title}
              onClick={() => navigate(`/videos/video/${video._id}`)}
              className="cursor-pointer w-full md:w-60 h-40 md:h-48 object-cover"
            />

            {/* Video + Comments Info */}
            <div className="flex-1 p-5 flex flex-col justify-between">
              <div>
                <h2
                  onClick={() => navigate(`/videos/video/${video._id}`)}
                  className="text-xl md:text-2xl font-semibold cursor-pointer hover:text-red-400"
                >
                  {video.title}
                </h2>
                <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                  {video.description}
                </p>
              </div>

              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2 text-red-400">Your Comments:</h3>
                {video.comments
                  .filter(comment => comment.commentBy._id === video.currentUserId)
                  .map(comment => (
                    <div key={comment._id} className="bg-gray-800 p-3 rounded-md mb-2">
                      <p className="text-sm">{comment.text}</p>
                      <small className="text-xs text-gray-400">
                        {new Date(comment.createdAt).toLocaleString()}
                      </small>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyCommentsPage;
