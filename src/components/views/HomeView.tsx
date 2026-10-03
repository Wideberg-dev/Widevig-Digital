import React, { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useDesignStyle } from "../../context/DesignStyleContext";
import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Check,
  Gauge,
  Globe,
  Layers,
  MousePointerClick,
  Palette,
  Rocket,
  ShieldCheck,
  Sparkles,
  Timer,
  Wand2,
} from "lucide-react";
import { DESIGN_STYLES, SERVICES } from "../../data/mockData";
import { SERVICE_ICONS } from "../../data/serviceIcons";
import {
  Aurora,
  CountUp,
  Eyebrow,
  GhostButton,
  Marquee,
  Reveal,
  ShineButton,
  SpotlightCard,
  WordRotator,
  WordsReveal,
} from "../ui/Motion";


const MARQUEE_ITEMS = [
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Figma",
  "Motion design",
  "SEO",
  "WCAG 2.1 AA",
  "AI-integrasjon",
  "AWS, Azure & Google Cloud",
  "GitHub",
  "IT-sikkerhet",
];

const PROCESS_STEPS = [
  {
    icon: MousePointerClick,
    title: "Oppdagelse",
    time: "Dag 1–3",
    text: "En gratis strategiprat der vi kartlegger mål, målgruppe og konkurrenter. Du får et fastpristilbud innen 24 timer.",
  },
  {
    icon: Palette,
    title: "Design",
    time: "Uke 1–2",
    text: "Vi skisserer og designer i Figma med deg tett på. Du ser og klikker deg gjennom siden før en eneste linje kode skrives.",
  },
  {
    icon: Layers,
    title: "Utvikling",
    time: "Uke 2–4",
    text: "Skreddersydd kode i React og TypeScript – lynrask, tilgjengelig og SEO-optimalisert fra første dag.",
  },
  {
    icon: Rocket,
    title: "Lansering & vekst",
    time: "Løpende",
    text: "Vi lanserer, følger opp og forbedrer. Du får kildekoden og en partner som svarer raskt.",
  },
];

export const HomeView: React.FC = () => {
  const { setCurrentSubPage, setQuoteModalOpen } = useDesignStyle();
  const openQuote = () => setQuoteModalOpen(true);

  return (
    <div id="home-view" className="relative">
      <Hero onQuote={openQuote} onShowcase={() => setCurrentSubPage("design-showcase")} />

      {/* Technology ticker */}
      <section className="relative border-y border-white/5 bg-white/[0.015] py-7" aria-label="Teknologier vi bruker">
        <Marquee>
          {MARQUEE_ITEMS.map((item) => (
            <span
              key={item}
              className="mx-8 flex items-center gap-8 font-display text-xl font-semibold tracking-tight text-zinc-500 transition-colors hover:text-white sm:text-2xl"
            >
              {item}
              <Sparkles className="h-4 w-4 text-violet-400/60" />
            </span>
          ))}
        </Marquee>
      </section>

      <div className="mx-auto max-w-7xl space-y-32 px-4 py-28 sm:px-6 sm:py-36 lg:px-8">
        <WhySection />
        <ServicesSection onQuote={openQuote} />
        <ProcessSection />
        <ShowcaseTeaser onShowcase={() => setCurrentSubPage("design-showcase")} />
        <OpenSlotsSection onQuote={openQuote} />
        <FinalCta onQuote={openQuote} onContact={() => setCurrentSubPage("contact")} />
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Hero                                                               */
/* ------------------------------------------------------------------ */

const Hero: React.FC<{ onQuote: () => void; onShowcase: () => void }> = ({ onQuote, onShowcase }) => {
  const mx = useMotionValue(-1000);
  const my = useMotionValue(-1000);
  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${mx}px ${my}px, rgba(167,139,250,0.12), transparent 70%)`;

  const mockRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: mockRef, offset: ["start end", "center center"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const rotateX = useTransform(smooth, [0, 1], [28, 0]);
  const scale = useTransform(smooth, [0, 1], [0.88, 1]);
  const mockOpacity = useTransform(smooth, [0, 0.4], [0.4, 1]);

  return (
    <section
      className="relative isolate overflow-hidden pt-16 sm:pt-24"
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mx.set(e.clientX - rect.left);
        my.set(e.clientY - rect.top);
      }}
    >
      <Aurora />
      <div className="pointer-events-none absolute inset-0 bg-grid" aria-hidden />
      <motion.div className="pointer-events-none absolute inset-0" style={{ background: spotlight }} aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              onClick={onQuote}
              className="group inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] py-1.5 pl-2 pr-4 text-xs font-medium text-zinc-300 backdrop-blur-md transition-colors hover:border-white/25"
            >
              <span className="flex items-center gap-1.5 rounded-full bg-emerald-400/15 px-2.5 py-1 text-[11px] font-semibold text-emerald-300">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                Ledig
              </span>
              Tar inn nye prosjekter nå
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </motion.div>

          <h1 className="mt-8 font-display text-[2.6rem] font-extrabold leading-[1.02] tracking-[-0.035em] text-white sm:text-7xl lg:text-[5.6rem]">
            <WordsReveal text="Nettsider som får kundene dine til å si" delay={0.15} />{" "}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75, duration: 0.6 }}
              className="inline-block"
            >
              <WordRotator
                words={["wow.", "ja takk.", "når starter vi?"]}
                className="text-gradient italic pr-[0.08em]"
              />
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg"
          >
            Widevig Digital designer og koder skreddersydde nettsider som laster på et blunk, ser
            fantastiske ut og gjør besøkende om til betalende kunder. Ingen maler. Ingen overraskelser.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
          >
            <ShineButton id="hero-request-quote-btn" onClick={onQuote}>
              Få et uforpliktende tilbud
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </ShineButton>
            <GhostButton id="hero-showcase-btn" onClick={onShowcase}>
              <Palette className="h-4 w-4 text-violet-300" />
              Utforsk 10 designstiler
            </GhostButton>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-zinc-500"
          >
            {["Svar innen 24 timer", "Fastpris – ingen skjulte kostnader", "Du får kildekoden"].map((t) => (
              <li key={t} className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                {t}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* 3D browser mockup that straightens out as you scroll */}
        <div ref={mockRef} className="relative mx-auto mt-16 max-w-6xl [perspective:1400px] sm:mt-20">
          <motion.div
            style={{ rotateX, scale, opacity: mockOpacity, transformOrigin: "center top" }}
            initial={{ y: 60 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.6, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="absolute -inset-x-10 -top-10 bottom-0 -z-10 rounded-[3rem] bg-gradient-to-b from-violet-600/30 via-fuchsia-500/10 to-transparent blur-3xl" />
            <BrowserMockup />
            <FloatingChip className="-left-4 top-[18%] sm:-left-10" delay={1.3} icon={Gauge} label="Ytelse" value="Rask lastetid" tone="emerald" />
            <FloatingChip className="-right-3 top-[44%] sm:-right-10" delay={1.5} icon={Globe} label="Synlighet" value="SEO fra start" tone="cyan" floatDelay="-2s" />
            <FloatingChip className="right-[12%] -top-7 hidden sm:flex" delay={1.7} icon={ShieldCheck} label="Bygget etter" value="WCAG 2.1 AA" tone="violet" floatDelay="-4s" />
          </motion.div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#07070c] to-transparent" />
    </section>
  );
};

const FloatingChip: React.FC<{
  className: string;
  delay: number;
  icon: React.ElementType;
  label: string;
  value: string;
  tone: "emerald" | "cyan" | "violet";
  floatDelay?: string;
}> = ({ className, delay, icon: Icon, label, value, tone, floatDelay }) => {
  const tones = {
    emerald: "bg-emerald-400/15 text-emerald-300",
    cyan: "bg-cyan-400/15 text-cyan-300",
    violet: "bg-violet-400/15 text-violet-300",
  };
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, type: "spring", stiffness: 180, damping: 16 }}
      className={`absolute z-20 flex ${className}`}
    >
      <div
        className="flex items-center gap-3 rounded-2xl border border-white/10 bg-zinc-900/70 py-2.5 pl-2.5 pr-4 shadow-2xl shadow-black/50 backdrop-blur-xl animate-float"
        style={{ animationDelay: floatDelay }}
      >
        <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${tones[tone]}`}>
          <Icon className="h-4.5 w-4.5" />
        </span>
        <span className="text-left leading-tight">
          <span className="block text-[10px] font-medium uppercase tracking-wider text-zinc-500">{label}</span>
          <span className="block font-display text-base font-bold text-white">{value}</span>
        </span>
      </div>
    </motion.div>
  );
};

/** A miniature, animated website rendered inside a browser frame */
const BrowserMockup: React.FC = () => (
  <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/80 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:rounded-3xl">
    {/* Browser chrome */}
    <div className="flex items-center gap-3 border-b border-white/5 bg-white/[0.03] px-4 py-3">
      <div className="flex gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
      </div>
      <div className="mx-auto flex w-full max-w-xs items-center justify-center gap-1.5 rounded-lg bg-white/[0.05] px-3 py-1 text-[11px] text-zinc-500">
        <ShieldCheck className="h-3 w-3 text-emerald-400" />
        dinbedrift.no
      </div>
      <div className="w-12" />
    </div>

    {/* Page content */}
    <div className="relative grid gap-4 p-4 sm:grid-cols-12 sm:gap-5 sm:p-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(124,58,237,0.25),transparent_55%)]" />

      <div className="relative space-y-4 sm:col-span-7">
        <div className="flex items-center gap-2">
          <span className="h-6 w-6 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-400" />
          <span className="h-2.5 w-20 rounded-full bg-white/20" />
          <span className="ml-auto hidden gap-3 sm:flex">
            {[0, 1, 2].map((i) => (
              <span key={i} className="h-2 w-10 rounded-full bg-white/10" />
            ))}
          </span>
        </div>
        <div className="space-y-2.5 pt-4 sm:pt-8">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "92%" }}
            transition={{ delay: 1.1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="h-5 rounded-lg bg-gradient-to-r from-white/80 to-white/40 sm:h-7"
          />
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "70%" }}
            transition={{ delay: 1.25, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="h-5 rounded-lg bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-300 sm:h-7"
          />
          <div className="space-y-1.5 pt-3">
            <span className="block h-2 w-full rounded-full bg-white/10" />
            <span className="block h-2 w-4/5 rounded-full bg-white/10" />
          </div>
        </div>
        <div className="flex gap-2 pt-2">
          <span className="h-8 w-28 rounded-full bg-white" />
          <span className="h-8 w-24 rounded-full border border-white/20" />
        </div>
      </div>

      <div className="relative hidden sm:col-span-5 sm:block">
        <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">Henvendelser</span>
            <span className="rounded-full bg-emerald-400/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">Live</span>
          </div>
          <div className="mt-6 flex h-32 items-end gap-2">
            {[30, 45, 38, 60, 52, 75, 68, 92].map((h, i) => (
              <motion.span
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: 1.3 + i * 0.07, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="flex-1 rounded-t-md bg-gradient-to-t from-violet-600/40 to-violet-300"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="relative grid grid-cols-3 gap-3 sm:col-span-12">
        {["from-violet-500/30", "from-fuchsia-500/25", "from-cyan-400/25"].map((g, i) => (
          <motion.div
            key={g}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 + i * 0.1, duration: 0.7 }}
            className={`h-16 rounded-xl border border-white/5 bg-gradient-to-br ${g} to-transparent p-3 sm:h-24`}
          >
            <span className="block h-2 w-1/2 rounded-full bg-white/25" />
            <span className="mt-2 block h-1.5 w-3/4 rounded-full bg-white/10" />
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/* Section heading                                                    */
/* ------------------------------------------------------------------ */

const SectionHeading: React.FC<{
  eyebrow: string;
  title: React.ReactNode;
  text?: string;
  note?: string;
  align?: "center" | "left";
}> = ({ eyebrow, title, text, note, align = "center" }) => (
  <Reveal className={`space-y-5 ${align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}`}>
    <Eyebrow>{eyebrow}</Eyebrow>
    <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl">
      {title}
    </h2>
    {text && <p className="text-base leading-relaxed text-zinc-400 sm:text-lg">{text}</p>}
    {note && <p className="text-[11px] leading-relaxed text-zinc-600">{note}</p>}
  </Reveal>
);

/* ------------------------------------------------------------------ */
/* Why Widevig – bento grid                                           */
/* ------------------------------------------------------------------ */

const WhySection: React.FC = () => (
  <section id="guarantees-template-section" className="space-y-14">
    <SectionHeading
      eyebrow="Hvorfor Widevig"
      title={
        <>
          Førsteinntrykket dannes på <span className="text-gradient">50 millisekunder</span>.
        </>
      }
      text="Så raskt danner besøkende seg et inntrykk av en nettside, viser forskning. Vi sørger for at inntrykket er godt, og at de tar kontakt."
      note="Kilde: Lindgaard mfl. (2006), «Attention web designers: You have 50 milliseconds to make a good first impression!», Behaviour & Information Technology 25(2)."
    />

    <div className="grid auto-rows-[minmax(220px,auto)] grid-cols-1 gap-4 md:grid-cols-6 md:gap-5">
      <Reveal className="md:col-span-4 md:row-span-2">
        <SpotlightCard className="h-full p-8 sm:p-10">
          <div className="flex h-full flex-col justify-between gap-10">
            <div className="max-w-md space-y-3">
              <Wand2 className="h-6 w-6 text-violet-300" />
              <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">
                Designet for å konvertere, ikke bare imponere
              </h3>
              <p className="text-sm leading-relaxed text-zinc-400">
                Hver seksjon, knapp og animasjon har én jobb: å lede besøkende mot en henvendelse.
                Vi kombinerer vakkert design med tydelig budskap og gjennomtenkte brukerreiser.
              </p>
            </div>
            <ConversionVisual />
          </div>
        </SpotlightCard>
      </Reveal>

      <Reveal className="md:col-span-2" delay={0.1}>
        <SpotlightCard className="h-full p-8" color="rgba(52, 211, 153, 0.16)">
          <div className="flex h-full flex-col justify-between gap-6">
            <Timer className="h-6 w-6 text-emerald-300" />
            <div>
              <p className="font-display text-6xl font-bold tracking-tight text-white">
                <CountUp to={24} />
                <span className="text-3xl text-zinc-500">t</span>
              </p>
              <p className="mt-2 text-sm text-zinc-400">Garantert svar på alle henvendelser – med konkret tilbud.</p>
            </div>
          </div>
        </SpotlightCard>
      </Reveal>

      <Reveal className="md:col-span-2" delay={0.2}>
        <SpotlightCard className="h-full p-8" color="rgba(34, 211, 238, 0.16)">
          <div className="flex h-full flex-col justify-between gap-6">
            <Gauge className="h-6 w-6 text-cyan-300" />
            <div>
              <p className="font-display text-6xl font-bold tracking-tight text-white">
                <CountUp to={100} />
                <span className="text-3xl text-zinc-500">%</span>
              </p>
              <p className="mt-2 text-sm text-zinc-400">Skreddersydd kode. Ingen ferdigmaler, ingen tunge sidebyggere.</p>
            </div>
          </div>
        </SpotlightCard>
      </Reveal>

      <Reveal className="md:col-span-3" delay={0.1}>
        <SpotlightCard className="h-full p-8" color="rgba(251, 191, 36, 0.12)">
          <div className="flex h-full flex-col justify-between gap-6">
            <Briefcase className="h-6 w-6 text-amber-300" />
            <div>
              <h3 className="font-display text-2xl font-bold text-white">Fastpris fra 4 500 kr</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                Tydelig budsjett og leveranseplan før vi starter. Du vet nøyaktig hva du får – og når.
              </p>
            </div>
          </div>
        </SpotlightCard>
      </Reveal>

      <Reveal className="md:col-span-3" delay={0.2}>
        <SpotlightCard className="h-full p-8" color="rgba(217, 70, 239, 0.14)">
          <div className="flex h-full flex-col justify-between gap-6">
            <ShieldCheck className="h-6 w-6 text-fuchsia-300" />
            <div>
              <h3 className="font-display text-2xl font-bold text-white">Sikkerhet i ryggmargen</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                Bygget av cyberingeniører. GDPR, universell utforming og moderne sikkerhetspraksis er standard – ikke tillegg.
              </p>
            </div>
          </div>
        </SpotlightCard>
      </Reveal>
    </div>
  </section>
);

/** Animated "visitor journey" funnel shown in the large bento card */
const ConversionVisual: React.FC = () => {
  const steps = [
    { label: "Besøk", width: "100%" },
    { label: "Engasjement", width: "78%" },
    { label: "Tillit", width: "58%" },
    { label: "Henvendelse", width: "42%" },
  ];
  return (
    <div className="space-y-2.5">
      {steps.map((s, i) => (
        <div key={s.label} className="flex items-center gap-4">
          <span className="w-24 shrink-0 text-xs text-zinc-500">{s.label}</span>
          <div className="h-3 flex-1 overflow-hidden rounded-full bg-white/5">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: s.width }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.15, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="h-full rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-400 to-cyan-300"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Services – expanding rows                                          */
/* ------------------------------------------------------------------ */

const ServicesSection: React.FC<{ onQuote: () => void }> = ({ onQuote }) => {
  const [open, setOpen] = useState<string | null>(SERVICES[0]?.id ?? null);

  return (
    <section id="featured-services" className="grid gap-14 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <div className="lg:sticky lg:top-32 space-y-8">
          <SectionHeading
            align="left"
            eyebrow="Tjenester"
            title="Alt du trenger for å vinne på nett."
            text="Fra første skisse til lansert nettside – og alt det tekniske rundt."
          />
          <Reveal delay={0.1}>
            <button
              onClick={onQuote}
              className="group inline-flex items-center gap-2 text-sm font-semibold text-white"
            >
              <span className="border-b border-white/30 pb-0.5 transition-colors group-hover:border-white">
                Få et tilbud på dine behov
              </span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>
          </Reveal>
        </div>
      </div>

      <div className="divide-y divide-white/10 border-y border-white/10 lg:col-span-8">
        {SERVICES.map((service, i) => {
          const Icon = SERVICE_ICONS[service.iconName] ?? Globe;
          const isOpen = open === service.id;
          return (
            <Reveal key={service.id} delay={i * 0.05} y={16}>
              <div className="group relative">
                <button
                  onClick={() => setOpen(isOpen ? null : service.id)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-5 py-7 text-left sm:gap-8"
                >
                  <span className="font-mono text-xs text-zinc-600">{String(i + 1).padStart(2, "0")}</span>
                  <span
                    className={`flex-1 font-display text-xl font-semibold tracking-tight transition-colors duration-300 sm:text-3xl ${
                      isOpen ? "text-white" : "text-zinc-500 group-hover:text-zinc-200"
                    }`}
                  >
                    {service.title}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0, backgroundColor: isOpen ? "#ffffff" : "rgba(255,255,255,0.04)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 ${
                      isOpen ? "text-zinc-950" : "text-white"
                    }`}
                  >
                    <ArrowUpRight className="h-4 w-4 -rotate-45" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-6 pb-8 pl-9 sm:grid-cols-[1fr_auto] sm:pl-14">
                        <div className="space-y-4">
                          <p className="max-w-xl text-sm leading-relaxed text-zinc-400">{service.shortDesc}</p>
                          <ul className="grid gap-2 sm:grid-cols-2">
                            {service.features.slice(0, 4).map((f) => (
                              <li key={f} className="flex items-start gap-2 text-xs text-zinc-300">
                                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-violet-300" />
                                {f}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="flex flex-row items-end justify-between gap-4 sm:flex-col sm:items-end">
                          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/30 to-cyan-400/20 text-white">
                            <Icon className="h-5 w-5" />
                          </span>
                          <div className="text-right">
                            <p className="font-display text-lg font-bold text-white">{service.priceRange}</p>
                            <p className="text-xs text-zinc-500">{service.typicalDuration}</p>
                          </div>
                          <button
                            onClick={onQuote}
                            className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-zinc-950 transition-transform hover:scale-105"
                          >
                            Bestill konsultasjon
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/* Process – scroll-linked timeline                                   */
/* ------------------------------------------------------------------ */

const ProcessSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const lineScale = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section className="space-y-16" id="process-section">
      <SectionHeading
        eyebrow="Slik jobber vi"
        title={
          <>
            Fra idé til lansering på <span className="text-gradient">få uker</span>.
          </>
        }
        text="En tydelig og trygg prosess der du alltid vet hva som skjer – og hva som kommer etterpå."
      />

      <div ref={ref} className="relative mx-auto max-w-4xl">
        <div className="absolute bottom-0 left-6 top-0 w-px bg-white/10 sm:left-1/2" />
        <motion.div
          style={{ scaleY: lineScale }}
          className="absolute bottom-0 left-6 top-0 w-px origin-top bg-gradient-to-b from-violet-400 via-fuchsia-400 to-cyan-300 shadow-[0_0_12px_rgba(167,139,250,0.8)] sm:left-1/2"
        />

        <div className="space-y-14 sm:space-y-20">
          {PROCESS_STEPS.map((step, i) => {
            const Icon = step.icon;
            const left = i % 2 === 0;
            return (
              <div key={step.title} className="relative grid items-center sm:grid-cols-2 sm:gap-16">
                <motion.span
                  initial={{ scale: 0.4, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-120px" }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  className="absolute left-6 top-1 z-10 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-2xl border border-white/15 bg-zinc-950 text-violet-200 shadow-[0_0_30px_-4px_rgba(139,92,246,0.7)] sm:left-1/2 sm:top-1/2 sm:-translate-y-1/2"
                >
                  <Icon className="h-5 w-5" />
                </motion.span>
                <Reveal
                  y={20}
                  className={`pl-16 sm:pl-0 ${left ? "sm:col-start-1 sm:text-right" : "sm:col-start-2"}`}
                >
                  <span className="font-mono text-xs uppercase tracking-widest text-violet-300/80">
                    {String(i + 1).padStart(2, "0")} · {step.time}
                  </span>
                  <h3 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400">{step.text}</p>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/* Design showcase teaser – fanned style cards                        */
/* ------------------------------------------------------------------ */

const STYLE_SWATCHES: Record<string, [string, string, string]> = {
  "nordic-minimalist": ["#f8fafc", "#0f172a", "#cbd5e1"],
  "cyberpunk-tech": ["#020617", "#06b6d4", "#3b82f6"],
  "corporate-glass": ["#1e1b4b", "#6366f1", "#3b82f6"],
  "warm-editorial": ["#faf8f5", "#78350f", "#d6d3d1"],
  "vibrant-pop": ["#fefce8", "#ec4899", "#0f172a"],
  "neumorphic-clean": ["#e0e5ec", "#64748b", "#ffffff"],
  "swiss-brutalist": ["#f4f4f5", "#dc2626", "#09090b"],
  "emerald-luxury": ["#022c22", "#fbbf24", "#065f46"],
  "sunset-vaporwave": ["#fff7ed", "#f97316", "#f43f5e"],
  "midnight-indigo": ["#0f172a", "#3b82f6", "#334155"],
};

const ShowcaseTeaser: React.FC<{ onShowcase: () => void }> = ({ onShowcase }) => {
  const cards = DESIGN_STYLES.slice(0, 7);
  const mid = (cards.length - 1) / 2;

  return (
    <section id="design-style-teaser-banner">
      <SpotlightCard className="px-6 py-16 sm:px-12 sm:py-20" color="rgba(139, 92, 246, 0.14)">
        <div className="pointer-events-none absolute right-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(139,92,246,0.3),transparent)] blur-2xl" aria-hidden />
        <div className="relative grid items-center gap-16 lg:grid-cols-2">
          <div className="space-y-6">
            <Eyebrow>
              <Palette className="h-3.5 w-3.5" /> Design Showcase
            </Eyebrow>
            <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl">
              Ti stiler. Ett klikk. <span className="text-gradient">Din favoritt.</span>
            </h2>
            <p className="max-w-md text-base leading-relaxed text-zinc-400">
              Usikker på hvilken stil som passer merkevaren din? Bytt mellom ti ferdige designspråk og
              se hele nettsiden forvandle seg live – fra nordisk minimalisme til neon-tech.
            </p>
            <ShineButton onClick={onShowcase}>
              Åpne Design Showcase
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </ShineButton>
          </div>

          <motion.button
            onClick={onShowcase}
            initial="rest"
            whileHover="hover"
            whileInView="shown"
            viewport={{ once: true, margin: "-100px" }}
            className="relative mx-auto h-72 w-full max-w-md sm:h-80"
            aria-label="Åpne Design Showcase"
          >
            {cards.map((style, i) => {
              const offset = i - mid;
              const [bg, accent, muted] = STYLE_SWATCHES[style.id] ?? ["#18181b", "#8b5cf6", "#3f3f46"];
              return (
                <motion.div
                  key={style.id}
                  variants={{
                    rest: { rotate: 0, x: 0, y: 40, opacity: 0 },
                    shown: { rotate: offset * 6, x: offset * 26, y: Math.abs(offset) * 8, opacity: 1 },
                    hover: { rotate: offset * 10, x: offset * 46, y: Math.abs(offset) * 14, opacity: 1 },
                  }}
                  transition={{ type: "spring", stiffness: 160, damping: 18, delay: i * 0.04 }}
                  style={{ zIndex: 10 - Math.abs(Math.round(offset)), backgroundColor: bg }}
                  className="absolute left-1/2 top-4 h-60 w-44 -ml-22 origin-bottom overflow-hidden rounded-2xl border border-white/15 p-3 text-left shadow-2xl shadow-black/60 sm:h-64 sm:w-48 sm:-ml-24"
                >
                  <div className="h-20 rounded-lg" style={{ background: `linear-gradient(135deg, ${accent}, ${muted})` }} />
                  <div className="mt-3 h-2 w-3/4 rounded-full" style={{ backgroundColor: accent, opacity: 0.8 }} />
                  <div className="mt-2 h-1.5 w-full rounded-full" style={{ backgroundColor: muted, opacity: 0.6 }} />
                  <div className="mt-1.5 h-1.5 w-2/3 rounded-full" style={{ backgroundColor: muted, opacity: 0.6 }} />
                  <div className="absolute inset-x-3 bottom-3 rounded-lg bg-black/55 px-2.5 py-2 backdrop-blur-md">
                    <p className="truncate text-[11px] font-semibold text-white">{style.name}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.button>
        </div>
      </SpotlightCard>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/* Open project slots                                                 */
/* ------------------------------------------------------------------ */

const OpenSlotsSection: React.FC<{ onQuote: () => void }> = ({ onQuote }) => {
  const slots = [
    {
      tag: "Prosjektplass #1",
      title: "Ny nettside & UX-redesign",
      text: "Din nye nettside – designet, kodet og lansert. Her viser vi frem resultatene når vi er ferdige.",
      gradient: "from-violet-600/40 via-fuchsia-500/20",
    },
    {
      tag: "Prosjektplass #2",
      title: "Nettbutikk, webapp eller AI-løsning",
      text: "Har du et større prosjekt? Vi tar også på oss nettbutikker, webapper og AI-løsninger.",
      gradient: "from-cyan-500/35 via-blue-500/15",
    },
  ];

  return (
    <section id="portfolio-template-section" className="space-y-14">
      <SectionHeading
        eyebrow="Ledig kapasitet"
        title={
          <>
            Ditt prosjekt kan bli <span className="text-gradient">neste case her</span>.
          </>
        }
        text="Vi er et lite byrå. Det betyr full oppmerksomhet på prosjektet ditt og direkte kontakt med de som bygger det."
      />

      <div className="grid gap-5 md:grid-cols-2">
        {slots.map((slot, i) => (
          <Reveal key={slot.tag} delay={i * 0.1}>
            <motion.button
              onClick={onQuote}
              whileHover="hover"
              className="group relative block w-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-2 text-left"
            >
              <div className={`relative h-64 overflow-hidden rounded-[1.25rem] bg-gradient-to-br ${slot.gradient} to-transparent sm:h-72`}>
                <div className="absolute inset-0 bg-grid opacity-60" />
                <motion.div
                  variants={{ hover: { scale: 1.06, rotate: -2 } }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="flex h-28 w-28 items-center justify-center rounded-full border border-dashed border-white/30 bg-white/5 backdrop-blur-sm">
                    <span className="font-display text-sm font-semibold text-white/80">Din logo</span>
                  </div>
                </motion.div>
                <span className="absolute left-4 top-4 rounded-full bg-black/40 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-md">
                  {slot.tag}
                </span>
                <span className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-emerald-400/15 px-3 py-1 text-[11px] font-semibold text-emerald-300 backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Ledig
                </span>
              </div>
              <div className="flex items-end justify-between gap-6 p-5 sm:p-6">
                <div>
                  <h3 className="font-display text-2xl font-bold text-white">{slot.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{slot.text}</p>
                </div>
                <motion.span
                  variants={{ hover: { rotate: 45, scale: 1.1 } }}
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-zinc-950"
                >
                  <ArrowUpRight className="h-5 w-5" />
                </motion.span>
              </div>
            </motion.button>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/* Final call to action                                               */
/* ------------------------------------------------------------------ */

const FinalCta: React.FC<{ onQuote: () => void; onContact: () => void }> = ({ onQuote, onContact }) => (
  <section id="contact-teaser">
    <Reveal>
      <div className="relative isolate overflow-hidden rounded-[2.5rem] border border-white/10 px-6 py-20 text-center sm:px-16 sm:py-28">
        <div className="absolute inset-0 -z-10 bg-[#0b0b14]" />
        <div className="absolute left-1/2 top-1/2 -z-10 h-[140%] w-[140%] -translate-x-1/2 -translate-y-1/2 animate-spin-slow bg-[conic-gradient(from_0deg,transparent_0deg,rgba(139,92,246,0.35)_60deg,transparent_120deg,rgba(34,211,238,0.25)_200deg,transparent_260deg,rgba(217,70,239,0.3)_320deg,transparent_360deg)] blur-3xl" />
        <div className="absolute inset-0 -z-10 bg-grid opacity-50" />

        <Eyebrow>
          <Sparkles className="h-3.5 w-3.5" /> Gratis strategiprat
        </Eyebrow>
        <h2 className="mx-auto mt-6 max-w-4xl font-display text-4xl font-extrabold leading-[1.02] tracking-[-0.035em] text-white sm:text-6xl lg:text-7xl">
          La oss bygge noe folk <span className="text-gradient italic">husker</span>.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
          Fortell oss kort om prosjektet ditt. Du får et konkret, uforpliktende tilbud innen 24 timer.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <ShineButton onClick={onQuote} className="px-9 py-5 text-base">
            Start prosjektet ditt
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </ShineButton>
          <GhostButton onClick={onContact} className="px-9 py-5 text-base">
            Kontakt oss
          </GhostButton>
        </div>
        <p className="mt-8 text-xs text-zinc-500">
          Eller send en e-post direkte til{" "}
          <a href="mailto:axel@widevig.no" className="text-zinc-300 underline-offset-4 hover:underline">
            axel@widevig.no
          </a>
        </p>
      </div>
    </Reveal>
  </section>
);
