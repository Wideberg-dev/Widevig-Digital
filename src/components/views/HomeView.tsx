import React from "react";
import { useDesignStyle } from "../../context/DesignStyleContext";
import { 
  Sparkles, 
  ArrowRight, 
  Palette, 
  CheckCircle2, 
  Clock,
  Send,
  Award,
  Users,
  ShieldCheck,
  FolderPlus
} from "lucide-react";
import { SERVICES } from "../../data/mockData";

export const HomeView: React.FC = () => {
  const { 
    activeStyle, 
    setCurrentSubPage, 
    setQuoteModalOpen 
  } = useDesignStyle();

  return (
    <div className="space-y-20 animate-fade-in" id="home-view">
      
      {/* Hero Section */}
      <section className={`relative overflow-hidden py-20 px-6 sm:px-12 ${activeStyle.cardRadius} ${activeStyle.surfaceClass} border ${activeStyle.surfaceBorder} ${activeStyle.shadowClass}`}>
        <div className="max-w-4xl mx-auto text-center space-y-6">
          
          {/* Positioning Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Widevig Digital • En del av Widevig AS</span>
          </div>

          <h1 className={`text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight ${activeStyle.textPrimary}`}>
            Vi hjelper deg med alt innen teknologi
          </h1>

          <p className={`text-lg sm:text-xl ${activeStyle.textSecondary} max-w-2xl mx-auto leading-relaxed`}>
            Vi hjelper fremtidsrettede bedrifter med å bygge skalerbare skysystemer, moderne brukergrensesnitt og verdiskapende IKT-løsninger.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              id="hero-request-quote-btn"
              onClick={() => setQuoteModalOpen(true)}
              className={`px-8 py-4 text-sm font-bold ${activeStyle.buttonRadius} ${activeStyle.accentBg} flex items-center gap-2 shadow-lg transition-transform hover:scale-105 active:scale-95`}
            >
              <span>Få et Uforpliktende Tilbud</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="hero-about-btn"
              onClick={() => setCurrentSubPage("about")}
              className={`px-6 py-4 text-sm font-semibold ${activeStyle.buttonRadius} border ${activeStyle.surfaceBorder} ${activeStyle.textPrimary} flex items-center gap-2 hover:bg-black/5 dark:hover:bg-white/5 transition-colors`}
            >
              <Users className="w-4 h-4 text-indigo-500" />
              <span>Om Oss & Team</span>
            </button>

            <button
              id="hero-showcase-btn"
              onClick={() => setCurrentSubPage("design-showcase")}
              className={`px-6 py-4 text-sm font-semibold ${activeStyle.buttonRadius} bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border border-indigo-500/20 flex items-center gap-2 hover:bg-indigo-500/20 transition-colors`}
            >
              <Palette className="w-4 h-4" />
              <span>Utforsk Design Showcase</span>
            </button>
          </div>

        </div>
      </section>

      {/* Service Guarantees & Standard Template Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="guarantees-template-section">
        <div className={`p-6 ${activeStyle.cardRadius} ${activeStyle.surfaceClass} border ${activeStyle.surfaceBorder} space-y-2 hover:shadow-md transition-shadow`}>
          <div className="flex items-center gap-2 text-indigo-500">
            <Clock className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
              Svartid & Agilitet
            </span>
          </div>
          <span className={`text-2xl font-extrabold tracking-tight ${activeStyle.textPrimary} block`}>
            24-Timers Svar
          </span>
          <p className={`text-xs ${activeStyle.textSecondary}`}>
            Garantert rask oppfølging på alle henvendelser og prosjektforespørsler.
          </p>
        </div>

        <div className={`p-6 ${activeStyle.cardRadius} ${activeStyle.surfaceClass} border ${activeStyle.surfaceBorder} space-y-2 hover:shadow-md transition-shadow`}>
          <div className="flex items-center gap-2 text-indigo-500">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
              Kode & UX-Kvalitet
            </span>
          </div>
          <span className={`text-2xl font-extrabold tracking-tight ${activeStyle.textPrimary} block`}>
            100% Skreddersøm
          </span>
          <p className={`text-xs ${activeStyle.textSecondary}`}>
            Ren TypeScript, tilgjengelig UX og moderne arkitektur uten ferdigmalinger.
          </p>
        </div>

        <div className={`p-6 ${activeStyle.cardRadius} ${activeStyle.surfaceClass} border ${activeStyle.surfaceBorder} space-y-2 hover:shadow-md transition-shadow`}>
          <div className="flex items-center gap-2 text-indigo-500">
            <Award className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
              Forutsigbarhet
            </span>
          </div>
          <span className={`text-2xl font-extrabold tracking-tight ${activeStyle.textPrimary} block`}>
            Fastpris / Sprints
          </span>
          <p className={`text-xs ${activeStyle.textSecondary}`}>
            Tydelige budsjetter og leveranseplaner uten skjulte gebyrer.
          </p>
        </div>

        <div className={`p-6 ${activeStyle.cardRadius} ${activeStyle.surfaceClass} border-2 border-dashed border-indigo-500/40 bg-indigo-500/5 space-y-2 hover:shadow-md transition-shadow`}>
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
            <Sparkles className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block">
              Ny Bestilling
            </span>
          </div>
          <span className={`text-2xl font-extrabold tracking-tight ${activeStyle.textPrimary} block`}>
            Prosjektplass Ledig
          </span>
          <p className={`text-xs ${activeStyle.textSecondary}`}>
            Klar for oppstart! Bli vår neste fornøyde oppdragsgiver.
          </p>
        </div>
      </section>

      {/* Design Style Showcase Teaser Banner */}
      <section className={`p-8 sm:p-10 ${activeStyle.cardRadius} ${activeStyle.surfaceClass} border ${activeStyle.surfaceBorder} space-y-6 relative overflow-hidden`} id="design-style-teaser-banner">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 text-violet-600 text-xs font-bold uppercase">
              <Palette className="w-3.5 h-3.5" />
              <span>Eksklusiv Design Showcase</span>
            </div>
            <h2 className={`text-2xl sm:text-3xl font-bold ${activeStyle.textPrimary}`}>
              Opplev Våre 10 Unike Designstiler
            </h2>
            <p className={`text-sm ${activeStyle.textSecondary}`}>
              Gå til vår dedikerte Design Showcase-side for å veksle mellom og utforske alle våre 10 skreddersydde designstiler — fra Nordisk Minimalisme og Futuristisk Tech til Dyp Smaragd, Sveitsisk Brutalisme og Midnattsblå Monokrom.
            </p>
          </div>

          <button
            onClick={() => setCurrentSubPage("design-showcase")}
            className={`px-6 py-3.5 text-xs font-bold ${activeStyle.buttonRadius} ${activeStyle.accentBg} shrink-0 flex items-center gap-2 shadow-md`}
          >
            <span>Åpne Design Showcase</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Featured Services Preview */}
      <section className="space-y-8" id="featured-services">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-500">
              Kjernekompetanse
            </span>
            <h2 className={`text-3xl font-extrabold ${activeStyle.textPrimary} mt-1`}>
              Våre Rådgivningstjenester
            </h2>
          </div>
          <button
            onClick={() => setQuoteModalOpen(true)}
            className={`text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 hover:underline`}
          >
            <span>Få et tilbud på dine behov</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className={`p-6 ${activeStyle.cardRadius} ${activeStyle.surfaceClass} border ${activeStyle.surfaceBorder} space-y-4 hover:shadow-lg transition-all`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 text-slate-600 dark:text-slate-300">
                  {service.category}
                </span>
                <span className="text-xs font-bold text-indigo-500">
                  {service.priceRange}
                </span>
              </div>

              <h3 className={`text-xl font-bold ${activeStyle.textPrimary}`}>
                {service.title}
              </h3>

              <p className={`text-xs ${activeStyle.textSecondary} leading-relaxed`}>
                {service.shortDesc}
              </p>

              <div className="pt-2 flex items-center justify-between border-t border-black/10 dark:border-white/10">
                <span className={`text-[11px] ${activeStyle.textSecondary}`}>
                  Varighet: {service.typicalDuration}
                </span>
                <button
                  onClick={() => setQuoteModalOpen(true)}
                  className={`text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 hover:underline`}
                >
                  Bestill konsultasjon <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Portfolio Template Section */}
      <section className="space-y-8" id="portfolio-template-section">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-500">
              Porteføljemal
            </span>
            <h2 className={`text-3xl font-extrabold ${activeStyle.textPrimary} mt-1`}>
              Klar For Våre Første Prosjektleveranser
            </h2>
            <p className={`text-xs ${activeStyle.textSecondary} mt-1 max-w-xl`}>
              Vi står klare til å ta imot nye oppdrag. Malen nedenfor viser hvordan dine fremtidige prosjektresultater og casestudier vil presenteres på vår plattform.
            </p>
          </div>
          <button
            onClick={() => setQuoteModalOpen(true)}
            className={`px-5 py-2.5 text-xs font-bold ${activeStyle.buttonRadius} ${activeStyle.accentBg} flex items-center gap-2 shadow-sm shrink-0`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>Bli Vår Neste Kunde</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Template Card 1 */}
          <div className={`p-6 ${activeStyle.cardRadius} ${activeStyle.surfaceClass} border-2 border-dashed border-indigo-500/30 ${activeStyle.shadowClass} space-y-5 flex flex-col justify-between relative overflow-hidden bg-gradient-to-br from-indigo-500/5 to-transparent`}>
            <div className="space-y-4">
              <div className="h-48 rounded-xl bg-slate-900/90 border border-indigo-500/20 p-6 flex flex-col justify-between relative overflow-hidden text-white">
                <div className="flex justify-between items-center">
                  <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-indigo-600 text-white shadow-md">
                    Prosjektplass #1 (Klar for bestilling)
                  </span>
                  <FolderPlus className="w-5 h-5 text-indigo-400" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-indigo-300 font-mono">DIN LOGO & VAREMERKE HER</span>
                  <h4 className="text-xl font-extrabold text-white">
                    Skreddersydd IT-Plattform & UX-Redesign
                  </h4>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Kunde: <strong className="text-slate-700 dark:text-slate-300">Din Bedrift AS</strong></span>
                  <span className="text-indigo-500 font-bold">Ledig Oppdrag</span>
                </div>
                <h3 className={`text-xl font-bold ${activeStyle.textPrimary}`}>
                  Casestudie Mal #1
                </h3>
                <p className={`text-xs ${activeStyle.textSecondary} leading-relaxed`}>
                  Når ditt prosjekt er fullført, vil vi dokumentere målbare resultater som økt konvertering, redusert responstid og moderne skymigrering her.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
              <div className="flex gap-1.5">
                <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-black/5 dark:bg-white/5 text-slate-600 dark:text-slate-300">
                  React / TypeScript
                </span>
                <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-black/5 dark:bg-white/5 text-slate-600 dark:text-slate-300">
                  Cloud / AI
                </span>
              </div>
              <button
                onClick={() => setQuoteModalOpen(true)}
                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 hover:underline"
              >
                <span>Reserver denne plassen</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Template Card 2 */}
          <div className={`p-6 ${activeStyle.cardRadius} ${activeStyle.surfaceClass} border-2 border-dashed border-indigo-500/30 ${activeStyle.shadowClass} space-y-5 flex flex-col justify-between relative overflow-hidden bg-gradient-to-br from-indigo-500/5 to-transparent`}>
            <div className="space-y-4">
              <div className="h-48 rounded-xl bg-slate-900/90 border border-indigo-500/20 p-6 flex flex-col justify-between relative overflow-hidden text-white">
                <div className="flex justify-between items-center">
                  <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-violet-600 text-white shadow-md">
                    Prosjektplass #2 (Klar for bestilling)
                  </span>
                  <FolderPlus className="w-5 h-5 text-violet-400" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-violet-300 font-mono">DINE MÅL & RESULTATER</span>
                  <h4 className="text-xl font-extrabold text-white">
                    Skymigrering & IKT-Modernisering
                  </h4>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Kunde: <strong className="text-slate-700 dark:text-slate-300">Ditt Selskap</strong></span>
                  <span className="text-indigo-500 font-bold">Ledig Oppdrag</span>
                </div>
                <h3 className={`text-xl font-bold ${activeStyle.textPrimary}`}>
                  Casestudie Mal #2
                </h3>
                <p className={`text-xs ${activeStyle.textSecondary} leading-relaxed`}>
                  Her vil vi vise hvordan vi hjalp din virksomhet med å automatisere prosesser og oppnå sømløs integrasjon av ny teknologi.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
              <div className="flex gap-1.5">
                <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-black/5 dark:bg-white/5 text-slate-600 dark:text-slate-300">
                  Designsystem
                </span>
                <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-black/5 dark:bg-white/5 text-slate-600 dark:text-slate-300">
                  API Strategy
                </span>
              </div>
              <button
                onClick={() => setQuoteModalOpen(true)}
                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 hover:underline"
              >
                <span>Reserver denne plassen</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Teaser Section */}
      <section className={`p-8 sm:p-12 ${activeStyle.cardRadius} bg-gradient-to-r from-indigo-900 via-slate-900 to-blue-900 text-white space-y-6 shadow-2xl relative overflow-hidden`} id="contact-teaser">
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-indigo-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
            <ShieldCheck className="w-4 h-4" />
            <span>Trygg & Forutsigbar Prosess</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Trenger du en strategisk IT-partner for ditt neste prosjekt?
          </h2>
          <p className="text-sm text-indigo-200 leading-relaxed">
            Send oss en uforpliktende henvendelse. Vi tilbyr gratis innledende rådgivningsmøte og skreddersydde pristilbud for alle typer oppdrag.
          </p>

          <button
            onClick={() => setQuoteModalOpen(true)}
            className={`px-8 py-4 text-xs font-bold rounded-xl bg-white text-indigo-950 hover:bg-indigo-50 shadow-lg flex items-center gap-2 transition-transform active:scale-95`}
          >
            <Send className="w-4 h-4 text-indigo-600" />
            <span>Få et Uforpliktende Tilbud</span>
          </button>
        </div>
      </section>

      {/* Call to action footer banner */}
      <section className={`p-10 text-center ${activeStyle.cardRadius} ${activeStyle.surfaceClass} border ${activeStyle.surfaceBorder} space-y-4`} id="cta-bottom">
        <h3 className={`text-2xl font-extrabold ${activeStyle.textPrimary}`}>
          Klar for å løfte din digitale tilstedeværelse?
        </h3>
        <p className={`text-xs ${activeStyle.textSecondary} max-w-lg mx-auto`}>
          Ta kontakt for en uforpliktende strategiprat eller be om et prosjektestimat.
        </p>
        <button
          onClick={() => setQuoteModalOpen(true)}
          className={`px-8 py-3.5 text-xs font-bold ${activeStyle.buttonRadius} ${activeStyle.accentBg} inline-flex items-center gap-2 shadow-md`}
        >
          <Send className="w-4 h-4" />
          <span>Få et uforpliktende tilbud</span>
        </button>
      </section>

    </div>
  );
};

