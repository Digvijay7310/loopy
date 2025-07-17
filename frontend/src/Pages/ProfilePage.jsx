import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../axios";
import AOS from "aos";
import "aos/dist/aos.css";

function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const res = await axiosInstance.get("/users/profile", {
        withCredentials: true,
      });
      setProfile(res.data.data);
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to load profile";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
    AOS.init({ duration: 800, once: true });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p className="text-gray-400 animate-pulse">Loading profile...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p className="text-red-500">No profile data found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10">
      <div
        className="max-w-4xl mx-auto bg-zinc-900 rounded-lg overflow-hidden shadow-xl border border-zinc-800"
        data-aos="fade-up"
      >
        {/* Cover Image */}
        <div className="w-full h-48 md:h-64 overflow-hidden">
          <img
            src={profile.coverImage}
            alt="cover"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Avatar and Info */}
        <div
          className="p-6 flex flex-col md:flex-row items-center gap-6"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <img
            src={profile.avatar}
            alt={profile.username}
            className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-red-600 object-cover"
          />

          <div className="text-center md:text-left w-full">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">
              {profile.fullName}
            </h2>
            <p className="text-red-500 text-sm mb-1">@{profile.username}</p>
            <p className="text-gray-400 text-sm">{profile.email}</p>

            <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
              <span className="px-3 py-1 text-xs bg-red-600 rounded-full">
                Role: {profile.role}
              </span>
              <span
                className={`px-3 py-1 text-xs rounded-full ${
                  profile.isVerified
                    ? "bg-green-600"
                    : "bg-yellow-500 text-black"
                }`}
              >
                {profile.isVerified ? "Verified" : "Not Verified"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
