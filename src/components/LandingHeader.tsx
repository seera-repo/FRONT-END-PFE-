import { Outlet, useNavigate } from 'react-router-dom';

function LandingHeader() {
  const mainLinks = [
    { label: "Home", href: "#Home" },
    { label: "About us", href: "#AboutUs" },
    { label: "Features", href: "#Features" },
    { label: "Contacts", href: "#Contacts" },
  ];
  const navigate = useNavigate();
 
  return (
    <>
      <header className="fixed top-0 left-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#2e2c74] flex items-center justify-center">
              <span className="text-white font-bold text-sm">D</span>
            </div>
            <span className="text-xl font-bold text-[#1a1a2e] tracking-tight">diversity</span>
          </a>
 
          {/* Nav links */}
          <ul className="hidden md:flex items-center gap-1">
            {mainLinks.map((link, i) => (
              <li key={i}>
                <a
                  href={link.href}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-[#3548A7] hover:bg-blue-50 transition-colors duration-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
 
          {/* CTA buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/Login')}
              className="px-5 py-2 text-sm font-semibold text-[#3548A7] rounded-lg hover:bg-blue-50 transition-colors duration-200 cursor-pointer"
            >
              Log in
            </button>
            <button
              onClick={() => navigate('/signUp')}
              className="px-5 py-2 text-sm font-semibold text-white bg-[#3548A7] rounded-lg hover:bg-[#2F35C2] transition-colors duration-200 cursor-pointer shadow-sm"
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