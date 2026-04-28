import { Outlet, useNavigate } from 'react-router-dom';
import logo from '../assets/icons/logo.png';

function LandingHeader() {
  const navigate = useNavigate();

  const mainLinks = [
    { label: "Home",        sectionId: "home" },
    { label: "Features",    sectionId: "features" },
    { label: "Community",   sectionId: "community" },
    { label: "Get Started", sectionId: "get-started" },
  ];

  const handleNavClick = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <nav className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">

          {/* Logo */}
          <a href="/" className="flex items-center shrink-0">
            <img
              src={logo}
              alt="Diversity"
              className="h-16 w-auto object-contain"
            />
          </a>

          {/* Nav links */}
          <ul className="hidden md:flex items-center gap-1">
            {mainLinks.map((link, i) => (
              <li key={i}>
                <button
                  onClick={() => handleNavClick(link.sectionId)}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-[#4a4d6e] hover:text-[#2e2c74] hover:bg-[#d2d4f5]/50 transition-all duration-150 cursor-pointer"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* CTA buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/Login')}
              className="px-5 py-2 text-sm font-semibold text-[#2e2c74] rounded-xl hover:bg-[#d2d4f5]/50 transition-all duration-150 cursor-pointer"
            >
              Log in
            </button>
            <button
              onClick={() => navigate('/Signup')}
              className="px-5 py-2 text-sm font-semibold text-white bg-[#2e2c74] rounded-xl hover:bg-[#3f3ea8] active:scale-95 transition-all duration-150 cursor-pointer shadow-sm shadow-[#2e2c74]/30"
            >
              Sign up
            </button>
          </div>
        </nav>
      </header>
      <Outlet />
    </>
  );
}

export default LandingHeader;