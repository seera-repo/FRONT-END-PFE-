function Footer() {
  return (
    <footer className="w-full bg-[#f8f8fc] border-t border-gray-200">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-8 py-14 flex flex-col md:flex-row gap-12">
 
        {/* Brand column */}
        <div className="md:w-64 shrink-0">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg bg-[#3548A7] flex items-center justify-center">
              <span className="text-white font-bold text-xs">D</span>
            </div>
            <span className="text-lg font-bold text-gray-900 tracking-tight">diversity</span>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed">
            Inclusive learning for everyone. Designed with accessibility and care at its core.
          </p>
        </div>
 
        {/* Links columns */}
        <div className="grid grid-cols-3 gap-8 flex-1">
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold text-gray-900 mb-1">Platform</h4>
            <a href="#" className="text-sm text-gray-500 hover:text-[#3548A7] transition-colors">Courses</a>
            <a href="#" className="text-sm text-gray-500 hover:text-[#3548A7] transition-colors">Community</a>
            <a href="#" className="text-sm text-gray-500 hover:text-[#3548A7] transition-colors">About us</a>
          </div>
 
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold text-gray-900 mb-1">Support</h4>
            <a href="#" className="text-sm text-gray-500 hover:text-[#3548A7] transition-colors">Help Center</a>
            <a href="#" className="text-sm text-gray-500 hover:text-[#3548A7] transition-colors">Accessibility</a>
            <a href="#" className="text-sm text-gray-500 hover:text-[#3548A7] transition-colors">Contact</a>
          </div>
 
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold text-gray-900 mb-1">Legal</h4>
            <a href="#" className="text-sm text-gray-500 hover:text-[#3548A7] transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-gray-500 hover:text-[#3548A7] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
 
     
    </footer>
  );
}
 
export default Footer;