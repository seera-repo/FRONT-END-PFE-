import LandingHeader from '../components/LandingHeader';
import GetStarted from '../components/GetStarted';
import FeatureSection from '../components/FeatureSection';
import CommunityGetStarted from '../components/CommunityGetStarted';
import FreeAccount from '../components/FreeAccount';
import Footer from '../components/Footer';

function LandingPage() {
  return (
    <div className="flex flex-col">
      <LandingHeader />

      {/* Hero */}
      <section id="home" className="w-full mt-16">
        <div id="get-started">
          <GetStarted />
        </div>
      </section>

      {/* Features */}
      <section id="features" className="w-full">
        <FeatureSection />
      </section>

      {/* Community */}
      <section id="community" className="w-full">
        <CommunityGetStarted />
      </section>

      {/* CTA */}
      <section id="free-account" className="w-full">
        <FreeAccount />
      </section>

      <Footer />
    </div>
  );
}

export default LandingPage;