import { Link } from "react-router-dom";
import {
  BookOpen, Users, Star, CheckCircle2,
  Award, Heart, ArrowLeft
} from "lucide-react";
import Header from "../components/Header";

// Replace with real API call using teacher_id from useParams()
const MOCK_TEACHER = {
  id: "uuid-123",
  name: "Dr. Ahmed Khalil",
  isPsychologist: false,
  descreption:
    "Passionate computer science educator with over 10 years of teaching experience. I specialize in algorithms, data structures, and web technologies. My goal is to make complex topics accessible to every learner, regardless of background.",
  status: "approved",
  createdAt: "2024-01-15T10:00:00Z",
  totalStudents: 320,
  totalCourses: 3,
  averageRating: 4.8,
  courses: [
    {
      id: "c1",
      title: "Introduction To Computer Science",
      category: "CS BASICS",
      students: 142,
      rating: 4.9,
      lessons: 12,
      description: "A comprehensive introduction to the fundamentals of computer science.",
    },
    {
      id: "c2",
      title: "Data Structures & Algorithms",
      category: "CS CORE",
      students: 89,
      rating: 4.7,
      lessons: 18,
      description: "Master the core data structures and algorithms every developer needs.",
    },
    {
      id: "c3",
      title: "Web Development Fundamentals",
      category: "WEB DEV",
      students: 89,
      rating: 4.6,
      lessons: 15,
      description: "Learn HTML, CSS, and JavaScript to build modern responsive websites.",
    },
  ],
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

const ProfileTeacher = () => {
  const teacher = MOCK_TEACHER;

  return (
    <div className="flex min-h-screen flex-col bg-[#f5f9fb]">
      <Header />

      <main className="flex-1 mt-16 px-4 py-10 max-w-5xl mx-auto w-full">

        {/* Back */}
        <Link
          to="/BrowseCourse"
          className="inline-flex items-center gap-2 text-sm text-[#59656e] hover:text-[#2F35C2] transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Courses
        </Link>

        {/* Hero card */}
        <div className="bg-white rounded-3xl shadow-md overflow-hidden mb-8">

          {/* Banner */}
          <div className="h-28 bg-gradient-to-r from-[#2e2c74] via-[#4145a8] to-[#585bc0] relative">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />
          </div>

          <div className="px-8 pb-8">
            {/* Avatar row */}
            <div className="-mt-12 mb-4 flex items-end justify-between">
              <div className="w-24 h-24 rounded-2xl bg-[#2e2c74] flex items-center justify-center text-white text-2xl font-extrabold shadow-lg border-4 border-white">
                {getInitials(teacher.name)}
              </div>
              {teacher.isPsychologist && (
                <span className="inline-flex items-center gap-1.5 bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1.5 rounded-full">
                  <Heart className="h-3.5 w-3.5 fill-purple-400" />
                  Certified Psychologist
                </span>
              )}
            </div>

            {/* Name & bio */}
            <h1 className="text-2xl font-extrabold text-[#19232a] mb-1">{teacher.name}</h1>
            <p className="text-sm text-[#59656e] leading-relaxed max-w-2xl mb-6">
              {teacher.descreption}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-5 border-t border-gray-100 pt-5">

              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#d2d4f5] flex items-center justify-center shrink-0">
                  <Users className="h-4 w-4 text-[#2F35C2]" />
                </div>
                <div>
                  <p className="font-bold text-[#19232a] text-base leading-none">{teacher.totalStudents}</p>
                  <p className="text-xs text-[#59656e] mt-0.5">Students</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#d2d4f5] flex items-center justify-center shrink-0">
                  <BookOpen className="h-4 w-4 text-[#2F35C2]" />
                </div>
                <div>
                  <p className="font-bold text-[#19232a] text-base leading-none">{teacher.totalCourses}</p>
                  <p className="text-xs text-[#59656e] mt-0.5">Courses</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
                  <Star className="h-4 w-4 text-amber-500 fill-amber-400" />
                </div>
                <div>
                  <p className="font-bold text-[#19232a] text-base leading-none">{teacher.averageRating}</p>
                  <p className="text-xs text-[#59656e] mt-0.5">Avg. Rating</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                </div>
                <div>
                  <p className="font-bold text-[#19232a] text-base leading-none">Verified</p>
                  <p className="text-xs text-[#59656e] mt-0.5">Teacher</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#e8f0f3] flex items-center justify-center shrink-0">
                  <Award className="h-4 w-4 text-[#59656e]" />
                </div>
                <div>
                  <p className="font-bold text-[#19232a] text-base leading-none">
                    {new Date(teacher.createdAt).getFullYear()}
                  </p>
                  <p className="text-xs text-[#59656e] mt-0.5">Member since</p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Courses section */}
        <h2 className="text-xl font-extrabold text-[#19232a] mb-5 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-[#2F35C2]" />
          Courses by {teacher.name}
        </h2>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {teacher.courses.map((course) => (
            <Link
              key={course.id}
              to={`/course/${course.id}`}
              className="group bg-white rounded-2xl border border-[#d4e5ea] shadow-sm overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
            >
              {/* Thumbnail */}
              <div className="h-32 bg-gradient-to-br from-[#d2d4f5] to-[#a7aae9] flex items-center justify-center">
                <BookOpen className="h-10 w-10 text-[#2e2c74] opacity-50" />
              </div>

              <div className="p-5">
                <span className="inline-block px-2.5 py-1 bg-[#d2d4f5] text-[#2F35C2] text-[10px] font-bold rounded-full mb-2">
                  {course.category}
                </span>
                <h3 className="font-bold text-[#19232a] text-sm leading-snug mb-2 group-hover:text-[#2F35C2] transition-colors line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-xs text-[#59656e] leading-relaxed mb-4 line-clamp-2">
                  {course.description}
                </p>
                <div className="flex items-center justify-between border-t border-gray-100 pt-3 text-xs text-[#59656e]">
                  <span className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" /> {course.students}
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="h-3.5 w-3.5" /> {course.lessons}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" /> {course.rating}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </main>
    </div>
  );
};

export default ProfileTeacher;