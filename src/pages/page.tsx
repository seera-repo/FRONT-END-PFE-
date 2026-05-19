import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Users, BookOpen, Tag, GraduationCap,
  Trash2, CheckCircle, XCircle, Plus,
  ChevronRight, Clock, UserCheck, UserX,
  MessageSquare,
  Heart,
} from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, Tooltip } from "recharts";
import {
  getAllUsers, deleteUser,
  getAllTeachers, updateTeacherStatus, deleteTeacher,
  getAllCategories, createCategory, deleteCategory,
  deleteCommentAdmin,
  getCommentsByPost,
  deletePostAdmin,
} from "../api/admin";
import { fetchCourses } from "../api/courses";
import SidebarAdmin from "../components/Sidebar";
import { getAllPosts } from "../api/admin";
import React from "react";

// ── helpers ───────────────────────────────────────────────────────
function getInitials(name: string) {
  return name.split(" ").filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join("");
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    pending: "bg-yellow-50 text-yellow-600",
    approved: "bg-green-50 text-green-600",
    rejected: "bg-red-50 text-red-600",
  };
  return (
    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${map[status] ?? "bg-gray-50 text-gray-500"}`}>
      {status}
    </span>
  );
}

type Tab = "overview" | "users" | "teachers" | "categories" | "courses" | "posts";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [newCategory, setNewCategory] = useState("");
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d">("90d");
  const qc = useQueryClient();

  // ── queries ───────────────────────────────────────────────────
  const { data: users = [] } = useQuery({ queryKey: ["admin-users"], queryFn: getAllUsers });
  const { data: teachers = [] } = useQuery({ queryKey: ["admin-teachers"], queryFn: getAllTeachers });
  const { data: categories = [] } = useQuery({ queryKey: ["admin-categories"], queryFn: getAllCategories });
  const { data: courses = [] } = useQuery({ queryKey: ["admin-courses"], queryFn: () => fetchCourses() });



  const pending = teachers.filter(t => t.status === "pending");
  const approved = teachers.filter(t => t.status === "approved");

  // ── chart: users over time ────────────────────────────────────
  const chartData = useMemo(() => {
    const now = new Date();
    const days = timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 90;
    const startDate = new Date(now);
    startDate.setDate(startDate.getDate() - days);

    const map: Record<string, number> = {};
    for (let i = 0; i <= days; i++) {
      const d = new Date(startDate);
      d.setDate(d.getDate() + i);
      map[d.toISOString().split("T")[0]] = 0;
    }
    users.forEach(u => {
      const key = new Date(u.createdAt).toISOString().split("T")[0];
      if (map[key] !== undefined) map[key]++;
    });

    return Object.entries(map).map(([date, count]) => ({ date, users: count }));
  }, [users, timeRange]);

  // ── mutations ─────────────────────────────────────────────────
  const { mutate: removeUser } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-users"] }),
  });
  const { mutate: reviewTeacher } = useMutation({
    mutationFn: ({ id, status }: { id: string; status: "approved" | "rejected" }) =>
      updateTeacherStatus(id, status),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-teachers"] }),
  });
  const { mutate: removeTeacher } = useMutation({
    mutationFn: deleteTeacher,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-teachers"] }),
  });
  const { mutate: addCategory } = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-categories"] });
      setNewCategory("");
    },
  });
  const { mutate: removeCategory } = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-categories"] }),
  });
  const { mutate: removeComment } = useMutation({
    mutationFn: deleteCommentAdmin,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-comments"] }),
  });
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);

  const { data: expandedComments = [] } = useQuery({
    queryKey: ["admin-comments", expandedPostId],
    queryFn: () => getCommentsByPost(expandedPostId!),
    enabled: !!expandedPostId,
  });
  const { data: posts = [] } = useQuery({ queryKey: ["admin-posts"], queryFn: getAllPosts });

  const { mutate: removePost } = useMutation({
    mutationFn: deletePostAdmin,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-posts"] }),
  });

  const STATS = [
    { label: "Total Users", value: users.length, icon: Users, tab: "users" as Tab },
    { label: "Teachers", value: approved.length, icon: GraduationCap, tab: "teachers" as Tab },
    { label: "Pending", value: pending.length, icon: Clock, tab: "teachers" as Tab, alert: pending.length > 0 },
    { label: "Courses", value: courses.length, icon: BookOpen, tab: "courses" as Tab },
    { label: "Categories", value: categories.length, icon: Tag, tab: "categories" as Tab },
  ];

  const TABS: { key: Tab; label: string }[] = [
    { key: "overview", label: "Overview" },
    { key: "users", label: "Users" },
    { key: "teachers", label: "Teachers" },
    { key: "categories", label: "Categories" },
    { key: "courses", label: "Courses" },
    { key: "posts", label: "Community" },
  ];

  const TIME_BUTTONS: { value: "7d" | "30d" | "90d"; label: string }[] = [
    { value: "7d", label: "7d" },
    { value: "30d", label: "30d" },
    { value: "90d", label: "3m" },
  ];

  return (
    <div className="flex h-screen bg-[#F4F4FB] overflow-hidden">
      <SidebarAdmin />

      <main className="flex-1 overflow-y-auto px-8 py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#1a1a2e]">Admin Dashboard</h1>
            <p className="text-sm text-gray-400 mt-0.5">Manage your platform</p>
          </div>
          {pending.length > 0 && (
            <button
              onClick={() => setActiveTab("teachers")}
              className="flex items-center gap-2 bg-yellow-500 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-yellow-600 transition-colors"
            >
              <Clock className="w-4 h-4" />
              {pending.length} pending approval{pending.length > 1 ? "s" : ""}
            </button>
          )}
        </div>

        {/* Tab nav */}
        <div className="flex gap-1 mb-6 bg-white rounded-2xl p-1 border border-[#e8e8f4] w-fit">
          {TABS.map(t => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${activeTab === t.key
                ? "bg-[#2e2c74] text-white shadow-sm"
                : "text-gray-500 hover:text-[#2e2c74]"
                }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ── OVERVIEW ── */}
        {activeTab === "overview" && (
          <div className="flex flex-col gap-6">

            {/* Stat cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {STATS.map(s => (
                <button
                  key={s.label}
                  onClick={() => setActiveTab(s.tab)}
                  className="bg-white rounded-2xl p-5 shadow-sm border border-[#e8e8f4] flex flex-col gap-3 text-left hover:border-[#2e2c74] transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#2e2c74] uppercase tracking-wide">{s.label}</span>
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${s.alert ? "bg-yellow-100" : "bg-[#A7AAE9]/20"}`}>
                      <s.icon className={`w-4 h-4 ${s.alert ? "text-yellow-600" : "text-[#2e2c74]"}`} />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-[#1a1a2e]">{s.value}</p>
                  <p className="text-xs text-gray-400 flex items-center gap-1">
                    View all <ChevronRight className="w-3 h-3" />
                  </p>
                </button>
              ))}
            </div>

            {/* Users over time chart */}
            <div className="bg-white rounded-2xl shadow-sm border border-[#e8e8f4] overflow-hidden"
              style={{ background: "linear-gradient(to top, rgba(112,45,255,0.06), #ffffff)" }}
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#f0f0f8]">
                <div>
                  <p className="text-sm font-bold text-[#1a1a2e]">User Signups Over Time</p>
                  <p className="text-xs text-gray-400 mt-0.5">New registrations per day</p>
                </div>
                <div className="flex gap-1 bg-[#f4f4fb] rounded-xl p-1">
                  {TIME_BUTTONS.map(btn => (
                    <button
                      key={btn.value}
                      onClick={() => setTimeRange(btn.value)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${timeRange === btn.value
                        ? "bg-white text-[#2e2c74] shadow-sm border border-[#e8e8f4]"
                        : "text-gray-400 hover:text-[#2e2c74]"
                        }`}
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="px-2 py-4 w-full">
                <AreaChart width={800} height={220} data={chartData}
                  margin={{ top: 5, right: 20, left: 0, bottom: 0 }}
                  style={{ width: "100%", maxWidth: "100%" }}
                >
                  <defs>
                    <linearGradient id="userGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2F327D" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#2F327D" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} stroke="#f0f0f8" />
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    minTickGap={timeRange === "7d" ? 0 : 20}
                    tick={{ fill: "#CCCCCC", fontSize: 11 }}
                    tickFormatter={value =>
                      new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                    }
                  />
                  <Tooltip
                    contentStyle={{
                      background: "#fff",
                      border: "1px solid #e8e8f4",
                      borderRadius: "12px",
                      fontSize: "12px",
                      color: "#1a1a2e",
                    }}
                    labelFormatter={value =>
                      new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                    }
                  //formatter={(value: number) => [value, "New Users"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="users"
                    stroke="#2F327D"
                    strokeWidth={2}
                    fill="url(#userGradient)"
                  />
                </AreaChart>
              </div>
            </div>

            {/* Pending teachers quick list */}
            {pending.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-[#e8e8f4] overflow-hidden">
                <div className="flex items-center gap-2 px-6 py-4 border-b border-[#f0f0f8]">
                  <Clock className="w-4 h-4 text-yellow-500" />
                  <h2 className="text-sm font-bold text-[#1a1a2e]">Pending Teacher Approvals</h2>
                </div>
                <div className="flex flex-col divide-y divide-[#f0f0f8]">
                  {pending.map(t => (
                    <div key={t.id} className="flex items-center justify-between px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-[#1a1a2e]">{t.User?.name ?? "—"}</p>
                        <p className="text-xs text-gray-400">{t.User?.email}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => reviewTeacher({ id: t.id, status: "approved" })}
                          className="flex items-center gap-1 text-xs bg-green-50 text-green-600 px-3 py-1.5 rounded-xl font-semibold hover:bg-green-100 transition-colors"
                        >
                          <CheckCircle className="w-3.5 h-3.5" /> Approve
                        </button>
                        <button
                          onClick={() => reviewTeacher({ id: t.id, status: "rejected" })}
                          className="flex items-center gap-1 text-xs bg-red-50 text-red-500 px-3 py-1.5 rounded-xl font-semibold hover:bg-red-100 transition-colors"
                        >
                          <XCircle className="w-3.5 h-3.5" /> Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── USERS ── */}
        {activeTab === "users" && (
          <div className="bg-white rounded-2xl shadow-sm border border-[#e8e8f4] overflow-hidden">
            <div className="flex items-center gap-2 px-6 py-4 border-b border-[#f0f0f8]">
              <Users className="w-4 h-4 text-[#2e2c74]" />
              <h2 className="text-sm font-bold text-[#1a1a2e]">All Users ({users.length})</h2>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-gray-400 bg-[#fafafa]">
                  <th className="px-6 py-3 font-semibold">User</th>
                  <th className="px-6 py-3 font-semibold">Email</th>
                  <th className="px-6 py-3 font-semibold">Role</th>
                  <th className="px-6 py-3 font-semibold">Verified</th>
                  <th className="px-6 py-3 font-semibold">Joined</th>
                  <th className="px-6 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id} className="border-t border-[#f0f0f8] hover:bg-[#fafafe] transition-colors">
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#A7AAE9]/30 flex items-center justify-center text-xs font-bold text-[#2e2c74]">
                          {getInitials(u.name)}
                        </div>
                        <span className="font-medium text-[#1a1a2e]">{u.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3 text-gray-500">{u.email}</td>
                    <td className="px-6 py-3">
                      <span className="text-xs bg-[#A7AAE9]/20 text-[#2e2c74] px-2 py-1 rounded-full font-medium">
                        {u.Role?.name ?? "—"}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      {u.emailVerified
                        ? <span className="text-xs text-green-600 font-semibold">✓ Yes</span>
                        : <span className="text-xs text-red-400 font-semibold">✗ No</span>}
                    </td>
                    <td className="px-6 py-3 text-gray-400 text-xs">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-3">
                      <button
                        onClick={() => { if (confirm(`Delete ${u.name}?`)) removeUser(u.id); }}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ── TEACHERS ── */}
        {activeTab === "teachers" && (
          <div className="bg-white rounded-2xl shadow-sm border border-[#e8e8f4] overflow-hidden">
            <div className="flex items-center gap-2 px-6 py-4 border-b border-[#f0f0f8]">
              <GraduationCap className="w-4 h-4 text-[#2e2c74]" />
              <h2 className="text-sm font-bold text-[#1a1a2e]">All Teachers ({teachers.length})</h2>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-gray-400 bg-[#fafafa]">
                  <th className="px-6 py-3 font-semibold">Name</th>
                  <th className="px-6 py-3 font-semibold">Email</th>
                  <th className="px-6 py-3 font-semibold">Type</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                  <th className="px-6 py-3 font-semibold">CV</th>
                  <th className="px-6 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map(t => (
                  <tr key={t.id} className="border-t border-[#f0f0f8] hover:bg-[#fafafe] transition-colors">
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#A7AAE9]/30 flex items-center justify-center text-xs font-bold text-[#2e2c74]">
                          {getInitials(t.User?.name ?? "?")}
                        </div>
                        <span className="font-medium text-[#1a1a2e]">{t.User?.name ?? "—"}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3 text-gray-500">{t.User?.email ?? "—"}</td>
                    <td className="px-6 py-3">
                      <span className="text-xs bg-purple-50 text-purple-600 px-2 py-1 rounded-full font-medium">
                        {t.isPsychologist ? "Psychologist" : "Teacher"}
                      </span>
                    </td>
                    <td className="px-6 py-3"><StatusBadge status={t.status} /></td>
                    <td className="px-6 py-3">
                      {t.cv_URL
                        ? <a href={t.cv_URL} target="_blank" rel="noreferrer" className="text-xs text-[#2e2c74] font-semibold hover:underline">View CV</a>
                        : <span className="text-xs text-gray-300">—</span>}
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-2">
                        {t.status === "pending" && (
                          <>
                            <button
                              onClick={() => reviewTeacher({ id: t.id, status: "approved" })}
                              className="p-1.5 rounded-lg hover:bg-green-50 text-green-500 transition-colors"
                              title="Approve"
                            >
                              <UserCheck className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => reviewTeacher({ id: t.id, status: "rejected" })}
                              className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 transition-colors"
                              title="Reject"
                            >
                              <UserX className="w-3.5 h-3.5" />
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => { if (confirm("Delete teacher?")) removeTeacher(t.id); }}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ── CATEGORIES ── */}
        {activeTab === "categories" && (
          <div className="bg-white rounded-2xl shadow-sm border border-[#e8e8f4] overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#f0f0f8]">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-[#2e2c74]" />
                <h2 className="text-sm font-bold text-[#1a1a2e]">Categories ({categories.length})</h2>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newCategory}
                  onChange={e => setNewCategory(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter" && newCategory.trim()) addCategory(newCategory.trim()); }}
                  placeholder="New category name"
                  className="text-sm border border-[#e8e8f4] rounded-xl px-3 py-1.5 outline-none focus:border-[#2e2c74] w-48"
                />
                <button
                  onClick={() => { if (newCategory.trim()) addCategory(newCategory.trim()); }}
                  className="flex items-center gap-1 bg-[#2e2c74] text-white text-xs font-semibold px-3 py-1.5 rounded-xl hover:bg-[#3d3a9e] transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" /> Add
                </button>
              </div>
            </div>
            <div className="flex flex-col divide-y divide-[#f0f0f8]">
              {categories.map(cat => (
                <div key={cat.id} className="flex items-center justify-between px-6 py-4 hover:bg-[#fafafe] transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-[#A7AAE9]/20 flex items-center justify-center">
                      <Tag className="w-3.5 h-3.5 text-[#2e2c74]" />
                    </div>
                    <span className="text-sm font-medium text-[#1a1a2e]">{cat.name}</span>
                  </div>
                  <button
                    onClick={() => { if (confirm(`Delete "${cat.name}"?`)) removeCategory(cat.id); }}
                    className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── COURSES ── */}
        {activeTab === "courses" && (
          <div className="bg-white rounded-2xl shadow-sm border border-[#e8e8f4] overflow-hidden">
            <div className="flex items-center gap-2 px-6 py-4 border-b border-[#f0f0f8]">
              <BookOpen className="w-4 h-4 text-[#2e2c74]" />
              <h2 className="text-sm font-bold text-[#1a1a2e]">All Courses ({courses.length})</h2>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-gray-400 bg-[#fafafa]">
                  <th className="px-6 py-3 font-semibold">Title</th>
                  <th className="px-6 py-3 font-semibold">Category</th>
                  <th className="px-6 py-3 font-semibold">Students</th>
                  <th className="px-6 py-3 font-semibold">Likes</th>
                  <th className="px-6 py-3 font-semibold">Type</th>
                  <th className="px-6 py-3 font-semibold">Created</th>
                </tr>
              </thead>
              <tbody>
                {courses.map(c => (
                  <tr key={c.id} className="border-t border-[#f0f0f8] hover:bg-[#fafafe] transition-colors">
                    <td className="px-6 py-3 font-medium text-[#1a1a2e]">{c.title}</td>
                    <td className="px-6 py-3">
                      <span className="text-xs bg-[#A7AAE9]/20 text-[#2e2c74] px-2 py-1 rounded-full font-medium">
                        {c.Categorie?.name ?? "—"}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-gray-500">{c.enrollmentsCount ?? 0}</td>
                    <td className="px-6 py-3 text-gray-500">{c.likes ?? 0}</td>
                    <td className="px-6 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-semibold ${c.isSpecialized ? "bg-purple-50 text-purple-600" : "bg-blue-50 text-blue-600"
                        }`}>
                        {c.isSpecialized ? "Specialized" : "General"}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-gray-400 text-xs">
                      {new Date(c.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ── POSTS / COMMUNITY ── */}
        {activeTab === "posts" && (
          <div className="bg-white rounded-2xl shadow-sm border border-[#e8e8f4] overflow-hidden">
            <div className="flex items-center gap-2 px-6 py-4 border-b border-[#f0f0f8]">
              <MessageSquare className="w-4 h-4 text-[#2e2c74]" />
              <h2 className="text-sm font-bold text-[#1a1a2e]">Community Posts ({posts.length})</h2>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-gray-400 bg-[#fafafa]">
                  <th className="px-6 py-3 font-semibold">Post</th>
                  <th className="px-6 py-3 font-semibold">Author</th>
                  <th className="px-6 py-3 font-semibold">Type</th>
                  <th className="px-6 py-3 font-semibold">Likes</th>
                  <th className="px-6 py-3 font-semibold">Comments</th>
                  <th className="px-6 py-3 font-semibold">Created</th>
                  <th className="px-6 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map(p => (
                  <React.Fragment key={p.id}>
                    <tr className="border-t border-[#f0f0f8] hover:bg-[#fafafe] transition-colors">
                      <td className="px-6 py-3">
                        <div>
                          <p className="font-medium text-[#1a1a2e] truncate max-w-[200px]">{p.title}</p>
                          <p className="text-xs text-gray-400 truncate max-w-[200px]">{p.content}</p>
                        </div>
                      </td>
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-[#A7AAE9]/30 flex items-center justify-center text-xs font-bold text-[#2e2c74]">
                            {getInitials(p.User?.name ?? "?")}
                          </div>
                          <span className="text-gray-600">{p.User?.name ?? "—"}</span>
                        </div>
                      </td>
                      <td className="px-6 py-3">
                        <span className={`text-xs px-2 py-1 rounded-full font-semibold ${p.isSpecialized ? "bg-purple-50 text-purple-600" : "bg-blue-50 text-blue-600"
                          }`}>
                          {p.isSpecialized ? "Specialized" : "General"}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-gray-500">
                        <span className="flex items-center gap-1">
                          <Heart className="w-3 h-3" /> {p.likes}
                        </span>
                      </td>
                      <td className="px-6 py-3">
                        <button
                          onClick={() => setExpandedPostId(expandedPostId === p.id ? null : p.id)}
                          className={`flex items-center gap-1 text-xs px-2 py-1 rounded-lg font-semibold transition-colors ${expandedPostId === p.id
                            ? "bg-[#2e2c74] text-white"
                            : "bg-[#A7AAE9]/20 text-[#2e2c74] hover:bg-[#A7AAE9]/40"
                            }`}
                        >
                          <MessageSquare className="w-3 h-3" /> {p.commentsCount}
                        </button>
                      </td>
                      <td className="px-6 py-3 text-gray-400 text-xs">
                        {new Date(p.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-3">
                        <button
                          onClick={() => { if (confirm(`Delete "${p.title}"?`)) removePost(p.id); }}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>

                    {expandedPostId === p.id && (
                      <tr className="bg-[#fafafe]">
                        <td colSpan={7} className="px-8 py-3">
                          {expandedComments.length === 0 ? (
                            <p className="text-xs text-gray-400 py-2">No comments yet.</p>
                          ) : (
                            <div className="flex flex-col gap-2">
                              {expandedComments.map(c => (
                                <div key={c.id} className="flex items-center justify-between bg-white rounded-xl px-4 py-2.5 border border-[#e8e8f4]">
                                  <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-[#A7AAE9]/30 flex items-center justify-center text-[10px] font-bold text-[#2e2c74]">
                                      {getInitials(c.User?.name ?? "?")}
                                    </div>
                                    <div>
                                      <span className="text-xs font-semibold text-[#2e2c74] mr-2">{c.User?.name ?? "—"}</span>
                                      <span className="text-xs text-gray-600">{c.comment}</span>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <span className="text-[10px] text-gray-300">
                                      {new Date(c.createdAt).toLocaleDateString()}
                                    </span>
                                    <button
                                      onClick={() => { if (confirm("Delete this comment?")) removeComment(c.id); }}
                                      className="p-1 rounded-lg hover:bg-red-50 text-red-400 transition-colors"
                                    >
                                      <Trash2 className="w-3 h-3" />
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </main>
    </div>
  );
}

//       </main >
//     </div >
//   );
// }