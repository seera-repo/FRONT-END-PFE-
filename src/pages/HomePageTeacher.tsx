import SidebarTeacher from "../components/Sidebarteacher";

// ─── Types matching your DB schema ───────────────────────────────────────────
type TeacherProfile = {
  id: string;
  isPsychologist: boolean;
  cv_URL: string | null;
  descreption: string | null;
  status: "pending" | "approved" | "rejected";
  user_id: string;
  createdAt: string;
  updatedAt: string;
};

type Course = {
  id: number;
  title: string;
  category: string;
  students: number;
  rating: number;
  status: "published" | "draft";
  progress: number;
};

type Activity = {
  id: number;
  type: "enrollment" | "review" | "question" | "submission";
  student: string;
  course: string;
  time: string;
  message?: string;
};

// ─── Mock — replace with real API fetch ──────────────────────────────────────
// Simulate fetching teacher profile from backend (change status to test screens)
const TEACHER_PROFILE: TeacherProfile = {
  id:            "uuid-123",
  isPsychologist: false,
  cv_URL:        null,
  descreption:   "Passionate CS educator with 8 years of experience.",
  status:        "approved",   // ← change to "approved" | "rejected" to test
  user_id:       "user-uuid-456",
  createdAt:     "2026-05-15T10:00:00Z",
  updatedAt:     "2026-05-20T14:30:00Z",
};

const COURSES: Course[] = [
  { id: 1, title: "Introduction To Computer Science", category: "CS BASICS", students: 142, rating: 4.9, status: "published", progress: 78 },
  { id: 2, title: "Data Structures & Algorithms",     category: "CS CORE",   students: 89,  rating: 4.7, status: "published", progress: 55 },
  { id: 3, title: "Web Development Fundamentals",     category: "WEB DEV",   students: 0,   rating: 0,   status: "draft",     progress: 20 },
];

const ACTIVITY: Activity[] = [
  { id: 1, type: "enrollment", student: "Sara M.",   course: "Intro to CS",      time: "2 min ago"  },
  { id: 2, type: "review",     student: "Karim B.",  course: "Data Structures",  time: "14 min ago", message: "Amazing course, very clear!" },
  { id: 3, type: "question",   student: "Lina H.",   course: "Intro to CS",      time: "1 hr ago",   message: "Can you explain recursion again?" },
  { id: 4, type: "enrollment", student: "Youcef A.", course: "Data Structures",  time: "3 hr ago"   },
  { id: 5, type: "submission", student: "Nour T.",   course: "Web Dev",          time: "Yesterday"  },
];

// ─── Pending screen ───────────────────────────────────────────────────────────
const PendingScreen = () => (
  <div className="flex h-screen bg-[#f5f5fb] overflow-hidden">
    <SidebarTeacher />
    <main className="flex-1 flex items-center justify-center p-8">
      <div className="max-w-md w-full flex flex-col items-center text-center gap-6">

        {/* Animated icon */}
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-amber-100 flex items-center justify-center">
            <svg className="w-12 h-12 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
            </svg>
          </div>
          {/* Pulse ring */}
          <div className="absolute inset-0 rounded-full border-4 border-amber-300 animate-ping opacity-30" />
        </div>

        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 mb-2">Awaiting Approval</h1>
          <p className="text-gray-400 text-sm leading-relaxed">
            Your profile has been submitted and is currently being reviewed by an administrator.
            You'll receive a notification once it's approved.
          </p>
        </div>

        {/* Status card */}
        <div className="w-full bg-white rounded-2xl shadow-md p-5 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400 font-medium">Account Status</span>
            <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-700 text-xs font-semibold px-3 py-1 rounded-full">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Pending Approval
            </span>
          </div>

          <div className="border-t border-gray-100" />

          {/* Steps */}
          {[
            { label: "Profile submitted",        done: true  },
            { label: "Under admin review",        done: false, active: true },
            { label: "Account activated",         done: false },
          ].map((step, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold
                ${step.done   ? "bg-green-500 text-white"
                : step.active ? "bg-amber-400 text-white animate-pulse"
                              : "bg-gray-100 text-gray-400"}`}>
                {step.done ? (
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : i + 1}
              </div>
              <span className={`text-sm ${step.done ? "text-green-600 font-medium" : step.active ? "text-amber-600 font-semibold" : "text-gray-400"}`}>
                {step.label}
              </span>
            </div>
          ))}
        </div>

        <p className="text-xs text-gray-300">
          Profile submitted on {new Date(TEACHER_PROFILE.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>
      </div>
    </main>
  </div>
);

// ─── Rejected screen ──────────────────────────────────────────────────────────
const RejectedScreen = () => (
  <div className="flex h-screen bg-[#f5f5fb] overflow-hidden">
    <SidebarTeacher />
    <main className="flex-1 flex items-center justify-center p-8">
      <div className="max-w-md w-full flex flex-col items-center text-center gap-6">

        <div className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center">
          <svg className="w-12 h-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 mb-2">Profile Rejected</h1>
          <p className="text-gray-400 text-sm leading-relaxed">
            Unfortunately, your profile was not approved. This may be due to incomplete information
            or missing documentation. Please update your profile and resubmit.
          </p>
        </div>

        <div className="w-full bg-white rounded-2xl shadow-md p-5 flex flex-col gap-3">
          <div className="flex items-center gap-3 bg-red-50 rounded-xl p-3">
            <svg className="w-4 h-4 text-red-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-xs text-red-600 font-medium">
              Common reasons: incomplete bio, missing CV, or invalid certification.
            </p>
          </div>

          <p className="text-xs text-gray-400">
            Please review your submission and make sure all required fields are correctly filled.
          </p>
        </div>

        <div className="flex flex-col gap-2 w-full">
          <button
            onClick={() => window.location.href = "/teacher/profile"}
            className="w-full bg-[#2e2c74] hover:bg-purple-900 text-white font-semibold text-sm py-3.5 rounded-2xl transition-colors duration-200 shadow-md"
          >
            Update & Resubmit Profile
          </button>
          <button className="w-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium text-sm py-3 rounded-2xl transition-colors duration-200">
            Contact Support
          </button>
        </div>
      </div>
    </main>
  </div>
);

const ApprovedDashboard = () => (
  <div className="flex h-screen bg-[#f5f5fb] overflow-hidden">
    <SidebarTeacher />

    <main className="flex-1 overflow-y-auto p-6 max-w-4xl mx-auto">

      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl mb-6 bg-[#2e2c74]">
        <div className="absolute -top-10 -right-10 w-52 h-52 bg-purple-500/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-8 -left-6 w-40 h-40 bg-indigo-400/20 rounded-full blur-2xl" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative z-10 px-10 py-9 flex items-center justify-between">
          <div>
            <h1 className="text-white text-2xl font-extrabold leading-snug mb-1">
              Welcome back,<br />
              <span className="text-purple-300">Dr. Ahmed Khalil</span>
            </h1>
            <p className="text-white/60 text-sm">
              Manage your courses and students easily.
            </p>
          </div>

          <div className="hidden lg:flex flex-col gap-2 mr-2">
            <button className="bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/20 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors flex items-center gap-2">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              New Course
            </button>

            <button className="bg-white text-[#2e2c74] text-xs font-semibold px-4 py-2 rounded-xl hover:bg-purple-50 transition-colors flex items-center gap-2">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              View Profile
            </button>
          </div>
        </div>
      </div>

      {/* Courses */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold tracking-widest uppercase text-gray-600">
            My Courses
          </h2>

          <button className="text-xs font-semibold text-purple-600 hover:text-purple-800 transition-colors flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            New Course
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {COURSES.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-2xl px-5 py-4 shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-purple-100 text-purple-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {c.category}
                    </span>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        c.status === "published"
                          ? "bg-green-100 text-green-600"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {c.status}
                    </span>
                  </div>

                  <p className="text-sm font-bold text-gray-800 truncate">
                    {c.title}
                  </p>
                </div>

                <button className="text-xs text-purple-600 hover:text-purple-800 font-semibold shrink-0 transition-colors">
                  Edit
                </button>
              </div>

              <div className="flex items-center gap-5 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {c.students} students
                </span>

                {c.rating > 0 && (
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    {c.rating}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  </div>
);

// ─── Main gate — reads status from DB profile ─────────────────────────────────
const HomePageTeacher = () => {
  // In production: fetch from your API
  // const { data: profile } = useQuery(() => api.get(`/teacher-profiles/${userId}`))
  const profile = TEACHER_PROFILE;

  switch (profile.status) {
    case "pending":  return <PendingScreen />;
    case "rejected": return <RejectedScreen />;
    case "approved": return <ApprovedDashboard />;
    default:         return <PendingScreen />;
  }
};

export default HomePageTeacher;