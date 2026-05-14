import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import logo from "../assets/icons/logo.png";
import home from "../assets/icons/home.svg";
import folder from "../assets/icons/folder.svg";
import logoutIcon from "../assets/icons/logout.svg";
import people from "../assets/icons/people.svg";

const PURPLE_FILTER =
  "invert(20%) sepia(90%) saturate(600%) hue-rotate(240deg) brightness(90%)";

type NavItem = {
  label: string;
  icon: string;
  path: string;
};

// Inline add icon
const addIconSrc =
  "data:image/svg+xml,%3Csvg width='17' height='17' viewBox='0 0 17 17' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8.5 3.5V13.5M3.5 8.5H13.5' stroke='%23202020' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E";

const OVERVIEW_ITEMS: NavItem[] = [
  { label: "Dashboard", icon: home, path: "/HomePageTeacher" },
  { label: "Add Course", icon: addIconSrc, path: "/AddCourse" },
  { label: "Browse Courses", icon: folder, path: "/BrowseCourse" },
];

const COMMUNITY_ITEMS: NavItem[] = [
  { label: "Community", icon: people, path: "/CommunityBlogTeacher" },
];

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

const USER = { name: "Dr. Khalil", role: "Teacher" };

const SidebarTeacher = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [hovered, setHovered] = useState<string | null>(null);

  const isActive = (path: string) => location.pathname === path;

  const NavButton = ({ label, icon, path }: NavItem) => {
    const active = isActive(path);
    const isHov = hovered === label;
    const applyPurple = active || isHov;

    return (
      <button
        onClick={() => navigate(path)}
        onMouseEnter={() => setHovered(label)}
        onMouseLeave={() => setHovered(null)}
        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 w-full text-left
          ${
            active
              ? "bg-white text-[#2e2c74] shadow-sm"
              : "text-[#4a4d6e] hover:bg-white/60 hover:text-[#2e2c74]"
          }`}
      >
        <img
          src={icon}
          alt={label}
          className="w-4 h-4 shrink-0"
          style={{ filter: applyPurple ? PURPLE_FILTER : "none" }}
        />
        {label}
      </button>
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="w-56 h-screen bg-[#A7AAE9]/30 p-4 flex flex-col shrink-0 rounded-3xl overflow-hidden">
      {/* Logo */}
      <a href="/HomePageTeacher" className="flex items-center gap-2 mb-6 mt-1">
        <img src={logo} alt="Diversity" className="h-16 w-auto object-contain" />
      </a>

      {/* Overview */}
      <div className="mb-1">
        <p className="text-[10px] font-bold tracking-widest text-[#a7aae9] uppercase px-2 mb-1.5">
          Overview
        </p>

        <div className="flex flex-col gap-0.5">
          {OVERVIEW_ITEMS.map((item) => (
            <NavButton key={item.label} {...item} />
          ))}
        </div>

        {/* Community shortcut */}
        {COMMUNITY_ITEMS.map((item) => (
          <NavButton key={item.label} {...item} />
        ))}
      </div>



      
      {/* Spacer */}
      <div className="flex-1" />

      {/* User card */}
      <div className="bg-white rounded-2xl px-3 py-3 shadow-sm">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => navigate("/Profileteacher")}
            className="w-9 h-9 rounded-xl bg-[#d2d4f5] flex items-center justify-center"
          >
            <span className="text-[#2e2c74] text-[10px] font-extrabold">
              {getInitials(USER.name)}
            </span>
          </button>

          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-semibold text-gray-800 truncate">
              {USER.name}
            </p>
            <p className="text-[11px] text-gray-400 truncate">{USER.role}</p>
          </div>

          <button
            title="Logout"
            onClick={handleLogout}
            className="shrink-0 p-1 rounded-lg hover:bg-red-50 hover:text-red-500 transition"
          >
            <img src={logoutIcon} alt="logout" className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SidebarTeacher;