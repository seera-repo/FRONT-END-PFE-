import { useNavigate } from "react-router-dom";

function FreeAccount() {
  const navigate = useNavigate();

  return (
    <section className="w-full bg-[#2F327D] py-20 px-6 relative overflow-hidden">
      {/* Decorative background circles */}
      <div className="absolute top-[-60px] left-[-60px] w-64 h-64 rounded-full bg-white/5 pointer-events-none" />
      <div className="absolute bottom-[-80px] right-[-40px] w-80 h-80 rounded-full bg-white/5 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/[0.03] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto text-center flex flex-col items-center gap-5">
        <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
          Ready to start learning?
        </h2>
        <p className="text-lg text-white/70 leading-relaxed max-w-xl">
          Join thousands of learners in our inclusive community. Your journey starts here.
        </p>
        <button
          onClick={() => navigate('/Signup')}
          className="mt-2 px-8 py-4 bg-[#A7A9E9] hover:bg-[#9193e0] active:scale-95 text-[#2e2c74] text-base font-semibold rounded-full transition-all duration-200 shadow-lg shadow-black/20 cursor-pointer"
        >
          Create Your Free Account
        </button>
      </div>
    </section>
  );
}

export default FreeAccount;