import React, { useState } from "react";
import { useDesignStyle } from "../../context/DesignStyleContext";
import { AiStrategyRecommendation } from "../../types";
import { 
  Bot, 
  Sparkles, 
  Send, 
  Loader2, 
  CheckCircle2, 
  TrendingUp, 
  Clock, 
  Cpu, 
  Palette, 
  FileText,
  AlertCircle
} from "lucide-react";

export const AIAdvisorView: React.FC = () => {
  const { activeStyle, setQuoteModalOpen } = useDesignStyle();

  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("Finans & Tjenester");
  const [currentChallenges, setCurrentChallenges] = useState("Moderne brukeropplevelse og raskere skymigrering");
  const [primaryGoal, setPrimaryGoal] = useState("Øke konvertering og automatisere manuelle prosesser");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AiStrategyRecommendation | null>(null);

  const handleRunAnalysis = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/ai-advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName: companyName || "Ditt Selskap",
          industry,
          currentChallenges,
          primaryGoal,
          selectedStyleName: activeStyle.name,
        }),
      });

      const data = await response.json();

      if (data.success && data.recommendation) {
        setResult(data.recommendation);
      } else {
        setError(data.error || "Det oppstod en feil under AI-analysen.");
      }
    } catch (err) {
      console.error("AI Advisor error:", err);
      setError("Klarte ikke å kontakte AI-serveren. Prøv igjen om et øyeblikk.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12 animate-fade-in" id="ai-advisor-view">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
          <Bot className="w-4 h-4" />
          <span>Server-Side Gemini AI Strategikonsulent</span>
        </div>
        <h1 className={`text-3xl sm:text-5xl font-extrabold tracking-tight ${activeStyle.textPrimary}`}>
          AI-Generert IT-Strategi & Designveikart
        </h1>
        <p className={`text-base ${activeStyle.textSecondary} leading-relaxed`}>
          Tast inn bedriftens forutsetninger for å generere en umiddelbar teknologisk analyse, milepælsplan og designbegrunnelse for valgt stil (<strong>{activeStyle.name}</strong>).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Form */}
        <div className={`lg:col-span-5 p-6 sm:p-8 ${activeStyle.cardRadius} ${activeStyle.surfaceClass} border ${activeStyle.surfaceBorder} ${activeStyle.shadowClass} space-y-6`}>
          <form onSubmit={handleRunAnalysis} className="space-y-4" id="ai-advisor-form">
            <h3 className={`text-xl font-bold ${activeStyle.textPrimary} flex items-center gap-2`}>
              <Sparkles className="w-5 h-5 text-indigo-500" />
              <span>Analyseparametere</span>
            </h3>

            <div>
              <label className={`block text-xs font-bold mb-1 ${activeStyle.textPrimary}`}>
                Bedriftsnavn
              </label>
              <input
                type="text"
                placeholder="f.eks. Nordic Health AS"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className={`w-full p-2.5 text-xs ${activeStyle.buttonRadius} border ${activeStyle.surfaceBorder} bg-black/5 dark:bg-white/5 ${activeStyle.textPrimary}`}
              />
            </div>

            <div>
              <label className={`block text-xs font-bold mb-1 ${activeStyle.textPrimary}`}>
                Bransje
              </label>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className={`w-full p-2.5 text-xs ${activeStyle.buttonRadius} border ${activeStyle.surfaceBorder} bg-black/5 dark:bg-white/5 ${activeStyle.textPrimary}`}
              >
                <option value="Finans & Tjenester">Finans & Tjenester</option>
                <option value="E-handel & Retail">E-handel & Retail</option>
                <option value="Helse & Biotek">Helse & Biotek</option>
                <option value="Energi & Industri">Energi & Industri</option>
                <option value="SaaS & Programvare">SaaS & Programvare</option>
              </select>
            </div>

            <div>
              <label className={`block text-xs font-bold mb-1 ${activeStyle.textPrimary}`}>
                Hovedutfordring
              </label>
              <textarea
                rows={2}
                value={currentChallenges}
                onChange={(e) => setCurrentChallenges(e.target.value)}
                className={`w-full p-2.5 text-xs ${activeStyle.buttonRadius} border ${activeStyle.surfaceBorder} bg-black/5 dark:bg-white/5 ${activeStyle.textPrimary}`}
              />
            </div>

            <div>
              <label className={`block text-xs font-bold mb-1 ${activeStyle.textPrimary}`}>
                Primærmål
              </label>
              <textarea
                rows={2}
                value={primaryGoal}
                onChange={(e) => setPrimaryGoal(e.target.value)}
                className={`w-full p-2.5 text-xs ${activeStyle.buttonRadius} border ${activeStyle.surfaceBorder} bg-black/5 dark:bg-white/5 ${activeStyle.textPrimary}`}
              />
            </div>

            <div className="pt-2">
              <span className="text-[11px] text-slate-500 block mb-2">
                Inkluderer aktiv stil: <strong>{activeStyle.name}</strong>
              </span>

              <button
                type="submit"
                disabled={loading}
                id="run-ai-analysis-btn"
                className={`w-full py-3.5 text-xs font-bold ${activeStyle.buttonRadius} ${activeStyle.accentBg} flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-98 disabled:opacity-50`}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Genererer AI-Analyse...</span>
                  </>
                ) : (
                  <>
                    <Bot className="w-4 h-4" />
                    <span>Generer Strateginotat</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Output Results Area */}
        <div className={`lg:col-span-7 p-6 sm:p-8 ${activeStyle.cardRadius} ${activeStyle.surfaceClass} border ${activeStyle.surfaceBorder} ${activeStyle.shadowClass} space-y-6 flex flex-col justify-between`}>
          
          {error && (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 text-xs flex items-center gap-2">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {!result && !loading && !error && (
            <div className="text-center py-16 space-y-4 my-auto">
              <div className="w-16 h-16 rounded-full bg-indigo-500/10 text-indigo-500 mx-auto flex items-center justify-center">
                <Bot className="w-8 h-8" />
              </div>
              <h3 className={`text-xl font-bold ${activeStyle.textPrimary}`}>
                Klar til å generere din strategirapport
              </h3>
              <p className={`text-xs ${activeStyle.textSecondary} max-w-sm mx-auto leading-relaxed`}>
                Fyll ut skjemaet til venstre og trykk 'Generer Strateginotat' for å motta en AI-analyse fra Gemini 3.6 Flash.
              </p>
            </div>
          )}

          {loading && (
            <div className="text-center py-20 space-y-4 my-auto">
              <Loader2 className="w-10 h-10 animate-spin text-indigo-500 mx-auto" />
              <p className={`text-sm font-bold ${activeStyle.textPrimary}`}>
                Analyserer bedriftsdata og bygger teknologiroute...
              </p>
              <p className={`text-xs ${activeStyle.textSecondary}`}>
                Benytter Gemini 3.6 Flash med skandinavisk IT-strategikontekst
              </p>
            </div>
          )}

          {result && !loading && (
            <div className="space-y-6 animate-fade-in" id="ai-results-container">
              
              <div className="border-b border-black/10 dark:border-white/10 pb-4 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase text-emerald-500 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Analyse Fullført
                  </span>
                  <h3 className={`text-2xl font-extrabold ${activeStyle.textPrimary} mt-1`}>
                    Strateginotat for {companyName || "Bedriften"}
                  </h3>
                </div>

                <span className="px-3 py-1 text-[11px] font-mono rounded bg-indigo-500/15 text-indigo-600 font-bold">
                  Gemini 3.6 Flash
                </span>
              </div>

              {/* Summary */}
              <div className="space-y-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Strategisk Oppsummering
                </h4>
                <p className={`text-xs ${activeStyle.textPrimary} leading-relaxed`}>
                  {result.summary}
                </p>
              </div>

              {/* Roadmap */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Gjennomføringsplan & Milepæler
                </h4>
                <div className="space-y-2">
                  {result.roadmap.map((step, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-black/5 dark:bg-white/5 text-xs flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className={`font-medium ${activeStyle.textPrimary}`}>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Design recommendation */}
              <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 space-y-1">
                <span className="text-xs font-bold uppercase text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                  <Palette className="w-3.5 h-3.5" /> Designstil-Begrunnelse ({activeStyle.name})
                </span>
                <p className={`text-xs ${activeStyle.textPrimary}`}>
                  {result.designStyleRecommendation}
                </p>
              </div>

              {/* Stats / Estimate row */}
              <div className="grid grid-cols-2 gap-3 text-xs pt-2">
                <div className="p-3 rounded-lg bg-black/5 dark:bg-white/5 space-y-1">
                  <span className="text-slate-400 text-[10px] block">Estimer Tidslinje</span>
                  <span className={`font-bold ${activeStyle.textPrimary} flex items-center gap-1`}>
                    <Clock className="w-3.5 h-3.5 text-indigo-500" /> {result.estimatedTimeline}
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-black/5 dark:bg-white/5 space-y-1">
                  <span className="text-slate-400 text-[10px] block">Forventet Effektivitet / ROI</span>
                  <span className={`font-bold text-emerald-500 flex items-center gap-1`}>
                    <TrendingUp className="w-3.5 h-3.5" /> {result.estimatedRoi}
                  </span>
                </div>
              </div>

              {/* Action button */}
              <div className="pt-4 border-t border-black/10 dark:border-white/10 flex justify-between items-center">
                <button
                  onClick={() => setResult(null)}
                  className="text-xs text-slate-400 hover:underline"
                >
                  Nullstill Analyse
                </button>

                <button
                  onClick={() => setQuoteModalOpen(true)}
                  className={`py-2.5 px-6 text-xs font-bold ${activeStyle.buttonRadius} ${activeStyle.accentBg}`}
                >
                  Gjennomfør Strategien Med Oss
                </button>
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
};
