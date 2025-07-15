import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../axios";

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
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p className="text-gray-400">Loading profile...</p>
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
    <div className="min-h-screen bg-black text-white px-4 py-8">
      <div className="max-w-4xl mx-auto bg-zinc-900 rounded-lg overflow-hidden shadow-lg border border-zinc-800">
        {/* Cover Image */}
        <div className="w-full h-48 md:h-64 overflow-hidden">
          <img
            src={profile.coverImage}
            alt="cover"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Avatar and Info */}
        <div className="p-6 flex flex-col md:flex-row items-center gap-6">
          <img
            src={profile.avatar}
            alt={profile.username}
            className="w-32 h-32 rounded-full border-4 border-red-600 object-cover"
          />

          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold text-white mb-1">
              {profile.fullName}
            </h2>
            <p className="text-red-500 text-sm mb-2">@{profile.username}</p>
            <p className="text-gray-400 text-sm mb-2">{profile.email}</p>

            <div className="flex flex-wrap gap-3 mt-3">
              <span className="px-3 py-1 text-xs bg-red-600 rounded-full">
                Role: {profile.role}
              </span>

              <span
                className={`px-3 py-1 text-xs rounded-full ${
                  profile.isVerified
                    ? "bg-green-600"
                    : "bg-yellow-600 text-black"
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
