import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Logout from "./Pages/Logout";
import Comments from "./Pages/Comments";
import Likes from "./Pages/Likes";
import VideoUpload from "./Pages/VideoUpload";
import About from "./Pages/About";
import Profile from "./Pages/Profile";
import { AuthProvider } from "./context/AuthContext";


import UpdateProfile from "./Pages/UpdateProfile";
import MyVideos from "./Pages/MyVideos";
import Faq from "./Pages/Faq";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import HelpCenter from "./Pages/HelpCenter";
import Terms from "./Pages/Terms";
import PageNotFound from "./Pages/PageNotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthLoading from "./components/AuthLoading";
import Video from "./Pages/Video";

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
          
    </>
  );
}

export default App;
