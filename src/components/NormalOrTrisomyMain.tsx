import { useNavigate } from "react-router-dom";
const myPic4 = new URL("../assets/images/student-regular.jpg", import.meta.url).href;
const myPic7 = new URL("../assets/images/student-trisomy21.jpg", import.meta.url).href;

const styles = `
  .choosePartNormalOrTrisomy.clicked {
    opacity: 0.9;
    filter: blur(2px);
    border: 3px solid rgba(167, 170, 233, 0.39);
    transform: translateY(-3px) scale(1.05);
    overflow: hidden;
  }
  .choosePartNormalOrTrisomy:active::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40px;
    height: 40px;
    border: 4px solid #702DFF;
    border-top: 4px solid transparent;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
    pointer-events: none;
    z-index: 10;
  }
  @keyframes spin {
    0% { transform: translate(-50%, -50%) rotate(0deg); }
    100% { transform: translate(-50%, -50%) rotate(360deg); }
  }
`;

function NormalOrTrisomyMain() {
    const sendData5 = () => {
        fetch("http://localhost:3000/api/your-route", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                studentType: "a normal student"
            }),
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.error(err));
    };
    const sendData6 = () => {
        fetch("http://localhost:3000/api/your-route", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                studentType: "student with trisomy 21"
            }),
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.error(err));
    };
    const navigate = useNavigate();
    return (
        <>
            <style>{styles}</style>
            <div id="NormalOrTrisomy" className="h-[1000px] bg-white pt-[150px] w-full flex flex-col items-center">
                <h1 id="chooseTitleNormalOrTrisomy" className="cursor-default font-['Geist',sans-serif] text-[50px] font-[550] mt-0 ml-[-140px] w-[1000px] text-[#202020] text-center whitespace-nowrap">Are you a Normal Student or Trisomy 21 Student?</h1>
                <p id="chooseTextNormalOrTrisomy" className="cursor-default font-['Geist',sans-serif] text-[23px] font-normal mt-[10px] text-[#202020]">
                    Choose the learning experience that works best for you
                </p>
                <div className="chooseFlex flex flex-row gap-[30px] mt-[40px]">
                    <div className="choosePartNormalOrTrisomy relative w-[350px] h-[460px] flex flex-col items-center rounded-[20px] border-[3px] border-[rgba(104,108,184,0.39)] bg-[rgba(167,170,233,0.39)] transition-[opacity,filter] duration-[3000ms] ease-in-out hover:-translate-y-[3px] hover:scale-105 hover:shadow-[0_12px_25px_rgba(0,0,0,0.3)]" onClick={(e) => { const btn = e.currentTarget; btn.classList.add("clicked"); sendData5(); setTimeout(() => { navigate('/HomePage') }, 1000) }} >
                        <img className="cursor-pointer w-[150px] h-[150px] mt-[50px] rounded-[20px] object-contain" src={myPic7}></img>
                        <h2 id="choosePartTitleNormalOrTrisomy1" className="cursor-pointer font-['Geist',sans-serif] text-[25px] font-semibold text-[#202020] mt-[15px] whitespace-nowrap">Trisomy 21 Student</h2>
                        <p id="choosePartTextNormalOrTrisomy1" className="cursor-pointer text-[#202020] font-['Geist',sans-serif] text-[17px] font-normal w-[300px] mt-[10px] text-center">I want larger text, simplified navigation, and extra learning support</p>
                        <a className="choosePartLinkNormalOrTrisomy cursor-pointer font-['Geist',sans-serif] text-[17px] font-medium mt-[50px] text-[#702DFF]">Select This</a>
                    </div>
                    <div className="choosePartNormalOrTrisomy relative w-[350px] h-[460px] flex flex-col items-center rounded-[20px] border-[3px] border-[rgba(104,108,184,0.39)] bg-[rgba(167,170,233,0.39)] transition-[opacity,filter] duration-[3000ms] ease-in-out hover:-translate-y-[3px] hover:scale-105 hover:shadow-[0_12px_25px_rgba(0,0,0,0.3)]" onClick={(e) => { const btn = e.currentTarget; btn.classList.add("clicked"); sendData6(); setTimeout(() => { navigate('/HomePage') }, 1000) }}>
                        <img className="cursor-pointer w-[150px] h-[150px] mt-[50px] rounded-[20px] object-contain" src={myPic4}></img>
                        <h2 id="choosePartTitleNormalOrTrisomy2" className="cursor-pointer font-['Geist',sans-serif] text-[25px] font-semibold text-[#202020] mt-[15px] whitespace-nowrap">I am a Normal Student</h2>
                        <p id="hoosePartTextNormalOrTrisomy2" className="cursor-pointer text-[#202020] font-['Geist',sans-serif] text-[17px] font-normal w-[300px] mt-[10px] text-center">I prefer the standard learning experience with regular content</p>
                        <a className="choosePartLinkNormalOrTrisomy cursor-pointer font-['Geist',sans-serif] text-[17px] font-medium mt-[50px] text-[#702DFF]">Select This</a>
                    </div>
                </div>
                <p className="cursor-default settingsChooseText font-['Geist',sans-serif] text-[20px] font-normal text-[#202020] mt-[60px]">You can always change this in your profile settings later</p>
                <a id="skipNormalOrTrisomy" className="font-['Geist',sans-serif] text-[17px] font-medium h-[10px] mt-[30px] text-[#702DFF] relative top-[20px] cursor-pointer hover:text-[#702DFF]" onClick={() => navigate('/HomePage')}>skip for now </a>
            </div>
        </>
    )
}
export default NormalOrTrisomyMain;