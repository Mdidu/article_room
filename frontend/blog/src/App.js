import { Routes, Route } from "react-router-dom";
import "./App.css";
import {} from "react-hook-form";
import Navbar from "./components/layout/navigation/Navbar";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import ValidateWaiting from "./pages/ValidateWaiting";
import ValidationAccount from "./pages/ValidationAccount";
import NewArticle from "./pages/NewArticle";

function App() {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/article/new" element={<NewArticle />} />
        <Route path="/validate" element={<ValidateWaiting />} />
        <Route path="/validate/:username" element={<ValidationAccount />} />
      </Routes>
    </div>
  );
}

export default App;
