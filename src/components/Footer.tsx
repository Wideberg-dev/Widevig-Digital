import React from "react";
import { useDesignStyle } from "../context/DesignStyleContext";
import { Sparkles, ArrowRight, Shield, Award, HeartHandshake } from "lucide-react";
import { SubPage } from "../types";

export const Footer: React.FC = () => {
  const { activeStyle, setCurrentSubPage } = useDesignStyle();

  const navLinks: { id: SubPage; label: string }[] = [
    { id: "home", label: "Hovedside" },
    { id: "about", label: "Om Oss" },
    { id: "contact", label: "Kontakt" },
    { id: "design-showcase", label: "Design Showcase" },
  ];

  return (
    <footer className={`border-t ${activeStyle.surfaceBorder} ${activeStyle.surfaceClass} transition-colors duration-300 mt-20`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 ${activeStyle.buttonRadius} ${activeStyle.accentBg} flex items-center justify-center font-extrabold text-base shadow-sm`}>
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M2 4h3.5l3.5 11 3.5-11h3l3.5 11 3.5-11H22l-5 16h-3.5L10 9l-3.5 11H3L2 4z" />
                </svg>
              </div>
              <div className="flex items-baseline gap-2">
                <span className={`text-2xl font-extrabold tracking-tight ${activeStyle.textPrimary}`}>
                  Widevig
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                  Digital
                </span>
              </div>
            </div>
            <p className={`text-sm ${activeStyle.textSecondary} max-w-sm leading-relaxed`}>
              Widevig Digital er et spesiallisert konsulent- og utviklingsmiljø under holdingselskapet <strong>Widevig AS</strong>. Vi leverer IT-strategi, skreddersydd design og moderne digitale løsninger.
            </p>
          </div>

          {/* Nav Links */}
          <div className="space-y-3">
            <h4 className={`text-sm font-bold tracking-wider uppercase ${activeStyle.textPrimary}`}>
              Hovedmeny
            </h4>
            <ul className="space-y-2 text-sm">
              {navLinks.map((item) => (
                <li key={item.id}>
                  <button
                    id={`footer-link-${item.id}`}
                    onClick={() => setCurrentSubPage(item.id)}
                    className={`${activeStyle.textSecondary} hover:${activeStyle.textPrimary} transition-colors flex items-center gap-1 group`}
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Office & Contact */}
          <div className="space-y-3">
            <h4 className={`text-sm font-bold tracking-wider uppercase ${activeStyle.textPrimary}`}>
              Digitalt Byrå
            </h4>
            <div className={`text-xs ${activeStyle.textSecondary} space-y-2 leading-relaxed`}>
              <p>🌐 100% Digitalt • Hele Norge</p>
              <p>📧 <a href="mailto:axel@widevig.no" className="hover:underline">axel@widevig.no</a> / <a href="mailto:maren@widevig.no" className="hover:underline">maren@widevig.no</a></p>
              <p className="pt-2 font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Åpen for nye oppdrag Q3/Q4
              </p>
            </div>
          </div>

        </div>

        {/* Guarantees Badges */}
        <div className={`mt-12 pt-8 border-t ${activeStyle.surfaceBorder} grid grid-cols-1 md:grid-cols-3 gap-6`}>
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-indigo-500 shrink-0" />
            <span className={`text-xs ${activeStyle.textSecondary}`}>
              Garantert 100% WCAG 2.1 Tilgjengelighet og GDPR compliance
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Award className="w-5 h-5 text-amber-500 shrink-0" />
            <span className={`text-xs ${activeStyle.textSecondary}`}>
              Prisvinnende skandinavisk UX og IKT-arkitektur
            </span>
          </div>
          <div className="flex items-center gap-3">
            <HeartHandshake className="w-5 h-5 text-emerald-500 shrink-0" />
            <span className={`text-xs ${activeStyle.textSecondary}`}>
              Dedikerte seniorkonsulenter gjennom hele prosjektforløpet
            </span>
          </div>
        </div>

        {/* Copyright */}
        <div className={`mt-8 pt-6 border-t ${activeStyle.surfaceBorder} text-center text-xs ${activeStyle.textSecondary} flex flex-col sm:flex-row items-center justify-between gap-4`}>
          <p>© {new Date().getFullYear()} Widevig AS. Alle rettigheter reservert.</p>
          <div className="flex items-center gap-4">
            <button onClick={() => setCurrentSubPage("design-showcase")} className="hover:underline">
              Utforsk Design Showcase
            </button>
            <span>•</span>
            <button onClick={() => setCurrentSubPage("contact")} className="hover:underline">
              Kontakt Oss
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
