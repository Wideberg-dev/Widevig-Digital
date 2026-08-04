import React, { useState } from "react";
import { useDesignStyle } from "../../context/DesignStyleContext";
import { SERVICES } from "../../data/mockData";
import { Service } from "../../types";
import { 
  Layers, 
  Compass, 
  Palette, 
  Cpu, 
  Zap, 
  Globe,
  Network,
  ShieldCheck,
  Cloud,
  Briefcase,
  CheckCircle2, 
  Send
} from "lucide-react";

export const ServicesView: React.FC = () => {
  const { activeStyle, setQuoteModalOpen } = useDesignStyle();
  const [selectedCategory, setSelectedCategory] = useState<string>("Alle");
  const [activeModalService, setActiveModalService] = useState<Service | null>(null);

  const categories = ["Alle", ...Array.from(new Set(SERVICES.map((s) => s.category)))];

  const filteredServices = selectedCategory === "Alle" 
    ? SERVICES 
    : SERVICES.filter((s) => s.category === selectedCategory);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Globe": return <Globe className="w-6 h-6 text-indigo-500" />;
      case "Network": return <Network className="w-6 h-6 text-indigo-500" />;
      case "Cpu": return <Cpu className="w-6 h-6 text-indigo-500" />;
      case "ShieldCheck": return <ShieldCheck className="w-6 h-6 text-indigo-500" />;
      case "Cloud": return <Cloud className="w-6 h-6 text-indigo-500" />;
      case "Briefcase": return <Briefcase className="w-6 h-6 text-indigo-500" />;
      case "Compass": return <Compass className="w-6 h-6 text-indigo-500" />;
      case "Palette": return <Palette className="w-6 h-6 text-indigo-500" />;
      case "Zap": return <Zap className="w-6 h-6 text-indigo-500" />;
      default: return <Layers className="w-6 h-6 text-indigo-500" />;
    }
  };

  return (
    <div className="space-y-12 animate-fade-in" id="services-view">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3.5 py-1.5 rounded-full bg-indigo-500/10 text-indigo-600 text-xs font-bold uppercase tracking-wider">
          Ekspertise & Tjenester
        </span>
        <h1 className={`text-3xl sm:text-5xl font-extrabold tracking-tight ${activeStyle.textPrimary}`}>
          Skreddersydd Rådgivning og Leveranse
        </h1>
        <p className={`text-base ${activeStyle.textSecondary} leading-relaxed`}>
          Fra helhetlig IT-arkitektur og strategi til skalerbare designsystemer og fremtidsrettet IKT-infrastruktur. Vi sikrer at din bedrift er rigget for fremtiden.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2" id="services-category-filter">
        {categories.map((cat) => (
          <button
            key={cat}
            id={`filter-btn-${cat.replace(/\s+/g, "-").toLowerCase()}`}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 text-xs font-bold ${activeStyle.buttonRadius} border transition-all ${
              selectedCategory === cat
                ? "border-indigo-500 bg-indigo-600 text-white shadow-md"
                : `${activeStyle.surfaceBorder} ${activeStyle.textSecondary} hover:${activeStyle.textPrimary}`
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="services-grid">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            id={`service-card-${service.id}`}
            className={`p-8 ${activeStyle.cardRadius} ${activeStyle.surfaceClass} border ${activeStyle.surfaceBorder} ${activeStyle.shadowClass} space-y-6 flex flex-col justify-between hover:shadow-xl transition-all`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className={`p-3 ${activeStyle.buttonRadius} bg-indigo-500/10`}>
                  {getIcon(service.iconName)}
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 text-slate-600 dark:text-slate-300">
                  {service.category}
                </span>
              </div>

              <h2 className={`text-2xl font-bold ${activeStyle.textPrimary}`}>
                {service.title}
              </h2>

              <p className={`text-sm ${activeStyle.textSecondary} leading-relaxed`}>
                {service.longDesc}
              </p>

              {/* Features List */}
              <div className="space-y-2 pt-2">
                <h4 className={`text-xs font-bold uppercase tracking-wider text-slate-400`}>
                  Hva vi leverer:
                </h4>
                <ul className="space-y-1.5 text-xs">
                  {service.features.map((feat, idx) => (
                    <li key={idx} className={`flex items-start gap-2 ${activeStyle.textSecondary}`}>
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Meta & CTA */}
            <div className="pt-6 border-t border-black/10 dark:border-white/10 space-y-4">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-black/5 dark:bg-white/5">
                  <span className="text-slate-400 block text-[10px]">Est. Pris</span>
                  <span className={`font-bold ${activeStyle.textPrimary}`}>{service.priceRange}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-black/5 dark:bg-white/5">
                  <span className="text-slate-400 block text-[10px]">Gjennomsnittstid</span>
                  <span className={`font-bold ${activeStyle.textPrimary}`}>{service.typicalDuration}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  id={`btn-open-modal-${service.id}`}
                  onClick={() => setActiveModalService(service)}
                  className={`flex-1 py-3 text-xs font-bold ${activeStyle.buttonRadius} border ${activeStyle.surfaceBorder} ${activeStyle.textPrimary} hover:bg-black/5 dark:hover:bg-white/5 transition-colors`}
                >
                  Se Leveranseplan
                </button>

                <button
                  id={`btn-quote-service-${service.id}`}
                  onClick={() => setQuoteModalOpen(true)}
                  className={`py-3 px-4 text-xs font-bold ${activeStyle.buttonRadius} ${activeStyle.accentBg} flex items-center gap-1 shrink-0`}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Be om Tilbud</span>
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Modal for Service Details */}
      {activeModalService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className={`w-full max-w-xl p-8 ${activeStyle.cardRadius} ${activeStyle.surfaceClass} border ${activeStyle.surfaceBorder} shadow-2xl space-y-6 relative`}>
            
            <button
              onClick={() => setActiveModalService(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase text-indigo-500">
                {activeModalService.category}
              </span>
              <h3 className={`text-2xl font-bold ${activeStyle.textPrimary}`}>
                {activeModalService.title}
              </h3>
            </div>

            <p className={`text-xs ${activeStyle.textSecondary} leading-relaxed`}>
              {activeModalService.longDesc}
            </p>

            <div className="space-y-2">
              <h4 className={`text-xs font-bold uppercase text-slate-400`}>
                Konkrete Leveranser (Deliverables):
              </h4>
              <ul className="space-y-2 text-xs">
                {activeModalService.deliverables.map((del, i) => (
                  <li key={i} className="flex items-center gap-2 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" />
                    <span>{del}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-black/10 dark:border-white/10 flex justify-between items-center">
              <div>
                <span className="text-[11px] text-slate-400 block">Indikativ Prisramme</span>
                <span className={`text-sm font-bold ${activeStyle.textPrimary}`}>{activeModalService.priceRange}</span>
              </div>

              <button
                onClick={() => {
                  setActiveModalService(null);
                  setQuoteModalOpen(true);
                }}
                className={`py-2.5 px-6 text-xs font-bold ${activeStyle.buttonRadius} ${activeStyle.accentBg}`}
              >
                Bestill Tjeneste
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
