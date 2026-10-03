import React, { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useDesignStyle } from "../context/DesignStyleContext";
import { SubPage } from "../types";
import { Menu, X, ArrowRight } from "lucide-react";

const NAV_ITEMS: { id: SubPage; label: string }[] = [
  { id: "home", label: "Hjem" },
  { id: "about", label: "Om oss" },
  { id: "design-showcase", label: "Design Showcase" },
  { id: "contact", label: "Kontakt" },
];

// Keeps the label readable on top of the sliding accent pill, whatever the active style is
const ACCENT_TEXT_ONLY = "bg-transparent! bg-none! shadow-none!";

export const Header: React.FC = () => {
  const { activeStyle, currentSubPage, setCurrentSubPage, setQuoteModalOpen } = useDesignStyle();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isSignature = activeStyle.id === "widevig-signature";
  const [scrolled, setScrolled] = useState(false);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  const handleNavClick = (page: SubPage) => {
    setCurrentSubPage(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 px-3 pt-3 sm:px-6 sm:pt-4">
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`mx-auto flex items-center justify-between gap-4 rounded-full border px-3 py-2 transition-all duration-500 sm:px-4 ${activeStyle.surfaceBorder} ${
          scrolled
            ? `max-w-5xl shadow-2xl shadow-black/20 backdrop-blur-xl ${
                isSignature ? "bg-[#0b0b12]/75 text-zinc-100" : activeStyle.surfaceClass
              }`
            : `max-w-7xl border-transparent bg-transparent`
        }`}
      >
        {/* Logo */}
        <button
          onClick={() => handleNavClick("home")}
          className="group flex items-center gap-2.5 pl-1"
          id="header-logo"
          aria-label="Widevig Digital – til forsiden"
        >
          <span
            className={`relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl ${
              isSignature
                ? "bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400 text-white"
                : activeStyle.accentBg
            } shadow-lg transition-transform duration-500 group-hover:rotate-[8deg] group-hover:scale-110`}
          >
            <svg className="relative z-10 h-4.5 w-4.5 fill-current" viewBox="0 0 24 24" aria-hidden>
              <path d="M2 4h3.5l3.5 11 3.5-11h3l3.5 11 3.5-11H22l-5 16h-3.5L10 9l-3.5 11H3L2 4z" />
            </svg>
          </span>
          <span className="flex items-baseline gap-1.5 whitespace-nowrap">
            <span className={`font-display text-lg font-bold tracking-tight ${activeStyle.textPrimary}`}>Widevig</span>
            <span className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${activeStyle.textSecondary}`}>
              Digital
            </span>
          </span>
        </button>

        {/* Desktop navigation with sliding active pill */}
        <nav className="hidden items-center gap-1 md:flex" id="desktop-nav">
          {NAV_ITEMS.map((item) => {
            const isActive = currentSubPage === item.id;
            return (
              <button
                key={item.id}
                id={`nav-item-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`relative whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive ? "" : `${activeStyle.textSecondary} opacity-80 hover:opacity-100`
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className={`absolute inset-0 rounded-full ${activeStyle.accentBg}`}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 ${isActive ? `${activeStyle.accentBg} ${ACCENT_TEXT_ONLY}` : ""}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Quote CTA */}
        <div className="hidden items-center sm:flex" id="header-actions">
          <motion.button
            id="header-request-quote-btn"
            onClick={() => setQuoteModalOpen(true)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className={`group inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-5 py-2.5 text-xs font-semibold ${activeStyle.accentBg}`}
          >
            Få et tilbud
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </motion.button>
        </div>

        {/* Mobile menu toggle */}
        <button
          id="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Lukk meny" : "Åpne meny"}
          aria-expanded={mobileMenuOpen}
          className={`flex h-10 w-10 items-center justify-center rounded-full border md:hidden ${activeStyle.surfaceBorder} ${activeStyle.textPrimary}`}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={mobileMenuOpen ? "close" : "open"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </motion.span>
          </AnimatePresence>
        </button>
      </motion.div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className={`mx-auto mt-2 max-w-5xl origin-top rounded-3xl border p-3 shadow-2xl backdrop-blur-xl md:hidden ${activeStyle.surfaceClass} ${activeStyle.surfaceBorder}`}
          >
            {NAV_ITEMS.map((item, i) => (
              <motion.button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 + i * 0.05 }}
                className={`flex w-full items-center justify-between rounded-2xl px-4 py-3.5 text-left font-display text-lg font-semibold ${
                  currentSubPage === item.id ? activeStyle.accentBg : `${activeStyle.textPrimary} hover:bg-black/5 dark:hover:bg-white/5`
                }`}
              >
                {item.label}
                <ArrowRight className="h-4 w-4 opacity-50" />
              </motion.button>
            ))}
            <button
              id="mobile-request-quote-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                setQuoteModalOpen(true);
              }}
              className={`mt-2 flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-semibold ${
                isSignature
                  ? "bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400 text-white"
                  : activeStyle.accentBg
              }`}
            >
              Få et uforpliktende tilbud
              <ArrowRight className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
