import React, { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "../axios";

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axiosInstance.get("/users/profile", {
          withCredentials: true,  // send cookies for authentication
        });
        setProfile(data.data); // assuming response shape: { status, data: {user profile} }
        setLoading(false);
      } catch (err) {
        setError("Failed to load user profile.");
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div>Loading profile...</div>;
  if (error) return <div>{error}</div>;
  if (!profile) return <div>No profile data available.</div>;

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h2>{profile.fullName}'s Profile</h2>
      <img 
        src={profile.avatar} 
        alt={`${profile.fullName} avatar`} 
        style={{ width: 150, height: 150, borderRadius: "50%", objectFit: "cover" }} 
      />
      <p><strong>FullName:</strong> {profile.fullName}</p>
      <p><strong>username:</strong> {profile.username}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <img 
        src={profile.coverImage} 
        alt="Cover" 
        style={{ width: "100%", maxHeight: 200, objectFit: "cover", marginTop: 20, borderRadius: 8 }} 
      />
    </div>
  );
};

export default UserProfile;
