import React, { useState } from "react";

function VideoUpload() {
  const [videoFile, setVideoFile] = useState(null);

  const handleUpload = async (e) => {
    const formData = new FormData();
    formData.append("video", videoFile);

    try {
      const res = await axios.post("/video/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-Data",
        },
      });
      alert("upload successfull");
    } catch (error) {
      alert("Upload failed", error?.res?.data.message);
    }
  };
  return (
    <div>
      <form onClick={handleUpload}>
        <h2>Upload video</h2>
        <input type="file" onChange={(e) => setVideoFile(e.target.files[0])} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default VideoUpload;
