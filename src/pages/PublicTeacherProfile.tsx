import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Mail, BookOpen, Heart, Users, Award, FileText } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const fetchPublicTeacher = async (id: string) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`http://localhost:3000/api/teachers/public/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message);
  return data.teacher;
};

const fetchTeacherCourses = async (teacherId: string) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`http://localhost:3000/api/courses?teacher_id=${teacherId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  return data.courses ?? data ?? [];
};

const PublicTeacherProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: teacher, isLoading: teacherLoading, isError } = useQuery({
    queryKey: ["public-teacher", id],
    queryFn: () => fetchPublicTeacher(id!),
  });

  const { data: courses = [], isLoading: coursesLoading } = useQuery({
    queryKey: ["teacher-courses", id],
    queryFn: () => fetchTeacherCourses(id!),
    enabled: !!teacher,
  });

  const isLoading = teacherLoading || coursesLoading;

  if (isLoading) return (
    <div className="w-full h-screen flex justify-center items-center gap-x-2">
      <div className="w-5 h-5 bg-[#d991c2] animate-pulse rounded-full" />
      <div className="w-5 h-5 bg-[#9869b8] animate-bounce rounded-full" />
      <div className="w-5 h-5 bg-[#6756cc] animate-bounce rounded-full" />
    </div>
  );

  if (isError) return (
    <div className="w-full h-screen flex justify-center items-center text-gray-500">
      Teacher not found.
    </div>
  );

  const user = teacher.User;
  const initials = user?.name
    ? user.name.trim().split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase()
    : "T";

  const totalLikes = courses.reduce((sum: number, c: any) => sum + (c.likes || 0), 0);
  const totalStudents = courses.reduce((sum: number, c: any) => sum + (c.enrollmentsCount || 0), 0);

  return (
    <div className="flex min-h-screen flex-col bg-[#f5f9fb]">
      <Header />

      {/* Hero */}
      <div className="relative bg-[#2e2c74] overflow-hidden mt-17">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-purple-500/20 blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-32 w-64 h-64 rounded-full bg-indigo-400/15 blur-2xl translate-y-1/2" />
          <div className="absolute inset-0 opacity-5"
            style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        </div>

        <div className="relative z-10 px-8 pt-8 pb-14">
          <button
            onClick={() => navigate(-1)}
            className="mb-6 inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5 text-sm font-medium text-white/80 hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>

          <div className="flex items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#A7AAE9] to-[#6b6fc4] flex items-center justify-center shadow-2xl border-2 border-white/20">
                <span className="text-white text-3xl font-bold">{initials}</span>
              </div>
              {teacher.isPsychologist && (
                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl bg-amber-400 flex items-center justify-center shadow-lg">
                  <Award className="w-4 h-4 text-white" />
                </div>
              )}
            </div>

            {/* Info */}
            <div>
              <h1 className="text-white text-2xl font-extrabold">{user?.name}</h1>
              <div className="flex items-center gap-2 text-white/60 text-sm mt-1">
                <Mail className="w-3.5 h-3.5" />
                <span>{user?.email}</span>
              </div>
              {teacher.isPsychologist && (
                <div className="mt-2 inline-flex items-center gap-1.5 bg-amber-400/20 text-amber-300 text-xs font-semibold px-2.5 py-1 rounded-lg">
                  <Award className="w-3 h-3" />
                  Certified Psychologist
                </div>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-6 mt-8">
            {[
              { label: "Courses", value: courses.length, icon: <BookOpen className="w-4 h-4" /> },
              { label: "Students", value: totalStudents, icon: <Users className="w-4 h-4" /> },
              { label: "Likes", value: totalLikes, icon: <Heart className="w-4 h-4" /> },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2.5">
                <span className="text-white/60">{stat.icon}</span>
                <div>
                  <p className="text-white font-bold text-sm">{stat.value}</p>
                  <p className="text-white/50 text-xs">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-10 grid grid-cols-3 gap-6">

        {/* Left: Bio */}
        <div className="col-span-1 flex flex-col gap-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-widest mb-3">About</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {teacher.descreption || "This teacher hasn't added a bio yet."}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-widest mb-3">Member Since</h3>
            <p className="text-sm text-gray-600">
              {teacher.createdAt
                ? new Date(teacher.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
                : "—"}
            </p>
          </div>
        </div>

        {/* Right: Courses */}
        <div className="col-span-2 flex flex-col gap-4">
          <h2 className="text-sm font-bold text-gray-700 uppercase tracking-widest">Courses by this Teacher</h2>

          {courses.length === 0 ? (
            <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-10 flex flex-col items-center gap-3 text-center">
              <BookOpen className="w-8 h-8 text-gray-300" />
              <p className="text-sm text-gray-400">No courses published yet.</p>
            </div>
          ) : (
            courses.map((course: any) => (
              <Link
                to={`/course/${course.id}`}
                key={course.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow flex items-start gap-4"
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-gradient-to-br from-[#A7AAE9]/40 to-[#2e2c74]/20 shrink-0">
                  {course.image_url ? (
                    <img src={course.image_url} alt={course.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-[#2e2c74]/40" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold bg-[#d2d4f5] text-[#2F35C2] px-2 py-0.5 rounded-full">
                      {course.Categorie?.name}
                    </span>
                    {course.isSpecialized && (
                      <span className="text-[10px] font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Specialized</span>
                    )}
                  </div>
                  <p className="text-sm font-bold text-gray-800 truncate">{course.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{course.description}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                    <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{course.enrollmentsCount || 0} students</span>
                    <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5 text-rose-400" />{course.likes} likes</span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PublicTeacherProfile;