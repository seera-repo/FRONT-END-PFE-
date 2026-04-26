type Props = {
  color: string;
  title: string;
  text: string;
  onClick?: () => void;
  icon?: string;
};

import { useNavigate } from "react-router-dom";

function CommunityGetStartedPart({ color, title, text, onClick, icon }: Props) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) onClick();
    navigate('/Signup');
  };

  return (
    <div
      onClick={handleClick}
      className="group relative flex flex-col justify-between w-full max-w-[480px] min-h-[220px] p-8 rounded-2xl bg-white border border-gray-200 hover:border-[#3548A7]/40 hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
    >
      {/* Subtle background accent */}
      <div
        className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 -translate-y-1/2 translate-x-1/2"
        style={{ backgroundColor: color }}
      />

      <div>
        {/* Badge */}
        <span
          className="inline-block px-3 py-1 rounded-full text-sm font-semibold mb-4"
          style={{ backgroundColor: '#EEEDFE', color: '#534AB7' }}
        >
          {title}
        </span>

        {/* Text */}
        <p className="text-gray-600 text-[15px] leading-relaxed font-normal">
          {text}
        </p>
      </div>

      {/* Footer link */}
      <div className="flex items-center gap-1 mt-6 text-[#534AB7] text-sm font-semibold group-hover:gap-2 transition-all duration-200">
        Get started
        <span className="text-base">→</span>
      </div>
    </div>
  );
}

export default CommunityGetStartedPart;