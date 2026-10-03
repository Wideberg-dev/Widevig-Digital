import React from "react";
import { AnimatePresence, motion, MotionConfig, useScroll, useSpring } from "motion/react";
import { DesignStyleProvider, useDesignStyle } from "./context/DesignStyleContext";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { QuoteModal } from "./components/QuoteModal";
import { HomeView } from "./components/views/HomeView";
import { DesignStudioView } from "./components/views/DesignStudioView";
import { AboutView } from "./components/views/AboutView";
import { ContactView } from "./components/views/ContactView";

const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-violet-500 via-fuchsia-400 to-cyan-300"
    />
  );
};

const MainContent: React.FC = () => {
  const { activeStyle, currentSubPage } = useDesignStyle();
  const isSignature = activeStyle.id === "widevig-signature";
  const isHome = currentSubPage === "home";

  const renderSubPage = () => {
    switch (currentSubPage) {
      case "home":
        return <HomeView />;
      case "about":
        return <AboutView />;
      case "contact":
        return <ContactView />;
      case "design-showcase":
        return <DesignStudioView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div
      className={`relative isolate min-h-screen overflow-x-clip transition-colors duration-500 ${activeStyle.isDark ? "dark" : ""} ${activeStyle.bgClass} ${activeStyle.fontFamily}`}
    >
      <ScrollProgress />

      {/* Ambient brand glow behind sub-pages (the home hero has its own) */}
      {isSignature && !isHome && (
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[700px] overflow-hidden" aria-hidden>
          <div className="absolute left-1/2 top-[-300px] h-[700px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(124,58,237,0.28),transparent)] blur-2xl" />
          <div className="absolute inset-0 bg-grid" />
        </div>
      )}
      {isSignature && <div className="pointer-events-none fixed inset-0 z-[70] bg-grain opacity-[0.035] mix-blend-overlay" aria-hidden />}

      <Header />

      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={currentSubPage}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={isHome ? "" : "mx-auto max-w-7xl px-4 pb-16 pt-12 sm:px-6 lg:px-8"}
        >
          {renderSubPage()}
        </motion.main>
      </AnimatePresence>

      <Footer />
      <QuoteModal />
    </div>
  );
};

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <DesignStyleProvider>
        <MainContent />
      </DesignStyleProvider>
    </MotionConfig>
  );
}
