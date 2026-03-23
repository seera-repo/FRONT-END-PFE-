
import Sidebar from "../components/Sidebar";
import CourseCard from "../components/CourseCard";
import ProfileCard from "../components/ProfileCard";

const HomePage = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      
      {/* LEFT */}
      <Sidebar />

      {/* CENTER */}
      <div className="flex-1 p-6">
        
        {/* HERO */}
        <div className="bg-indigo-600 text-white p-6 rounded-xl mb-6">
          <h1 className="text-2xl font-bold">Discover New skills</h1>
          <p>one step at a time.</p>
        </div>

        {/* COURSES */}
        <h2 className="font-semibold mb-3">Your Courses</h2>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <CourseCard />
          <CourseCard />
          <CourseCard />
        </div>

        {/* RECOMMENDED */}
        <h2 className="font-semibold mb-3">Recommended For You</h2>
        <div className="grid grid-cols-3 gap-4">
          <CourseCard />
          <CourseCard />
          <CourseCard />
        </div>
      </div>

      {/* RIGHT */}
      <ProfileCard />
    </div>
  );
};

export default HomePage;