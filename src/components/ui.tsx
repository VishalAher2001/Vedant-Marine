import { useRef, type ElementType, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "../lib/gsap";

/* ---------- Eyebrow label ---------- */
export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`eyebrow flex items-center gap-4 ${className}`}>
      <span className="h-px w-10 bg-current opacity-60" aria-hidden />
      {children}
    </p>
  );
}

/* ---------- Buttons / links ---------- */
type BtnProps = {
  to: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "light" | "dark";
  className?: string;
  onClick?: () => void;
};

const btnBase =
  "group inline-flex items-center gap-3 rounded-full px-7 py-4 text-sm font-semibold tracking-wide transition-all duration-500 ease-out";

const btnVariants: Record<NonNullable<BtnProps["variant"]>, string> = {
  primary: "bg-signal text-white hover:bg-white hover:text-navy",
  ghost: "border border-white/35 text-white hover:border-white hover:bg-white/10",
  light: "bg-white text-navy hover:bg-ice",
  dark: "bg-navy text-white hover:bg-ocean",
};

export function Btn({ to, children, variant = "primary", className = "", onClick }: BtnProps) {
  return (
    <Link to={to} onClick={onClick} className={`${btnBase} ${btnVariants[variant]} ${className}`}>
      {children}
      <ArrowUpRight
        size={17}
        strokeWidth={2}
        className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        aria-hidden
      />
    </Link>
  );
}

/* ---------- Masked line reveal (headings) ---------- */
type MaskLinesProps = {
  lines: string[];
  as?: ElementType;
  className?: string;
  lineClassName?: string;
  start?: string;
};

export function MaskLines({
  lines,
  as: Tag = "h2",
  className = "",
  lineClassName = "",
  start = "top 85%",
}: MaskLinesProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return;
      gsap.from(ref.current.querySelectorAll(".mask-line"), {
        yPercent: 110,
        duration: 1.3,
        ease: "power4.out",
        stagger: 0.12,
        scrollTrigger: { trigger: ref.current, start, once: true },
      });
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={className}>
      {lines.map((line) => (
        <span key={line} className={`block overflow-hidden pb-[0.1em] -mb-[0.1em] ${lineClassName}`}>
          <span className="mask-line block">{line}</span>
        </span>
      ))}
    </Tag>
  );
}

/* ---------- Clip-path image reveal with scale + parallax ---------- */
type ClipImageProps = {
  src: string;
  alt: string;
  className?: string;
  parallax?: number;
  eager?: boolean;
  position?: string;
};

export function ClipImage({ src, alt, className = "", parallax = 0, eager = false, position = "center" }: ClipImageProps) {
  const wrap = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !wrap.current || !img.current) return;
      const base = parallax ? 1.2 : 1;
      gsap.fromTo(
        wrap.current,
        { clipPath: "inset(0% 0% 100% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.8,
          ease: "power4.inOut",
          scrollTrigger: { trigger: wrap.current, start: "top 85%", once: true },
        }
      );
      gsap.fromTo(
        img.current,
        { scale: base + 0.22 },
        {
          scale: base,
          duration: 2.6,
          ease: "power2.out",
          scrollTrigger: { trigger: wrap.current, start: "top 85%", once: true },
        }
      );
      if (parallax) {
        gsap.fromTo(
          img.current,
          { yPercent: -parallax },
          {
            yPercent: parallax,
            ease: "none",
            scrollTrigger: { trigger: wrap.current, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
      }
    },
    { scope: wrap }
  );

  return (
    <div ref={wrap} className={`relative overflow-hidden ${className}`}>
      <img
        ref={img}
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        style={{ objectPosition: position }}
        className="photo absolute inset-0 h-full w-full origin-center object-cover will-change-transform"
      />
    </div>
  );
}

/* ---------- Scroll-scrubbed word reveal (editorial paragraphs) ---------- */
export function ScrubText({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");

  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return;
      gsap.fromTo(
        ref.current.querySelectorAll(".word"),
        { opacity: 0.14 },
        {
          opacity: 1,
          stagger: 0.12,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top 82%", end: "bottom 55%", scrub: true },
        }
      );
      ScrollTrigger.refresh();
    },
    { scope: ref }
  );

  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <span key={`${w}-${i}`} className="word inline-block">
          {w}
          {i < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </p>
  );
}

/* ---------- Thin divider ---------- */
export function Rule({ className = "" }: { className?: string }) {
  return <div className={`hairline w-full ${className}`} aria-hidden />;
}
