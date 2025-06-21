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
import { AuthProvider } from "./context/AuthContext";
import Footer from "./components/Footer";
import Layout from "./Layout/Layout";
import UpdateProfile from "./Pages/UpdateProfile";
import Loading from "./components/Loading";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Loading />} />
            <Route path="/api/v1/users" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="register" element={<Register />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="login" element={<Login />} />
              <Route path="logout" element={<Logout />} />
              <Route path="my-comments" element={<Comments />} />
              <Route path="my-likes" element={<Likes />} />
              <Route path="video-upload" element={<VideoUpload />} />
              <Route path="about" element={<About />} />
              <Route path="my-video" element={<Video />} />
              <Route path="profile" element={<Profile />} />
              <Route path="update-profile" element={<UpdateProfile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
