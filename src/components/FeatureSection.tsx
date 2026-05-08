import Feature from './Feature';
import CourseIcon from '../assets/icons/CourseIcon.jpg';
import AIIcon from '../assets/icons/AIIcon.jpg';
import CommunityIcon from '../assets/icons/CommunityIcon.jpg';

function FeatureSection() {
  return (
    <section className="w-full py-24 px-6 bg-white">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold text-[#534AB7] bg-[#EEEDFE] mb-4">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            Features
          </span>
          <h2 className="text-4xl font-bold text-[#1a1a2e] mb-4 leading-tight">
            Designed for how you learn best
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Every feature is built with accessibility and clarity in mind.
          </p>
        </div>

        {/* Cards */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Feature
            image={CourseIcon}
            title="Structured Courses"
            text="Clear lessons with videos, documents, and AI-generated quizzes to reinforce your learning."
          />
          <Feature
            image={AIIcon}
            title="AI Recommendations"
            text="Smart suggestions based on your interests and progress help you find the perfect next course."
          />
          <Feature
            image={CommunityIcon}
            title="Supportive Community"
            text="Connect with fellow learners, share ideas, and support each other in a safe space."
          />
        </div>
      </div>
    </section>
  );
}

export default FeatureSection;