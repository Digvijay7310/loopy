import { useState } from "react";
import { LiaComments } from "react-icons/lia";
import { LuSend } from "react-icons/lu";
import { Helmet } from "react-helmet";

function CommentsSection({
  comments,
  onCommentPost,
  postingComment,
  newComment,
  setNewComment,
}) {
  const [showComments, setShowComments] = useState(true);

  // Inline CommentInput Component
  const CommentInput = () => {
    const handleSubmit = () => {
      const trimmed = newComment.trim();
      if (!trimmed || postingComment) return;
      onCommentPost(trimmed);
    };

    return (
      <div className="flex items-center gap-2 mb-6">
        <textarea
          className="flex-1 p-2 rounded-md bg-gray-800 text-white resize-none"
          rows={1}
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          disabled={postingComment}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
        />
        <button
          onClick={handleSubmit}
          disabled={postingComment || !newComment.trim()}
          className="p-2 rounded bg-red-600 hover:bg-red-700 disabled:opacity-50 flex items-center justify-center"
          aria-label="Post Comment"
          title="Post Comment"
        >
          <LuSend size={20} />
        </button>
      </div>
    );
  };

  return (
    <div>
      <Helmet>
  <title>User Comments Section | Loopy</title>
  <meta name="description" content="Interactive comments section where users can post and view feedback. Built with React and Tailwind CSS." />
  <meta name="keywords" content="React comments, user feedback, Tailwind CSS UI, interactive comment box" />
  <meta property="og:title" content="User Comments Section" />
  <meta property="og:description" content="View and post user comments in this modern UI component." />
</Helmet>

      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <LiaComments size={20} /> Comments
        </h2>
        <button
          onClick={() => setShowComments((prev) => !prev)}
          className="text-sm text-red-500"
        >
          {showComments ? "Hide" : "Show"}
        </button>
      </div>

      {/* Comment Input and List */}
      {showComments && (
        <>
          <CommentInput />

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
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">{comment.commentBy.username}</p>
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
  );
}

export default CommentsSection;
