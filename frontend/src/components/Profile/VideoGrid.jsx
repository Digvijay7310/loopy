import { Link } from "react-router-dom";

function VideoGrid({ videos }) {
  if (!videos.length) {
    return <p className="text-center mt-4 text-gray-300">You have not uploaded any videos.</p>;
  }

  return (
    <section className="grid sm:grid-cols-2 md:grid-cols-3 place-items-center p-4">
      {videos.map((video) => (
        <Link
          to={`/videos/video/${video._id}`}
          key={video._id}
          className="group p-2 mt-4 max-w-[360px] overflow-hidden border-2 border-amber-950 shadow-md shadow-gray-800 hover:shadow-amber-200"
        >
          <div className="relative h-[200px] w-full">
            <img
              className="h-full w-full object-cover rounded-lg group-hover:hidden"
              src={video.thumbnail}
              alt={video.title}
            />
            <video
              className="h-[200px] w-[300px] object-cover rounded-lg hidden group-hover:block"
              src={video.videoUrl}
              autoPlay
              loop
              muted
            />
          </div>
          <p className="text-white font-sm mt-1">{video.title}</p>
          <div className="flex gap-2 items-center mt-2">
            <img className="h-10 rounded-full" src={video.owner?.avatar} alt="avatar" />
            <div>
              <p className="text-white text-sm">{video.owner?.username}</p>
              <p className="text-gray-300 text-xs">{video.views} views</p>
            </div>
          </div>
        </Link>
      ))}
    </section>
  );
}

export default VideoGrid;
