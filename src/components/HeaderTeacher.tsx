import homeIcon    from '../assets/icons/home.svg';
import peopleIcon  from '../assets/icons/people.svg';
import folderIcon  from '../assets/icons/folder.svg';
import profileIcon from '../assets/icons/profile.svg';
import logoutIcon  from '../assets/icons/logout.svg';
import logo        from '../assets/icons/logo.png';

import { useNavigate, useLocation, Outlet } from 'react-router-dom';

const PURPLE_FILTER = "invert(20%) sepia(90%) saturate(600%) hue-rotate(240deg) brightness(90%)";

const navLinks = [
  { label: "Dashboard", href: "/HomePageTeacher",      icon: homeIcon    },
  { label: "Browse Courses",   href: "/BrowseCourse",  icon: folderIcon  },
  { label: "Community", href: "/CommunityBlog", icon: peopleIcon  },
  { label: "Profile",   href: "/profileteacher",       icon: profileIcon },
];

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (href: string) => location.pathname === href;

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

      <header className="fixed top-0 left-0 z-50 w-full bg-[#A7AAE9]/30 backdrop-blur-md border-b border-[#A7AAE9]/40 shadow-sm">
        <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* ── Logo ── */}
          <a href="/HomePage" className="flex items-center shrink-0">
            <img
              src={logo}
              alt="diversity logo"
              className="h-14 w-auto object-contain"
            />
          </a>

          {/* ── Nav links ── */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className={`nav-link flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      active ? 'active' : ''
                    } ${
                      active
                        ? 'bg-white text-[#6d28d9] shadow-sm'
                        : 'text-gray-500 hover:bg-white/70 hover:text-[#6d28d9]'
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

          {/* ── Logout ── */}
          <button
            onClick={() => navigate('/')}
            className="nav-link flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-[#F13E3E] hover:bg-red-50 transition-all duration-150 cursor-pointer"
          >
            <img
              src={logoutIcon}
              alt="logout"
              className="w-4 h-4 transition-all duration-200"
              style={{ filter: "invert(40%) sepia(80%) saturate(500%) hue-rotate(320deg)" }}
            />
            Logout
          </button>

        </nav>
      </header>
      <Outlet />
    </>
  );
}

export default Header;