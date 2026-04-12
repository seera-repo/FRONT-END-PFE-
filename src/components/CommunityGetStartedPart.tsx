type Props = {
    color: string,
    title: string,
    text: string,
    onClick?: () => void
}

import { useNavigate } from "react-router-dom";
import "./communitygetstartedpart.css";

function CommunityGetStartedPart({ color, title, text, onClick }: Props) {
    const navigate = useNavigate();

    const handleClick = () => {
        if (onClick) {
            onClick();
        }
        navigate('/Signup');
    };

    return (
        <div id="communityGetStartedPart" onClick={handleClick}>
            <div id="forCommunity" style={{ backgroundColor: color }}>{title}</div>
            <p id="communityTextGetStarted">{text}</p>
            <a id="communitylinkGetStarted">Get started</a>
        </div>
    );
}
export default CommunityGetStartedPart;