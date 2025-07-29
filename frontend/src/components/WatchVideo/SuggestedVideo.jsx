import { Helmet } from "react-helmet";



function SuggestedVideos({ relatedVideos, onVideoClick }) {
  return (
    <aside className="w-full lg:w-96">
      <Helmet>
  <title>Suggested Videos | Loopy</title>
  <meta name="description" content="Browse suggested videos tailored for you, including thumbnails, views, and video owner info." />
  <meta property="og:title" content="Suggested Videos" />
  <meta property="og:description" content="Check out related videos with previews and creator details." />
</Helmet>
      <h3 className="text-xl font-semibold mb-4 text-red-500">Suggested Videos</h3>
      {relatedVideos.length === 0 ? (
        <p className="text-gray-400">No suggestions available.</p>
      ) : (
        <div className="flex flex-col gap-4 overflow-y-auto max-h-[80vh]">
          {relatedVideos.map((vid) => (
            <div
              key={vid._id}
              onClick={() => onVideoClick(vid._id)}
              className="cursor-pointer flex gap-3 focus:outline-none focus:ring-2 focus:ring-red-500"
              tabIndex={0}
              role="button"
              onKeyDown={(e) => e.key === "Enter" && onVideoClick(vid._id)}
            >
              <img src={vid.thumbnail} alt={vid.title} className="w-40 h-24 rounded object-cover" />
              <div className="flex flex-col justify-between">
                <h4 className="font-semibold text-white">{vid.title}</h4>
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <img
                    src={vid.owner?.avatar || "/default-avatar.png"}
                    alt={vid.owner?.username}
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
  );
}

export default SuggestedVideos;
