import HeroSection from "../components/HeroSection";
import ChallengesSolutionsSection from "../components/ChallengesSolutionsSection";
import StatsCounterSection from "../components/StatsCounterSection";
import BrandSupplyBar from "../components/BrandSupplyBar";
import BenefitsSection from "../components/BenefitsSection";
import FAQSection from "../components/FAQSection";
import CoreFeaturesSection from "../components/CoreFeaturesSection";
import PricingSection from "../components/PricingSection";
import IntegrationSection from "../components/IntegrationSection";

export default function HomePage() {
  return (
    <div className="w-full flex flex-col items-center">
      {/* 1. Hero Section with Video Background & Interactive Slide Cards */}
      <HeroSection />

      {/* 2. Operational Matrix: Challenges & Engineering Solutions */}
      <ChallengesSolutionsSection />

      {/* 3. Dynamic Metric Counter Section (Slide from Sides with Count-Up) */}
      <StatsCounterSection />

      {/* 4. Authorized Multi-Brand Supply Bar */}
      <BrandSupplyBar />

      {/* 5. Benefits & Industrial Value Proposition */}
      <BenefitsSection />

      {/* 6. FAQ Section with Interactive Accordions */}
      <FAQSection />

      {/* 7. Core Features & Capabilities Matrix */}
      <CoreFeaturesSection />

      {/* 8. Procurement Solutions & SLA Commitment */}
      <PricingSection />

      {/* 9. Interactive Brand Integration Ribbon */}
      <IntegrationSection />
    </div>
  );
}
