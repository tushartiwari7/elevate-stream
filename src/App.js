import Mockman from "mockman-js";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar, Sidebar } from "./components";
import { Explore, History, Home, Playlist, Video } from "./pages";
import loaderSvg from "./assets/loader.svg";
import { useData } from "./context";
import { useLocation } from "react-router-dom";
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
          <Route path="/history" element={<History />} />
          <Route path="/mockman" element={<Mockman />} />
        </Routes>
      </main>
      {loader && (
        <h2 className="loader pos-abs h1 flex flex-center">
          <img src={loaderSvg} alt="loading" />
        </h2>
      )}
    </div>
  );
}

export default App;
