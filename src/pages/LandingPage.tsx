import LandingHeader from '../components/LandingHeader';
import GetStarted from '../components/GetStarted';
import FeatureSection from '../components/FeatureSection';
import CommunityGetStarted from '../components/CommunityGetStarted';
import FreeAccount from '../components/FreeAccount';
import Footer from '../components/Footer';
function LandingPage() {
  return (
    <div className="flex flex-col justify-center items-center m-4">
      <LandingHeader />
      <GetStarted />
      <FeatureSection />
      <CommunityGetStarted />
      <FreeAccount />
      <Footer />
    </div >
  );
}

export default LandingPage;
