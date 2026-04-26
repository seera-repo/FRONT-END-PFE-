import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Signup from './pages/SignUp';
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import Course from './pages/Course';
import CommunityBlog from './pages/ComunityBlog';
import ChooseComunity from './pages/ChooseComunity';
import ChooseRole from './pages/ChooseRole';
import BrowseCourse from './pages/BrowseCourse';
import LessonPage from './pages/LessonPage';
import Profile from './pages/Profile';
import NormalORTrisomyStudent from './pages/NormalORTrisomyStudent';
import ProtectedRoute from './components/ProtectedRoute';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LandingPage />} />

        <Route path="/Signup" element={<Signup />} />

        <Route path="/Login" element={<Login />} />

        <Route path="/HomePage" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />

        <Route path="/BrowseCourse" element={<ProtectedRoute><BrowseCourse /></ProtectedRoute>} />

        <Route path="/course/:id" element={<ProtectedRoute><Course /></ProtectedRoute>} />

        <Route path="/courses/:id/lessons/:lessonId" element={<ProtectedRoute><LessonPage /></ProtectedRoute>} />

        <Route path="/CommunityBlog" element={<ProtectedRoute><CommunityBlog /></ProtectedRoute>} />

        <Route path="/ChooseRole" element={<ProtectedRoute><ChooseRole /></ProtectedRoute>} />

        <Route path="/ChooseComunity" element={<ProtectedRoute><ChooseComunity /></ProtectedRoute>} />

        <Route path="/NormalORTrisomyStudent" element={<ProtectedRoute><NormalORTrisomyStudent /></ProtectedRoute>} />

        <Route path="/BrowseCourse" element={<ProtectedRoute><BrowseCourse /></ProtectedRoute>} />

        <Route path="/Profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
