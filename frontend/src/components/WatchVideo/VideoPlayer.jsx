import { useState } from "react";
import { toast } from "react-toastify";

function VideoPlayer({ videoUrl }) {
  const [videoLoading, setVideoLoading] = useState(true);

  return (
    <div className="w-full aspect-video bg-black rounded-md overflow-hidden shadow-lg mb-4 relative">
      {videoLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-10">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
        </div>
      )}
      <video
        src={videoUrl}
        controls
        onLoadStart={() => setVideoLoading(true)}
        onCanPlay={() => setVideoLoading(false)}
        onError={() => {
          setVideoLoading(false);
          toast.error("Failed to load video");
        }}
        className="w-full h-full object-cover bg-black"
      />
    </div>
  );
}

export default VideoPlayer;
