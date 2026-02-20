import { NavBar } from "@/components/NavBar";
import { HeroSection } from "@/components/HeroSection";
import { EcosystemOverview } from "@/components/EcosystemOverview";
import { AEPIngestion } from "@/components/AEPIngestion";
import { AEPSegmentation } from "@/components/AEPSegmentation";
import { AEPAJOBridge } from "@/components/AEPAJOBridge";
import { JourneysVsCampaigns } from "@/components/JourneysVsCampaigns";
import { JourneyBuilder } from "@/components/JourneyBuilder";
import { EcommerceUseCase } from "@/components/EcommerceUseCase";
import { TravelUseCase } from "@/components/TravelUseCase";
import { GlossarySection } from "@/components/GlossarySection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <main>
        <HeroSection />
        <EcosystemOverview />
        <AEPIngestion />
        <AEPSegmentation />
        <AEPAJOBridge />
        <JourneysVsCampaigns />
        <JourneyBuilder />
        <EcommerceUseCase />
        <TravelUseCase />
        <GlossarySection />
      </main>
    </div>
  );
};

export default Index;
