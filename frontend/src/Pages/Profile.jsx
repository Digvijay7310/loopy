import React from "react";
import { useState } from "react";

function profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("/profile")
      .then((res) => setUser(res.data.data))
      .catch((err) => alert(err?.res?.data.message));
  }, []);

  return (
    <div>
      <h2>Your Profile</h2>
      {user ? (
        <div>
          <p>Email: {user.email}</p>
          <p>Avatar: {user.avatar}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default profile;
