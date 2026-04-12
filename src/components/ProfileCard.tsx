import { useState } from "react";

const DotsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <circle cx="5"  cy="12" r="2" />
    <circle cx="12" cy="12" r="2" />
    <circle cx="19" cy="12" r="2" />
  </svg>
);

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
);

// ─── Subscribed professors ────────────────────────────────────────────────────
const PROFESSORS = [
  { id: 1, name: "Mohand",   role: "Software Developer",  avatar: "", courses: 4 },
  { id: 2, name: "Manel",    role: "UI/UX Designer",       avatar: "", courses: 3 },
]

type Props = {
  name?:     string;
  subtitle?: string;
  avatar?:   string;
};

const ProfileCard = ({
  name     = "Maria",
  subtitle = "Continue Your Journey And Achieve Your Target",
  avatar,
}: Props) => {
  return (
    <aside className="w-56 shrink-0 h-screen bg-[#A7AAE9]/30 flex flex-col rounded-3xl overflow-hidden">

     
      <div className="flex items-center justify-between px-4 pt-5 pb-3">
        <span className="text-sm font-bold text-gray-800">Your Profile</span>
        <button className="text-gray-400 hover:text-gray-600 transition-colors">
          <DotsIcon />
        </button>
      </div>

      {/* ── Avatar + name ── */}
      <div className="flex flex-col items-center px-4 pb-5">
        <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-md mb-3">
          {avatar ? (
            <img src={avatar} alt={name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-purple-300 to-indigo-400 flex items-center justify-center text-white text-2xl font-bold">
              {name.charAt(0)}
            </div>
          )}
        </div>

        <h2 className="text-sm font-bold text-gray-800 text-center">
          Welcome Back {name}
        </h2>
        <p className="text-[11px] text-gray-500 text-center mt-1 leading-snug">
          {subtitle}
        </p>
      </div>

      
      <div className="mx-4 border-t border-purple-200/60" />

      <div className="px-4 pt-4 flex-1 overflow-y-auto">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-bold text-gray-800">Your Subscription</span>
          <button className="w-6 h-6 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-500 hover:text-purple-600 transition-colors">
            <PlusIcon />
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {PROFESSORS.map((prof) => (
            <div
              key={prof.id}
              className="flex items-center gap-3 bg-white rounded-2xl px-3 py-2.5 shadow-sm hover:shadow-md transition-shadow duration-150"
            >
             
              {prof.avatar ? (
                <img src={prof.avatar} alt={prof.name} className="w-9 h-9 rounded-full object-cover shrink-0" />
              ) : (
                <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-sm shrink-0">
                  {prof.name.charAt(0)}
                </div>
              )}

              
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-gray-800 truncate">{prof.name}</p>
                <p className="text-[10px] text-gray-400 truncate">{prof.role}</p>
              </div>

              
              <span className="text-[10px] font-semibold bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded-full shrink-0">
                {prof.courses}
              </span>
            </div>
          ))}
        </div>
      </div>

      
      <div className="p-4 mt-2">
        <button className="w-full py-2.5 bg-[#c4c7f0] hover:bg-purple-300 text-purple-800 text-sm font-semibold rounded-2xl transition-colors duration-150">
          See All
        </button>
      </div>

    </aside>
  );
};

export default ProfileCard;