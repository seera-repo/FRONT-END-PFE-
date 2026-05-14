import { useNavigate } from "react-router-dom";
import { fetchMyCourses } from "../api/courses";
import { useQuery } from "@tanstack/react-query";
import type { myCourse } from "../api/courses";
// ─── Types ────────────────────────────────────────────────────────────────────


// ─── 4. APPROVED DASHBOARD ────────────────────────────────────────────────────
// ✅ navigate is passed as a prop so it works inside this component
const ApprovedDashboard = ({ navigate }: { navigate: ReturnType<typeof useNavigate> }) => {

  //fech my courses
  const { data: myCourses, isLoading: enrollmentLoading } = useQuery({
    queryKey: ["my-courses"],
    queryFn: fetchMyCourses,
  });


  const COURSES = (myCourses ?? []).map((c) => ({
    id: c.id,
    title: c.title,
    category: c.Categorie.name,
    image: c.image_url ?? null,
    likes: c.likes,
    students: c.students,
    status: "published" as const,
  }));


  if (enrollmentLoading) return (
    <div className="w-full h-screen gap-x-2 flex justify-center items-center">
      <div
        className="w-5 bg-[#d991c2] animate-pulse h-5 rounded-full"
      ></div>
      <div
        className="w-5 animate-pulse h-5 bg-[#9869b8] rounded-full animate-bounce"
      ></div>
      <div
        className="w-5 h-5 animate-pulse bg-[#6756cc] rounded-full animate-bounce"
      ></div>
    </div>
  )

  return (
    <main className="flex-1 overflow-y-auto p-6" style={{ scrollbarWidth: "none" }}>
      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl mb-6 bg-[#2e2c74]">
        <div className="absolute -top-10 -right-10 w-52 h-52 bg-purple-500/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-8 -left-6  w-40 h-40 bg-indigo-400/20 rounded-full blur-2xl" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="relative z-10 px-10 py-9 flex items-center justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 bg-white/15 text-white/90 text-[11px] font-semibold px-3 py-1 rounded-full mb-3 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Teacher Dashboard
            </span>
            <h1 className="text-white text-2xl font-extrabold leading-snug mb-1">
              Welcome back,<br /><span className="text-purple-300">Dr. Ahmed Khalil</span>
            </h1>
          </div>
          <div className="hidden lg:flex flex-col gap-2 mr-2">
            {/* ✅ Fixed: navigate is now available here */}
            <button
              onClick={() => navigate("/AddCourse")}
              className="bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/20 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors flex items-center gap-2"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
              New Course
            </button>
            <button
              onClick={() => navigate("/Profileteacher")}
              className="bg-white text-[#2e2c74] text-xs font-semibold px-4 py-2 rounded-xl hover:bg-purple-50 transition-colors flex items-center gap-2"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              View Profile
            </button>
          </div>
        </div>
      </div>

      {/* Courses */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-sm font-bold tracking-widest uppercase text-gray-600">My Courses</h2>
          {/* ✅ Fixed: this button also navigates correctly */}
          <button
            onClick={() => navigate("/AddCourse")}
            className="text-xs font-semibold text-purple-600 hover:text-purple-800 transition-colors flex items-center gap-1"
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
            New Course
          </button>
        </div>

        {COURSES.map((c) => (
          <div key={c.id} className="bg-white rounded-2xl px-5 py-4 shadow-md hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-purple-100 text-purple-600 text-[10px] font-bold px-2 py-0.5 rounded-full">{c.category}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${c.status === "published" ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"}`}>{c.status}</span>
                </div>
                <p className="text-sm font-bold text-gray-800 truncate">{c.title}</p>
                <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    {c.students} students
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                    {c.likes}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {/* ✅ Edit button navigates to edit page with course id */}
                <button
                  onClick={() => navigate(`/EditCourse/${c.id}`)}
                  className="text-xs text-purple-600 hover:text-purple-800 font-semibold transition-colors px-3 py-1.5 rounded-lg hover:bg-purple-50"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
export default ApprovedDashboard;