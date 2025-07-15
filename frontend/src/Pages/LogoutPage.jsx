import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../axios";

function LogoutPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await axiosInstance.post("/users/logout", {}, { withCredentials: true });
      toast.success("Logged out successfully!");
      navigate("/users/login");
    } catch (error) {
      const msg = error.response?.data?.message || "Logout failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-zinc-900 p-8 rounded-lg border border-red-600 shadow-lg text-center w-full max-w-sm">
        <h2 className="text-2xl font-bold text-white mb-6">Ready to Logout?</h2>
        <button
          onClick={handleLogout}
          disabled={loading}
          className="w-full bg-red-600 hover:bg-red-700 transition-colors duration-300 font-semibold py-2 rounded text-white"
        >
          {loading ? "Logging out..." : "Logout"}
        </button>
      </div>
    </div>
  );
}

export default LogoutPage;
