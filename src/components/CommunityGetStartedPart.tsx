type Props = {
    color: string,
    title: string,
    text: string,
    onClick?: () => void
}

import { useNavigate } from "react-router-dom";

function CommunityGetStartedPart({ color, title, text, onClick }: Props) {
    const navigate = useNavigate();

    const handleClick = () => {
        if (onClick) {
            onClick();
        }
        navigate('/Signup');
    };

    return (
        <div id="communityGetStartedPart" className="w-[500px] h-[250px] text-[rgb(155,155,155)] rounded-[20px] bg-[rgba(239,241,255,0.8)] border border-[rgb(189,189,189)] hover:shadow-[3px_3px_6px_rgba(0,0,0,0.3)] hover:cursor-pointer" onClick={handleClick}>
            <div id="forCommunity" className="w-[120px] h-[35px] rounded-[40px] text-[#202020] text-[15px] font-[500] text-center whitespace-nowrap pt-[5px] mt-[40px] ml-[30px]" style={{ backgroundColor: color }}>{title}</div>
            <p id="communityTextGetStarted" className="text-[rgb(90,90,90)] font-[350] text-[17px] mt-[15px] ml-[30px] text-left w-[450px] h-[70px] mb-[35px]">{text}</p>
            <a id="communitylinkGetStarted" className="text-[#702DFF] text-[15px] font-[450] ml-[30px] mt-[100px]">Get started  -&gt;</a>
        </div>
    );
}
export default CommunityGetStartedPart;