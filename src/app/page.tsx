import { AboutSection } from "@/components/sections/AboutSection";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";
import { PropertiesShowcase } from "@/components/sections/PropertiesShowcase";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { UnifiedScrollExperience } from "@/components/sections/UnifiedScrollExperience";
import { Navbar } from "@/components/ui/Navbar";
import { ScrollBackgroundMusic } from "@/components/ui/ScrollBackgroundMusic";

export default function Home() {
  return (
    <>
      <Navbar />
      <ScrollBackgroundMusic />
      <main>
        <UnifiedScrollExperience />
        <PropertiesShowcase />
        <AboutSection />
        <StatsSection />
        <ServicesSection />
        <TestimonialsSection />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
