import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { BookOpen, Users, Heart, Star, Edit3, Check, X, LogOut, Award, TrendingUp, Mail, FileText } from "lucide-react";
import { fetchProfileStudent } from "../api/user";
import { getMyTeacherProfile } from "../api/teacher";
import { fetchMyCourses } from "../api/courses";
import SidebarTeacher from "../components/Sidebarteacher";

function ProfileTeacher() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [editingBio, setEditingBio] = useState(false);
  const [bioText, setBioText] = useState("");

  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfileStudent,
  });

  const { data: teacher, isLoading: teacherLoading } = useQuery({
    queryKey: ["my-teacher-profile"],
    queryFn: getMyTeacherProfile,
  });

  const { data: courses = [], isLoading: coursesLoading } = useQuery({
    queryKey: ["my-courses"],
    queryFn: fetchMyCourses,
  });

  const isLoading = userLoading || teacherLoading || coursesLoading;

  if (isLoading) {
    return (
      <div className="flex h-screen bg-[#f5f5fb] overflow-hidden">
        <SidebarTeacher />
        <div className="flex-1 flex items-center justify-center">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#2e2c74] animate-bounce" style={{ animationDelay: "0ms" }} />
            <div className="w-3 h-3 rounded-full bg-[#A7AAE9] animate-bounce" style={{ animationDelay: "150ms" }} />
            <div className="w-3 h-3 rounded-full bg-[#d2d4f5] animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
        </div>
      </div>
    );
  }

  const totalStudents = courses.reduce((sum, c) => sum + (c.students || 0), 0);
  const totalLikes = courses.reduce((sum, c) => sum + (c.likes || 0), 0);

  const initials = user?.name
    ? user.name.trim().split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase()
    : "T";

  const statusColor = {
    approved: { bg: "bg-emerald-100", text: "text-emerald-700", dot: "bg-emerald-500", label: "Approved" },
    pending: { bg: "bg-amber-100", text: "text-amber-700", dot: "bg-amber-500", label: "Pending" },
    rejected: { bg: "bg-red-100", text: "text-red-700", dot: "bg-red-500", label: "Rejected" },
  }[teacher?.status || "pending"];

  return (
    <div className="flex h-screen bg-[#f5f5fb] overflow-hidden">
      <SidebarTeacher />

      <main className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        {/* Hero Banner */}
        <div className="relative bg-[#2e2c74] overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-purple-500/20 blur-3xl -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-32 w-64 h-64 rounded-full bg-indigo-400/15 blur-2xl translate-y-1/2" />
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />
          </div>

          <div className="relative z-10 px-8 pt-10 pb-16">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-6">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#A7AAE9] to-[#6b6fc4] flex items-center justify-center shadow-2xl border-2 border-white/20">
                    <span className="text-white text-3xl font-bold tracking-tight">{initials}</span>
                  </div>
                  {teacher?.isPsychologist && (
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl bg-amber-400 flex items-center justify-center shadow-lg">
                      <Award className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>

                {/* Name & info */}
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h1 className="text-white text-2xl font-extrabold">{user?.name}</h1>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${statusColor.bg} ${statusColor.text}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${statusColor.dot}`} />
                      {statusColor.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-white/60 text-sm">
                    <Mail className="w-3.5 h-3.5" />
                    <span>{user?.email}</span>
                  </div>
                  {teacher?.isPsychologist && (
                    <div className="mt-2 inline-flex items-center gap-1.5 bg-amber-400/20 text-amber-300 text-xs font-semibold px-2.5 py-1 rounded-lg">
                      <Award className="w-3 h-3" />
                      Certified Psychologist
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => navigate("/AddCourse")}
                  className="flex items-center gap-2 bg-white text-[#2e2c74] text-sm font-semibold px-4 py-2 rounded-xl hover:bg-purple-50 transition-colors shadow-md"
                >
                  <BookOpen className="w-4 h-4" />
                  New Course
                </button>
                <button
                  onClick={() => { localStorage.clear(); navigate("/"); }}
                  className="flex items-center gap-2 bg-white/10 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-white/20 transition-colors border border-white/20"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Stats bar */}
          <div className="relative z-10 mx-8 -mb-6 bg-white rounded-2xl shadow-xl border border-gray-100 px-6 py-4 grid grid-cols-4 gap-4">
            {[
              { icon: BookOpen, value: courses.length, label: "Courses", color: "text-indigo-600", bg: "bg-indigo-50" },
              { icon: Users, value: totalStudents, label: "Students", color: "text-emerald-600", bg: "bg-emerald-50" },
              { icon: Heart, value: totalLikes, label: "Total Likes", color: "text-rose-500", bg: "bg-rose-50" },
              { icon: Star, value: courses.filter(c => (c.likes || 0) > 10).length, label: "Top Courses", color: "text-amber-500", bg: "bg-amber-50" },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-400 font-medium">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="px-8 pt-12 pb-8 grid grid-cols-3 gap-6">
          {/* Left: Bio + CV */}
          <div className="col-span-1 flex flex-col gap-4">
            {/* Bio Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-gray-700 uppercase tracking-widest">About</h3>
                {!editingBio ? (
                  <button
                    onClick={() => { setEditingBio(true); setBioText(teacher?.descreption || ""); }}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <div className="flex gap-1">
                    <button onClick={() => setEditingBio(false)} className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 transition-colors">
                      <Check className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => setEditingBio(false)} className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 transition-colors">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              {editingBio ? (
                <textarea
                  value={bioText}
                  onChange={(e) => setBioText(e.target.value)}
                  className="w-full text-sm text-gray-600 leading-relaxed border border-gray-200 rounded-xl p-3 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  rows={6}
                />
              ) : (
                <p className="text-sm text-gray-600 leading-relaxed">
                  {teacher?.descreption || "No bio added yet. Click the edit button to add a description about yourself."}
                </p>
              )}
            </div>

            {/* CV Card */}
            {teacher?.cv_URL && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                <h3 className="text-sm font-bold text-gray-700 uppercase tracking-widest mb-4">CV / Resume</h3>
                <a
                  href={teacher.cv_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#2e2c74] flex items-center justify-center">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800 group-hover:text-[#2e2c74]">View CV</p>
                    <p className="text-xs text-gray-400">Click to open document</p>
                  </div>
                </a>
              </div>
            )}

            {/* Member since */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-widest mb-3">Member Since</h3>
              <p className="text-sm text-gray-600">
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "—"}
              </p>
            </div>
          </div>

          {/* Right: Courses */}
          <div className="col-span-2 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-gray-700 uppercase tracking-widest">My Courses</h2>
              <button
                onClick={() => navigate("/AddCourse")}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold transition-colors flex items-center gap-1"
              >
                + Add Course
              </button>
            </div>

            {courses.length === 0 ? (
              <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-10 flex flex-col items-center gap-3 text-center">
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center">
                  <BookOpen className="w-7 h-7 text-indigo-400" />
                </div>
                <p className="font-semibold text-gray-700">No courses yet</p>
                <p className="text-sm text-gray-400">Create your first course and start teaching!</p>
                <button
                  onClick={() => navigate("/AddCourse")}
                  className="mt-2 bg-[#2e2c74] text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-purple-900 transition-colors"
                >
                  Create Course
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {courses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between gap-4">
                      {/* Course image */}
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-gradient-to-br from-[#A7AAE9]/40 to-[#2e2c74]/20 flex-shrink-0">
                        {course.image_url ? (
                          <img src={course.image_url} alt={course.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <BookOpen className="w-7 h-7 text-[#2e2c74]/40" />
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-[10px] font-bold bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">
                            {course.Categorie.name}
                          </span>
                          {course.isSpecialized && (
                            <span className="text-[10px] font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                              Specialized
                            </span>
                          )}
                        </div>
                        <p className="text-sm font-bold text-gray-800 truncate">{course.title}</p>
                        <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{course.description}</p>

                        <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
                          <span className="flex items-center gap-1">
                            <Users className="w-3.5 h-3.5" />
                            {course.students || 0} students
                          </span>
                          <span className="flex items-center gap-1">
                            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
                            {course.likes} likes
                          </span>
                          <span className="flex items-center gap-1">
                            <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                            Active
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col gap-2 shrink-0">
                        <button
                          onClick={() => navigate(`/EditCourse/${course.id}`)}
                          className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:bg-indigo-50 px-3 py-1.5 rounded-lg transition-colors"
                        >
                          <Edit3 className="w-3 h-3" />
                          Edit
                        </button>
                        <button
                          onClick={() => navigate(`/course/${course.id}`)}
                          className="text-xs text-gray-400 hover:text-gray-600 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Preview
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProfileTeacher;