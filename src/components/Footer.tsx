import React from "react";
import { motion } from "motion/react";
import { useDesignStyle } from "../context/DesignStyleContext";
import { ArrowUpRight, Shield, Award, HeartHandshake } from "lucide-react";
import { SubPage } from "../types";

const NAV_LINKS: { id: SubPage; label: string }[] = [
  { id: "home", label: "Hjem" },
  { id: "about", label: "Om oss" },
  { id: "design-showcase", label: "Design Showcase" },
  { id: "contact", label: "Kontakt" },
];

export const Footer: React.FC = () => {
  const { activeStyle, setCurrentSubPage } = useDesignStyle();
  const isSignature = activeStyle.id === "widevig-signature";

  return (
    <footer className={`relative mt-24 overflow-hidden border-t ${activeStyle.surfaceBorder} transition-colors duration-300`}>
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand + CTA */}
          <div className="space-y-6 lg:col-span-6">
            <h3 className={`max-w-md font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl ${activeStyle.textPrimary}`}>
              Har du et prosjekt i tankene?
            </h3>
            <a
              href="mailto:axel@widevig.no"
              className={`group inline-flex items-center gap-2 font-display text-xl font-semibold ${activeStyle.textPrimary}`}
            >
              <span className="relative">
                axel@widevig.no
                <span className="absolute -bottom-1 left-0 h-px w-full bg-current opacity-30 transition-opacity duration-500 group-hover:opacity-100" />
              </span>
              <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </a>
            <p className={`max-w-sm text-sm leading-relaxed ${activeStyle.textSecondary}`}>
              Widevig Digital er et digitalt byrå under <strong>Widevig AS</strong>. Vi leverer webdesign,
              utvikling og IT-rådgivning til bedrifter i hele Norge.
            </p>
          </div>

          {/* Nav */}
          <div className="space-y-4 lg:col-span-3">
            <h4 className={`text-xs font-semibold uppercase tracking-[0.2em] ${activeStyle.textSecondary}`}>Meny</h4>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((item) => (
                <li key={item.id}>
                  <button
                    id={`footer-link-${item.id}`}
                    onClick={() => setCurrentSubPage(item.id)}
                    className={`group inline-flex items-center gap-1 text-sm ${activeStyle.textPrimary} opacity-80 transition-opacity hover:opacity-100`}
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Availability */}
          <div className="space-y-4 lg:col-span-3">
            <h4 className={`text-xs font-semibold uppercase tracking-[0.2em] ${activeStyle.textSecondary}`}>Status</h4>
            <div className={`space-y-2.5 text-sm ${activeStyle.textSecondary}`}>
              <p className="flex items-center gap-2 font-medium text-emerald-600 dark:text-emerald-400">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Åpen for nye oppdrag
              </p>
              <p>100 % digitalt · Hele Norge</p>
              <p>Svar innen 24 timer</p>
            </div>
          </div>
        </div>

        {/* Guarantees */}
        <div className={`mt-16 grid grid-cols-1 gap-6 border-t pt-8 md:grid-cols-3 ${activeStyle.surfaceBorder}`}>
          {[
            { icon: Shield, color: "text-violet-500 dark:text-violet-300", text: "Bygget etter WCAG 2.1 AA og GDPR" },
            { icon: Award, color: "text-amber-500 dark:text-amber-300", text: "Skandinavisk UX og moderne arkitektur" },
            { icon: HeartHandshake, color: "text-emerald-500 dark:text-emerald-300", text: "Direkte kontakt med de som bygger løsningen" },
          ].map(({ icon: Icon, color, text }) => (
            <div key={text} className="flex items-center gap-3">
              <Icon className={`h-5 w-5 shrink-0 ${color}`} />
              <span className={`text-xs ${activeStyle.textSecondary}`}>{text}</span>
            </div>
          ))}
        </div>

        {/* Giant wordmark */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none mt-16 select-none text-center"
          aria-hidden
        >
          <span
            className={`block font-display text-[19vw] font-extrabold leading-[0.8] tracking-[-0.06em] lg:text-[15rem] ${
              isSignature
                ? "bg-gradient-to-b from-white/20 to-white/0 bg-clip-text text-transparent"
                : `${activeStyle.textPrimary} opacity-10`
            }`}
          >
            Widevig
          </span>
        </motion.div>

        {/* Copyright */}
        <div className={`mt-6 flex flex-col items-center justify-between gap-4 text-xs sm:flex-row ${activeStyle.textSecondary}`}>
          <p>© {new Date().getFullYear()} Widevig AS. Alle rettigheter reservert.</p>
          <p>En del av Widevig AS</p>
        </div>
      </div>
    </footer>
  );
};
