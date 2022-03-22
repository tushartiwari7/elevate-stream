import "./App.css";
import { Navbar } from "./components/Navbar/Navbar";

function App() {
  return (
    <div className="App grid">
      <Navbar />
      <div className="sidebar"> </div>
      <div className="main"> </div>
    </div>
  );
}

export default App;
