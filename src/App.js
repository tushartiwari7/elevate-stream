import Mockman from "mockman-js";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar, RequiresAuth, Sidebar } from "./components";
import {
  Explore,
  History,
  Home,
  Login,
  NotFound,
  Playlist,
  Playlists,
  PostVideo,
  Signup,
  Video,
} from "./pages";
import loaderSvg from "./assets/loader.svg";
import { useData, useUser } from "./context";
import { useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { updateUser } from "./services";

const toastOptions = {
  // Define default options
  className: "toast fs-l",
};

function App() {
  const { loader } = useData();
  const { user, setUser } = useUser();
  const location = useLocation();

  useEffect(() => {
    // persist user data on refresh
    const token = localStorage.getItem("token");
    if (!user.isLoggedIn && token) {
      const prevSessionUser = JSON.parse(localStorage.getItem("user"));
      delete prevSessionUser.isLoggedIn;
      delete prevSessionUser._id;
      (async (user) => {
        const { updatedUser } = await updateUser(user);
        setUser({ ...updatedUser, isLoggedIn: true });
      })(prevSessionUser);
    }
  }, []);

  return (
    <div
      className={`App grid ${
        location.pathname.includes("/watch") ? "video-layout" : ""
      }`}
    >
      <Navbar />
      <Sidebar />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/watch/:youtubeId" element={<Video />} />
          <Route
            path="/liked"
            element={
              <RequiresAuth>
                <Playlist videoType="Liked Videos" />
              </RequiresAuth>
            }
          />
          <Route
            path="/saved"
            element={
              <RequiresAuth>
                <Playlist videoType="Saved Videos" />
              </RequiresAuth>
            }
          />
          <Route
            path="/playlists"
            element={
              <RequiresAuth>
                <Playlists />
              </RequiresAuth>
            }
          />
          <Route
            path="/history"
            element={
              <RequiresAuth>
                <History />
              </RequiresAuth>
            }
          />
          <Route
            path="/post"
            element={
              <RequiresAuth>
                <PostVideo />
              </RequiresAuth>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/mockman" element={<Mockman />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {loader && (
        <h2 className="loader pos-abs h1 flex flex-center">
          <img src={loaderSvg} alt="loading" />
        </h2>
      )}
      <Toaster position="bottom-right" toastOptions={toastOptions} />
    </div>
  );
}

export default App;
