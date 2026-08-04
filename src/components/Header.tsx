import React, { useState } from "react";
import { useDesignStyle } from "../context/DesignStyleContext";
import { SubPage } from "../types";
import { 
  Sparkles, 
  Menu, 
  X, 
  Compass, 
  Users, 
  Send,
  Palette,
  Mail
} from "lucide-react";

export const Header: React.FC = () => {
  const { 
    activeStyle, 
    currentSubPage, 
    setCurrentSubPage, 
    setQuoteModalOpen
  } = useDesignStyle();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: SubPage; label: string; icon: React.ReactNode }[] = [
    { id: "home", label: "Hovedside", icon: <Compass className="w-4 h-4" /> },
    { id: "about", label: "Om Oss", icon: <Users className="w-4 h-4" /> },
    { id: "contact", label: "Kontakt", icon: <Mail className="w-4 h-4" /> },
    { id: "design-showcase", label: "Design Showcase", icon: <Palette className="w-4 h-4" /> },
  ];

  const handleNavClick = (page: SubPage) => {
    setCurrentSubPage(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 border-b ${activeStyle.surfaceClass} ${activeStyle.surfaceBorder}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <div 
          onClick={() => handleNavClick("home")}
          className="flex items-center gap-3 cursor-pointer group"
          id="header-logo"
        >
          <div className={`w-10 h-10 ${activeStyle.buttonRadius} ${activeStyle.accentBg} transition-transform duration-300 group-hover:scale-105 flex items-center justify-center shadow-md font-extrabold text-lg tracking-wider`}>
            {/* Custom Styled 'W' Logo Mark */}
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M2 4h3.5l3.5 11 3.5-11h3l3.5 11 3.5-11H22l-5 16h-3.5L10 9l-3.5 11H3L2 4z" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <span className={`text-xl font-extrabold tracking-tight ${activeStyle.textPrimary} block leading-none`}>
                Widevig
              </span>
              <span className="text-xs font-bold uppercase tracking-widest px-1.5 py-0.5 rounded bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 whitespace-nowrap">
                Digital
              </span>
            </div>
            <span className={`text-[11px] ${activeStyle.textSecondary} flex items-center gap-1 mt-0.5 font-medium whitespace-nowrap`}>
              En del av Widevig AS
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2" id="desktop-nav">
          {navItems.map((item) => {
            const isActive = currentSubPage === item.id;
            return (
              <button
                key={item.id}
                id={`nav-item-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-2 text-sm font-semibold ${activeStyle.buttonRadius} transition-all duration-200 flex items-center gap-2 border whitespace-nowrap ${
                  isActive 
                    ? `${activeStyle.accentBg} shadow-md border-indigo-400/50` 
                    : `${activeStyle.textSecondary} hover:${activeStyle.textPrimary} hover:bg-indigo-500/15 hover:border-indigo-500/40 hover:shadow-sm hover:scale-[1.02] active:scale-95 border-transparent`
                }`}
              >
                {item.icon}
                <span className="whitespace-nowrap">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Section: Quote CTA */}
        <div className="hidden sm:flex items-center gap-3" id="header-actions">
          <button
            id="header-request-quote-btn"
            onClick={() => setQuoteModalOpen(true)}
            className={`px-5 py-2.5 text-xs font-bold ${activeStyle.buttonRadius} ${activeStyle.accentBg} flex items-center gap-1.5 transition-all duration-200 hover:brightness-110 hover:shadow-lg hover:scale-[1.03] active:scale-95 border border-indigo-400/40 whitespace-nowrap`}
          >
            <Send className="w-3.5 h-3.5 shrink-0" />
            <span className="whitespace-nowrap">Få et Tilbud</span>
          </button>
        </div>

        {/* Mobile menu toggle button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2.5 ${activeStyle.buttonRadius} border ${activeStyle.surfaceBorder} ${activeStyle.textPrimary} hover:bg-indigo-500/15 hover:border-indigo-500/40 transition-all`}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className={`md:hidden border-t ${activeStyle.surfaceBorder} ${activeStyle.surfaceClass} px-4 pt-3 pb-6 space-y-3`}>
          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-3 ${activeStyle.buttonRadius} text-sm font-medium flex items-center gap-3 ${
                  currentSubPage === item.id 
                    ? `${activeStyle.accentBg} font-bold` 
                    : `${activeStyle.textPrimary} hover:bg-black/5 dark:hover:bg-white/5`
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-black/10 dark:border-white/10">
            <button
              id="mobile-request-quote-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                setQuoteModalOpen(true);
              }}
              className={`w-full py-3 text-sm font-bold ${activeStyle.buttonRadius} ${activeStyle.accentBg} flex items-center justify-center gap-2`}
            >
              <Send className="w-4 h-4" />
              <span>Få et uforpliktende tilbud</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
