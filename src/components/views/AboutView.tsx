import React, { useState } from "react";
import { useDesignStyle } from "../../context/DesignStyleContext";
import { TEAM_MEMBERS } from "../../data/mockData";
import { 
  ShieldCheck, 
  Zap, 
  Linkedin, 
  Mail, 
  GraduationCap,
  Briefcase,
  Globe,
  Video,
  Laptop
} from "lucide-react";

const DEFAULT_FALLBACK_IMAGES: Record<string, string> = {
  axel: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
  maren: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
};

export const AboutView: React.FC = () => {
  const { activeStyle, setQuoteModalOpen } = useDesignStyle();

  // Track failed local image URLs to fallback gracefully to photo assets if file is missing
  const [failedLocalImages, setFailedLocalImages] = useState<Record<string, boolean>>({});

  const getMemberImageSrc = (memberId: string, defaultPath: string) => {
    if (failedLocalImages[memberId]) {
      return DEFAULT_FALLBACK_IMAGES[memberId] || DEFAULT_FALLBACK_IMAGES.axel;
    }
    return defaultPath;
  };

  return (
    <div className="space-y-16 animate-fade-in" id="about-view">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3.5 py-1.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
          Om Widevig Digital & Widevig AS
        </span>
        <h1 className={`text-3xl sm:text-5xl font-extrabold tracking-tight ${activeStyle.textPrimary}`}>
          Menneskene Bak Widevig Digital
        </h1>
        <p className={`text-base ${activeStyle.textSecondary} leading-relaxed`}>
          Widevig Digital drives av ekteparet <strong>Axel og Maren Wideberg</strong>. Begge har en <strong>3-årig bachelor i telematikk fra Cyberingeniørskolen</strong>, og Maren tar i tillegg en <strong>Master i Informasjonssikkerhet ved NTNU</strong>. Sammen har de over 2 års erfaring med IKT, IT-sikkerhet, webutvikling, skyteknologi, økonomi og prosjektledelse.
        </p>
      </div>

      {/* Cyber Engineering Highlight Banner */}
      <div className={`p-6 sm:p-8 ${activeStyle.cardRadius} ${activeStyle.surfaceClass} border ${activeStyle.surfaceBorder} grid grid-cols-1 md:grid-cols-3 gap-6 items-center shadow-lg`}>
        <div className="flex items-center gap-4 md:col-span-1">
          <div className="p-3 rounded-2xl bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 shrink-0">
            <GraduationCap className="w-8 h-8" />
          </div>
          <div>
            <h3 className={`text-base font-extrabold ${activeStyle.textPrimary}`}>
              Telematikk & InfoSec NTNU
            </h3>
            <p className={`text-xs ${activeStyle.textSecondary}`}>
              Cyberingeniørskolen & NTNU Master
            </p>
          </div>
        </div>

        <div className="md:col-span-2 text-xs leading-relaxed space-y-2 border-t md:border-t-0 md:border-l border-black/10 dark:border-white/10 pt-4 md:pt-0 md:pl-6">
          <p className={activeStyle.textPrimary}>
            Med en 3-årig ingeniørutdanning i telematikk fra Cyberingeniørskolen og pågående Master i informasjonssikkerhet ved NTNU bringer vi spisskompetanse innen digital infrastruktur, nettverk og kommunikasjon samt <strong>IKT-sikkerhet, cybersikkerhet og skalerbar arkitektur</strong> inn i alle våre prosjekter.
          </p>
          <div className="flex flex-wrap gap-2 pt-1 font-mono text-[11px] text-indigo-600 dark:text-indigo-300">
            <span className="bg-indigo-500/10 px-2 py-0.5 rounded">🎓 Bachelor i Telematikk</span>
            <span className="bg-indigo-500/10 px-2 py-0.5 rounded">🛡️ Master i InfoSec (NTNU)</span>
            <span className="bg-indigo-500/10 px-2 py-0.5 rounded">⚡ 2 års IKT-erfaring</span>
            <span className="bg-indigo-500/10 px-2 py-0.5 rounded">🔒 IT-Sikkerhet & Sky</span>
          </div>
        </div>
      </div>

      {/* Team Profiles (2-Column Grid for Axel & Maren) */}
      <div className="space-y-8" id="team-section">
        <div className="text-center space-y-1">
          <h2 className={`text-2xl sm:text-3xl font-extrabold ${activeStyle.textPrimary}`}>
            Møt Grunnleggerne
          </h2>
          <p className={`text-xs sm:text-sm ${activeStyle.textSecondary}`}>
            Direkte kontakt med fagpersonene som planlegger og gjennomfører ditt prosjekt
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {TEAM_MEMBERS.map((member) => {
            const memberId = member.id;
            const imgSrc = getMemberImageSrc(memberId, member.imageUrl);

            return (
              <div
                key={member.id}
                className={`p-6 sm:p-8 ${activeStyle.cardRadius} ${activeStyle.surfaceClass} border ${activeStyle.surfaceBorder} space-y-6 hover:shadow-2xl transition-all flex flex-col justify-between relative group`}
              >
                <div className="space-y-5">
                  {/* Avatar Container */}
                  <div className="relative w-36 h-36 mx-auto">
                    <div className="w-full h-full rounded-full overflow-hidden border-4 border-indigo-500/30 shadow-xl bg-slate-900 flex items-center justify-center">
                      <img 
                        src={imgSrc} 
                        alt={member.name} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                        onError={() => {
                          setFailedLocalImages((prev) => ({ ...prev, [memberId]: true }));
                        }}
                      />
                    </div>
                  </div>

                  {/* Member Name & Role */}
                  <div className="text-center space-y-1">
                    <h3 className={`text-2xl font-extrabold ${activeStyle.textPrimary}`}>
                      {member.name}
                    </h3>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 inline-block">
                      {member.role}
                    </span>
                  </div>

                  {/* Bio */}
                  <p className={`text-xs sm:text-sm ${activeStyle.textSecondary} text-center leading-relaxed px-2`}>
                    {member.bio}
                  </p>

                  {/* Specialties */}
                  <div className="flex flex-wrap justify-center gap-1.5 pt-2">
                    {member.specialties.map((spec, i) => (
                      <span 
                        key={i} 
                        className="px-2.5 py-1 text-[11px] font-mono rounded-lg bg-black/5 dark:bg-white/10 text-slate-700 dark:text-slate-200 border border-black/10 dark:border-white/10"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Contact Actions */}
                <div className="pt-4 border-t border-black/10 dark:border-white/10 flex justify-center items-center gap-4">
                  <a 
                    href={`mailto:${member.email}`} 
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-bold transition-all"
                    title={`Send e-post til ${member.name}`}
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>{member.email}</span>
                  </a>
                  <a 
                    href={member.linkedin} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="p-2 rounded-lg bg-black/5 dark:bg-white/10 hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 transition-all"
                    title="LinkedIn Profil"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* Company Values */}
      <div className={`p-8 sm:p-12 ${activeStyle.cardRadius} ${activeStyle.surfaceClass} border ${activeStyle.surfaceBorder} space-y-8`}>
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className={`text-2xl font-bold ${activeStyle.textPrimary}`}>
            Våre Kjerneverdier
          </h2>
          <p className={`text-xs ${activeStyle.textSecondary}`}>
            Hvordan vi leverer kvalitet og trygghet i alle IKT- og designprosjekter
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="p-3 w-fit rounded-lg bg-indigo-500/10 text-indigo-500">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className={`text-lg font-bold ${activeStyle.textPrimary}`}>
              Sikkerhet & Robusthet
            </h3>
            <p className={`text-xs ${activeStyle.textSecondary} leading-relaxed`}>
              Med cyberingeniør- og telematikkbakgrunn bygger vi alle løsninger med fokus på dataskydd, universell utforming (WCAG AA) og fremtidsrettet IKT-arkitektur.
            </p>
          </div>

          <div className="space-y-2">
            <div className="p-3 w-fit rounded-lg bg-amber-500/10 text-amber-500">
              <Briefcase className="w-6 h-6" />
            </div>
            <h3 className={`text-lg font-bold ${activeStyle.textPrimary}`}>
              God Planlegging & Økonomi
            </h3>
            <p className={`text-xs ${activeStyle.textSecondary} leading-relaxed`}>
              Gjennomtenkt administrasjon, ryddige rammebetingelser og kostnadseffektive prosesser sikrer at prosjektet holdes på budsjett.
            </p>
          </div>

          <div className="space-y-2">
            <div className="p-3 w-fit rounded-lg bg-emerald-500/10 text-emerald-500">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className={`text-lg font-bold ${activeStyle.textPrimary}`}>
              Praktisk Gjennomføringskraft
            </h3>
            <p className={`text-xs ${activeStyle.textSecondary} leading-relaxed`}>
              Vi er opptatt av å kode funksjonelle og lekre løsninger som oppfyller faktiske forretningsbehov uten unødvendig byråkrati.
            </p>
          </div>
        </div>
      </div>

      {/* 100% Digital Workflow Callout */}
      <div className={`p-8 ${activeStyle.cardRadius} ${activeStyle.surfaceClass} border ${activeStyle.surfaceBorder} grid grid-cols-1 lg:grid-cols-2 gap-8 items-center`}>
        <div className="space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase">
            <Globe className="w-3.5 h-3.5" />
            <span>100% Digital Modell</span>
          </div>
          <h2 className={`text-2xl font-bold ${activeStyle.textPrimary}`}>
            Vi Opererer Heldighitalt
          </h2>
          <p className={`text-xs ${activeStyle.textSecondary} leading-relaxed`}>
            Widevig AS har ingen fysiske kontorer. Vi jobber 100% digitalt og betjener kunder i hele Norge gjennom effektive videomøter, moderne samhandlingsverktøy og kontinuerlig digital oppfølging.
          </p>
          <div className={`text-xs ${activeStyle.textSecondary} space-y-1.5 pt-2 font-mono`}>
            <p className="flex items-center gap-2"><Video className="w-4 h-4 text-indigo-500 shrink-0" /> Teams, Google Meet & Zoom for sømløse møter</p>
            <p className="flex items-center gap-2"><Laptop className="w-4 h-4 text-indigo-500 shrink-0" /> Skytjenester, Figma & GitHub for sanntids samhandling</p>
            <p className="pt-1">📧 <a href="mailto:axel@widevig.no" className="hover:underline text-indigo-600 dark:text-indigo-400">axel@widevig.no</a> / <a href="mailto:maren@widevig.no" className="hover:underline text-indigo-600 dark:text-indigo-400">maren@widevig.no</a></p>
          </div>

          <button
            onClick={() => setQuoteModalOpen(true)}
            className={`px-6 py-3 text-xs font-bold ${activeStyle.buttonRadius} ${activeStyle.accentBg} shadow-md`}
          >
            Avtal et Digitalt Møte
          </button>
        </div>

        {/* Visual Digital Collaboration Mockup */}
        <div className="h-64 rounded-2xl overflow-hidden relative border border-slate-300 dark:border-slate-700 bg-slate-900 text-white p-6 flex flex-col justify-between">
          <div className="flex justify-between items-center z-10">
            <span className="text-xs font-bold font-mono px-3 py-1 rounded bg-black/60 backdrop-blur-md flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Digital Workspace • Hele Norge
            </span>
            <span className="text-xs font-mono text-indigo-300 bg-indigo-500/20 px-2.5 py-1 rounded-full border border-indigo-400/30">
              Online
            </span>
          </div>

          <div className="space-y-1.5 z-10">
            <p className="text-lg font-bold text-indigo-200">Widevig Digital (Widevig AS)</p>
            <p className="text-xs text-slate-300">Rask respons, fleksible prosesser & null reisetid for deg som kunde</p>
          </div>

          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:16px_16px]" />
        </div>
      </div>

    </div>
  );
};
