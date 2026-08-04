import React, { useState } from "react";
import { useDesignStyle } from "../../context/DesignStyleContext";
import { 
  Send, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  Globe, 
  Mail, 
  Phone, 
  HelpCircle,
  ChevronDown,
  Copy,
  Check,
  AlertTriangle
} from "lucide-react";
import { SERVICES, DESIGN_STYLES } from "../../data/mockData";
import { StyleId } from "../../types";

export const ContactView: React.FC = () => {
  const { activeStyle } = useDesignStyle();

  const [company, setCompany] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>(["ux-ui-designsystem"]);
  const [selectedStyle, setSelectedStyle] = useState<StyleId>(activeStyle.id);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mailtoClicked, setMailtoClicked] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleService = (id: string) => {
    if (selectedServices.includes(id)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((s) => s !== id));
      }
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  const selectedServiceNames = SERVICES.filter((s) => selectedServices.includes(s.id))
    .map((s) => s.title)
    .join(", ");
  const preferredStyleObj = DESIGN_STYLES.find((st) => st.id === selectedStyle);
  const preferredStyleName = preferredStyleObj ? preferredStyleObj.name : selectedStyle;

  const emailBodyText = `Hei Axel og Maren,

Her er en ny henvendelse fra kontaktskjemaet på widevig.no:

• Navn: ${name || "Ikke oppgitt"}
• Bedrift: ${company || "Ikke oppgitt"}
• E-post: ${email || "Ikke oppgitt"}
• Valgte Tjenester: ${selectedServiceNames || "Ingen valgt"}
• Ønsket Designstil: ${preferredStyleName}

Melding / Prosjektbeskrivelse:
${message || "Ingen skriftlig melding oppgitt."}

-------------------------------------------
Sendt fra kontaktskjemaet på Widevig Digital`;

  const mailtoUrl = `mailto:axel@widevig.no?cc=maren@widevig.no&subject=${encodeURIComponent(
    `Henvendelse Widevig Digital: ${company || name || "Ny kontakt"}`
  )}&body=${encodeURIComponent(emailBodyText)}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipient: "axel@widevig.no",
          companyName: company,
          contactName: name,
          email,
          selectedServices,
          preferredStyle: selectedStyle,
          description: message,
          source: "ContactView",
        }),
      });
    } catch (err) {
      console.error("Contact submit error:", err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
      setMailtoClicked(false);
    }
  };

  const handleOpenMailClient = () => {
    setMailtoClicked(true);
    try {
      window.location.href = mailtoUrl;
    } catch (e) {
      console.error("Error launching mailto:", e);
    }
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(emailBodyText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const faqs = [
    {
      q: "Hvor lang tid tar et typisk design- eller IKT-prosjekt?",
      a: "De fleste prosjekter gjennomføres på 3 til 8 uker, avhengig av omfang. Mindre designsystemer eller IKT-kartlegginger kan leveres på 2–3 uker."
    },
    {
      q: "Hva innebærer et modulært designsystem for vår bedrift?",
      a: "Et designsystem samler farger, typografi, ikoner og gjenbrukbare UI-komponenter i et helhetlig bibliotek. Dette sikrer 100 % visuell konsistens, universell utforming (WCAG 2.1 AA) og betydelig raskere utviklingstid ved fremtidige utvidelser."
    },
    {
      q: "Hvordan bistår dere med IKT-infrastruktur og digitalisering?",
      a: "Vi hjelper med kartlegging av eksisterende IKT-systemer, rådgivning rundt skytjenester (AWS, Azure, GCP), IT-sikkerhet, og modernisering av utdaterte systemer slik at bedriften får en skalerbar og stabil digital plattform."
    },
    {
      q: "Kan vi skifte visuell stil eller profil underveis i prosjektet?",
      a: "Ja, absolutt! Vår designmetodikk bygger på fleksible design-tokens, noe som gjør det enkelt å veksle og tilpasse visuell profil, fargepaletter og fontvalg uten å måtte bygge opp grensesnittet fra bunnen av."
    },
    {
      q: "Hvordan sikrer dere at IKT-løsningene oppfyller kravene til GDPR og universell utforming?",
      a: "Alle våre IKT- og designleveranser bygges fra grunnen av med universell utforming (WCAG 2.1 AA) og strenge personvernrutiner (GDPR) som standard, slik at løsningen er trygg, lovlig og tilgjengelig for alle brukere."
    },
    {
      q: "Hvordan foregår det praktiske samarbeidet i et prosjekt?",
      a: "Vi jobber tett og agilt i ukentlige sprinter. Du får direkte kontakt med seniordesignere og IKT-rådgivere, med kontinuerlig innsyn i Figma-prototyper og kodedemonstrasjoner."
    }
  ];

  return (
    <div className="space-y-16 animate-fade-in" id="contact-view">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3.5 py-1.5 rounded-full bg-indigo-500/10 text-indigo-600 text-xs font-bold uppercase tracking-wider">
          Kontakt & Tilbud
        </span>
        <h1 className={`text-3xl sm:text-5xl font-extrabold tracking-tight ${activeStyle.textPrimary}`}>
          La Oss Prate Om Ditt Neste Prosjekt
        </h1>
        <p className={`text-base ${activeStyle.textSecondary} leading-relaxed`}>
          Send oss en uforpliktende henvendelse eller bygg din prosjektskisse nedenfor. Vi svarer garantert innen 24 timer.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Contact Form */}
        <div className={`lg:col-span-2 p-8 ${activeStyle.cardRadius} ${activeStyle.surfaceClass} border ${activeStyle.surfaceBorder} ${activeStyle.shadowClass} space-y-6`}>
          {submitted ? (
            <div className="text-center py-6 space-y-5">
              <div className="w-14 h-14 rounded-full bg-emerald-500/15 text-emerald-500 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              
              <div>
                <h3 className={`text-2xl font-bold ${activeStyle.textPrimary}`}>
                  Forespørsel Klargjort!
                </h3>
                <p className={`text-xs ${activeStyle.textSecondary} mt-1 max-w-md mx-auto`}>
                  Takk, <strong>{name || "bruker"}</strong>! For at henvendelsen for <strong>{company || "din bedrift"}</strong> skal nå Axel og Maren umiddelbart, <strong>velg én av de to metodene under</strong> for å fullføre sendingen:
                </p>
              </div>

              {/* Recipient info badges */}
              <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-mono">
                <span className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/30 rounded-lg text-indigo-700 dark:text-indigo-300 font-bold">
                  Mottaker: axel@widevig.no
                </span>
                <span className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/30 rounded-lg text-indigo-700 dark:text-indigo-300 font-bold">
                  Kopi: maren@widevig.no
                </span>
              </div>

              {/* 2 Sending Methods Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-xl mx-auto pt-2">
                {/* Option A: Open Email Client */}
                <div className={`p-4 ${activeStyle.buttonRadius} border border-indigo-500/30 bg-indigo-500/5 space-y-3 flex flex-col justify-between`}>
                  <div>
                    <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider">
                      <Mail className="w-4 h-4" />
                      <span>Metode 1: E-postklient</span>
                    </div>
                    <p className={`text-xs ${activeStyle.textSecondary} mt-1 leading-relaxed`}>
                      Åpner ditt forhåndsinnstilte e-postprogram (f.eks. Outlook, Apple Mail) med ferdig utfylt tekst og adresse.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleOpenMailClient}
                    className={`w-full py-2.5 px-4 text-xs font-bold ${activeStyle.buttonRadius} bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center gap-2 shadow-sm transition-all`}
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Åpne i E-postklient</span>
                  </button>
                </div>

                {/* Option B: Copy Email Text */}
                <div className={`p-4 ${activeStyle.buttonRadius} border ${activeStyle.surfaceBorder} bg-black/5 dark:bg-white/5 space-y-3 flex flex-col justify-between`}>
                  <div>
                    <div className={`flex items-center gap-2 ${activeStyle.textPrimary} font-bold text-xs uppercase tracking-wider`}>
                      <Copy className="w-4 h-4 text-indigo-500" />
                      <span>Metode 2: Kopier Tekst</span>
                    </div>
                    <p className={`text-xs ${activeStyle.textSecondary} mt-1 leading-relaxed`}>
                      Kopierer forespørselen til utklippstavlen så du kan lime den rett inn i Gmail, Outlook Web eller din webmail.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyText}
                    className={`w-full py-2.5 px-4 text-xs font-bold ${activeStyle.buttonRadius} border ${activeStyle.surfaceBorder} ${activeStyle.textPrimary} hover:bg-black/10 dark:hover:bg-white/10 flex items-center justify-center gap-2 transition-all`}
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "Tekst Kopiert!" : "Kopier E-posttekst"}</span>
                  </button>
                </div>
              </div>

              {/* Warning if mailto was clicked but might fail or not send */}
              {mailtoClicked && (
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/40 text-amber-800 dark:text-amber-200 text-left text-xs space-y-2 max-w-xl mx-auto animate-fade-in">
                  <div className="flex items-center gap-2 font-bold text-amber-900 dark:text-amber-300 text-xs">
                    <AlertTriangle className="w-4 h-4 shrink-0 text-amber-500" />
                    <span>Åpnet ikke e-postklienten seg, eller ble den ikke sendt?</span>
                  </div>
                  <p className="leading-relaxed text-[11px]">
                    Dersom e-postprogrammet ditt ikke åpnet seg automatisk, betyr det at enheten din mangler en registrert e-postklient. <strong>E-posten er da IKKE sendt.</strong>
                  </p>
                  <p className="leading-relaxed font-semibold text-[11px]">
                    Vennligst trykk på <strong>"Kopier E-posttekst" (Metode 2)</strong> i stedet, og lim den inn manuelt i din valgte e-posttjeneste (f.eks. Gmail, Outlook m.m.) adressert til <strong>axel@widevig.no</strong> og <strong>maren@widevig.no</strong>.
                  </p>
                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={handleCopyText}
                      className="py-1.5 px-3 bg-amber-600 hover:bg-amber-700 text-white rounded font-bold text-[11px] inline-flex items-center gap-1.5 shadow-sm"
                    >
                      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? "Kopiert!" : "Kopier E-posttekst Nå"}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Email Body Preview Box */}
              <div className="text-left max-w-xl mx-auto pt-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                  Forhåndsvisning av e-postinnhold:
                </label>
                <pre className="p-3 bg-black/5 dark:bg-white/5 border border-slate-300/30 dark:border-slate-700/30 rounded-lg text-[11px] font-mono text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed max-h-32 overflow-y-auto">
                  {emailBodyText}
                </pre>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setMailtoClicked(false);
                  }}
                  className={`py-2 px-6 text-xs font-semibold ${activeStyle.buttonRadius} opacity-75 hover:opacity-100 ${activeStyle.textSecondary}`}
                >
                  Send En Ny Melding
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6" id="contact-form">
              <h3 className={`text-xl font-bold ${activeStyle.textPrimary}`}>
                Send Henvendelse / Bygg Prosjekt
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-xs font-bold mb-1 ${activeStyle.textPrimary}`}>
                    Ditt Navn *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Kari Nordmann"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full px-3.5 py-2.5 text-xs sm:text-sm font-medium ${activeStyle.buttonRadius} border ${activeStyle.surfaceBorder} bg-black/5 dark:bg-white/5 ${activeStyle.textPrimary} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                  />
                </div>

                <div>
                  <label className={`block text-xs font-bold mb-1 ${activeStyle.textPrimary}`}>
                    Bedriftsnavn
                  </label>
                  <input
                    type="text"
                    placeholder="Bedrift AS"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className={`w-full px-3.5 py-2.5 text-xs sm:text-sm font-medium ${activeStyle.buttonRadius} border ${activeStyle.surfaceBorder} bg-black/5 dark:bg-white/5 ${activeStyle.textPrimary} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className={`block text-xs font-bold mb-1 ${activeStyle.textPrimary}`}>
                    E-postadresse *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="kari@bedrift.no"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full px-3.5 py-2.5 text-xs sm:text-sm font-medium ${activeStyle.buttonRadius} border ${activeStyle.surfaceBorder} bg-black/5 dark:bg-white/5 ${activeStyle.textPrimary} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                  />
                </div>
              </div>

              {/* Service Selection */}
              <div className="space-y-2">
                <label className={`block text-xs font-bold ${activeStyle.textPrimary}`}>
                  Ønskede Tjenester:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {SERVICES.map((s) => {
                    const active = selectedServices.includes(s.id);
                    return (
                      <button
                        type="button"
                        key={s.id}
                        onClick={() => toggleService(s.id)}
                        className={`p-3 text-left text-xs ${activeStyle.buttonRadius} border font-medium transition-all flex items-center justify-between ${
                          active
                            ? "border-indigo-500 bg-indigo-500/10 font-bold text-indigo-600 dark:text-indigo-400"
                            : `${activeStyle.surfaceBorder} ${activeStyle.textSecondary}`
                        }`}
                      >
                        <div className="space-y-0.5 pr-2">
                          <span className="font-bold block text-xs">{s.title}</span>
                          <span className="text-[10px] opacity-75 block">{s.priceRange} • {s.category}</span>
                        </div>
                        {active ? (
                          <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-slate-400/30 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Design Style Preference */}
              <div className="space-y-2">
                <label className={`block text-xs font-bold ${activeStyle.textPrimary}`}>
                  Ønsket Designstil:
                </label>
                <select
                  value={selectedStyle}
                  onChange={(e) => setSelectedStyle(e.target.value as StyleId)}
                  className={`w-full p-3 text-xs sm:text-sm font-semibold ${activeStyle.buttonRadius} border ${activeStyle.surfaceBorder} bg-black/5 dark:bg-white/5 ${activeStyle.textPrimary} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                >
                  {DESIGN_STYLES.map((st) => (
                    <option key={st.id} value={st.id} className="bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100 font-semibold text-xs">
                      {st.name} ({st.tagline})
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label className={`block text-xs font-bold mb-1 ${activeStyle.textPrimary}`}>
                  Melding / Utfordring
                </label>
                <textarea
                  rows={4}
                  placeholder="Fortell kort om målene for prosjektet..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={`w-full px-3.5 py-2.5 text-xs sm:text-sm font-medium ${activeStyle.buttonRadius} border ${activeStyle.surfaceBorder} bg-black/5 dark:bg-white/5 ${activeStyle.textPrimary} focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed`}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 text-sm font-bold ${activeStyle.buttonRadius} ${activeStyle.accentBg} flex items-center justify-center gap-2 shadow-lg whitespace-nowrap disabled:opacity-50`}
              >
                <Send className="w-4 h-4 shrink-0" />
                <span className="whitespace-nowrap">
                  {isSubmitting ? "Sender..." : "Send Henvendelse Til axel@widevig.no"}
                </span>
              </button>
            </form>
          )}
        </div>

        {/* Contact info sidebar */}
        <div className="space-y-6">
          <div className={`p-6 ${activeStyle.cardRadius} ${activeStyle.surfaceClass} border ${activeStyle.surfaceBorder} space-y-4`}>
            <h3 className={`text-lg font-bold ${activeStyle.textPrimary}`}>
              Hurtigkontakt
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-indigo-500 shrink-0" />
                <div className="flex flex-col">
                  <a href="mailto:axel@widevig.no" className="hover:underline text-indigo-600 dark:text-indigo-400 font-medium">axel@widevig.no</a>
                  <a href="mailto:maren@widevig.no" className="hover:underline text-indigo-600 dark:text-indigo-400 font-medium">maren@widevig.no</a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-indigo-500 shrink-0" />
                <span>+47 22 10 90 00</span>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>100% Digitalt (Hele Norge)</span>
              </div>
            </div>
          </div>

          <div className={`p-6 ${activeStyle.cardRadius} ${activeStyle.surfaceClass} border ${activeStyle.surfaceBorder} space-y-3`}>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
              <Clock className="w-4 h-4" />
              <span>Svartid Garanti</span>
            </div>
            <p className={`text-xs ${activeStyle.textSecondary} leading-relaxed`}>
              Vi besvarer alle henvendelser innen 24 timer på hverdager. Hastesaker prioriteres samme dag.
            </p>
          </div>
        </div>

      </div>

      {/* FAQ Accordion */}
      <div className={`p-8 ${activeStyle.cardRadius} ${activeStyle.surfaceClass} border ${activeStyle.surfaceBorder} space-y-6`}>
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1 text-xs font-bold uppercase text-indigo-500">
            <HelpCircle className="w-4 h-4" />
            <span>Ofte Stilte Spørsmål</span>
          </div>
          <h2 className={`text-2xl font-bold ${activeStyle.textPrimary}`}>
            Vanlige Spørsmål Om Våre Prosjekter
          </h2>
        </div>

        <div className="max-w-2xl mx-auto space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className={`border ${activeStyle.surfaceBorder} ${activeStyle.buttonRadius} overflow-hidden`}
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className={`w-full p-4 text-left text-xs font-bold ${activeStyle.textPrimary} flex items-center justify-between hover:bg-black/5 dark:hover:bg-white/5 transition-colors`}
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180 text-indigo-500" : ""}`} />
                </button>

                {isOpen && (
                  <div className={`px-4 pb-4 text-xs ${activeStyle.textSecondary} border-t border-black/5 dark:border-white/5 pt-3 leading-relaxed`}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
