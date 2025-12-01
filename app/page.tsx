import HeroV2 from '../components/HeroV2';
import FourFloors from '../components/FourFloors';
import FeatureGrid from '../components/FeatureGrid';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';
import LucidiaAgent from '../components/LucidiaAgent';
import NavBar from '../components/NavBar';

export default function HomePage() {
  return (
    <>
      <NavBar />
      <div className="relative overflow-hidden">
        <HeroV2 />
        <FeatureGrid />
        <FourFloors />
        <CTASection />
        <LucidiaAgent />
        <Footer />
      </div>
    </>
  );
}
