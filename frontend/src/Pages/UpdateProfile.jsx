import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios";

function UpdateProfile() {
  const [form, setForm] = useState({
    avatar: "",
    covertImage: "",
    fullName: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };
  const handleUpdate = async () => {
    e.preventDefault();
    setLoading(false);

    const formData = new FormData();
    for (const key in form) {
      if (form[key]) {
        formData.append(key, form[key]);
      }
    }
    try {
      const res = await axiosInstance.put("/update-profile", formData, {
        avatar,
        fullName,
        coverImage,
      });
      alert("Profile updated");
      navigate("/api/v1/users/profile");
      console.log("res.data", res.data || "res.data.message", res.data.message);
    } catch (error) {
      alert(error?.res?.data.message || "update failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-zinc-900 min-h-screen ">
      <form
        onSubmit={handleUpdate}
        className="flex justify-center items-center flex-col rounded-2xl"
      >
        <h2 className="text-3xl md:4xl pt-5 text-red-600 gap-1 mt-5 font-semibold text-shadow-2xs">
          Update Profile
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 md:place-items-center">
          <label htmlFor="fullName" className="font-semibold text-white md:lg">
            FullName:
          </label>
          <input
            name="fullName"
            id="fullName"
            type="text"
            value={form.fullName}
            autoComplete="off"
            onChange={handleOnChange}
            placeholder="FullName"
            className="bg-zinc-800 mb-2 w-[250px] px-4 py-2 rounded-lg text-gray-100 outline-0 focus:ring-1 focus:ring-green-600 focus:transform-border"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 md:place-items-center">
          <label htmlFor="avatar" className="font-semibold text-white">
            Avatar:
          </label>
          <input
            type="file"
            name="avatar"
            autoComplete="off"
            onChange={handleOnChange}
            accept="image/*"
            id="avatar"
            className="bg-zinc-800 mb-2 w-[250px] px-4 py-2 rounded-lg text-gray-100 outline-0 focus:ring-1 focus:ring-green-600 focus:transform-border"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 md:place-items-center">
          <label htmlFor="coverImage" className="font-semibold text-white">
            CoverImage:
          </label>
          <input
            type="file"
            name="coverImage"
            autoComplete="off"
            onChange={handleOnChange}
            accept="image/*"
            id="coverImage"
            className="bg-zinc-800 mb-2 w-[250px]  px-4 py-2 rounded-lg text-gray-100 outline-0 focus:ring-1 focus:ring-green-600 focus:transform-border"
          />
        </div>

        <button
          type="submit"
          id="register"
          name="register"
          disabled={loading}
          className={`mt-3 text-white bg-red-600 hover:bg-red-500 hover:text-gray-200 transition-colors duration-200 cursor-pointer px-5 py-1.5 rounded-md ${
            loading ? "cursor-not-allowed bg-red-400" : "cursor-pointer"
          }`}
        >
          {" "}
          {loading ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
}

export default UpdateProfile;
