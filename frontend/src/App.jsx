import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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

import Layout from "./Layout/Layout";
import UpdateProfile from "./Pages/UpdateProfile";
import MyVideos from "./Pages/MyVideos";
import Faq from "./Pages/Faq";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import HelpCenter from "./Pages/HelpCenter";
import Terms from "./Pages/Terms";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* <Route path="/" element={<Loading />} /> */}
            <Route path="/users" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/users/register" element={<Register />} />
              <Route path="/users/login" element={<Login />} />
              <Route path="/users/logout" element={<Logout />} />
              <Route path="/users/my-comments" element={<Comments />} />
              <Route path="/users/my-likes" element={<Likes />} />
              <Route path="/users/profile" element={<Profile />} />
              <Route path="/users/update-profile" element={<UpdateProfile />} />
              <Route path="/users/faq" element={<Faq />} />
              <Route path="/users/privacy" element={<PrivacyPolicy />} />
              <Route path="/users/help" element={<HelpCenter />} />
              <Route path="/users/terms" element={<Terms />} />
            </Route>
            {/* Videos Routes */}
            <Route path="/videos" element={<Layout />}>
              <Route path="video-upload" element={<VideoUpload />} />
              <Route path="about" element={<About />} />
              <Route path="my-videos" element={<MyVideos />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
