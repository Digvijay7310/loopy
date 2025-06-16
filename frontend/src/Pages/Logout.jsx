import React from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

function Logout() {
  const [setAuthUser, setAccessToken] = useAuth();

  const handleLogout = async (e) => {
    await axios.get("/logout");
    setAuthUser(null);
    setAccessToken(null);
    delete axios.defaults.headers.common["Authorization"];
    alert("Logged out");
  };
  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Logout;
