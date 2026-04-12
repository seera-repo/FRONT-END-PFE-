import CommunityGetStartedPart from './CommunityGetStartedPart';
import './communitygetstarted.css'

function CommunityGetStarted() {
    const sendData7 = () => {
        fetch("http://localhost:3000/api/your-route", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                role: "student"
            }),
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.error(err));
    };

    const sendData8 = () => {
        fetch("http://localhost:3000/api/your-route", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                role: "teacher"
            }),
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.error(err));
    };

    const sendData9 = () => {
        fetch("http://localhost:3000/api/your-route", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                role: "admin"
            }),
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.error(err));
    };

    return (
        <div id="communityGetStarted">
            <h1 id="communityGetStartedTitle">a place for everyone</h1>
            <p id="communityGetStartedText">Whether you learn, teach, or manage -- Smart CS has you covered.</p>
            <div id="getStartedFlex">
                <CommunityGetStartedPart
                    onClick={() => sendData7()}
                    color="#a29ed0"
                    title="For Students"
                    text="Track your progress, get AI-powered recommendations, and learn in a supportive environment designed just for you."
                />
                <CommunityGetStartedPart
                    onClick={() => sendData8()}
                    color="#8c8ed2"
                    title="For Teachers"
                    text="Create engaging courses, upload materials, generate quizzes with AI, and view real-time analytics."
                />
                <CommunityGetStartedPart
                    onClick={() => sendData9()}
                    color="#6662cf"
                    title="For Admins"
                    text="Manage users, oversee categories, and track platform statistics from a comprehensive dashboard."
                />
            </div>
        </div>
    );
}

export default CommunityGetStarted;