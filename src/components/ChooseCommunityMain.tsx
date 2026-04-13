import { useNavigate } from "react-router-dom";
const myPic3 = new URL("../assets/images/community-general.jpg", import.meta.url).href;
const myPic6 = new URL("../assets/images/community-special.jpg", import.meta.url).href;

const styles = `
  .choosePartCommunity.clicked {
    filter: blur(2px);
    opacity: 0.1;
    border: 4px solid rgba(167, 170, 233, 0.39);
    transform: translateY(-3px) scale(1.05);
  }
  .choosePartCommunity:active::before {
    content: "";
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 40px; height: 40px;
    border: 4px solid #702DFF;
    border-top-color: transparent;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
    z-index: 10;
  }
  @keyframes spin {
    to { transform: translate(-50%, -50%) rotate(360deg); }
  }
`;

function ChooseComunityMain() {
    const navigate = useNavigate();
    const sendData3 = () => {
        fetch("http://localhost:3000/api/your-route", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                community: "Generel Community"
            }),
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.error(err));
    };
    const sendData4 = () => {
        fetch("http://localhost:3000/api/your-route", {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                community: "inclusive Community"
            }),
        }).then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.error(err));
    };
    return (
        <>
            <style>{styles}</style>
            <div id="chooseCommunity" className="h-[1000px] bg-white pt-[150px] w-full flex flex-col items-center">
                <h1 id="chooseTitleCommunity" className="cursor-default font-['Geist',sans-serif] text-[60px] font-[550] mt-0 ml-[10px] text-[#202020]">Choose Your Community </h1>
                <p id="chooseTextCommunity" className="cursor-default font-['Geist',sans-serif] text-[23px] font-normal mt-0 ml-0 text-[#202020]">
                    Select the community that best fits your learning preferences and goals
                </p>
                <div className="chooseFlex flex flex-row gap-[30px] mt-[60px] ml-0">
                    <div className="choosePartCommunity relative max-w-[400px] w-[350px] h-[460px] flex flex-col items-center justify-center rounded-[20px] border-[3px] border-[rgba(104,108,184,0.39)] bg-[rgba(167,170,233,0.39)] transition-[filter,opacity] duration-[3000ms] ease-in-out cursor-pointer hover:-translate-y-[3px] hover:scale-105 hover:shadow-[0_12px_25px_rgba(0,0,0,0.3)]" onClick={(e) => {
                        const btn = e.currentTarget;
                        btn.classList.add("clicked");
                        sendData3();
                        setTimeout(() => {
                            navigate('/NormalOrTrisomyStudent');
                        }, 1000);
                    }}>
                        <img className="w-[150px] h-[150px] rounded-[20px] object-contain" src={myPic3}></img>
                        <h2 id="choosePartTitleCommunity1" className="font-['Geist',sans-serif] text-[25px] font-semibold mt-[15px] text-[#202020] whitespace-nowrap">General Community</h2>
                        <p id="choosePartTextCommunity1" className="h-[70px] font-['Geist',sans-serif] text-[17px] font-normal text-[#202020] max-w-[300px] w-full mt-[15px] text-center">Join our main community for general learning, discussions, and peer support</p>
                        <a className="choosePartLinkCommunity font-['Geist',sans-serif] text-[17px] font-medium mt-[40px] text-[#702DFF] cursor-pointer">Choose </a>
                    </div>
                    <div className="choosePartCommunity relative max-w-[400px] w-[350px] h-[460px] flex flex-col items-center justify-center rounded-[20px] border-[3px] border-[rgba(104,108,184,0.39)] bg-[rgba(167,170,233,0.39)] transition-[filter,opacity] duration-[3000ms] ease-in-out cursor-pointer hover:-translate-y-[3px] hover:scale-105 hover:shadow-[0_12px_25px_rgba(0,0,0,0.3)]" onClick={(e) => {
                        const btn = e.currentTarget;
                        btn.classList.add("clicked");
                        sendData4();
                        setTimeout(() => {
                            navigate('/NormalOrTrisomyStudent');
                        }, 1000);
                    }}>
                        <img className="w-[150px] h-[150px] rounded-[20px] object-contain" src={myPic6}></img>
                        <h2 id="choosePartTitleCommunity2" className="font-['Geist',sans-serif] text-[25px] font-semibold mt-[15px] text-[#202020] whitespace-nowrap">Inclusive Community</h2>
                        <p id="choosePartTextCommunity2" className="font-['Geist',sans-serif] text-[17px] font-normal text-[#202020] max-w-[300px] w-full mt-[15px] text-center">Join our inclusive community with specialized support and adaptive resources</p>
                        <a className="choosePartLinkCommunity font-['Geist',sans-serif] text-[17px] font-medium mt-[40px] text-[#702DFF] cursor-pointer">Choose</a>
                    </div>
                </div>
                <p className="cursor-default settingsChooseText font-['Geist',sans-serif] text-[20px] font-normal text-[rgb(90,90,90)] mt-[40px]" id="settingsCommunity">You can change your community preference later in settings</p>
                <a id="skipCommunity" className="font-['Geist',sans-serif] text-[17px] font-medium mt-[20px] text-[#702DFF] h-[20px] relative top-[20px] hover:text-[#702DFF] hover:cursor-pointer" onClick={() => navigate('/HomePage')}>skip for now </a>
            </div>
        </>
    )
}
export default ChooseComunityMain;