import React, { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AlertTriangle, ArrowRight, Check, Copy, Globe, Mail, RotateCcw } from "lucide-react";
import { DESIGN_STYLES, SERVICES } from "../data/mockData";
import { SERVICE_ICONS } from "../data/serviceIcons";
import { StyleId } from "../types";

const RECIPIENT = "axel@widevig.no";

const BUDGETS = ["3.5k - 10k NOK", "10k - 25k NOK", "25k - 50k NOK", "50k+ NOK", "Vet ikke ennå"];

const NO_STYLE = "";

const inputClass =
  "w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-zinc-500 outline-none transition focus:border-violet-400/60 focus:bg-white/[0.06] focus:ring-4 focus:ring-violet-500/15";

const StepLabel: React.FC<{ step: number; children: React.ReactNode; hint?: string; htmlFor?: string }> = ({
  step,
  children,
  hint,
  htmlFor,
}) => {
  // Only a real <label> when it points at a control; otherwise plain text inside the legend
  const Tag = (htmlFor ? "label" : "span") as React.ElementType;
  return (
  <div className="flex items-baseline justify-between gap-3">
    <Tag htmlFor={htmlFor} className="flex items-center gap-3 font-display text-base font-semibold text-white">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 font-mono text-[11px] text-violet-200">
        {step}
      </span>
      {children}
    </Tag>
    {hint && <span className="text-xs text-zinc-500">{hint}</span>}
  </div>
  );
};

/**
 * Project inquiry form shared by the Contact page and the quote dialog, so both look and behave the same.
 * Submits to /api/quote, then lets the visitor send the prepared e-mail themselves.
 */
export const InquiryForm: React.FC<{ source: "ContactView" | "QuoteModal"; onDone?: () => void }> = ({
  source,
  onDone,
}) => {
  const uid = useId();
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([SERVICES[0].id]);
  const [budget, setBudget] = useState(BUDGETS[0]);
  const [style, setStyle] = useState<StyleId | typeof NO_STYLE>(NO_STYLE);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const [mailtoClicked, setMailtoClicked] = useState(false);

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? (prev.length > 1 ? prev.filter((s) => s !== id) : prev) : [...prev, id]
    );
  };

  const serviceNames = SERVICES.filter((s) => selectedServices.includes(s.id))
    .map((s) => s.title)
    .join(", ");
  const styleName = DESIGN_STYLES.find((st) => st.id === style)?.name ?? "Ingen preferanse";

  const emailBody = `Hei Axel,

Her er en ny henvendelse fra widevig.no:

• Navn: ${name || "Ikke oppgitt"}
• Bedrift: ${company || "Ikke oppgitt"}
• E-post: ${email || "Ikke oppgitt"}
• Telefon: ${phone || "Ikke oppgitt"}
• Tjenester: ${serviceNames || "Ingen valgt"}
• Budsjett: ${budget}
• Ønsket designstil: ${styleName}

Om prosjektet:
${message || "Ingen beskrivelse oppgitt."}

-------------------------------------------
Sendt fra skjemaet på widevig.no`;

  const mailtoUrl = `mailto:${RECIPIENT}?subject=${encodeURIComponent(
    `Henvendelse Widevig Digital: ${company || name || "Ny kunde"}`
  )}&body=${encodeURIComponent(emailBody)}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipient: RECIPIENT,
          companyName: company,
          contactName: name,
          email,
          phone,
          selectedServices,
          budgetRange: budget,
          preferredStyle: style || "ingen",
          description: message,
          source,
        }),
      });
    } catch (err) {
      console.error("Inquiry submit error:", err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
      setMailtoClicked(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(emailBody);
      setCopied(true);
      setCopyFailed(false);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopyFailed(true);
    }
  };

  const reset = () => {
    setSubmitted(false);
    setMailtoClicked(false);
    setCopyFailed(false);
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      {submitted ? (
        <motion.div
          key="done"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-6"
          id={`${source}-success`}
        >
          <div className="space-y-4 text-center">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400 text-white shadow-[0_0_40px_-6px_rgba(167,139,250,0.8)]"
            >
              <Check className="h-8 w-8" strokeWidth={3} />
            </motion.div>
            <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">Nesten ferdig, {name || "takk"}!</h3>
            <p className="mx-auto max-w-md text-sm leading-relaxed text-zinc-400">
              Henvendelsen er klar. Send den til <strong className="text-white">{RECIPIENT}</strong> med en av
              metodene under, så hører du fra oss innen 24 timer.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => {
                setMailtoClicked(true);
                window.location.href = mailtoUrl;
              }}
              className="group flex flex-col gap-3 rounded-2xl border border-violet-400/30 bg-violet-500/10 p-5 text-left transition hover:border-violet-400/60 hover:bg-violet-500/15"
            >
              <span className="flex items-center gap-2 text-sm font-semibold text-white">
                <Mail className="h-4 w-4 text-violet-300" /> Åpne i e-postprogram
              </span>
              <span className="text-xs leading-relaxed text-zinc-400">
                Åpner Outlook, Apple Mail eller lignende med teksten ferdig utfylt.
              </span>
            </button>
            <button
              type="button"
              onClick={handleCopy}
              className="group flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-left transition hover:border-white/25 hover:bg-white/[0.07]"
            >
              <span className="flex items-center gap-2 text-sm font-semibold text-white">
                {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4 text-cyan-300" />}
                {copied ? "Teksten er kopiert" : "Kopier teksten"}
              </span>
              <span className="text-xs leading-relaxed text-zinc-400">
                Lim den inn i Gmail, Outlook på nett eller en annen e-posttjeneste.
              </span>
            </button>
          </div>

          {(mailtoClicked || copyFailed) && (
            <div className="flex gap-3 rounded-2xl border border-amber-400/30 bg-amber-400/10 p-4 text-xs leading-relaxed text-amber-100">
              <AlertTriangle className="h-4 w-4 shrink-0 text-amber-300" />
              <p>
                {copyFailed
                  ? "Nettleseren tillot ikke kopiering. Marker teksten under og kopier den manuelt."
                  : "Åpnet ikke e-postprogrammet seg? Da er e-posten ikke sendt. Kopier teksten i stedet og send den selv."}{" "}
                Adressen er <strong className="select-all">{RECIPIENT}</strong>.
              </p>
            </div>
          )}

          <div className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500">Forhåndsvisning</p>
            <pre className="max-h-40 overflow-y-auto whitespace-pre-wrap rounded-2xl border border-white/10 bg-black/30 p-4 font-mono text-[11px] leading-relaxed text-zinc-300 select-all">
              {emailBody}
            </pre>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-zinc-400 transition hover:text-white"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Endre svarene
            </button>
            {onDone && (
              <button
                type="button"
                onClick={onDone}
                className="rounded-full border border-white/15 px-5 py-2 text-xs font-semibold text-white transition hover:border-white/30"
              >
                Lukk
              </button>
            )}
          </div>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          onSubmit={handleSubmit}
          className="space-y-9"
          id={`${source}-form`}
        >
          {/* 1. Services */}
          <fieldset>
            <legend className="mb-4 w-full">
              <StepLabel step={1} hint="Velg én eller flere">
                Hva trenger du hjelp med?
              </StepLabel>
            </legend>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {SERVICES.map((s) => {
                const active = selectedServices.includes(s.id);
                const Icon = SERVICE_ICONS[s.iconName] ?? Globe;
                return (
                  <button
                    type="button"
                    key={s.id}
                    onClick={() => toggleService(s.id)}
                    aria-pressed={active}
                    className={`relative flex items-start gap-3 rounded-2xl border p-3.5 text-left transition-all duration-300 ${
                      active
                        ? "border-violet-400/60 bg-violet-500/[0.12] shadow-[0_0_30px_-12px_rgba(167,139,250,0.9)]"
                        : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05]"
                    }`}
                  >
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors ${
                        active ? "bg-white text-zinc-950" : "bg-white/5 text-zinc-300"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className={`block text-[13px] font-semibold leading-snug ${active ? "text-white" : "text-zinc-300"}`}>
                        {s.title}
                      </span>
                      <span className="mt-0.5 block text-[11px] text-zinc-500">{s.priceRange}</span>
                    </span>
                    <span
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors ${
                        active ? "border-violet-300 bg-violet-400 text-zinc-950" : "border-white/20"
                      }`}
                    >
                      {active && <Check className="h-3 w-3" strokeWidth={3} />}
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          {/* 2. Budget */}
          <fieldset>
            <legend className="mb-4 w-full">
              <StepLabel step={2}>Omtrentlig budsjett</StepLabel>
            </legend>
            <div className="flex flex-wrap gap-2">
              {BUDGETS.map((b) => {
                const active = budget === b;
                return (
                  <button
                    type="button"
                    key={b}
                    onClick={() => setBudget(b)}
                    aria-pressed={active}
                    className={`relative rounded-full px-4 py-2.5 text-xs font-semibold transition-colors ${
                      active ? "text-zinc-950" : "border border-white/10 text-zinc-300 hover:border-white/25"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId={`${uid}-budget`}
                        className="absolute inset-0 rounded-full bg-white"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}
                    <span className="relative">{b}</span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          {/* 3. Contact details */}
          <fieldset>
            <legend className="mb-4 w-full">
              <StepLabel step={3}>Hvem er du?</StepLabel>
            </legend>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label htmlFor={`${uid}-name`} className="text-xs font-medium text-zinc-400">
                  Navn *
                </label>
                <input id={`${uid}-name`} required autoComplete="name" placeholder="Kari Nordmann" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
              </div>
              <div className="space-y-1.5">
                <label htmlFor={`${uid}-company`} className="text-xs font-medium text-zinc-400">
                  Bedrift
                </label>
                <input id={`${uid}-company`} autoComplete="organization" placeholder="Bedrift AS" value={company} onChange={(e) => setCompany(e.target.value)} className={inputClass} />
              </div>
              <div className="space-y-1.5">
                <label htmlFor={`${uid}-email`} className="text-xs font-medium text-zinc-400">
                  E-post *
                </label>
                <input id={`${uid}-email`} type="email" required autoComplete="email" placeholder="kari@bedrift.no" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
              </div>
              <div className="space-y-1.5">
                <label htmlFor={`${uid}-phone`} className="text-xs font-medium text-zinc-400">
                  Telefon
                </label>
                <input id={`${uid}-phone`} type="tel" autoComplete="tel" placeholder="+47 900 00 000" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} />
              </div>
            </div>
          </fieldset>

          {/* 4. Project */}
          <fieldset>
            <legend className="mb-4 w-full">
              <StepLabel step={4} htmlFor={`${uid}-message`}>
                Fortell litt om prosjektet
              </StepLabel>
            </legend>
            <textarea
              id={`${uid}-message`}
              rows={4}
              placeholder="Hva ønsker du å oppnå? Har du en nettside i dag? Er det en frist vi bør vite om?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={`${inputClass} resize-y leading-relaxed`}
            />
            <div className="mt-4 space-y-1.5">
              <label htmlFor={`${uid}-style`} className="text-xs font-medium text-zinc-400">
                Har du en favoritt fra Design Showcase? (valgfritt)
              </label>
              <select
                id={`${uid}-style`}
                value={style}
                onChange={(e) => setStyle(e.target.value as StyleId | typeof NO_STYLE)}
                className={`${inputClass} appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='%23a1a1aa' stroke-width='2'%3E%3Cpath d='m4 6 4 4 4-4'/%3E%3C/svg%3E")] bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10`}
              >
                <option value={NO_STYLE} className="bg-zinc-900 text-zinc-100">
                  Ingen preferanse – vi foreslår noe
                </option>
                {DESIGN_STYLES.map((st) => (
                  <option key={st.id} value={st.id} className="bg-zinc-900 text-zinc-100">
                    {st.name}
                  </option>
                ))}
              </select>
            </div>
          </fieldset>

          <div className="space-y-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-6 py-4 text-sm font-semibold text-zinc-950 shadow-[0_10px_40px_-10px_rgba(167,139,250,0.8)] transition hover:shadow-[0_10px_50px_-6px_rgba(167,139,250,0.95)] active:scale-[0.99] disabled:opacity-60"
            >
              <span className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-violet-200/70 to-transparent animate-shine" />
              <span className="relative">{isSubmitting ? "Klargjør …" : "Send henvendelse"}</span>
              <ArrowRight className="relative h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <p className="text-center text-[11px] text-zinc-500">
              Uforpliktende. Vi bruker opplysningene bare til å svare deg.
            </p>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
};
