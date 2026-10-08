import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HomePage } from "@/pages/HomePage";
import { TimelinesPage } from "@/pages/TimelinesPage";
import { ProjectDetailPage } from "@/pages/ProjectDetailPage";
import { AboutPage } from "@/pages/AboutPage";
import { LoadingScreen } from "@/components/LoadingScreen";

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [pathname, hash]);

  return null;
}

export function App() {
  // Always display the constellation loading screen while the portfolio is initializing
  const [isLoading, setIsLoading] = useState(true);

  // Optional modal to reopen the interactive skills constellation on demand
  const [showSkillsModal, setShowSkillsModal] = useState(false);

  return (
    <BrowserRouter>
      {/* Splash loading screen featuring skill constellation */}
      {isLoading && <LoadingScreen onFinish={() => setIsLoading(false)} />}

      {/* Reopenable skill constellation modal on demand */}
      {showSkillsModal && (
        <LoadingScreen isModal={true} onClose={() => setShowSkillsModal(false)} />
      )}

      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-background text-foreground antialiased selection:bg-zinc-900 selection:text-white">
        <Header onOpenSkills={() => setShowSkillsModal(true)} />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage onOpenSkills={() => setShowSkillsModal(true)} />} />
            <Route path="/timelines" element={<TimelinesPage />} />
            <Route path="/work/:id" element={<ProjectDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
