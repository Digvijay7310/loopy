import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios";

function VideoUpload() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    thumbnailFile: "",
    videoFile: "",
  });
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // console.log(form);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);


    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("videoUrl", videoFile);
    formData.append("thumbnail", thumbnailFile);

    try {
      const res = await axiosInstance.post("/videos/upload", formData, {
        withCredentials: true     
      });
      alert("upload successfull");
      console.log(res);
      navigate("/users");
    } catch (error) {
      alert("Upload failed: " + error?.response?.data.message);
      console.error("Error in uploading", error);
    }
  };

  return (
    <main className=" bg-zinc-900 min-h-screen ">
      <form
        onSubmit={handleUpload}
        className="flex justify-center items-center flex-col rounded-2xl"
      >
        <h2 className="text-3xl md:4xl py-5  text-red-500 gap-1 mt-5 font-semibold text-shadow-2xs">
          Video Upload
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 md:place-items-center">
          <label htmlFor="title" className="font-semibold text-white md:lg">
            Title:
          </label>
          <input
            name="title"
            id="title"
            type="text"
            autoComplete="on"
            onChange={handleOnChange}
            placeholder="Enter Title"
            className="bg-zinc-800 mb-2 w-[250px] px-4 py-2 rounded-lg text-gray-100 outline-0 focus:ring-1 focus:ring-red-600 focus:transform-border"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 md:place-items-center">
          <label htmlFor="description" className="font-semibold text-white">
            Description:
          </label>
          <textarea
            name="description"
            id="description"
            type="text"
            autoComplete="on"
            onChange={handleOnChange}
            placeholder="Enter Description"
            className="bg-zinc-800 mb-2 w-[250px] px-4 py-2 rounded-lg text-gray-100 outline-0 focus:ring-1 focus:ring-red-600 focus:transform-border"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 md:place-items-center">
          <label htmlFor="thumbnail" className="font-semibold text-white">
            Thumbnail:
          </label>
          <input
            type="file"
            name="thumbnail"
            autoComplete="on"
            onChange={(e) => setThumbnailFile(e.target.files[0])}
            accept="image/*"
            id="thumbnail"
            className="bg-zinc-800 cursor-pointer mb-2 w-[250px] px-4 py-2 rounded-lg text-gray-100 outline-0 focus:ring-1 focus:ring-red-600 focus:transform-border"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 md:place-items-center">
          <label htmlFor="video" className="font-semibold text-white">
            Video:
          </label>
          <input
            type="file"
            name="video"
            autoComplete="on"
            onChange={(e) => setVideoFile(e.target.files[0])}
            accept="video/*"
            id="video"
            className="bg-zinc-800 cursor-pointer mb-2 w-[250px] px-4 py-2 rounded-lg text-gray-100 outline-0 focus:ring-1 focus:ring-red-600 focus:transform-border"
          />
        </div>

        <button
          type="submit"
          id="upload"
          name="upload"
          disabled={loading}
          className={`mt-3 text-white bg-red-600 hover:bg-red-500 cursor-pointer px-5 py-1.5 rounded-lg hover-bg-red-700 transition-all${
            loading ? "cursor-not-allowed bg-red-400" : "cursor-pointer"
          }`}
        >
          {" "}
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </main>
  );
}

export default VideoUpload;
