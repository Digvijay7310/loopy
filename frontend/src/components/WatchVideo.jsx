import React, { useState } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import VideoCard from "../components/VideoCard";
import { SlLike } from "react-icons/sl";
import {
  LiaAngry,
  LiaCommentDots,
  LiaCommentSolid,
  LiaShareSolid,
} from "react-icons/lia";

function WatchVideo() {
  const videos = Array(10).fill(null);
  const [show, setShow] = useState(false);
  const [like, setLike] = useState(0);
  const [showComment, setShowComment] = useState(false);

  const comments = [
    "Best video",
    "keep it up videos",
    "Its not roast its fry",
    "Best looper",
    "Best looper aka dhooper",
  ];

  const handleShow = () => {
    setShow((prev) => !prev);
  };

  const likeCount = () => {
    setLike(like + 1);
  };

  const handleShowComment = () => {
    setShowComment((prev) => !prev);
  };
  return (
    <div className="bg-zinc-900 text-white">
      <div className="flex justify-between flex-wrap">
        {/* Video section */}
        <div className="w-full h-auto bg-zinc-900 ">
          <div className="flex flex-col py-1">
            <div className="rounded-md h-[200px] sm:h-[450px] bg-red-800 overflow-hidden">
              <video
                src="../../video.mp4"
                controls
                loop
                muted
                onMouseOver={videos.play}
              >
                Video
              </video>
            </div>
          </div>
          <div className="rounded-xl cla px-5 ">
            <p>
              This is video playing this is demo video. It's trail video no
              copyright
            </p>
            <div className="flex justify-around my-2">
              {/* Like  */}
              <p className="flex justify-center gap-2 items-center cursor-pointer">
                <SlLike onClick={likeCount} /> {like}
              </p>
              {/* Comment */}
              <p
                onClick={handleShowComment}
                className="flex justify-center items-center gap-2 cursor-pointer"
              >
                {showComment ? <LiaCommentSolid /> : <LiaCommentDots />}
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
                  onClick={handleShow}
                >
                  {show ? <FaArrowDown /> : <FaArrowUp />}
                </button>
              </p>

              {show && (
                <p className="text-sm mt-2 p-2 rounded-lg bg-zinc-700">
                  This is the video Descrption. You can expand or collapse this
                  section. This video mis made for entermainment porpose. vThis
                  is the video Descrption. You can expand or collapse this
                  section. This video mis made for entermainment porpose. This
                  is the video Descrption. You can expand or collapse this
                  section. This video mis made for entermainment porpose. This
                  is the video Descrption. You can expand or collapse this
                  section. This video mis made for entermainment porpose. This
                  is the video Descrption. You can expand or collapse this
                  section. This video mis made for entermainment porpose. This
                  is the video Descrption. You can expand or collapse this
                  section. This video mis made for entermainment porpose. This
                  is the video Descrption. You can expand or collapse this
                  section. This video mis made for entermainment porpose. This
                  is the video Descrption. You can expand or collapse this
                  section. This video mis made for entermainment porpose.
                </p>
              )}
              {showComment && (
                <div className="bg-zinc-800 p-2 text-md rounded-lg ">
                  <p className="font-semibold text-white m-1 font-mono">
                    Comments
                  </p>
                  {comments.map((comment, idx) => (
                    <div key={idx} className="bg-zinc-800">
                      <p className="text-xs font-extralight m-1 bg-zinc-700">
                        {comment}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WatchVideo;
