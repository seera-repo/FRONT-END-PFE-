import CommunityGetStartedPart from './CommunityGetStartedPart';

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


    return (
        <div id="communityGetStarted">
            <h1 id="communityGetStartedTitle" className="cursor-default w-[200px] h-[100px] text-black text-[43px] font-[700] mt-[100px] ml-[315px] whitespace-nowrap">a place for everyone</h1>
            <p id="communityGetStartedText" className="cursor-default text-[22px] font-[500] text-[rgb(99,99,99)] w-[800px] text-center whitespace-nowrap ml-[130px] mb-[30px]">Whether you learn, teach, or manage -- Smart CS has you covered.</p>
            <div id="getStartedFlex" className="flex flex-row gap-[40px] ml-[40px]">
                <CommunityGetStartedPart
                    onClick={() => sendData7()}
                    color="rgb(167,170,233)"
                    title="For Students"
                    text="Track your progress, get AI-powered recommendations, and learn in a supportive environment designed just for you."
                />
                <CommunityGetStartedPart
                    onClick={() => sendData8()}
                    color="rgb(167,170,233)"
                    title="For Teachers"
                    text="Create engaging courses, upload materials, generate quizzes with AI, and view real-time analytics."
                />
            </div>
        </div>
    );
}

export default CommunityGetStarted;