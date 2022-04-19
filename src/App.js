import Mockman from "mockman-js";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar, Sidebar } from "./components";
import {
  Explore,
  History,
  Home,
  Login,
  NotFound,
  Playlist,
  Playlists,
  Signup,
  Video,
} from "./pages";
import loaderSvg from "./assets/loader.svg";
import { useData } from "./context";
import { useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const toastOptions = {
  // Define default options
  className: "toast fs-l",
};

function App() {
  const { loader } = useData();
  const location = useLocation();
  return (
    <div
      className={`App grid ${
        location.pathname === "/video" ? "video-layout" : ""
      }`}
    >
      <Navbar />
      <Sidebar />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/video" element={<Video />} />
          <Route
            path="/liked"
            element={<Playlist videoType="Liked Videos" />}
          />
          <Route path="/saved" element={<Playlist videoType="Watch Later" />} />
          <Route path="/playlists" element={<Playlists />} />
          <Route path="/history" element={<History />} />
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
