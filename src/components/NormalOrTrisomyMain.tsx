import { useNavigate } from "react-router-dom";
import "./NormalOrTrisomyMain.css";
const myPic4 = new URL("../student-regular.jpg", import.meta.url).href;
const myPic7 = new URL("../student-trisomy21.jpg", import.meta.url).href;
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
        <div id="NormalOrTrisomy">
            <h1 id="chooseTitleNormalOrTrisomy">Are you a Normal Student or Trisomy 21 Student?</h1>
            <p id="chooseTextNormalOrTrisomy">
                Choose the learning experience that works best for you
            </p>
            <div className="chooseFlex">
                <div className="choosePartNormalOrTrisomy" onClick={(e) => { const btn = e.currentTarget; btn.classList.add("clicked"); sendData5(); setTimeout(() => { navigate('/HomePage') }, 1000) }} >
                    <img className="choosePartImage" src={myPic7}></img>
                    <h2 id="choosePartTitleNormalOrTrisomy1">Trisomy 21 Student</h2>
                    <p id="choosePartTextNormalOrTrisomy1" >I want larger text, simplified navigation, and extra learning support</p>
                    <a className="choosePartLinkNormalOrTrisomy">Select This</a>
                </div>
                <div className="choosePartNormalOrTrisomy" onClick={(e) => { const btn = e.currentTarget; btn.classList.add("clicked"); sendData6(); setTimeout(() => { navigate('/HomePage') }, 1000) }}>
                    <img className="choosePartImage" src={myPic4}></img>
                    <h2 id="choosePartTitleNormalOrTrisomy2">I am a Normal Student</h2>
                    <p id="choosePartTextNormalOrTrisomy2">I prefer the standard learning experience with regular content</p>
                    <a className="choosePartLinkNormalOrTrisomy">Select This</a>
                </div>
            </div>
            <p className="settingsChooseText" >You can always change this in your profile settings later</p>
            <a id="skipNormalOrTrisomy" onClick={() => navigate('/HomePage')}>skip for now </a>
        </div>
    )
}
export default NormalOrTrisomyMain;
