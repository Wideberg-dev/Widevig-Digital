import React, { useState } from "react";
import { useDesignStyle } from "../context/DesignStyleContext";
import { StyleId } from "../types";
import { 
  Check, 
  Sparkles, 
  Layers, 
  Eye, 
  Code2, 
  SlidersHorizontal,
  CheckCircle2,
  AlertCircle,
  Copy,
  Zap
} from "lucide-react";

export const DesignStyleSwitcher: React.FC = () => {
  const { activeStyle, setStyleById, allStyles } = useDesignStyle();
  const [copiedToken, setCopiedToken] = useState(false);
  const [sampleInputValue, setSampleInputValue] = useState("Widevig Digital Prosjekt");
  const [sampleToggle, setSampleToggle] = useState(true);

  const handleCopyTokens = () => {
    const jsonString = JSON.stringify(activeStyle.tokens, null, 2);
    navigator.clipboard.writeText(jsonString);
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 2000);
  };

  return (
    <div className="space-y-12" id="design-style-switcher-container">
      
      {/* Header & Description */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 text-indigo-600 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interaktiv Design-Stilvelger</span>
        </div>
        <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${activeStyle.textPrimary}`}>
          Velg og Veksle Mellom Designstilene
        </h2>
        <p className={`text-base ${activeStyle.textSecondary} leading-relaxed`}>
          Trykk på navnet til en hvilken som helst designstil for å oppleve hvordan hele Widevig Digital-grensesnittet umiddelbart tilpasser fargepalett, typografi, skyggesystem og formsspråk.
        </p>
      </div>

      {/* Style Grid - Selectable by Name */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="style-grid">
        {allStyles.map((style) => {
          const isSelected = activeStyle.id === style.id;
          return (
            <div
              key={style.id}
              id={`style-card-${style.id}`}
              onClick={() => setStyleById(style.id as StyleId)}
              className={`group cursor-pointer p-6 ${style.cardRadius} border transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? `${style.surfaceClass} ring-2 ring-indigo-500 border-indigo-500 shadow-xl scale-[1.02]`
                  : `${style.surfaceClass} ${style.surfaceBorder} hover:border-indigo-400 hover:shadow-lg hover:-translate-y-1`
              }`}
            >
              {/* Image Banner */}
              <div className="relative h-32 rounded-lg overflow-hidden mb-4 bg-slate-200">
                <img 
                  src={style.previewImage} 
                  alt={style.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <span className="absolute top-2 right-2 px-2.5 py-1 text-[11px] font-bold rounded-full bg-black/60 text-white backdrop-blur-md">
                  {style.badgeText}
                </span>
                {isSelected && (
                  <span className="absolute bottom-2 left-2 px-2.5 py-1 text-xs font-bold rounded-full bg-emerald-500 text-white flex items-center gap-1 shadow-md">
                    <Check className="w-3.5 h-3.5" /> Aktiv Stil
                  </span>
                )}
              </div>

              {/* Title & Tagline */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between">
                  <h3 className={`text-xl font-bold ${style.textPrimary}`}>
                    {style.name}
                  </h3>
                </div>
                <p className={`text-xs font-semibold text-indigo-500`}>
                  {style.tagline}
                </p>
                <p className={`text-xs ${style.textSecondary} line-clamp-2`}>
                  {style.description}
                </p>
              </div>

              {/* Tokens Pill Badges */}
              <div className="space-y-2 pt-3 border-t border-black/10 dark:border-white/10 text-[11px]">
                <div className="flex justify-between text-slate-500">
                  <span>Font:</span>
                  <span className="font-mono font-medium text-slate-700 dark:text-slate-300">{style.tokens.fontHeading}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Radius:</span>
                  <span className="font-mono font-medium text-slate-700 dark:text-slate-300">{style.tokens.borderRadius}</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                id={`btn-select-style-${style.id}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setStyleById(style.id as StyleId);
                }}
                className={`mt-5 w-full py-2.5 px-4 text-xs font-bold ${style.buttonRadius} transition-all duration-200 flex items-center justify-center gap-2 ${
                  isSelected
                    ? "bg-indigo-600 text-white shadow-md"
                    : `${style.accentBg} opacity-90 hover:opacity-100`
                }`}
              >
                {isSelected ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Valgt Stil (Aktiv)</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4" />
                    <span>Aktiver "{style.name}"</span>
                  </>
                )}
              </button>

            </div>
          );
        })}
      </div>

      {/* Live Interactive Component Sandbox */}
      <div className={`p-8 ${activeStyle.cardRadius} ${activeStyle.surfaceClass} border ${activeStyle.surfaceBorder} ${activeStyle.shadowClass} space-y-8`} id="component-sandbox">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-black/10 dark:border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" />
              <h3 className={`text-2xl font-bold ${activeStyle.textPrimary}`}>
                Live Komponent-Sandsone: {activeStyle.name}
              </h3>
            </div>
            <p className={`text-xs ${activeStyle.textSecondary} mt-1`}>
              Inspeciser hvordan UI-elementer oppfører seg i din valgte designstil.
            </p>
          </div>

          <button
            id="copy-tokens-btn"
            onClick={handleCopyTokens}
            className={`px-3.5 py-2 text-xs font-bold ${activeStyle.buttonRadius} border ${activeStyle.surfaceBorder} flex items-center gap-2 hover:bg-black/5 dark:hover:bg-white/5 transition-colors`}
          >
            {copiedToken ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            <span>{copiedToken ? "Tokens Kopiert!" : "Kopier Design Tokens"}</span>
          </button>
        </div>

        {/* Component Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Box 1: Buttons & Badges */}
          <div className="space-y-4">
            <h4 className={`text-xs font-bold uppercase tracking-wider text-slate-500`}>
              Knapper & Etiketter
            </h4>
            <div className="space-y-3">
              <button className={`w-full py-3 px-4 text-sm font-bold ${activeStyle.buttonRadius} ${activeStyle.accentBg} transition-all shadow-sm`}>
                Primær Handlingsknapp
              </button>
              
              <button className={`w-full py-2.5 px-4 text-sm font-medium ${activeStyle.buttonRadius} border ${activeStyle.surfaceBorder} ${activeStyle.textPrimary} hover:bg-black/5 dark:hover:bg-white/5`}>
                Sekundær Omrissknapp
              </button>

              <div className="flex flex-wrap gap-2 pt-2">
                <span className={`px-3 py-1 text-xs font-semibold ${activeStyle.buttonRadius} bg-indigo-500/15 text-indigo-600 dark:text-indigo-300`}>
                  Aktiv
                </span>
                <span className={`px-3 py-1 text-xs font-semibold ${activeStyle.buttonRadius} bg-emerald-500/15 text-emerald-600 dark:text-emerald-300`}>
                  Suksess
                </span>
                <span className={`px-3 py-1 text-xs font-semibold ${activeStyle.buttonRadius} bg-amber-500/15 text-amber-600 dark:text-amber-300`}>
                  Venter
                </span>
              </div>
            </div>
          </div>

          {/* Box 2: Form Controls */}
          <div className="space-y-4">
            <h4 className={`text-xs font-bold uppercase tracking-wider text-slate-500`}>
              Skjemaelementer & Interaksjon
            </h4>
            <div className="space-y-3">
              <div>
                <label className={`block text-xs font-semibold mb-1 ${activeStyle.textPrimary}`}>
                  Eksempel Skjemafelt
                </label>
                <input
                  type="text"
                  value={sampleInputValue}
                  onChange={(e) => setSampleInputValue(e.target.value)}
                  className={`w-full px-3.5 py-2.5 text-sm ${activeStyle.buttonRadius} border ${activeStyle.surfaceBorder} bg-black/5 dark:bg-white/5 ${activeStyle.textPrimary} focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium`}
                />
              </div>
            </div>
          </div>

        </div>

        {/* Tokens Table Inspector */}
        <div className="pt-6 border-t border-black/10 dark:border-white/10">
          <h4 className={`text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5`}>
            <Code2 className="w-4 h-4 text-indigo-500" />
            <span>Aktive Design Tokens ({activeStyle.name})</span>
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
            <div className="p-3 rounded-lg bg-black/5 dark:bg-white/5">
              <span className="text-slate-400 block text-[10px]">Primærfarge</span>
              <span className={`font-semibold ${activeStyle.textPrimary}`}>{activeStyle.tokens.primaryColor}</span>
            </div>
            <div className="p-3 rounded-lg bg-black/5 dark:bg-white/5">
              <span className="text-slate-400 block text-[10px]">Bakgrunn</span>
              <span className={`font-semibold ${activeStyle.textPrimary}`}>{activeStyle.tokens.backgroundColor}</span>
            </div>
            <div className="p-3 rounded-lg bg-black/5 dark:bg-white/5">
              <span className="text-slate-400 block text-[10px]">Typografi</span>
              <span className={`font-semibold ${activeStyle.textPrimary}`}>{activeStyle.tokens.fontHeading}</span>
            </div>
            <div className="p-3 rounded-lg bg-black/5 dark:bg-white/5">
              <span className="text-slate-400 block text-[10px]">Skyggestil</span>
              <span className={`font-semibold ${activeStyle.textPrimary}`}>{activeStyle.tokens.shadowStyle}</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
