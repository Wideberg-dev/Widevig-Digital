import React, { useEffect, useRef, useState } from "react";
import {
  animate,
  AnimatePresence,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "motion/react";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/** Fades and lifts its children into place the first time they scroll into view */
export const Reveal: React.FC<{
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}> = ({ children, delay = 0, y = 28, className }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y, filter: "blur(6px)" }}
    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.8, delay, ease: EASE_OUT }}
  >
    {children}
  </motion.div>
);

/** Splits a headline into words that rise in one after another */
export const WordsReveal: React.FC<{ text: string; className?: string; delay?: number }> = ({
  text,
  className,
  delay = 0,
}) => (
  <span className={className}>
    {text.split(" ").map((word, i) => (
      <span key={i} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
        <motion.span
          className="inline-block"
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.9, delay: delay + i * 0.07, ease: EASE_OUT }}
        >
          {word}
          {" "}
        </motion.span>
      </span>
    ))}
  </span>
);

/** Cycles through words with a vertical slide */
export const WordRotator: React.FC<{ words: string[]; interval?: number; className?: string }> = ({
  words,
  interval = 2600,
  className,
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  return (
    <span className="relative inline-grid overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]">
      {/* Invisible copies reserve the width of the longest word so the line doesn't jump */}
      {words.map((w) => (
        <span key={w} aria-hidden className="invisible col-start-1 row-start-1">
          {w}
        </span>
      ))}
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[index]}
          className={`col-start-1 row-start-1 ${className ?? ""}`}
          initial={{ y: "100%", opacity: 0, filter: "blur(8px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-100%", opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

/** Card with a soft radial highlight that follows the pointer */
export const SpotlightCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  color?: string;
}> = ({ children, className = "", color = "rgba(139, 92, 246, 0.18)" }) => {
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const background = useMotionTemplate`radial-gradient(420px circle at ${x}px ${y}px, ${color}, transparent 70%)`;

  return (
    <div
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - rect.left);
        y.set(e.clientY - rect.top);
      }}
      onPointerLeave={() => {
        x.set(-400);
        y.set(-400);
      }}
      className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl transition-colors duration-500 hover:border-white/20 ${className}`}
    >
      <motion.div className="pointer-events-none absolute inset-0 z-0" style={{ background }} />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};

/** Button that is gently pulled towards the cursor */
export const MagneticButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & { strength?: number }
> = ({ children, className = "", strength = 0.3, ...props }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useSpring(0, { stiffness: 220, damping: 15, mass: 0.4 });
  const y = useSpring(0, { stiffness: 220, damping: 15, mass: 0.4 });

  return (
    <motion.button
      ref={ref}
      style={{ x, y }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        x.set((e.clientX - rect.left - rect.width / 2) * strength);
        y.set((e.clientY - rect.top - rect.height / 2) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      whileTap={{ scale: 0.96 }}
      className={className}
      {...(props as React.ComponentProps<typeof motion.button>)}
    >
      {children}
    </motion.button>
  );
};

/** Primary call-to-action: white pill with a sweeping shine and glow */
export const ShineButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className = "",
  ...props
}) => (
  <MagneticButton
    className={`group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-7 py-4 text-sm font-semibold text-zinc-950 shadow-[0_0_0_1px_rgba(255,255,255,0.2),0_10px_40px_-10px_rgba(167,139,250,0.7)] transition-shadow duration-300 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.4),0_10px_60px_-6px_rgba(167,139,250,0.95)] ${className}`}
    {...props}
  >
    <span className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-violet-200/70 to-transparent animate-shine" />
    <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
  </MagneticButton>
);

/** Ghost button for secondary actions */
export const GhostButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className = "",
  ...props
}) => (
  <MagneticButton
    strength={0.2}
    className={`inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-7 py-4 text-sm font-semibold text-white backdrop-blur-md transition-colors duration-300 hover:border-white/30 hover:bg-white/[0.08] ${className}`}
    {...props}
  >
    {children}
  </MagneticButton>
);

/** Infinite horizontal ticker; children are rendered twice for a seamless loop */
export const Marquee: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => (
  <div
    className={`group relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)] ${className}`}
  >
    <div className="flex w-max shrink-0 animate-marquee items-center group-hover:[animation-play-state:paused]">
      <div className="flex shrink-0 items-center">{children}</div>
      <div className="flex shrink-0 items-center" aria-hidden>
        {children}
      </div>
    </div>
  </div>
);

/** Counts up from 0 when scrolled into view */
export const CountUp: React.FC<{ to: number; suffix?: string; prefix?: string; duration?: number }> = ({
  to,
  suffix = "",
  prefix = "",
  duration = 1.8,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: EASE_OUT,
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {value}
      {suffix}
    </span>
  );
};

/** Small uppercase label used above section headings */
export const Eyebrow: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => (
  <span
    className={`inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-violet-200/90 backdrop-blur-md ${className}`}
  >
    {children}
  </span>
);

/** Slow-moving coloured light blobs used behind hero sections */
export const Aurora: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
    <div className="absolute -top-[30%] left-[10%] h-[70vmax] w-[70vmax] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.38),transparent_60%)] blur-3xl animate-aurora" />
    <div
      className="absolute -top-[20%] right-[-15%] h-[60vmax] w-[60vmax] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.22),transparent_60%)] blur-3xl animate-aurora"
      style={{ animationDelay: "-6s", animationDuration: "22s" }}
    />
    <div
      className="absolute top-[30%] left-[-20%] h-[50vmax] w-[50vmax] rounded-full bg-[radial-gradient(circle,rgba(217,70,239,0.2),transparent_60%)] blur-3xl animate-aurora"
      style={{ animationDelay: "-12s", animationDuration: "26s" }}
    />
  </div>
);
