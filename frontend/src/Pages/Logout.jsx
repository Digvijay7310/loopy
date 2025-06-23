import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Logout() {
  const { setAuthUser, setAccessToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    try {
      await axios.get("/logout");
      setLoading(true);
      setAuthUser(null);
      setAccessToken(null);
      delete axios.defaults.headers.common["Authorization"];
      alert("Logged out");
      navigate("/api/v1/users/login");
    } catch (error) {
      console.error("Something went wront while logout", error);
    } finally {
      setLoading(true);
    }
  };
  return (
    <div className="min-h-screen bg-zinc-900">
      <div className="pt-6 flex flex-col items-center justify-center">
        <h3 className="text-white text-3xl font-semibold text-center ">
          You want to logout
        </h3>
        <p className="text-white text-md  text-center">
          If you logoutthen you don't like and upload videos
        </p>
        <button
          type="button"
          disabled={loading}
          onClick={handleLogout}
          className={`bg-red-600 cursor-pointer px-5 py-1 rounded-md text-white hover:bg-red-500 transistion duration-200 transition-all
        ${loading ? "bg-red-400 cursor-not-allowed" : "bg-red-600"}`}
        >
          {loading ? "You are logouting" : "logout"}
        </button>
      </div>
    </div>
  );
}

export default Logout;
