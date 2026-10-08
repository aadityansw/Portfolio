import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { ConstellationGallery } from "@/components/ui/constellation-gallery";
import { SKILL_CONSTELLATIONS } from "@/data/skills-constellation";

interface LoadingScreenProps {
  onFinish?: () => void;
  isModal?: boolean;
  onClose?: () => void;
}

export function LoadingScreen({ onFinish, isModal = false, onClose }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isDismissing, setIsDismissing] = useState(false);
  const [starSize, setStarSize] = useState(68);

  // Responsive star sizing for 23 skills across screen sizes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setStarSize(44);
      } else if (window.innerWidth < 1024) {
        setStarSize(56);
      } else {
        setStarSize(68);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isModal) return;

    // Smooth loading progress bar (reaches 100% in ~2.2s)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const increment = Math.max(2, Math.floor(Math.random() * 8) + 3);
        return Math.min(100, prev + increment);
      });
    }, 60);

    return () => clearInterval(interval);
  }, [isModal]);

  // When progress hits 100%, smoothly auto-transition into portfolio
  useEffect(() => {
    if (progress === 100 && !isModal && !isDismissing) {
      const timer = setTimeout(() => {
        handleDismiss();
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [progress, isModal, isDismissing]);

  // Allow instant skip with Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleDismiss();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleDismiss = () => {
    setIsDismissing(true);
    setTimeout(() => {
      if (onClose) onClose();
      if (onFinish) onFinish();
    }, 600);
  };

  return (
    <div
      className={`fixed inset-0 z-[9999] w-screen h-screen overflow-hidden bg-white text-zinc-900 transition-all duration-700 select-none ${
        isDismissing ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      {/* If opened on demand as modal, show subtle close button */}
      {isModal && (
        <button
          type="button"
          onClick={handleDismiss}
          className="fixed top-6 right-6 z-50 p-2.5 rounded-full bg-white/90 hover:bg-zinc-100 text-zinc-600 hover:text-zinc-900 border border-zinc-200 transition-colors cursor-pointer shadow-md backdrop-blur"
          aria-label="Close skills constellation"
        >
          <X className="size-5" />
        </button>
      )}

      {/* Full-Screen Interactive Constellation Gallery on pure white background */}
      <div className="w-full h-full">
        <ConstellationGallery
          items={SKILL_CONSTELLATIONS}
          starSize={starSize}
          drift={12}
          autoplay={true}
          autoplayInterval={3200}
          className="w-full h-full aspect-auto rounded-none border-none shadow-none bg-white"
        />
      </div>

      {/* Sleek, unobtrusive 3px progress bar at the very bottom edge */}
      {!isModal && (
        <div className="fixed bottom-0 left-0 right-0 h-[3px] bg-zinc-100 z-50 pointer-events-none">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transition-all duration-150 shadow-[0_0_8px_rgba(59,130,246,0.5)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}

export default LoadingScreen;

