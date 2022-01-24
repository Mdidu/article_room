import { Routes, Route } from "react-router-dom";
import "./App.css";
import {} from "react-hook-form";
import Navbar from "./components/layout/navigation/Navbar";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import ValidateWaiting from "./pages/ValidateWaiting";
import ValidationAccount from "./pages/ValidationAccount";

function App() {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/validate" element={<ValidateWaiting />} />
        <Route path="/validate/:username" element={<ValidationAccount />} />
      </Routes>
    </div>
  );
}

export default App;
