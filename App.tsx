import { Suspense, useState } from "react";
import { BackgroundScene } from "./components/BackgroundScene";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { ServicesSection } from "./components/ServicesSection";
import { ProcessSection } from "./components/ProcessSection";
import { StatsSection } from "./components/StatsSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { SpaceshipGame } from "./components/SpaceshipGame";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { Loader } from "./components/Loader";
import { FounderSection } from "./components/FounderSection";

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30">
      {/* Loader screen */}
      {loading && <Loader onComplete={() => setLoading(false)} />}

      {/* Main content – only renders after loader finishes */}
      {!loading && (
        <div className="animate-fade-in">
          {/* 3D Background (lazy-loaded with Suspense) */}
          <Suspense fallback={null}>
            <BackgroundScene />
          </Suspense>

          {/* Page content */}
          <main className="relative z-10">
            <Navbar />
            <HeroSection />
            <StatsSection />
            <ProcessSection />
            <ServicesSection />
            <ProjectsSection />
            <SpaceshipGame />
            <FounderSection />
            <ContactSection />
            <Footer />
          </main>
        </div>
      )}
    </div>
  );
}

export default App;
