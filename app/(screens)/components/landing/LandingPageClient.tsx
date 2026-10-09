"use client";

import LandingHeader from "./LandingHeader";
import LandingGymWall from "./LandingGymWall";
import LandingHero from "./LandingHero";
import LandingTickerRibbon from "./LandingTickerRibbon";
import LandingPainPoints from "./LandingPainPoints";
import LandingPillarsCarousel from "./LandingPillarsCarousel";
import LandingSystemDesign from "./LandingSystemDesign";
import LandingKeyMoments from "./LandingKeyMoments";
import LandingRoiCalculator from "./LandingRoiCalculator";
import LandingReviews from "./LandingReviews";
import LandingFooter from "./LandingFooter";
import LandingStickyMobileBar from "./LandingStickyMobileBar";

export default function LandingPageClient() {
  const scrollToAudit = () => {
    const el = document.getElementById("audit-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#090A0E] text-white flex flex-col pb-16 md:pb-0 selection:bg-[#D4FF32] selection:text-black">
      <LandingHeader />
      <LandingGymWall />
      <main className="flex-1 flex flex-col">
        <LandingHero />
        <LandingTickerRibbon />
        <LandingPainPoints />
        <LandingPillarsCarousel />
        <LandingSystemDesign />
        <LandingKeyMoments />
        <LandingRoiCalculator onOpenConsultation={scrollToAudit} />
        <LandingReviews />
      </main>
      <LandingFooter />
      <LandingStickyMobileBar />
    </div>
  );
}
