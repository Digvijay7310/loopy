import React, { useState } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { SlLike } from "react-icons/sl";
import {
  LiaCommentDots,
  LiaCommentSolid,
  LiaShareSolid,
} from "react-icons/lia";
import PageNotFound from "../Pages/PageNotFound";

function WatchVideo({ video }) {
  if (!video) return <PageNotFound />;

  const [showDesc, setShowDesc] = useState(false);
  const [like, setLike] = useState(video?.likes?.length || 0);
  const [showComments, setShowComments] = useState(false);

  const toggleDesc = () => setShowDesc((prev) => !prev);
  const toggleComments = () => setShowComments((prev) => !prev);
  const incLike = () => setLike((prev) => prev + 1);

  return (
    <div className="bg-zinc-900 text-white">
      <div className="flex justify-between flex-wrap">
        {/* Video section */}
        <div className="w-full h-auto bg-zinc-900 ">
          <div className="flex flex-col py-1">
            <div className="rounded-md h-[200px] sm:h-[450px] bg-zinc-800 overflow-hidden flex justify-center items-center">
              <video
                src={video.videoUrl}
                controls
                loop
                className="w-full max-w-[1267px] max-h-[450px] h-full object-contain"
              />
            </div>
          </div>
          <div className="rounded-xl cla px-5 ">
            <h3 className="font-semibold text-lg">{video.title}</h3>
            <p className="font-light">Views: {video.views}</p>
            <div className="flex justify-around my-2">
              {/* Like  */}
              <button
                onClick={incLike}
                className="flex justify-center gap-2 items-center cursor-pointer"
              >
                <SlLike /> {like}
              </button>
              {/* Comment */}
              <p
                onClick={toggleComments}
                className="flex justify-center items-center gap-2 cursor-pointer"
              >
                {showComments ? <LiaCommentSolid /> : <LiaCommentDots />}
              </p>
              {/* Share */}

              <p className="flex justify-center items-center gap-2 cursor-pointer">
                <LiaShareSolid />
              </p>
            </div>
            <div className=" bg-zinc-900 h-auto w-full">
              <p className="text-md font-mono flex justify-between py-4 bg-zinc-700 rounded-lg px-2">
                Description{" "}
                <button
                  type="button"
                  className="cursor-pointer rounded-full px-2 py-0.5  transition-all duration-1000"
                  onClick={toggleDesc}
                >
                  {showDesc ? <FaArrowDown /> : <FaArrowUp />}
                </button>
              </p>

              {showDesc && (
                <p className="text-sm mt-2 p-2 rounded-lg bg-zinc-700">
                  {video.description}
                </p>
              )}
            </div>

            {showComments && (
              <div className="bg-zinc-800 p-2 text-md rounded ">
                <h2 className="font-semibold text-white font-mono">Comments</h2>
                {video.comments && video.comments.length > 0 ? (
                  video.comments.map((c, i) => (
                    <div key={i} className="mb-2">
                      <b>{c.commentBy?.username}:</b>
                      {c.text || c.content}
                    </div>
                  ))
                ) : (
                  <p>No Comments yet.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WatchVideo;
