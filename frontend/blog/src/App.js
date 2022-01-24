import { Routes, Route } from "react-router-dom";
import "./App.css";
import {} from "react-hook-form";
import Navbar from "./components/layout/navigation/Navbar";
import Home from "./pages/Home";

function App() {
  return (
    <div>
      <header>
        <Navbar></Navbar>
      </header>
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </div>
  );
}

export default App;
