import React from "react";
import { useState } from "react";

function UpdateProfile() {
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleUpdate = async () => {
    try {
      const { data } = await axios.put("/update-profile", {
        email,
        avatar,
        username,
        coverImage,
      });
      alert("Profile updated");
      console.log(data.data);
    } catch (error) {
      alert(error?.res?.data.message || "updaed failed");
    }
  };
  return (
    <div>
      <form onSubmit={handleUpdate}>
        <h2>Update profile</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}

export default UpdateProfile;
