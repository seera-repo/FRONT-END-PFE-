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
import BrowseCourseTeacher from './pages/BrowseCourseTeacher'
import LessonPage from './pages/LessonPage';
import Profile from './pages/Profile';
import ProfileStudent from './pages/ProfileStudent';
import NormalORTrisomyStudent from './pages/NormalORTrisomyStudent';
import Page from './pages/page';
import ProtectedRoute from './components/ProtectedRoute';
import HomePageTeacher from './pages/HomePageTeacher';
import FormTeacher from './pages/FormTeacher';
import AddCourse from './pages/AddCourse';
import AdminDashBoard from './pages/page';
import VerifyEmail from './pages/VerifyEmail';
import TeacherProfile from './pages/Profileteacher';
import EditCourse from './pages/EditCourse';
import PublicTeacherProfile from './pages/PublicTeacherProfile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/ChooseRole" element={<ChooseRole />} />
        <Route path="/ChooseCommunity" element={<ChooseComunity />} />

//admin only
        <Route path='/db' element={<ProtectedRoute allowedRoles={["Admin"]}>
          <AdminDashBoard />
        </ProtectedRoute>} />



// Teacher only
        <Route path="/HomePageTeacher"
          element={<ProtectedRoute allowedRoles={["Teacher"]}>
            <HomePageTeacher />
          </ProtectedRoute>} />

        <Route path="/AddCourse"
          element={<ProtectedRoute allowedRoles={["Teacher"]}>
            <AddCourse />
          </ProtectedRoute>} />
        <Route path="/BrowseCourseTeacher"
          element={<ProtectedRoute allowedRoles={["Teacher", "Admin"]}>
            <BrowseCourseTeacher />
          </ProtectedRoute>} />
        <Route path="/CommunityBlogTeacher"
          element={<ProtectedRoute allowedRoles={["Teacher", "Admin"]}>
            <CommunityBlogTeacher />
          </ProtectedRoute>} />

        <Route path="/EditCourse/:id"
          element={<ProtectedRoute allowedRoles={["Teacher", "Admin"]}>
            <EditCourse />
          </ProtectedRoute>} />

        <Route path="/profileTeacher"
          element={<ProtectedRoute allowedRoles={["Teacher"]}>
            <TeacherProfile />
          </ProtectedRoute>} />profileTeacher          //add idit cource + profile...


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



        <Route path="/AdminDashBoard" element={<ProtectedRoute allowedRoles={["Admin"]}>
          <Page />
        </ProtectedRoute>} />
        <Route path="/teacher/:id" element={<PublicTeacherProfile />} />

        <Route path="/ProfileAdmin" element={<ProtectedRoute allowedRoles={["Admin"]}>
          <ProfileStudent />
        </ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
