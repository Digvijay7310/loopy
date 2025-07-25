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
import PublicRoute from "./components/PublicRoutes";
import AuthContextProvider from "./context/AuthContextProvider";
import ProtectedRoute from "./components/ProtectedRoute";


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
        <Route path="/users" index element={
          <ProtectedRoute>
            <HomePage/>
          </ProtectedRoute>
         } />
        <Route path="/users/register" 
        element={
        <PublicRoute>
          <Register/>
        </PublicRoute> }
         />
        <Route path="/users/login" 
        element={
        <PublicRoute>
          <Login/>
          </PublicRoute>}
         />
        <Route path="/users/profile" 
        element={
        <ProtectedRoute>
          <ProfilePage/> 
        </ProtectedRoute>} />
        <Route path="/users/update-profile" 
        element={
        <ProtectedRoute>
          <UpdateProfilePage/> 
        </ProtectedRoute>} />
        <Route path="/users/logout" 
        element={
        <ProtectedRoute>
          <LogoutPage/> 
        </ProtectedRoute>} />
        <Route path="/videos/upload" 
        element={
        <ProtectedRoute>
          <VideoUpload/> 
        </ProtectedRoute>}  />
        <Route path="/videos/my-videos" 
        element={
        <ProtectedRoute>
          <MyVideosPage/> 
        </ProtectedRoute>} />
        <Route path="/videos/video/:videoId" 
        element={
        <ProtectedRoute>
          <WatchVideoPage/> 
        </ProtectedRoute>} />
        <Route path="/videos/my-comments-videos" 
        element={
        <ProtectedRoute>
          <MyCommentsPage/> 
        </ProtectedRoute>} />
        <Route path="/videos/my-likes-videos"
         element={
         <ProtectedRoute>
         <MyLikesPage/> 
          </ProtectedRoute>
         } />
        <Route path="/videos/delete-my-video/:videoId" 
        element={
        <ProtectedRoute>
          <DeleteAVideoPage/> 
        </ProtectedRoute>} />
        <Route path="/videos/delete-all-videos" 
        element={
        <ProtectedRoute>
          <DeleteAllVideoPage/> 
        </ProtectedRoute>} />
        </Route>
        <Route path="*" element={<PageNotFound/>} />      

      </Routes>

    </>
  );
}

export default App;
