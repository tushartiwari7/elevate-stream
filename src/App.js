import Mockman from "mockman-js";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar, Sidebar } from "./components";
import { Explore, Home } from "./pages";
import loaderSvg from "./assets/loader.svg";
import { useData } from "./context";
function App() {
  const { loader } = useData();
  return (
    <div className="App grid">
      <Navbar />
      <Sidebar />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
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
