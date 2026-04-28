import logo from '../assets/icons/logo.png';

function Footer() {
  return (
    <footer className="w-full bg-[#f8f8fc] border-t border-gray-200">

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-8 py-14 flex flex-col md:flex-row gap-12">

        {/* Brand column */}
        <div className="md:w-64 shrink-0">
          <a href="/" className="inline-flex items-center mb-4">
            <img
              src={logo}
              alt="Diversity"
              className="h-12 w-auto object-contain"
            />
          </a>
          <p className="text-sm text-gray-500 leading-relaxed">
            Inclusive learning for everyone. Designed with accessibility and care at its core.
          </p>

          {/* Social row placeholder */}
          
        </div>

        {/* Links columns */}
        <div className="grid grid-cols-3 gap-8 flex-1">

          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold text-[#2e2c74] mb-1">Platform</h4>
            <a href="/BrowseCourse"  className="text-sm text-gray-500 hover:text-[#2e2c74] transition-colors">Courses</a>
            <a href="/CommunityBlog" className="text-sm text-gray-500 hover:text-[#2e2c74] transition-colors">Community</a>
            <a href="#"              className="text-sm text-gray-500 hover:text-[#2e2c74] transition-colors">About us</a>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold text-[#2e2c74] mb-1">Support</h4>
            <a href="#" className="text-sm text-gray-500 hover:text-[#2e2c74] transition-colors">Help Center</a>
            <a href="#" className="text-sm text-gray-500 hover:text-[#2e2c74] transition-colors">Accessibility</a>
            <a href="#" className="text-sm text-gray-500 hover:text-[#2e2c74] transition-colors">Contact</a>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold text-[#2e2c74] mb-1">Legal</h4>
            <a href="#" className="text-sm text-gray-500 hover:text-[#2e2c74] transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-gray-500 hover:text-[#2e2c74] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-100 py-5 px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} Diversity. All rights reserved.
        </p>
        <p className="text-xs text-gray-400">
          Made for inclusive learning
        </p>
      </div>
    </footer>
  );
}

export default Footer;