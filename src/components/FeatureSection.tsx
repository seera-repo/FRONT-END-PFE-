import Feature from './Feature';
import "./featureSection.css";
function FeatureSection() {
    return (
        <div id='featureSection'>
            <h1 id="featureSectionTitle">Designed for how you learn best</h1>
            <p id="featureSectionText">Every feature is built with accessibility and clarity in mind.</p>
            <div id="featureFlex">
                <Feature image="" title="Structured Courses" text="Clear lessons with videos, documents, and AI-generated quizzes to reinforce your learning." />
                <Feature image="" title="AI Recommendations" text="Smart suggestions based on your interests and progress help you find the perfect next course." />
                <Feature image="" title="Supportive Community" text="Connect with fellow learners, share ideas, and support each other in a safe space." />
            </div>
        </div>
    );
}
export default FeatureSection;