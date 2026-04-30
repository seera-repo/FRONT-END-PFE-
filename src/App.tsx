import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Signup from './pages/SignUp';
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import Course from './pages/Course';
import CommunityBlog from './pages/ComunityBlog';
import CommunityBlogTeacher from './pages/ComunityBlogTeacher';
import ChooseComunity from './pages/ChooseCommunity';
import ChooseRole from './pages/ChooseRole';
import BrowseCourse from './pages/BrowseCourse';
import LessonPage from './pages/LessonPage';
import Profile from './pages/Profile';
import ProfileStudent from './pages/ProfileStudent';
import NormalORTrisomyStudent from './pages/NormalORTrisomyStudent';
import ProtectedRoute from './components/ProtectedRoute';
import  HomePageTeacher from './pages/HomePageTeacher'
import AddCourse from './pages/AddCourse';
import Profileteacher from './pages/Profileteacher';
import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LandingPage />} />

        <Route path="/Signup" element={<Signup />} />

        <Route path="/Login" element={<Login />} />

        <Route path="/HomePage" element={<HomePage />} />

        <Route path="/BrowseCourse" element={<BrowseCourse />} />

        <Route path="/course/:id" element={<Course />} />

        <Route path="/courses/:id/lessons/:lessonId" element={<LessonPage />} />

        <Route path="/CommunityBlog" element={<CommunityBlog />} />
        <Route path="/CommunityBlogTeacher" element={<CommunityBlogTeacher />} />
        <Route path="/ChooseRole" element={<ChooseRole />} />

        <Route path="/ChooseComunity" element={<ChooseComunity />} />

        <Route path="/NormalORTrisomyStudent" element={<NormalORTrisomyStudent />} />
       <Route path="/HomePageTeacher" element={<HomePageTeacher />} />
        <Route path="/BrowseCourse" element={<BrowseCourse />} />

        <Route path="/Profile" element={<Profile />} />
        <Route path="/ProfileStudent" element={<ProfileStudent />} />
        <Route path="/Profileteacher" element={<Profileteacher/>} />
       <Route path="/AddCourse" element={<AddCourse />} />
        <Route path="/Header" element={<Header/>} />
        <Route path="/Testb" element={<Testb/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
