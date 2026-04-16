import Feature from './Feature';
function FeatureSection() {
    return (
        <div id='featureSection'>
            <h1 id="featureSectionTitle" className="cursor-default w-[200px] h-[100px] text-black text-[43px] font-[700] mt-[100px] ml-[270px] whitespace-nowrap">Designed for how you learn best</h1>
            <p id="featureSectionText" className="cursor-default text-[22px] font-[500] text-[rgb(99,99,99)] w-[800px] ml-[210px] text-center whitespace-nowrap">Every feature is built with accessibility and clarity in mind.</p>
            <div id="featureFlex" className="mt-[50px] flex flex-row gap-[20px] justify-center ml-[10px]">
                <Feature image="" title="Structured Courses" text="Clear lessons with videos, documents, and AI-generated quizzes to reinforce your learning." />
                <Feature image="" title="AI Recommendations" text="Smart suggestions based on your interests and progress help you find the perfect next course." />
                <Feature image="" title="Supportive Community" text="Connect with fellow learners, share ideas, and support each other in a safe space." />
            </div>
        </div>
    );
}
export default FeatureSection;