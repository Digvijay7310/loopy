import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";



import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./components/Register";
import Login from "./components/Login";
import VideoUpload from "./components/VideoUpload";
import HomePage from "./Pages/HomePage";
import MyVideosPage from "./Pages/MyVideoPage";
import UserProfile from "./components/UserProfile";
import UpdateProfile from "./Pages/UpdateProfile";
import LogoutPage from "./Pages/LogoutPage";


function App() {
  return (
    <>
     
        <ToastContainer position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark" />

    {/* <Register/> */}
    {/* <Login />
    <VideoUpload /> */}
          {/* <HomePage /> */}
          {/* <MyVideosPage/> */}
          {/* <UserProfile /> */}
          {/* <UpdateProfile/> */}
          <LogoutPage />
    </>
  );
}

export default App;
