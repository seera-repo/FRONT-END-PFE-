import { useState, useRef } from "react";
import SidebarTeacher from "../components/Sidebarteacher";

// ─── Types matching your DB schema ───────────────────────────────────────────
type ProfileStatus = "none" | "pending" | "approved" | "rejected";

type TeacherProfile = {
  id: string;
  isPsychologist: boolean;
  cv_URL: string | null;
  descreption: string | null;
  status: "pending" | "approved" | "rejected";
  user_id: string;
  createdAt: string;
  updatedAt: string;
} | null;

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

// ─── Mock data — replace with real API ───────────────────────────────────────
// Set to null  → shows the form (first time signup)
// Set status   → "pending" | "approved" | "rejected"




const MOCK_PROFILE: TeacherProfile = {
  id: "uuid-123", isPsychologist: false, cv_URL: null,
  descreption: "My bio", status: "rejected",
  user_id: "user-1", createdAt: "2024-01-15T10:00:00Z", updatedAt: "2024-01-20T14:30:00Z"
};



// const MOCK_PROFILE: TeacherProfile = { status: "pending",  ... };
// const MOCK_PROFILE: TeacherProfile = { status: "approved", ... };
// const MOCK_PROFILE: TeacherProfile = { status: "rejected", ... };

const COURSES: Course[] = [
  { id: 1, title: "Introduction To Computer Science", category: "CS BASICS", students: 142, rating: 4.9, status: "published", progress: 78 },
  { id: 2, title: "Data Structures & Algorithms",     category: "CS CORE",   students: 89,  rating: 4.7, status: "published", progress: 55 },
  { id: 3, title: "Web Development Fundamentals",     category: "WEB DEV",   students: 0,   rating: 0,   status: "draft",     progress: 20 },
];

const ACTIVITY: Activity[] = [
  { id: 1, type: "enrollment", student: "Sara M.",   course: "Intro to CS",     time: "2 min ago"   },
  { id: 2, type: "review",     student: "Karim B.",  course: "Data Structures", time: "14 min ago", message: "Amazing course, very clear!"        },
  { id: 3, type: "question",   student: "Lina H.",   course: "Intro to CS",     time: "1 hr ago",   message: "Can you explain recursion again?" },
  { id: 4, type: "enrollment", student: "Youcef A.", course: "Data Structures", time: "3 hr ago"    },
  { id: 5, type: "submission", student: "Nour T.",   course: "Web Dev",         time: "Yesterday"   },
];

// ─── 1. FORM SCREEN — shown when profile is null (first signup) ──────────────
const FormScreen = ({ onSubmit }: { onSubmit: () => void }) => {
  const [isPsychologist, setIsPsychologist] = useState(false);
  const [bio, setBio]                       = useState("");
  const [cvFile, setCvFile]                 = useState<File | null>(null);
  const [dragging, setDragging]             = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) setCvFile(file);
  };

  const handleSubmit = () => {
    if (!bio.trim()) return;
    // TODO: POST to /api/teacher-profiles with { isPsychologist, descreption: bio, cv_URL }
    onSubmit();
  };

  return (
    <main className="flex-1 overflow-y-auto p-8" style={{ scrollbarWidth: "none" }}>
      <div className="text-center mb-8">
        <h1 className="text-2xl font-extrabold text-gray-900 mb-2">Complete Your Profile</h1>
        <p className="text-gray-400 text-sm">Fill in your information to start teaching on Smart CS</p>
      </div>

      <div className="max-w-2xl mx-auto flex flex-col gap-5">
        {/* Approval notice */}
        <div className="bg-[#A7AAE9]/20 border border-[#A7AAE9]/50 rounded-2xl px-5 py-4 flex items-start gap-3">
          <svg className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-sm font-semibold text-gray-700">Approval Required</p>
            <p className="text-xs text-gray-500 mt-0.5">After submitting, an administrator will review your profile. You will be notified once approved.</p>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-5">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zm-4 7a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <h2 className="text-base font-bold text-gray-800">Profile Information</h2>
          </div>
          <p className="text-xs text-gray-400 -mt-3">This information will be visible to students</p>

          {/* Psychologist toggle */}
          <div className="bg-[#A7AAE9]/10 rounded-2xl px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-100 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700">Are you a Psychologist?</p>
                <p className="text-xs text-gray-400">Check this if you have psychology certification</p>
              </div>
            </div>
            <button
              onClick={() => setIsPsychologist(!isPsychologist)}
              className={`relative w-11 h-6 rounded-full transition-colors duration-200 shrink-0 ${isPsychologist ? "bg-purple-600" : "bg-gray-200"}`}
            >
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${isPsychologist ? "translate-x-5" : "translate-x-0"}`} />
            </button>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description / Bio <span className="text-purple-500">*</span>
            </label>
            <textarea
              value={bio}
              onChange={e => setBio(e.target.value)}
              rows={5}
              placeholder="Tell students about yourself, your teaching experience, qualifications..."
              className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm text-gray-700 placeholder-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent transition"
            />
          </div>

          {/* CV Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Upload CV / Resume <span className="text-purple-500">*</span>
            </label>
            <div
              onClick={() => fileRef.current?.click()}
              onDragOver={e => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-2xl px-6 py-10 flex flex-col items-center justify-center cursor-pointer transition-colors duration-200
                ${dragging ? "border-purple-400 bg-purple-50" : cvFile ? "border-green-300 bg-green-50" : "border-gray-200 hover:border-purple-300 hover:bg-purple-50/30"}`}
            >
              {cvFile ? (
                <>
                  <svg className="w-8 h-8 text-green-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm font-semibold text-green-600">{cvFile.name}</p>
                  <p className="text-xs text-gray-400 mt-1">Click to replace</p>
                </>
              ) : (
                <>
                  <svg className="w-8 h-8 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                  </svg>
                  <p className="text-sm font-semibold text-gray-600">Click to upload your CV</p>
                  <p className="text-xs text-gray-400 mt-1">PDF, DOC, or DOCX (Max 10MB)</p>
                </>
              )}
              <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) setCvFile(f); }} />
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!bio.trim()}
            className="w-full flex items-center justify-center gap-2 bg-[#2e2c74] hover:bg-purple-900 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm py-3.5 rounded-2xl transition-colors duration-200 shadow-md"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            Submit for Approval
          </button>
        </div>
      </div>
    </main>
  );
};

// ─── 2. PENDING SCREEN ────────────────────────────────────────────────────────
const PendingScreen = () => (
  <main className="flex-1 flex items-center justify-center p-8">
    <div className="max-w-md w-full flex flex-col items-center text-center gap-6">
      <div className="relative">
        <div className="w-24 h-24 rounded-full bg-amber-100 flex items-center justify-center">
          <svg className="w-12 h-12 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
          </svg>
        </div>
        <div className="absolute inset-0 rounded-full border-4 border-amber-300 animate-ping opacity-30" />
      </div>

      <div>
        <h1 className="text-2xl font-extrabold text-gray-900 mb-2">Awaiting Approval</h1>
        <p className="text-gray-400 text-sm leading-relaxed">
          Your profile has been submitted and is currently being reviewed by an administrator.
          You'll receive a notification once it's approved.
        </p>
      </div>

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
        {[
          { label: "Profile submitted",  done: true,  active: false },
          { label: "Under admin review", done: false, active: true  },
          { label: "Account activated",  done: false, active: false },
        ].map((step, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold
              ${step.done ? "bg-green-500 text-white" : step.active ? "bg-amber-400 text-white animate-pulse" : "bg-gray-100 text-gray-400"}`}>
              {step.done
                ? <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                : i + 1}
            </div>
            <span className={`text-sm ${step.done ? "text-green-600 font-medium" : step.active ? "text-amber-600 font-semibold" : "text-gray-400"}`}>
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  </main>
);

// ─── 3. REJECTED SCREEN ───────────────────────────────────────────────────────
const RejectedScreen = ({ onResubmit }: { onResubmit: () => void }) => (
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
          Your profile was not approved. Please update your information and resubmit for review.
        </p>
      </div>
      <div className="w-full bg-white rounded-2xl shadow-md p-5 flex flex-col gap-3">
        <div className="flex items-center gap-3 bg-red-50 rounded-xl p-3">
          <svg className="w-4 h-4 text-red-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-xs text-red-600 font-medium">Common reasons: incomplete bio, missing CV, or invalid certification.</p>
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <button
          onClick={onResubmit}
          className="w-full bg-[#2e2c74] hover:bg-purple-900 text-white font-semibold text-sm py-3.5 rounded-2xl transition-colors duration-200 shadow-md"
        >
          Update & Resubmit Profile
        </button>
        <button className="w-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium text-sm py-3 rounded-2xl transition-colors">
          Contact Support
        </button>
      </div>
    </div>
  </main>
);

// ─── 4. APPROVED DASHBOARD ────────────────────────────────────────────────────
const activityIcon = (type: Activity["type"]) => {
  const map: Record<Activity["type"], { bg: string; icon: React.ReactNode }> = {
    enrollment: { bg: "bg-purple-100", icon: <svg className="w-4 h-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg> },
    review:     { bg: "bg-amber-100",  icon: <svg className="w-4 h-4 text-amber-500"  fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg> },
    question:   { bg: "bg-blue-100",   icon: <svg className="w-4 h-4 text-blue-500"   fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg> },
    submission: { bg: "bg-green-100",  icon: <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
  };
  const { bg, icon } = map[type];
  return <div className={`w-8 h-8 rounded-full ${bg} flex items-center justify-center shrink-0`}>{icon}</div>;
};

const ApprovedDashboard = () => (
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
          <p className="text-white/60 text-sm">You have <span className="text-white font-semibold">5 new</span> student activities today.</p>
        </div>
        <div className="hidden lg:flex flex-col gap-2 mr-2">
          <button className="bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/20 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors flex items-center gap-2">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
            New Course
          </button>
          <button className="bg-white text-[#2e2c74] text-xs font-semibold px-4 py-2 rounded-xl hover:bg-purple-50 transition-colors flex items-center gap-2">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
            View Profile
          </button>
        </div>
      </div>
    </div>

    {/* Stats */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {[
        { label: "Total Students",  value: "231", sub: "↑ 12 this week", color: "bg-purple-100", icon: <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
        { label: "Active Courses",  value: "2",   sub: "1 draft",        color: "bg-indigo-100", icon: <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg> },
        { label: "Avg. Rating",     value: "4.8", sub: "★ out of 5",     color: "bg-amber-100",  icon: <svg className="w-5 h-5 text-amber-500"  fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg> },
        { label: "Open Questions",  value: "5",   sub: undefined,        color: "bg-rose-100",   icon: <svg className="w-5 h-5 text-rose-500"   fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg> },
      ].map(({ label, value, sub, color, icon }) => (
        <div key={label} className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-shadow duration-300 flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${color}`}>{icon}</div>
          <div>
            <p className="text-2xl font-extrabold text-gray-800 leading-none">{value}</p>
            {sub && <p className="text-[10px] text-green-500 font-semibold mt-0.5">{sub}</p>}
            <p className="text-xs text-gray-400 font-medium mt-0.5">{label}</p>
          </div>
        </div>
      ))}
    </div>

    {/* Courses + Activity */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <section className="lg:col-span-2">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold tracking-widest uppercase text-gray-600">My Courses</h2>
          <button className="text-xs font-semibold text-purple-600 hover:text-purple-800 transition-colors flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
            New Course
          </button>
        </div>
        <div className="flex flex-col gap-3">
          {COURSES.map((c) => (
            <div key={c.id} className="bg-white rounded-2xl px-5 py-4 shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-purple-100 text-purple-600 text-[10px] font-bold px-2 py-0.5 rounded-full">{c.category}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${c.status === "published" ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"}`}>{c.status}</span>
                  </div>
                  <p className="text-sm font-bold text-gray-800 truncate">{c.title}</p>
                </div>
                <button className="text-xs text-purple-600 hover:text-purple-800 font-semibold shrink-0">Edit</button>
              </div>
              <div className="flex items-center gap-5 text-xs text-gray-400 mb-3">
                <span className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  {c.students} students
                </span>
                {c.rating > 0 && (
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                    {c.rating}
                  </span>
                )}
              </div>
              <div>
                <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                  <span>Course completion</span>
                  <span className="font-semibold text-gray-600">{c.progress}%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-purple-400 to-indigo-500 transition-all duration-500" style={{ width: `${c.progress}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold tracking-widest uppercase text-gray-600">Recent Activity</h2>
          <span className="bg-purple-100 text-purple-700 text-[10px] font-bold px-2 py-0.5 rounded-full">{ACTIVITY.length} new</span>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col">
          {ACTIVITY.map((a, i) => (
            <div key={a.id}>
              <div className="flex items-start gap-3 py-3">
                {activityIcon(a.type)}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-800 leading-snug">
                    <span className="text-purple-700">{a.student}</span>
                    {a.type === "enrollment" && " enrolled in "}
                    {a.type === "review"     && " left a review on "}
                    {a.type === "question"   && " asked a question in "}
                    {a.type === "submission" && " submitted work in "}
                    <span className="text-gray-600">{a.course}</span>
                  </p>
                  {a.message && <p className="text-[11px] text-gray-400 mt-0.5 italic truncate">"{a.message}"</p>}
                  <p className="text-[10px] text-gray-300 mt-1">{a.time}</p>
                </div>
              </div>
              {i < ACTIVITY.length - 1 && <div className="border-t border-gray-50" />}
            </div>
          ))}
        </div>
      </section>
    </div>
  </main>
);

// ─── MAIN GATE ────────────────────────────────────────────────────────────────
const HomePageTeacher = () => {
  // Local state tracks what to show when no profile exists yet
  // or after resubmitting after rejection
  const [localStatus, setLocalStatus] = useState<ProfileStatus>(
    MOCK_PROFILE === null ? "none" : MOCK_PROFILE.status
  );

  const handleFormSubmit = () => setLocalStatus("pending");
  const handleResubmit   = () => setLocalStatus("none");   // show form again

  return (
    <div className="flex h-screen bg-[#f5f5fb] overflow-hidden">
      <SidebarTeacher />

      {localStatus === "none"     && <FormScreen     onSubmit={handleFormSubmit} />}
      {localStatus === "pending"  && <PendingScreen />}
      {localStatus === "rejected" && <RejectedScreen onResubmit={handleResubmit} />}
      {localStatus === "approved" && <ApprovedDashboard />}
    </div>
  );
};

export default HomePageTeacher;