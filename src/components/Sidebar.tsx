import { useState } from "react";
import home      from "../assets/icons/home.svg";
import folder    from "../assets/icons/folder.svg";
import logoutIcon from "../assets/icons/logout.svg";
import people    from "../assets/icons/people.svg";
import profile   from "../assets/icons/profile.svg";
import task      from "../assets/icons/folder.svg";

const PURPLE_FILTER = "invert(20%) sepia(90%) saturate(600%) hue-rotate(240deg) brightness(90%)";
const RED_FILTER    = "invert(35%) sepia(80%) saturate(600%) hue-rotate(320deg) brightness(90%)";

type NavItem = { label: string; icon: string };

const OVERVIEW_ITEMS: NavItem[] = [
  { label: "Dashboard", icon: home   },
  { label: "Courses",   icon: folder },
  { label: "Inbox",     icon: profile},
  { label: "Task",      icon: task   },
];

const Sidebar = () => {
  const [active,  setActive]  = useState("Dashboard");
  const [hovered, setHovered] = useState<string | null>(null);

  const NavButton = ({ label, icon }: NavItem) => {
    const isActive  = active  === label;
    const isHovered = hovered === label;
    // apply purple filter when active OR hovered
    const applyPurple = isActive || isHovered;

    return (
      <button
        onClick={() => setActive(label)}
        onMouseEnter={() => setHovered(label)}
        onMouseLeave={() => setHovered(null)}
        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 w-full text-left
          ${isActive
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

     
      <div className="flex flex-col items-start mb-8">
        
        <h1 className="text-purple-700 font-bold text-sm leading-tight">
          NAME OF THE<br />PLATFORM AND LOGO
        </h1>
      </div>

    
      <div className="mb-6">
        <p className="text-gray-400 text-[11px] font-bold tracking-widest mb-2 px-1">
          OVERVIEW
        </p>
        <div className="flex flex-col gap-1">
          {OVERVIEW_ITEMS.map((item) => (
            <NavButton key={item.label} {...item} />
          ))}
        </div>
      </div>

     
      <div className="mb-6">
        <p className="text-gray-400 text-[11px] font-bold tracking-widest mb-2 px-1">
          COMMUNITY
        </p>
        <NavButton label="Trisomy 21" icon={people} />
      </div>

      {/* Settings */}
      <div className="mt-auto">
        <p className="text-gray-400 text-[11px] font-bold tracking-widest mb-2 px-1">
          SETTINGS
        </p>
        <div className="flex flex-col gap-1">
          <NavButton label="Settings" icon={profile} />

          <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors w-full text-left">
            <img
              src={logoutIcon}
              alt="logout"
              className="w-4 h-4 shrink-0"
              style={{ filter: RED_FILTER }}
            />
            Logout
          </button>
        </div>
      </div>

    </div>
  );
};

export default Sidebar;