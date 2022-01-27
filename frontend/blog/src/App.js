import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/navigation/Navbar";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import ValidateWaiting from "./pages/ValidateWaiting";
import ValidationAccount from "./pages/ValidationAccount";
import NewArticle from "./pages/NewArticle";
import ArticleDetail from "./pages/ArticleDetail";
import UpdateArticle from "./pages/UpdateArticle";
import NewTheme from "./pages/NewTheme";
import AllTheme from "./pages/AllTheme";

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
        <Route path="/article/update/:articleId" element={<UpdateArticle />} />
        <Route path="/article/:articleId" element={<ArticleDetail />} />
        <Route path="/theme" element={<AllTheme />} />
        <Route path="/theme/new" element={<NewTheme />} />
        <Route path="/validate" element={<ValidateWaiting />} />
        <Route path="/validate/:username" element={<ValidationAccount />} />
      </Routes>
    </div>
  );
}

export default App;
