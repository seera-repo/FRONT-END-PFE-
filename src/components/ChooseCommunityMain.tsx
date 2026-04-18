import { useNavigate } from "react-router-dom";
const myPic3 = new URL("../community-general.jpg", import.meta.url).href;
const myPic6 = new URL("../community-special.jpg", import.meta.url).href;
//import "./chooseCommunityMain.css";
function ChooseCommunityMain() {
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
        <div id="chooseCommunity">
            <h1 id="chooseTitleCommunity">Choose Your Community </h1>
            <p id="chooseTextCommunity">
                Select the community that best fits your learning preferences and goals
            </p>
            <div className="chooseFlex">
                <div className="choosePartCommunity" onClick={(e) => {
                    const btn = e.currentTarget;
                    btn.classList.add("clicked");
                    sendData3();
                    setTimeout(() => {
                        navigate('/NormalOrTrisomyStudent');
                    }, 1000);
                }}>
                    <img className="choosePartImage" src={myPic3}></img>
                    <h2 id="choosePartTitleCommunity1">General Community</h2>
                    <p id="choosePartTextCommunity1" >Join our main community for general learning, discussions, and peer support</p>
                    <a className="choosePartLinkCommunity">Choose </a>
                </div>
                <div className="choosePartCommunity" onClick={(e) => {
                    const btn = e.currentTarget;
                    btn.classList.add("clicked");
                    sendData4();
                    setTimeout(() => {
                        navigate('/NormalOrTrisomyStudent');
                    }, 1000);
                }}>
                    <img className="choosePartImage" src={myPic6}></img>
                    <h2 id="choosePartTitleCommunity2">Inclusive Community</h2>
                    <p id="choosePartTextCommunity2">Join our inclusive community with specialized support and adaptive resources</p>
                    <a className="choosePartLinkCommunity">Choose</a>
                </div>
            </div>
            <p className="settingsChooseText" id="settingsCommunity">You can change your community preference later in settings</p>
            <a id="skipCommunity" onClick={() => navigate('/HomePage')}>skip for now </a>
        </div>
    )
}
export default ChooseCommunityMain;