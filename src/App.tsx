import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Signup from './pages/SignUp';
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import Course from './pages/Course';
import CommunityBlog from './pages/ComunityBlog';
import ChooseComunity from './pages/ChooseCommunity';
import ChooseRole from './pages/ChooseRole';
import BrowseCourse from './pages/BrowseCourse';
import LessonPage from './pages/LessonPage';
import Profile from './pages/Profile';
import ProfileStudent from './pages/ProfileStudent';
import NormalORTrisomyStudent from './pages/NormalORTrisomyStudent';
import ProtectedRoute from './components/ProtectedRoute';
import HomePageTeacher from './pages/HomePageTeacher';
import FormTeacher from './pages/FormTeacher';
import AddCourse from './pages/AddCourse';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/ChooseRole" element={<ChooseRole />} />
        <Route path="/ChooseCommunity" element={<ChooseComunity />} />

        

// Teacher only
        <Route path="/HomePageTeacher"
          element={<ProtectedRoute allowedRoles={["Teacher"]}>
            <HomePageTeacher />
          </ProtectedRoute>} />

        <Route path="/AddCourse"
          element={<ProtectedRoute allowedRoles={["Teacher"]}>
            <AddCourse />
          </ProtectedRoute>} />

          //add idit cource + profile...


// Student only
        <Route path="/formTeacher"
          element={<ProtectedRoute allowedRoles={["Student"]}>
            <FormTeacher />
          </ProtectedRoute>} />

        <Route path="/ProfileStudent"
          element={<ProtectedRoute allowedRoles={["Student"]}>
            <ProfileStudent />
          </ProtectedRoute>} />

        <Route path="/NormalORTrisomyStudent"
          element={<ProtectedRoute allowedRoles={["Student"]}>
            <NormalORTrisomyStudent />
          </ProtectedRoute>} />

          <Route path="/HomePage"
          element={<ProtectedRoute allowedRoles={["Student"]}>
            <HomePage />
          </ProtectedRoute>} />

//  Student and Teacher and admin
        <Route path="/BrowseCourse"
          element={<ProtectedRoute allowedRoles={["Student", "Teacher", "Admin"]}>
            <BrowseCourse />
          </ProtectedRoute>} />

        <Route path="/course/:id"
          element={<ProtectedRoute allowedRoles={["Student", "Teacher", "Admin"]}>
            <Course />
          </ProtectedRoute>} />

        <Route path="/courses/:id/lessons/:lessonId"
          element={<ProtectedRoute allowedRoles={["Student", "Teacher", "Admin"]}>
            <LessonPage />
          </ProtectedRoute>} />

        <Route path="/CommunityBlog"
          element={<ProtectedRoute allowedRoles={["Student", "Teacher", "Admin"]}>
            <CommunityBlog />
          </ProtectedRoute>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
