import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { fetchMyCourses } from "../api/courses";
import { apiFetch } from "../api/apiClient";
import {
  BookOpen, Users, Plus, Eye, Trash2,
  MessageSquare, Clock, ChevronRight, Star
} from "lucide-react";

// ── delete course API ──────────────────────────────────────────────
async function deleteCourse(courseId: string): Promise<void> {
  await apiFetch(`api/courses/${courseId}`, { method: "DELETE" });
}

// ── component ─────────────────────────────────────────────────────
export default function ApprovedDashboard() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: courses = [], isLoading } = useQuery({
    queryKey: ["my-courses"],
    queryFn: fetchMyCourses,
  });

  const { mutate: handleDelete } = useMutation({
    mutationFn: deleteCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-courses"] });
    },
  });

  // ── derived stats ──────────────────────────────────────────────
  const totalCourses = courses.length;
  const totalStudents = courses.reduce((sum, c) => sum + (c.students ?? 0), 0);
  const totalLikes = courses.reduce((sum, c) => sum + (c.likes ?? 0), 0);

  const STATS = [
    { label: "Total Courses", value: totalCourses, icon: BookOpen },
    { label: "Total Students", value: totalStudents, icon: Users },
    { label: "Total Likes", value: totalLikes, icon: Star },
  ];

  if (isLoading) {
    return (
      <div className="flex-1 flex justify-center items-center gap-2">
        <div className="w-5 h-5 bg-[#d991c2] rounded-full animate-pulse" />
        <div className="w-5 h-5 bg-[#9869b8] rounded-full animate-pulse" />
        <div className="w-5 h-5 bg-[#6756cc] rounded-full animate-pulse" />
      </div>
    );
  }

  return (
    <main className="flex-1 overflow-y-auto px-8 py-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#1a1a2e]">My Dashboard</h1>
          <p className="text-sm text-gray-400 mt-0.5">Here's what's happening with your courses</p>
        </div>
        <button
          onClick={() => navigate("/addCourse")}
          className="flex items-center gap-2 bg-[#2e2c74] text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-[#3d3a9e] transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Course
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-2xl p-5 shadow-sm border border-[#e8e8f4] flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#2e2c74] uppercase tracking-wide">
                {s.label}
              </span>
              <div className="w-8 h-8 rounded-xl bg-[#A7AAE9]/20 flex items-center justify-center">
                <s.icon className="w-4 h-4 text-[#2e2c74]" />
              </div>
            </div>
            <p className="text-3xl font-bold text-[#1a1a2e]">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Courses table */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#e8e8f4] overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#f0f0f8]">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#2e2c74]" />
            <h2 className="text-sm font-bold text-[#1a1a2e]">My Courses</h2>
          </div>
        </div>

        {courses.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <BookOpen className="w-10 h-10 mb-3 opacity-30" />
            <p className="text-sm">No courses yet</p>
            <button
              onClick={() => navigate("/AddCourse")}
              className="mt-4 text-xs text-[#2e2c74] font-semibold hover:underline"
            >
              Create your first course
            </button>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-gray-400 bg-[#fafafa]">
                <th className="px-6 py-3 font-semibold">Course</th>
                <th className="px-6 py-3 font-semibold">Category</th>
                <th className="px-6 py-3 font-semibold">Students</th>
                <th className="px-6 py-3 font-semibold">Likes</th>
                <th className="px-6 py-3 font-semibold">Type</th>
                <th className="px-6 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((c) => (
                <tr
                  key={c.id}
                  className="border-t border-[#f0f0f8] hover:bg-[#fafafe] transition-colors"
                >
                  <td className="px-6 py-3 font-medium text-[#1a1a2e]">{c.title}</td>
                  <td className="px-6 py-3">
                    <span className="text-xs bg-[#A7AAE9]/20 text-[#2e2c74] px-2 py-1 rounded-full font-medium">
                      {c.Categorie?.name ?? "—"}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-gray-500">
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" /> {c.students ?? 0}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-gray-500">
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3" /> {c.likes ?? 0}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                      c.isSpecialized
                        ? "bg-purple-50 text-purple-600"
                        : "bg-blue-50 text-blue-600"
                    }`}>
                      {c.isSpecialized ? "Specialized" : "General"}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        title="View course"
                        onClick={() => navigate(`/course/${c.id}`)}
                        className="p-1.5 rounded-lg hover:bg-[#A7AAE9]/20 text-[#2e2c74] transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        title="Delete course"
                        onClick={() => {
                          if (confirm(`Delete "${c.title}"?`)) handleDelete(c.id);
                        }}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </main>
  );
}