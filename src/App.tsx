import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Signup from './pages/SignUp';
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import Course from './pages/Course';
import ComunityBlog from './pages/ComunityBlog';
import ChooseComunity from './pages/ChooseComunity';
import ChooseRole from './pages/ChooseRole';
import BrowseCourse from './pages/BrowseCourse';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LandingPage />} />

        <Route path="/Signup" element={<Signup />} />

        <Route path="/Login" element={<Login />} />

        <Route path="/HomePage" element={<HomePage />} />

        <Route path="/Course" element={<Course />} />

        <Route path="/ComunityBlog" element={<ComunityBlog />} />

        <Route path="/ChooseRole" element={<ChooseRole />} />

        <Route path="/ChooseComunity" element={<ChooseComunity />} />

        <Route path="/BrowseCourse" element={<BrowseCourse />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
