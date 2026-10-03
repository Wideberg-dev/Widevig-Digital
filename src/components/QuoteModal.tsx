import React, { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { useDesignStyle } from "../context/DesignStyleContext";
import { InquiryForm } from "./InquiryForm";
import { Eyebrow } from "./ui/Motion";

/** "Få et tilbud" dialog. Uses the same form and look as the Contact page, whatever style is active. */
export const QuoteModal: React.FC = () => {
  const { quoteModalOpen, setQuoteModalOpen } = useDesignStyle();
  const close = () => setQuoteModalOpen(false);

  // Close on Escape and lock page scroll while the dialog is open
  useEffect(() => {
    if (!quoteModalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setQuoteModalOpen(false);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [quoteModalOpen, setQuoteModalOpen]);

  return (
    <AnimatePresence>
      {quoteModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
          className="dark fixed inset-0 z-50 flex items-end justify-center bg-black/75 p-0 font-sans backdrop-blur-xl sm:items-center sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="quote-modal-title"
        >
          <motion.div
            initial={{ opacity: 0, y: 48, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 32, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-[2rem] border border-white/10 bg-[#0c0c14]/95 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.9)] sm:rounded-[2rem]"
            id="quote-modal-container"
          >
            {/* Brand glow */}
            <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[36rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(124,58,237,0.35),transparent)] blur-2xl" aria-hidden />

            <div className="relative space-y-8 p-6 sm:p-10">
              <div className="flex items-start justify-between gap-6">
                <div className="space-y-4">
                  <Eyebrow>Uforpliktende tilbud</Eyebrow>
                  <h2
                    id="quote-modal-title"
                    className="font-display text-3xl font-extrabold leading-[1.05] tracking-[-0.03em] text-white sm:text-4xl"
                  >
                    La oss snakke om <span className="text-gradient italic pr-[0.08em]">prosjektet ditt.</span>
                  </h2>
                  <p className="max-w-lg text-sm leading-relaxed text-zinc-400">
                    Fyll ut skjemaet, så får du et uforpliktende tilbud innen 24 timer.
                  </p>
                </div>
                <button
                  id="close-quote-modal-btn"
                  onClick={close}
                  aria-label="Lukk"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-zinc-300 transition hover:rotate-90 hover:border-white/30 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <InquiryForm source="QuoteModal" onDone={close} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
