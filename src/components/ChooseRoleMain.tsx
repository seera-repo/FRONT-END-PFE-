import { useNavigate } from "react-router-dom";
import "./ChooseRoleMain.css";
const myPic2 = new URL("../student-icon.jpg", import.meta.url).href;
const myPic5 = new URL("../teacher-icon.jpg", import.meta.url).href;
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
        <div id="chooseRole">
            <h1 id="chooseTitleRole">Welcome to Smart CS!</h1>
            <p id="chooseTextRole">
                Tell us a bit about yourself so we can personalize your experience
            </p>
            <div className="chooseFlex">
                <div className="choosePart" onClick={(e) => { const btn = e.currentTarget; btn.classList.add('clicked'); sendData2(); setTimeout(() => { navigate('/ChooseComunity') }, 1000) }} >
                    <img className="choosePartImage" src={myPic2}></img>
                    <h2 id="choosePartTitleRole1">I'm a Student</h2>
                    <p id="choosePartTextRole1" >Learn new skills, explore courses, and grow at your own pac</p>
                    <a className="choosePartLinkRole">GetStarted  </a>
                </div>
                <div className="choosePart" onClick={(e) => { const btn = e.currentTarget; btn.classList.add("clicked"); sendData(); setTimeout(() => { navigate('/ChooseComunity') }, 1000) }} >
                    <img className="choosePartImage" src={myPic5}></img>
                    <h2 id="choosePartTitleRole2">I'm a Teacher</h2>
                    <p id="choosePartTextRole2">Create courses, inspire students, and make a real impact</p>
                    <a className="choosePartLinkRole">GetStarted</a>
                </div>
            </div>
            <p className="settingsChooseText">Not sure yet? You can change this later in settings</p>
            <a id="skipRole" onClick={() => navigate('/HomePage')}>skip for now </a>
        </div>
    )
}
export default ChooseRoleMain;