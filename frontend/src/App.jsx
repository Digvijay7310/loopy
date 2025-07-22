import "./App.css";
import { Route, Routes } from "react-router-dom";



import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import HomePage from "./Pages/HomePage";
import LogoutPage from "./Pages/LogoutPage";
import ProfilePage from "./Pages/ProfilePage";
import VideoUpload from "./Pages/VideoUpload";
import MyVideosPage from "./Pages/MyVideosPage";
import WatchVideoPage from "./Pages/WatchVideoPage";
import MyCommentsPage from "./Pages/MyCommentsPage";
import MyLikesPage from "./Pages/MyLikesPage";
import DeleteAVideoPage from "./Pages/DeleteAVideoPage";
import DeleteAllVideoPage from "./Pages/DeleteAllVideoPage";
import PageNotFound from "./Pages/PageNotFound";
import UpdateProfilePage from "./Pages/UpdateProfilePage";
import RoutePage from "./Pages/RoutePage";
import Layout from "./Layout/Layout";


function App() {
  return (
    <>
     
         <ToastContainer
  position="top-right"
  autoClose={3000}
  hideProgressBar={false}
  newestOnTop
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="dark"
  toastStyle={{
    backgroundColor: "#1e1e1e",
    color: "#ffffff",
    fontSize: "14px",
    borderRadius: "8px",
  }}
/>

    
      <Routes >
        
        <Route element={<Layout/>}>
        <Route path="/" element={<RoutePage />} />
        <Route path="/users" index element={<HomePage/> } />
        <Route path="/users/register" element={<Register/> } />
        <Route path="/users/login" element={<Login />} />
        <Route path="/users/profile" element={<ProfilePage/>} />
        <Route path="/users/update-profile" element={<UpdateProfilePage/>} />
        <Route path="/users/logout" element={<LogoutPage/>} />
        <Route path="/videos/upload" element={<VideoUpload/>}  />
        <Route path="/videos/my-videos" element={<MyVideosPage/>} />
        <Route path="/videos/video/:videoId" element={<WatchVideoPage/>} />
        <Route path="/videos/my-comments-videos" element={<MyCommentsPage/>} />
        <Route path="/videos/my-likes-videos" element={<MyLikesPage/>} />
        <Route path="/videos/delete-my-video/:videoId" element={<DeleteAVideoPage/>} />
        <Route path="/videos/delete-all-videos" element={<DeleteAllVideoPage/>} />
        </Route>
        <Route path="*" element={<PageNotFound/>} />

      

      </Routes>
    </>
  );
}

export default App;
