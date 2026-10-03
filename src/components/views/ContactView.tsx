import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Clock, Copy, Globe, Mail, Plus } from "lucide-react";
import { InquiryForm } from "../InquiryForm";
import { Eyebrow, Reveal, WordsReveal } from "../ui/Motion";

const EMAIL = "axel@widevig.no";

const FAQS = [
  {
    q: "Hvor lang tid tar et prosjekt?",
    a: "Det avhenger av omfanget. En nettside tar vanligvis 2 til 5 uker, mens større IKT- eller skyprosjekter tar noe lenger. Du får en konkret tidsplan sammen med tilbudet.",
  },
  {
    q: "Hva koster det?",
    a: "Prisene starter på 3 500 kr for rådgivning og 4 500 kr for nettsider. Etter en kort prat får du et fastpristilbud, så du vet hva det koster før vi starter.",
  },
  {
    q: "Hva er et designsystem, og trenger vi det?",
    a: "Et designsystem samler farger, typografi, ikoner og gjenbrukbare komponenter på ett sted. Det gjør det enklere å holde et konsistent uttrykk og å bygge videre senere. For en enkel nettside er det ofte ikke nødvendig, og vi anbefaler det bare når det lønner seg for deg.",
  },
  {
    q: "Kan vi endre visuell stil underveis?",
    a: "Ja. Vi bygger med design-tokens, så farger, fonter og former kan justeres uten å bygge grensesnittet på nytt.",
  },
  {
    q: "Hvordan håndterer dere personvern og universell utforming?",
    a: "Vi bygger etter kravene i WCAG 2.1 AA og GDPR fra start, ikke som et tillegg til slutt. Vi går gjennom hva det betyr for akkurat din løsning i oppstarten.",
  },
  {
    q: "Hvordan foregår samarbeidet?",
    a: "Alt skjer digitalt, med videomøter og delte verktøy som Figma og GitHub. Du har direkte kontakt med Axel og Maren, som også er de som planlegger og bygger løsningen.",
  },
];

export const ContactView: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked; the address is selectable text as a fallback
    }
  };

  return (
    <div className="space-y-28" id="contact-view">
      {/* Header */}
      <div className="mx-auto max-w-3xl space-y-6 pt-6 text-center">
        <Eyebrow>Kontakt</Eyebrow>
        <h1 className="font-display text-5xl font-extrabold leading-[1.02] tracking-[-0.035em] text-white sm:text-7xl">
          <WordsReveal text="La oss snakke om" />{" "}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-gradient italic pr-[0.08em]"
          >
            prosjektet ditt.
          </motion.span>
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="mx-auto max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg"
        >
          Fyll ut skjemaet, så får du et uforpliktende tilbud innen 24 timer. Foretrekker du e-post, skriv
          direkte til oss.
        </motion.p>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Form */}
        <Reveal className="lg:col-span-8">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl sm:p-10">
            <InquiryForm source="ContactView" />
          </div>
        </Reveal>

        {/* Sidebar */}
        <div className="space-y-4 lg:col-span-4">
          <Reveal delay={0.1}>
            <div className="space-y-5 rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
              <h2 className="font-display text-lg font-semibold text-white">Direkte kontakt</h2>
              <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/20 p-3">
                <a href={`mailto:${EMAIL}`} className="flex min-w-0 items-center gap-3 text-sm text-white">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300">
                    <Mail className="h-4 w-4" />
                  </span>
                  <span className="truncate select-all">{EMAIL}</span>
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  aria-label="Kopier e-postadressen"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-zinc-400 transition hover:bg-white/10 hover:text-white"
                >
                  {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
              <div className="flex items-center gap-3 text-sm text-zinc-300">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                  <Globe className="h-4 w-4" />
                </span>
                100 % digitalt, hele Norge
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="space-y-3 rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
              <div className="flex items-center gap-2 text-sm font-semibold text-emerald-300">
                <Clock className="h-4 w-4" /> Svar innen 24 timer
              </div>
              <p className="text-sm leading-relaxed text-zinc-400">
                Vi svarer på alle henvendelser innen 24 timer på hverdager.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="space-y-4 rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
              <h2 className="font-display text-lg font-semibold text-white">Hva skjer etterpå?</h2>
              <ol className="space-y-3">
                {[
                  "Vi leser henvendelsen og tar kontakt.",
                  "En kort, gratis prat om mål og behov.",
                  "Du får et fastpristilbud og en tidsplan.",
                ].map((step, i) => (
                  <li key={step} className="flex gap-3 text-sm text-zinc-300">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 font-mono text-[11px] text-violet-200">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </div>

      {/* FAQ */}
      <section className="grid gap-10 lg:grid-cols-12" id="faq">
        <Reveal className="space-y-5 lg:col-span-4">
          <Eyebrow>Spørsmål og svar</Eyebrow>
          <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl">
            Lurer du på noe?
          </h2>
          <p className="text-sm leading-relaxed text-zinc-400">
            Finner du ikke svaret her, send oss en e-post.
          </p>
        </Reveal>

        <div className="divide-y divide-white/10 border-y border-white/10 lg:col-span-8">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={faq.q}>
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span
                    className={`font-display text-lg font-semibold transition-colors sm:text-xl ${
                      isOpen ? "text-white" : "text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    {faq.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 ${
                      isOpen ? "bg-white text-zinc-950" : "text-white"
                    }`}
                  >
                    <Plus className="h-4 w-4" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-6 text-sm leading-relaxed text-zinc-400">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
