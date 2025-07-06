import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios";
import Uploading from "../components/Uploading";
import { toast } from "react-toastify";

function VideoUpload() {
  const [form, setForm] = useState({
    title: "",
    description: "",
  });
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handlethumbnailPreview = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      setThumbnailFile(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const handleVideoPreview = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  const handleOnChange = (e) => {
    const {name, value} = e.target
   
    

    if(name === "title"){
      const wordCount = value.trim().split(/\s+/).length
      if(wordCount > 100){
        toast.error("Title should be only 100 words")
        return
      }
    }

      if(name === "description"){
      const wordCount = value.trim().split(/\s+/).length
      if(wordCount > 1000){
        toast.error("Description should be only 1000 words")
        return
      }
    }

     setForm({ ...form, [name]: value });

  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("video", videoFile);
    formData.append("thumbnail", thumbnailFile);

    

    try {
      const res = await axiosInstance.post("/videos/upload", formData, {
        withCredentials: true,
      });
      toast.success("upload successfull");
      console.log(res);
      
      navigate("/users");
    } catch (error) {
      alert("Upload failed: " + error?.response?.data.message);
      console.error("Error in uploading", error);
    }
    setLoading(false);
  };

  return (
     <main className="flex justify-center items-center bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 min-h-screen p-6">
      <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl shadow-4xl p-10 space-y-2.5 flex justify-center items-center">
        {loading ? (
          <div>
            <Uploading />
          </div>
        ) : (
          <div>
            <form onSubmit={handleOnSubmit} className="flex flex-col">
              <div className="bg-zinc-800 p-3 mb-2 w-[280px] md:w-[450px] rounded-lg border-none flex flex-col">
                <label htmlFor="title" className="text-white">
                  Title:
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  maxLength="100"
                  value={form.title}
                  onChange={handleOnChange}
                  placeholder="Enter Title"
                  className="bg-zinc-900 p-0.5 w-full rounded text-white  focus:border focus:border-red-500 focus:outline-0"
                />
              </div>
              <div className="bg-zinc-800 p-3 mb-2 w-[280px] md:w-[450px] rounded-lg border-none flex flex-col">
                <label htmlFor="description" className="text-white">
                  Description:
                </label>
                <textarea
                  rows="3"
                  cols="8"
                  name="description"
                  maxLength="1000"
                  value={form.description}
                  onChange={handleOnChange}
                  id="description"
                  placeholder="Enter Description"
                  className="bg-zinc-900 p-0.5 w-full rounded text-white focus:border focus:border-red-500 focus:outline-0"
                />
              </div>
              <div className="bg-zinc-800 p-3 mb-2 w-[280px] md:w-[450px] rounded-lg border-none flex flex-col">
                <label htmlFor="video" className="text-white">
                  Video:
                </label>
                <input
                  type="file"
                  accept="video/*"
                  id="video"
                  onChange={handleVideoPreview}
                  className="bg-zinc-900 p-0.5 w-full rounded text-white focus:border focus:border-red-500 focus:outline-0"
                />
                {videoPreview && (
                  <video
                    src={videoPreview}
                    controls
                    type="video"
                    alt="videoPreview"
                    className="mt-2 w-[250px] rounded h-[120px] md:w-[500px] md:h-[240px]"
                  />
                )}
              </div>
              <div className="bg-zinc-800 p-3 mb-2 w-[280px] md:w-[450px] rounded-lg border-none flex flex-col">
                <label htmlFor="thumbnail" className="text-white">
                  Thumbnail:
                </label>
                <input
                  type="file"
                  accept="image/*"
                  id="thumbnail"
                  onChange={handlethumbnailPreview}
                  className="bg-zinc-900 p-0.5 w-full rounded text-white focus:border focus:border-red-500 focus:outline-0"
                />
                {thumbnailPreview && (
                  <img
                    src={thumbnailPreview}
                    alt="thumbnailPreview"
                    className="mt-2  rounded w-[250px] h-[120px] md:w-[500px] md:h-[240px]"
                  />
                )}
              </div>
              <button
                type="submit"
                className="bg-red-500 in-hover:bg-red-600 hover:rounded text-white px-5 py-2 cursor-pointer"
              >
                Upload
              </button>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}

export default VideoUpload;
