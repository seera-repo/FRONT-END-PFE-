import { useNavigate, Outlet } from 'react-router-dom';
import logo from '../assets/icons/logo.png';
import ProfileIcon from '../assets/icons/profile.svg';
import CommunityIcon from '../assets/icons/people.svg';
import CoursesIcon from '../assets/icons/folder.svg';
import DashboardIcon from '../assets/icons/home.svg';
import LogoutIcon from '../assets/icons/logout.svg';

function Header() {
  const navigate = useNavigate();

  const navLinks = [
    { label: "Dashboard", href: "/HomePage" },
    { label: "Courses",   href: "/BrowseCourse" },
    { label: "Community", href: "/CommunityBlog" },
    { label: "Profile",   href: "/ProfileStudent" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate('/');
  };

  return (
    <>
      <header className="fixed top-0 left-0 z-50 w-full bg-[#d2d4f5] shadow-[0_4px_20px_rgba(47,53,194,0.10)]">
        <nav className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">

          {/* Logo */}
          <a href="/HomePage" className="flex items-center shrink-0">
            <img
              src={logo}
              alt="Diversity"
              className="h-14 w-auto object-contain"
            />
          </a>

          {/* Nav links */}
          <ul className="hidden md:flex flex-1 justify-center items-center gap-1">
            {navLinks.map((link, i) => (
              <li key={i}>
                <a
                  href={link.href}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-[#2e2c74] hover:bg-white/60 hover:text-[#2F35C2] transition-all duration-150 block"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm font-semibold text-[#e7000b] hover:text-red-700 hover:bg-red-50 px-4 py-2 rounded-xl transition-all duration-150 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </nav>
      </header>
      <Outlet />
    </>
  );
}

export default Header;