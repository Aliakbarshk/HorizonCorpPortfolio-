import React, { Suspense, useState } from 'react';
import { BackgroundScene } from './components/BackgroundScene';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { ProcessSection } from './components/ProcessSection';
import { StatsSection } from './components/StatsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SpaceshipGame } from './components/SpaceshipGame';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { Loader } from './components/Loader';
import { FounderSection } from './components/FounderSection';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30">
      
      {/* Show Loader until user enters */}
      {loading && <Loader onComplete={() => setLoading(false)} />}

      {/* Main Content - Only visible when not loading to improve performance and suspense */}
      {!loading && (
        <div className="animate-fade-in">
          {/* 3D Background - Wrapped in Suspense */}
          <Suspense fallback={null}>
              <BackgroundScene />
          </Suspense>

          {/* Foreground Content */}
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