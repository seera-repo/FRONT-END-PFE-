import { useNavigate } from 'react-router-dom';
import pic from '../assets/images/hero-learning.jpg';

function GetStarted() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-[700px] bg-[#f0f0fa] flex flex-row items-center justify-between px-16 gap-12 border-b border-[rgb(196,196,196)] mt-16">

      {/* Left content */}
      <div className="flex flex-col max-w-[580px]">
        {/* Badge */}
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold text-[#534AB7] bg-[#EEEDFE] mb-6 w-fit">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
          </svg>
          AI-powered inclusive learning
        </span>

        <h1 className="text-[52px] font-bold text-[#1a1a2e] leading-[1.15] mb-6">
          Learn at your own pace,{' '}
          <span className="text-[#3548A7]">your own way</span>
        </h1>

        <p className="text-[18px] text-gray-500 leading-relaxed mb-10 font-normal">
         Diversity is a warm, accessible platform where every learner is supported. AI-powered recommendations, calm design, and an inclusive community help you thrive.
        </p>

        {/* Buttons */}
        <div className="flex flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/Signup')}
            className="cursor-pointer bg-[#3548A7] hover:bg-[#2F35C2] active:scale-95 text-white px-8 py-4 rounded-full text-[17px] font-semibold transition-all items-center duration-200 shadow-md shadow-[#3548A7]/30"
          >
            Get Started Free
          </button>
          
        </div>

       
      </div>

      {/* Right image */}
      <div className="relative shrink-0">
        <div className="absolute inset-0 rounded-3xl bg-[#A7A9E9]/20 blur-2xl scale-95 pointer-events-none" />
        <img
          src={pic}
          alt="Hero learning"
          className="relative w-[500px] h-[500px] object-cover rounded-3xl shadow-xl shadow-[#3548A7]/20"
        />
        {/* Floating card */}
        <div className="absolute -bottom-4 -left-6 bg-white rounded-2xl px-5 py-3 shadow-lg  inline-flex items-center justify-center gap-3 border border-gray-100">
          <div className="w-9 h-9 rounded-full bg-[#EEEDFE] flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#534AB7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-800">New lesson unlocked</p>
            <p className="text-xs text-gray-400">Keep up the great work!</p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default GetStarted;