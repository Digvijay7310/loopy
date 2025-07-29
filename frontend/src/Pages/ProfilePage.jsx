import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../axios";
import AOS from "aos";
import { Helmet } from "react-helmet";
import "aos/dist/aos.css";

// Import subcomponents
import ProfileHeader from "../components/Profile/ProfileHeader";
import ProfileStats from "../components/Profile/ProfileStats";
import ProfileNavTabs from "../components/Profile/ProfileNavTabs";
import VideoGrid from "../components/Profile/VideoGrid";

function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    const fetchData = async () => {
      try {
        const profileRes = await axiosInstance.get("/users/profile", { withCredentials: true });
        setProfile(profileRes.data.data);

        const videoRes = await axiosInstance.get("/videos/my-videos", { withCredentials: true });
        setVideos(videoRes.data.data);
      } catch (err) {
        toast.error(err?.response?.data?.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
    <div className="bg-black text-white">
      <Helmet>
        <title>{profile.fullName} | Profile - Loopy</title>
      </Helmet>

      <ProfileHeader profile={profile} />
      <ProfileStats views={profile.views} createdAt={profile.createdAt} />

      <div className="mt-3 flex justify-center items-center">
        <button className="bg-red-500 font-semibold text-white px-0.5 py-2.5 w-[200px] rounded-lg hover:bg-red-600 duration-300 hover:text-gray-300">
          Subscribe
        </button>
      </div>

      <ProfileNavTabs />
      <VideoGrid videos={videos} />
    </div>
  );
}

export default ProfilePage;
