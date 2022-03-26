import Mockman from "mockman-js";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar, Sidebar } from "./components";
import { Explore, Home } from "./pages";
function App() {
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
    </div>
  );
}

export default App;
