import { useEffect, useState } from "react";
import axiosInstance from "../axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function MyCommentsPage() {
  const [commentsData, setCommentsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axiosInstance.get("/videos/my-comments-videos", {
          withCredentials: true,
        });
        setCommentsData(res.data.data); // array of videos with user's comments included
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
        Loading your comments...
      </div>
    );
  }

  if (!commentsData.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4">
        <h2 className="text-3xl font-semibold mb-4">No comments found</h2>
        <p className="text-gray-400 text-center max-w-md">
          You haven't commented on any videos yet. Watch and comment to see
          them here.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-red-600">My Comments</h1>

      <div className="flex flex-col gap-8">
        {commentsData.map((video) => (
          <div
            key={video._id}
            className="flex flex-col md:flex-row bg-gray-900 rounded-md overflow-hidden shadow-lg"
          >
            {/* Thumbnail */}
            <img
              src={video.thumbnail}
              alt={video.title}
              onClick={() => navigate(`/videos/video/${video._id}`)}
              className="cursor-pointer w-full md:w-56 h-32 md:h-40 object-cover"
            />

            {/* Video & Comments Info */}
            <div className="flex-1 p-4 flex flex-col justify-between">
              <div>
                <h2
                  onClick={() => navigate(`/videos/video/${video._id}`)}
                  className="text-xl font-semibold cursor-pointer hover:text-red-500"
                >
                  {video.title}
                </h2>
                <p className="text-gray-400 mt-1 line-clamp-2">
                  {video.description}
                </p>
              </div>

              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2 text-red-500">
                  Your Comments:
                </h3>

                {video.comments
                  .filter((comment) => comment.commentBy._id === video.currentUserId) // Make sure commentBy includes _id
                  .map((comment) => (
                    <div
                      key={comment._id}
                      className="bg-gray-800 p-3 rounded-md mb-2"
                    >
                      <p>{comment.text}</p>
                      <small className="text-gray-400">
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
