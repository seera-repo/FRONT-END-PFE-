import { useNavigate } from "react-router-dom";
const myPic2 = new URL("../assets/images/student-icon.jpg", import.meta.url).href;
const myPic5 = new URL("../assets/images/teacher-icon.jpg", import.meta.url).href;

const styles = `
  .choosePart.clicked {
    opacity: 0.1;
    filter: blur(2px);
    overflow: hidden;
    border: 3px solid rgba(167, 170, 233, 0.39);
    transform: translateY(-3px) scale(1.05);
  }
  .choosePart:active::before {
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

function ChooseRoleMain() {
    const navigate = useNavigate();
    const sendData = () => {
        fetch("http://localhost:3000/api/your-route", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                role: "Teacher"
            }),
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.error(err));
    };
    const sendData2 = () => {
        fetch("http://localhost:3000/api/your-route", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: "Student"
            }),
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.error(err));
    };
    return (
        <>
            <style>{styles}</style>
            <div id="chooseRole" className="h-[1000px] bg-white pt-[150px] w-full flex flex-col items-center">
                <h1 id="chooseTitleRole" className="cursor-default font-['Geist',sans-serif] text-[60px] font-[550] mt-0 text-[#202020]">Welcome to Smart CS!</h1>
                <p id="chooseTextRole" className="cursor-default font-['Geist',sans-serif] text-[23px] font-normal mt-0 text-[#202020]">
                    Tell us a bit about yourself so we can personalize your experience
                </p>
                <div className="chooseFlex flex flex-row gap-[30px] mt-[60px] ml-0">
                    <div className="choosePart relative w-[350px] h-[460px] flex flex-col items-center justify-center rounded-[20px] border-[3px] border-[rgba(104,108,184,0.39)] bg-[rgba(167,170,233,0.39)] transition-[opacity,filter] duration-[3000ms] ease-in-out cursor-pointer hover:-translate-y-[3px] hover:scale-105 hover:shadow-[0_12px_25px_rgba(0,0,0,0.3)]" onClick={(e) => { const btn = e.currentTarget; btn.classList.add('clicked'); sendData2(); setTimeout(() => { navigate('/ChooseComunity') }, 1000) }} >
                        <img className="w-[150px] h-[150px] rounded-[20px] object-contain" src={myPic2}></img>
                        <h2 id="choosePartTitleRole1" className="font-['Geist',sans-serif] text-[25px] font-semibold mt-[15px] text-[#202020]">I'm a Student</h2>
                        <p id="choosePartTextRole1" className="text-[#202020] font-['Geist',sans-serif] text-[17px] font-normal w-[300px] mt-[10px] text-center">Learn new skills, explore courses, and grow at your own pac</p>
                        <a className="choosePartLinkRole font-['Geist',sans-serif] text-[17px] font-medium mt-[40px] text-[#702DFF]">GetStarted  </a>
                    </div>
                    <div className="choosePart relative w-[350px] h-[460px] flex flex-col items-center justify-center rounded-[20px] border-[3px] border-[rgba(104,108,184,0.39)] bg-[rgba(167,170,233,0.39)] transition-[opacity,filter] duration-[3000ms] ease-in-out cursor-pointer hover:-translate-y-[3px] hover:scale-105 hover:shadow-[0_12px_25px_rgba(0,0,0,0.3)]" onClick={(e) => { const btn = e.currentTarget; btn.classList.add("clicked"); sendData(); setTimeout(() => { navigate('/ChooseComunity') }, 1000) }} >
                        <img className="w-[150px] h-[150px] rounded-[20px] object-contain" src={myPic5}></img>
                        <h2 id="choosePartTitleRole2" className="font-['Geist',sans-serif] text-[25px] font-semibold text-[#202020] mt-[15px]">I'm a Teacher</h2>
                        <p id="choosePartTextRole2" className="text-[#202020] font-['Geist',sans-serif] text-[19px] font-normal w-[350px] mt-[10px] text-center">Create courses, inspire students, and make a real impact</p>
                        <a className="choosePartLinkRole font-['Geist',sans-serif] text-[17px] font-medium mt-[40px] text-[#702DFF]">GetStarted</a>
                    </div>
                </div>
                <p className="cursor-default settingsChooseText font-['Geist',sans-serif] text-[20px] font-normal text-[#202020] mt-[40px]">Not sure yet? You can change this later in settings</p>
                <a id="skipRole" className="font-['Geist',sans-serif] text-[17px] font-medium mt-[20px] mb-[50px] text-[#702DFF] relative top-[20px] cursor-pointer hover:text-[#702DFF]" onClick={() => navigate('/HomePage')}>skip for now </a>
            </div>
        </>
    )
}
export default ChooseRoleMain;