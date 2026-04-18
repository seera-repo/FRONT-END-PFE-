import SidebarTeacher from "../components/Sidebarteacher";

// ── Mock profile data — replace with real API data ────────────────────────────
const PROFILE = {
  name:          "Dr. Ahmed Khalil",
  email:         "ahmed.khalil@smartcs.edu",
  role:          "Teacher",
  isPsychologist: false,
  bio:           "Passionate computer science educator with over 8 years of experience teaching students of all abilities. Specialized in making complex concepts accessible and engaging for everyone.",
  cvUrl:         "",           // empty = no CV uploaded
  status:        "pending" as "pending" | "approved" | "rejected",
  createdAt:     "January 15, 2024",
  updatedAt:     "January 20, 2024",
  avatar:        "",           // empty = show initials
};

function getInitials(name: string) {
  return name.split(" ").filter(Boolean).slice(0, 3).map(w => w[0].toUpperCase()).join("");
}

// ── Status badge ──────────────────────────────────────────────────────────────
const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    pending:  "bg-amber-100  text-amber-700  border-amber-200",
    approved: "bg-green-100  text-green-700  border-green-200",
    rejected: "bg-red-100    text-red-600    border-red-200",
  };
  const labels: Record<string, string> = {
    pending:  "Pending Approval",
    approved: "Approved",
    rejected: "Rejected",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border ${styles[status] ?? styles.pending}`}>
      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      {labels[status] ?? status}
    </span>
  );
};

// ── Info row ──────────────────────────────────────────────────────────────────
const InfoRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="flex flex-col gap-1">
    <p className="text-xs text-gray-400 font-medium">{label}</p>
    <div className="text-sm font-semibold text-gray-800">{value}</div>
  </div>
);

const Divider = () => <div className="border-t border-gray-100 my-1" />;

// ── Page ──────────────────────────────────────────────────────────────────────
const ProfileTeacher = () => (
  <div className="flex h-screen bg-white overflow-hidden">
    <SidebarTeacher />

    <main className="flex-1 overflow-y-auto p-6" style={{ scrollbarWidth: "none" }}>

      {/* Page title */}
      <div className="mb-6">
        <h1 className="text-xl font-extrabold text-gray-900">My Profile</h1>
        <p className="text-xs text-gray-400 mt-0.5">Your public teacher profile</p>
      </div>

      <div className="flex gap-5 items-start">

        {/* ── Left card: avatar + dates ── */}
        <div className="w-64 shrink-0 bg-white rounded-2xl shadow-md p-6 flex flex-col items-center gap-4">

          {/* Avatar */}
          <div className="w-28 h-28 rounded-full bg-[#A7AAE9]/30 border-4 border-white shadow-md flex items-center justify-center overflow-hidden">
            {PROFILE.avatar ? (
              <img src={PROFILE.avatar} alt={PROFILE.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-purple-700 text-2xl font-extrabold">
                {getInitials(PROFILE.name)}
              </span>
            )}
          </div>

          {/* Name */}
          <div className="text-center">
            <h2 className="text-lg font-extrabold text-gray-900 leading-tight">{PROFILE.name}</h2>
            <p className="text-xs text-gray-400 mt-0.5">{PROFILE.role}</p>
          </div>

          {/* Status badge */}
          <StatusBadge status={PROFILE.status} />

          <Divider />

          {/* Dates */}
          <div className="w-full flex flex-col gap-3 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-xs">Created:</span>
              <span className="font-semibold text-gray-700 text-xs">{PROFILE.createdAt}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-xs">Last Updated:</span>
              <span className="font-semibold text-gray-700 text-xs">{PROFILE.updatedAt}</span>
            </div>
          </div>
        </div>

        {/* ── Right card: details ── */}
        <div className="flex-1 bg-white rounded-2xl shadow-md p-6 flex flex-col gap-5">

          {/* Name + Email */}
          <div className="grid grid-cols-2 gap-6">
            <InfoRow label="Full Name" value={PROFILE.name} />
            <InfoRow
              label="Email"
              value={
                <span className="flex items-center gap-1.5 text-gray-700">
                  <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {PROFILE.email}
                </span>
              }
            />
          </div>

          <Divider />

          {/* Psychologist */}
          <InfoRow
            label="Are you a Psychologist?"
            value={
              <span className="flex items-center gap-1.5 text-gray-700">
                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {PROFILE.isPsychologist ? "Yes" : "No"}
              </span>
            }
          />

          <Divider />

          {/* Bio */}
          <div className="flex flex-col gap-1.5">
            <p className="text-xs text-gray-400 font-medium">Description / Bio</p>
            <p className="text-sm text-gray-700 leading-relaxed">{PROFILE.bio}</p>
          </div>

          <Divider />

          {/* CV */}
          <div className="flex flex-col gap-1.5">
            <p className="text-xs text-gray-400 font-medium">CV / Resume</p>
            {PROFILE.cvUrl ? (
              <a
                href={PROFILE.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-purple-600 font-semibold hover:underline"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                View CV / Resume
              </a>
            ) : (
              <span className="flex items-center gap-2 text-sm text-gray-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                No CV uploaded yet
              </span>
            )}
          </div>

          <Divider />

          {/* Account status */}
          <div className="flex flex-col gap-2">
            <p className="text-xs text-gray-400 font-medium">Account Status</p>
            <div className="flex items-center gap-3">
              <StatusBadge status={PROFILE.status} />
              <span className="text-xs text-gray-500">
                {PROFILE.status === "pending"  && "Your profile is being reviewed by an administrator"}
                {PROFILE.status === "approved" && "Your profile has been approved"}
                {PROFILE.status === "rejected" && "Your profile was rejected — please contact support"}
              </span>
            </div>
          </div>

          <Divider />

          {/* Account created / updated */}
          <div className="grid grid-cols-2 gap-6">
            <InfoRow
              label="Account Created"
              value={
                <span className="flex items-center gap-1.5 text-gray-700">
                  <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {PROFILE.createdAt}
                </span>
              }
            />
            <InfoRow
              label="Last Updated"
              value={
                <span className="flex items-center gap-1.5 text-gray-700">
                  <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {PROFILE.updatedAt}
                </span>
              }
            />
          </div>

        </div>
      </div>
    </main>
  </div>
);

export default ProfileTeacher;
