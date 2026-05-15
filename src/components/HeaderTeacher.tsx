import homeIcon from "../assets/icons/home.svg";
import peopleIcon from "../assets/icons/people.svg";
import folderIcon from "../assets/icons/folder.svg";
import profileIcon from "../assets/icons/profile.svg";
import logoutIcon from "../assets/icons/logout.svg";

import logo from "../assets/images/Asset_14x.png";

import { getUser } from "../api/auth";
import { useNavigate, useLocation } from "react-router-dom";
const addIconSrc =
  "data:image/svg+xml,%3Csvg width='17' height='17' viewBox='0 0 17 17' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8.5 3.5V13.5M3.5 8.5H13.5' stroke='%23202020' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E";
const PURPLE_FILTER =
  "invert(20%) sepia(90%) saturate(600%) hue-rotate(240deg) brightness(90%)";

function HeaderTeacher() {
  const user = getUser();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (href: string) => location.pathname === href;

  const navLinks = [
    {
      label: "Dashboard",
      href:
        user?.role === "Admin"
          ? "/db"
          : user?.role === "Teacher"
          ? "/HomePageTeacher"
          : "/HomePage",
      icon: homeIcon,
    },
 
  
    {
      label: "Add Course",
      href: "/AddCourse",
      icon:addIconSrc , 
    },

    {
      label: "Courses",
      href: "/BrowseCourseTeacher",
      icon: folderIcon,
    },

    {
      label: "Community",
      href: "/CommunityBlogTeacher",
      icon: peopleIcon,
    },

    {
      label: "Profile",
      href:
        user?.role === "Admin"
          ? "/ProfileAdmin"
          : user?.role === "Teacher"
          ? "/ProfileTeacher"
          : "/ProfileStudent",
      icon: profileIcon,
    },
  ];

  return (
    <>
      <style>{`
        .nav-icon {
          transition: filter 0.2s ease;
        }

        .nav-link:hover .nav-icon,
        .nav-link.active .nav-icon {
          filter: ${PURPLE_FILTER};
        }
      `}</style>

      <header className="fixed top-0 left-0 z-50 w-full bg-[#d2d4f5] backdrop-blur-md border-b border-[#A7AAE9]/40 shadow-[0_10px_15px_rgba(0,0,0,0.1)]">
        <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* Logo (same as your Header) */}
          <a href="/" className="flex flex-row items-center gap-x-2 shrink-0">
            <img
              src={logo}
              alt="Logo"
              className="h-15 w-auto object-contain"
            />
          </a>

          {/* Nav links */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);

              return (
                <li key={link.label} className="group flex items-center gap-x-2">
                  <a
                    href={link.href}
                    className={`nav-link flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      active ? "active" : ""
                    } ${
                      active
                        ? "bg-white text-[#6d28d9] shadow-sm"
                        : "text-gray-500 hover:bg-white/70 hover:text-[#6d28d9]"
                    }`}
                  >
                    <img
                      src={link.icon}
                      alt={link.label}
                      className="nav-icon w-4 h-4 shrink-0"
                    />
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Logout */}
          <button
            className="nav-link flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-[#F13E3E] hover:bg-red-50 transition-all duration-150 cursor-pointer"
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
          >
            <img
              src={logoutIcon}
              alt="logout"
              className="w-4 h-4 transition-all duration-200"
              style={{
                filter:
                  "invert(40%) sepia(80%) saturate(500%) hue-rotate(320deg)",
              }}
            />
            Logout
          </button>

        </nav>
      </header>
    </>
  );
}

export default HeaderTeacher;