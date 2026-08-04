import React, { useState, useEffect } from "react";
import { useDesignStyle } from "../../context/DesignStyleContext";
import { DesignStyleSwitcher } from "../DesignStyleSwitcher";
import { Sparkles, Check, Layout, ArrowRightLeft, Eye } from "lucide-react";
import { StyleId } from "../../types";

export const DesignStudioView: React.FC = () => {
  const { activeStyle, setStyleById, allStyles } = useDesignStyle();

  // Local state for side-by-side comparison (both Stil A and Stil B can be changed)
  const [styleAId, setStyleAId] = useState<StyleId>(activeStyle.id || "nordic-minimalist");
  const [styleBId, setStyleBId] = useState<StyleId>(
    allStyles.find((s) => s.id !== activeStyle.id)?.id || "cyberpunk-tech"
  );

  // Revert active style back to Nordisk Minimalisme when leaving Design Showcase
  useEffect(() => {
    return () => {
      setStyleById("nordic-minimalist");
    };
  }, []); // Empty dependency array ensures cleanup only runs when unmounting DesignStudioView

  // Keep styleA in sync if activeStyle changes from upper switcher
  useEffect(() => {
    setStyleAId(activeStyle.id);
  }, [activeStyle.id]);

  const styleA = allStyles.find((s) => s.id === styleAId) || allStyles[0];
  const styleB = allStyles.find((s) => s.id === styleBId) || allStyles[1];

  return (
    <div className="space-y-16 animate-fade-in" id="design-studio-view">
      
      {/* Design Style Switcher Component */}
      <DesignStyleSwitcher />

      {/* Side-by-Side Comparison Section */}
      <section className={`p-8 sm:p-12 ${activeStyle.cardRadius} ${activeStyle.surfaceClass} border ${activeStyle.surfaceBorder} space-y-8`} id="style-comparison-section">
        
        {/* Header & Style Selectors for A and B */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-black/10 dark:border-white/10 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <Layout className="w-3.5 h-3.5" />
              <span>Side-om-Side Sammenligning</span>
            </div>
            <h3 className={`text-2xl font-extrabold ${activeStyle.textPrimary} mt-1`}>
              Sammenlign To Designstiler
            </h3>
            <p className={`text-xs ${activeStyle.textSecondary} max-w-lg mt-0.5`}>
              Velg to vilkårlige stiler (Stil A og Stil B) for å direkte sammenligne layout, typografi, farger og komponentspråk.
            </p>
          </div>

          {/* Dual Selectors for Stil A & Stil B - Kept on single line */}
          <div className="flex flex-nowrap items-center gap-2 sm:gap-3 bg-black/5 dark:bg-white/5 p-3 rounded-xl border border-black/10 dark:border-white/10 shrink-0 max-w-full overflow-x-auto">
            {/* Selector A */}
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 whitespace-nowrap">Stil A:</span>
              <select
                value={styleAId}
                onChange={(e) => {
                  const id = e.target.value as StyleId;
                  setStyleAId(id);
                  setStyleById(id);
                }}
                className="p-2 text-xs font-bold rounded-lg border border-indigo-500/40 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 whitespace-nowrap cursor-pointer"
              >
                {allStyles.map((st) => (
                  <option key={st.id} value={st.id} className="text-slate-900 bg-white dark:bg-slate-900 dark:text-slate-100 font-semibold">
                    {st.name}
                  </option>
                ))}
              </select>
            </div>

            <ArrowRightLeft className="w-4 h-4 text-slate-400 shrink-0" />

            {/* Selector B */}
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 whitespace-nowrap">Stil B:</span>
              <select
                value={styleBId}
                onChange={(e) => setStyleBId(e.target.value as StyleId)}
                className="p-2 text-xs font-bold rounded-lg border border-cyan-500/40 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 whitespace-nowrap cursor-pointer"
              >
                {allStyles.map((st) => (
                  <option key={st.id} value={st.id} className="text-slate-900 bg-white dark:bg-slate-900 dark:text-slate-100 font-semibold">
                    {st.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Side-by-Side Cards Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card A */}
          <div className={`p-6 sm:p-8 ${styleA.cardRadius} ${styleA.surfaceClass} border-2 border-indigo-500 space-y-5 relative shadow-xl`}>
            <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-500 text-white text-[11px] font-extrabold uppercase tracking-wider whitespace-nowrap shrink-0">
                  Stil A
                </span>
                <span className={`text-sm font-extrabold ${styleA.textPrimary}`}>
                  {styleA.name}
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/15 text-indigo-600 dark:text-indigo-300 font-bold">
                {styleA.tokens.fontHeading}
              </span>
            </div>

            <p className={`text-xs font-bold text-indigo-600 dark:text-indigo-400`}>
              {styleA.tagline}
            </p>

            <h4 className={`text-xl font-bold leading-snug ${styleA.textPrimary}`}>
              Ekspertise innen Digital Transformasjon
            </h4>

            <p className={`text-xs ${styleA.textSecondary} leading-relaxed`}>
              Widevig Digital leverer helhetlige IT-strategier og skreddersydd systemutvikling tilpasset kundenes behov.
            </p>

            {/* Input Element Sample */}
            <div className="space-y-1.5 pt-2">
              <label className={`block text-[11px] font-bold ${styleA.textPrimary}`}>
                Skjemafelt (Stil A)
              </label>
              <input
                type="text"
                readOnly
                value="Eksempel på tekstfelt"
                className={`w-full px-3 py-2 text-xs ${styleA.buttonRadius} border ${styleA.surfaceBorder} bg-black/5 dark:bg-white/5 ${styleA.textPrimary} font-medium`}
              />
            </div>

            {/* Buttons */}
            <div className="pt-2 space-y-2">
              <button className={`w-full py-2.5 px-4 text-xs font-bold ${styleA.buttonRadius} ${styleA.accentBg} transition-all`}>
                Utforsk Løsningen (Stil A)
              </button>
              
              {activeStyle.id !== styleA.id && (
                <button
                  onClick={() => setStyleById(styleA.id)}
                  className="w-full py-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center justify-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" /> Sett Stil A som Hovedstil
                </button>
              )}
            </div>
          </div>

          {/* Card B */}
          <div className={`p-6 sm:p-8 ${styleB.cardRadius} ${styleB.surfaceClass} border-2 border-cyan-500/70 space-y-5 relative shadow-xl`}>
            <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-600 text-white text-[11px] font-extrabold uppercase tracking-wider whitespace-nowrap shrink-0">
                  Stil B
                </span>
                <span className={`text-sm font-extrabold ${styleB.textPrimary}`}>
                  {styleB.name}
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-600 dark:text-cyan-300 font-bold">
                {styleB.tokens.fontHeading}
              </span>
            </div>

            <p className={`text-xs font-bold text-cyan-600 dark:text-cyan-400`}>
              {styleB.tagline}
            </p>

            <h4 className={`text-xl font-bold leading-snug ${styleB.textPrimary}`}>
              Ekspertise innen Digital Transformasjon
            </h4>

            <p className={`text-xs ${styleB.textSecondary} leading-relaxed`}>
              Widevig Digital leverer helhetlige IT-strategier og skreddersydd systemutvikling tilpasset kundenes behov.
            </p>

            {/* Input Element Sample */}
            <div className="space-y-1.5 pt-2">
              <label className={`block text-[11px] font-bold ${styleB.textPrimary}`}>
                Skjemafelt (Stil B)
              </label>
              <input
                type="text"
                readOnly
                value="Eksempel på tekstfelt"
                className={`w-full px-3 py-2 text-xs ${styleB.buttonRadius} border ${styleB.surfaceBorder} bg-black/5 dark:bg-white/5 ${styleB.textPrimary} font-medium`}
              />
            </div>

            {/* Buttons */}
            <div className="pt-2 space-y-2">
              <button className={`w-full py-2.5 px-4 text-xs font-bold ${styleB.buttonRadius} ${styleB.accentBg} transition-all`}>
                Utforsk Løsningen (Stil B)
              </button>

              {activeStyle.id !== styleB.id && (
                <button
                  onClick={() => setStyleById(styleB.id)}
                  className="w-full py-2 text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline flex items-center justify-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" /> Sett Stil B som Hovedstil
                </button>
              )}
            </div>
          </div>

        </div>

      </section>

    </div>
  );
};
