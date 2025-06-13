import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Logout from "./Pages/Logout";
import Comments from "./Pages/Comments";
import Likes from "./Pages/Likes";
import VideoUpload from "./Pages/VideoUpload";
import About from "./Pages/About";
import Profile from "./Pages/Profile";
import Video from "./Pages/Video";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/my-comments" element={<Comments />} />
          <Route path="/my-likes" element={<Likes />} />
          <Route path="/video-upload" element={<VideoUpload />} />
          <Route path="/about" element={<About />} />
          <Route path="/my-video" element={<Video />} />
          <Route path="/my-profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
