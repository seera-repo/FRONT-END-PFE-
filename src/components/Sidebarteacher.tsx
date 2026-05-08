import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import home      from "../assets/icons/home.svg";
import folder    from "../assets/icons/folder.svg";
import logoutIcon from "../assets/icons/logout.svg";
import people    from "../assets/icons/people.svg";

const PURPLE_FILTER = "invert(20%) sepia(90%) saturate(600%) hue-rotate(240deg) brightness(90%)";

type NavItem = {
  label: string;
  icon: string;
  path: string;
};

const OVERVIEW_ITEMS: NavItem[] = [
  { label: "Dashboard", icon: home,   path: "/HomePageTeacher"              },
  
];

const COMMUNITY_ITEMS: NavItem[] = [
  { label: "community", icon: people, path: "/communityBlog" },
];

const USER = {
  name: "Dr.Khalil",
  role: "Teacher",
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 3)
    .map((w) => w[0].toUpperCase())
    .join("");
}

const Sidebateacher = () => {
  const navigate  = useNavigate();
  const location  = useLocation();
  const [hovered, setHovered] = useState<string | null>(null);

  // Active is driven by the current URL path, not local state
  const isActive = (path: string) => location.pathname === path;

  const NavButton = ({ label, icon, path }: NavItem) => {
    const active      = isActive(path);
    const isHov       = hovered === label;
    const applyPurple = active || isHov;

    return (
      <button
        onClick={() => navigate(path)}
        onMouseEnter={() => setHovered(label)}
        onMouseLeave={() => setHovered(null)}
        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 w-full text-left
          ${active
            ? "bg-white text-purple-700 shadow-sm"
            : "text-gray-600 hover:bg-white/60 hover:text-purple-700"
          }`}
      >
        <img
          src={icon}
          alt={label}
          className="w-4 h-4 shrink-0 transition-all duration-200"
          style={{ filter: applyPurple ? PURPLE_FILTER : "none" }}
        />
        {label}
      </button>
    );
  };

  return (
    <div className="w-56 h-screen bg-[#A7AAE9]/30 p-5 flex flex-col shrink-0 rounded-3xl overflow-hidden">

      {/* Logo */}
      <a href="/HomePage" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#2e2c74] flex items-center justify-center">
              <span className="text-white font-bold text-sm">D</span>
            </div>
            <span className="text-xl font-bold text-[#1a1a2e] tracking-tight">diversity</span>
          </a>

      {/* Overview */}
      <div className="mb-6">
        <p className="text-gray-400 text-[11px] font-bold tracking-widest mb-2 px-1">
          OVERVIEW
        </p>
        <div className="flex flex-col gap-1">
          {OVERVIEW_ITEMS.map((item) => (
            <NavButton key={item.label} {...item} />
          ))}
        </div>
      

      {/* Community */}
        
        {COMMUNITY_ITEMS.map((item) => (
          <NavButton key={item.label} {...item} />
        ))}
      </div>

      {/* User card */}
      <div className="mt-auto">
        <div className="flex items-center gap-3 bg-white rounded-2xl px-3 py-3 shadow-sm">

          {/* Avatar → profile page */}
          <button
            onClick={() => navigate("/FormTeacher")}
            title="Go to profile"
            className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center shrink-0 hover:bg-purple-200 transition-colors duration-150"
          >
            <span className="text-purple-700 text-[10px] font-bold tracking-wide">
              {getInitials(USER.name)}
            </span>
          </button>

          {/* Name + role */}
          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-semibold text-gray-800 truncate">{USER.name}</p>
            <p className="text-[11px] text-gray-400 truncate">{USER.role}</p>
          </div>

          {/* Logout */}
          <button
            title="Logout"
            className="shrink-0 text-gray-400 hover:text-red-500 transition-colors duration-150 p-1 rounded-lg hover:bg-red-50"
          >
            <img
              src={logoutIcon}
              alt="logout"
              className="w-4 h-4"
              style={{ filter: "invert(60%) sepia(0%) saturate(0%) brightness(80%)" }}
            />
          </button>

        </div>
      </div>

    </div>
  );
};

export default Sidebateacher;