// import { createContext, useContext, useState } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [authUser, setAuthUser] = useState(null);

//   return (
//     <AuthContext.Provider value={{ authUser, setAuthUser }} >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);


import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create context
const AuthContext = createContext();

// Custom hook for consuming context
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check if user is already logged in on page load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/v1/user/profile", {
          withCredentials: true,
        });
        setUser(res.data?.data); // assuming apiResponse format
      } catch (err) {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  // Login function
  const loginUser = async (email, password) => {
    const res = await axios.post(
      "/api/v1/user/login",
      { email, password },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    setUser(res.data?.data?.user);
    return res.data;
  };

  // Logout function
  const logoutUser = async () => {
    await axios.post("/api/v1/user/logout", {}, { withCredentials: true });
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    loginUser,
    logoutUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
