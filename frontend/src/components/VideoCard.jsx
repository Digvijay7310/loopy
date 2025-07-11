import React from "react";

const VideoCard = ({ video }) => {
  return (
    <div style={{
      border: "1px solid #ccc",
      borderRadius: 8,
      overflow: "hidden",
      marginBottom: 20,
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
    }}>
      <img
        src={video.thumbnail}
        alt={video.title}
        style={{ width: "100%", height: 180, objectFit: "cover" }}
      />
      <div style={{ padding: "10px" }}>
        <h3 style={{ margin: "5px 0" }}>{video.title}</h3>
        <p style={{ margin: "5px 0", color: "#555" }}>
          By: {video.owner?.username || "Unknown"}
        </p>
        <p style={{ margin: "5px 0", color: "#777", fontSize: 14 }}>
          {video.views || 0} views • {new Date(video.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default VideoCard;
