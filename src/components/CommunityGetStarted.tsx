import CommunityGetStartedPart from './CommunityGetStartedPart';
 
function CommunityGetStarted() {
  const sendData7 = () => {
    fetch("http://localhost:3000/api/your-route", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: "student" }),
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.error(err));
  };
 
  const sendData8 = () => {
    fetch("http://localhost:3000/api/your-route", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: "teacher" }),
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.error(err));
  };
 
  return (
    <section className="w-full max-w-5xl mx-auto px-6 py-24">
      {/* Header */}
      <div className="text-center mb-14">
        <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold text-[#534AB7] bg-[#EEEDFE] mb-4">
          Community
        </span>
        <h2 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
          A place for everyone
        </h2>
        <p className="text-lg text-gray-500 max-w-xl mx-auto">
          Whether you learn, teach, or manage — Smart CS has you covered.
        </p>
      </div>
 
      {/* Cards */}
      <div className="flex flex-col sm:flex-row gap-6 justify-center">
        <CommunityGetStartedPart
          onClick={sendData7}
          color="rgb(167,170,233)"
          title="For Students"
          text="Track your progress, get AI-powered recommendations, and learn in a supportive environment designed just for you."
        />
        <CommunityGetStartedPart
          onClick={sendData8}
          color="rgb(100,180,220)"
          title="For Teachers"
          text="Create engaging courses, upload materials, generate quizzes with AI, and view real-time analytics on student progress."
        />
      </div>
    </section>
  );
}
 
export default CommunityGetStarted