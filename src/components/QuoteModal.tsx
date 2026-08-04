import React, { useState } from "react";
import { useDesignStyle } from "../context/DesignStyleContext";
import { StyleId } from "../types";
import { X, Send, CheckCircle2, Sparkles, Copy, Check, ExternalLink, Mail, AlertTriangle } from "lucide-react";
import { SERVICES, DESIGN_STYLES } from "../data/mockData";

export const QuoteModal: React.FC = () => {
  const { activeStyle, quoteModalOpen, setQuoteModalOpen } = useDesignStyle();

  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>(["ux-ui-designsystem"]);
  const [budgetRange, setBudgetRange] = useState("3.5k - 10k NOK");
  const [preferredStyle, setPreferredStyle] = useState<StyleId>(activeStyle.id);
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mailtoClicked, setMailtoClicked] = useState(false);

  if (!quoteModalOpen) return null;

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
  const preferredStyleObj = DESIGN_STYLES.find((st) => st.id === preferredStyle);
  const preferredStyleName = preferredStyleObj ? preferredStyleObj.name : preferredStyle;

  const emailBodyText = `Hei Axel og Maren,

Her er en ny tilbudsforespørsel fra Widevig Digital sine nettsider:

• Kontaktperson: ${contactName || "Ikke oppgitt"}
• Bedrift: ${companyName || "Ikke oppgitt"}
• E-post: ${email || "Ikke oppgitt"}
• Telefon: ${phone || "Ikke oppgitt"}
• Tjenester: ${selectedServiceNames || "Ingen valgt"}
• Estimert Budsjett: ${budgetRange}
• Ønsket Designstil: ${preferredStyleName}

Prosjektbeskrivelse / Kommentarer:
${description || "Ingen merknader skrevet."}

-------------------------------------------
Sendt fra tilbudsskjemaet på widevig.no`;

  const mailtoUrl = `mailto:axel@widevig.no?cc=maren@widevig.no&subject=${encodeURIComponent(
    `Tilbudsforespørsel Widevig Digital: ${companyName || contactName || "Ny kunde"}`
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
          companyName,
          contactName,
          email,
          phone,
          selectedServices,
          budgetRange,
          preferredStyle,
          description,
          source: "QuoteModal",
        }),
      });
    } catch (err) {
      console.error("Quote submit error:", err);
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
      console.error("Error launching mailto link:", e);
    }
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(emailBodyText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className={`w-full max-w-2xl max-h-[90vh] overflow-y-auto ${activeStyle.cardRadius} ${activeStyle.surfaceClass} border ${activeStyle.surfaceBorder} shadow-2xl p-6 sm:p-8 relative`}
        id="quote-modal-container"
      >
        {/* Close button */}
        <button
          id="close-quote-modal-btn"
          onClick={() => {
            setQuoteModalOpen(false);
            setSubmitted(false);
          }}
          className={`absolute top-4 right-4 p-2 ${activeStyle.buttonRadius} hover:bg-black/10 dark:hover:bg-white/10 ${activeStyle.textPrimary}`}
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-4 space-y-5" id="quote-success-state">
            <div className="w-14 h-14 rounded-full bg-emerald-500/15 text-emerald-500 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            
            <div>
              <h3 className={`text-2xl font-bold ${activeStyle.textPrimary}`}>
                Forespørsel Klargjort!
              </h3>
              <p className={`text-xs ${activeStyle.textSecondary} mt-1 max-w-md mx-auto`}>
                Takk, <strong>{contactName || "bruker"}</strong>! For at henvendelsen for <strong>{companyName || "din bedrift"}</strong> skal nå Axel og Maren umiddelbart, <strong>velg én av de to metodene under</strong> for å fullføre sendingen:
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
                  setQuoteModalOpen(false);
                  setSubmitted(false);
                  setMailtoClicked(false);
                }}
                className={`py-2 px-6 text-xs font-semibold ${activeStyle.buttonRadius} opacity-75 hover:opacity-100 ${activeStyle.textSecondary}`}
              >
                Lukk vindu
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6" id="quote-form">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 text-xs font-bold uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Widevig Digital • Prosjektkalkulator</span>
              </div>
              <h3 className={`text-2xl font-extrabold ${activeStyle.textPrimary}`}>
                Få et Uforpliktende Tilbud
              </h3>
              <p className={`text-xs ${activeStyle.textSecondary}`}>
                Mottat skreddersydd pristilbud fra <strong>Widevig Digital (Widevig AS)</strong> innen 24 timer. Forespørselen sendes direkte til <strong className="text-indigo-600 dark:text-indigo-400">axel@widevig.no</strong> og <strong className="text-indigo-600 dark:text-indigo-400">maren@widevig.no</strong>.
              </p>
            </div>

            {/* Step 1: Select Services */}
            <div className="space-y-2">
              <label className={`block text-xs font-bold uppercase tracking-wider ${activeStyle.textPrimary}`}>
                1. Velg Tjenester (Aktiv)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {SERVICES.map((srv) => {
                  const isChecked = selectedServices.includes(srv.id);
                  return (
                    <button
                      type="button"
                      key={srv.id}
                      onClick={() => toggleService(srv.id)}
                      className={`p-3 text-left ${activeStyle.buttonRadius} border text-xs transition-all flex items-center justify-between ${
                        isChecked
                          ? "border-indigo-500 bg-indigo-500/10 font-bold text-indigo-600 dark:text-indigo-400"
                          : `${activeStyle.surfaceBorder} ${activeStyle.textSecondary}`
                      }`}
                    >
                      <div className="space-y-0.5 pr-2">
                        <span className="font-bold block text-xs">{srv.title}</span>
                        <span className="text-[10px] opacity-75 block">{srv.priceRange} • {srv.category}</span>
                      </div>
                      {isChecked ? (
                        <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-slate-400/30 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Preferred Design Style */}
            <div className="space-y-2">
              <label className={`block text-xs font-bold uppercase tracking-wider ${activeStyle.textPrimary}`}>
                2. Foretrukket Designstil
              </label>
              <select
                value={preferredStyle}
                onChange={(e) => setPreferredStyle(e.target.value as StyleId)}
                className={`w-full p-3 text-xs sm:text-sm font-semibold ${activeStyle.buttonRadius} border ${activeStyle.surfaceBorder} bg-black/5 dark:bg-white/5 ${activeStyle.textPrimary} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              >
                {DESIGN_STYLES.map((st) => (
                  <option key={st.id} value={st.id} className="bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100 font-semibold text-xs">
                    {st.name} ({st.tagline})
                  </option>
                ))}
              </select>
            </div>

            {/* Step 3: Budget */}
            <div className="space-y-2">
              <label className={`block text-xs font-bold uppercase tracking-wider ${activeStyle.textPrimary}`}>
                3. Estimert Budsjettramme
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {["3.5k - 10k NOK", "10k - 25k NOK", "25k - 50k NOK", "50k+ NOK"].map((b) => (
                  <button
                    type="button"
                    key={b}
                    onClick={() => setBudgetRange(b)}
                    className={`py-2.5 px-2 text-center text-xs whitespace-nowrap ${activeStyle.buttonRadius} border font-medium transition-all ${
                      budgetRange === b
                        ? "border-indigo-500 bg-indigo-600 text-white font-bold shadow-sm"
                        : `${activeStyle.surfaceBorder} ${activeStyle.textSecondary}`
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={`block text-xs font-bold mb-1 ${activeStyle.textPrimary}`}>
                  Bedriftsnavn *
                </label>
                <input
                  type="text"
                  required
                  placeholder="f.eks. Nordic Tech AS"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className={`w-full px-3.5 py-2.5 text-xs sm:text-sm font-medium ${activeStyle.buttonRadius} border ${activeStyle.surfaceBorder} bg-black/5 dark:bg-white/5 ${activeStyle.textPrimary} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                />
              </div>

              <div>
                <label className={`block text-xs font-bold mb-1 ${activeStyle.textPrimary}`}>
                  Kontaktperson *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Navn Navnesen"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className={`w-full px-3.5 py-2.5 text-xs sm:text-sm font-medium ${activeStyle.buttonRadius} border ${activeStyle.surfaceBorder} bg-black/5 dark:bg-white/5 ${activeStyle.textPrimary} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                />
              </div>

              <div>
                <label className={`block text-xs font-bold mb-1 ${activeStyle.textPrimary}`}>
                  E-postadresse *
                </label>
                <input
                  type="email"
                  required
                  placeholder="navn@bedrift.no"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full px-3.5 py-2.5 text-xs sm:text-sm font-medium ${activeStyle.buttonRadius} border ${activeStyle.surfaceBorder} bg-black/5 dark:bg-white/5 ${activeStyle.textPrimary} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                />
              </div>

              <div>
                <label className={`block text-xs font-bold mb-1 ${activeStyle.textPrimary}`}>
                  Telefonnummer
                </label>
                <input
                  type="tel"
                  placeholder="+47 900 00 000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`w-full px-3.5 py-2.5 text-xs sm:text-sm font-medium ${activeStyle.buttonRadius} border ${activeStyle.surfaceBorder} bg-black/5 dark:bg-white/5 ${activeStyle.textPrimary} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className={`block text-xs font-bold mb-1 ${activeStyle.textPrimary}`}>
                Kort Beskrivelse av Prosjektet
              </label>
              <textarea
                rows={3}
                placeholder="Beskriv mål, utfordringer eller ønskede funksjoner..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={`w-full px-3.5 py-2.5 text-xs sm:text-sm font-medium ${activeStyle.buttonRadius} border ${activeStyle.surfaceBorder} bg-black/5 dark:bg-white/5 ${activeStyle.textPrimary} focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed`}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              id="submit-quote-btn"
              className={`w-full py-3.5 text-sm font-bold ${activeStyle.buttonRadius} ${activeStyle.accentBg} flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-98 whitespace-nowrap disabled:opacity-50`}
            >
              <Send className="w-4 h-4 shrink-0" />
              <span className="whitespace-nowrap">
                {isSubmitting ? "Sender..." : "Send Forespørsel Til axel@widevig.no"}
              </span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

