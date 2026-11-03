import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP, isDesktop, prefersReducedMotion } from "../../lib/gsap";
import { IMG } from "../../lib/content";

const ROUTE_D =
  "M -20 660 C 120 640, 110 600, 200 600 C 320 600, 360 420, 520 420 C 680 420, 760 500, 900 470 C 1040 440, 1100 300, 1240 300 C 1300 300, 1380 290, 1460 270";

const WAYPOINTS = [
  { x: 13.9, y: 66.7, title: "Mumbai, India", meta: "18.9°N · 72.8°E", at: 0.1 },
  { x: 36.1, y: 46.7, title: "Dubai, UAE", meta: "25.2°N · 55.3°E", at: 0.36 },
  { x: 62.5, y: 52.2, title: "Hamburg, Europe", meta: "53.6°N · 10.0°E", at: 0.62 },
  { x: 86.1, y: 33.3, title: "London, United Kingdom", meta: "51.5°N · 0.1°W", at: 0.86 },
];

const STATEMENTS = [
  {
    title: "Every voyage begins at a single port.",
    body: "From Navi Mumbai, our team coordinates bookings, documentation and vessel schedules.",
  },
  {
    title: "We chart the route, then keep it on schedule.",
    body: "Port windows, customs codes and carrier coordination handled in parallel, not in sequence.",
  },
  {
    title: "Until it reaches your door.",
    body: "Door-to-door delivery managed by one accountable team from pickup to final destination.",
  },
];

export default function ShipJourney() {
  // Pinned, scroll-driven journey on large screens with motion enabled; static stacked layout otherwise.
  const [pinned] = useState(() => isDesktop() && !prefersReducedMotion());

  const root = useRef<HTMLElement>(null);
  const ship = useRef<HTMLImageElement>(null);
  const path = useRef<SVGPathElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const readout = useRef<HTMLParagraphElement>(null);
  const markers = useRef<(HTMLDivElement | null)[]>([]);
  const statements = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      if (!pinned || !root.current || !ship.current || !path.current) return;

      const statementEls = statements.current.filter(Boolean) as HTMLDivElement[];
      const markerEls = markers.current.filter(Boolean) as HTMLDivElement[];

      // Initial states
      gsap.set(statementEls.slice(1), { opacity: 0, y: 50 });
      gsap.set(statementEls[0], { opacity: 1, y: 0 });
      gsap.set(markerEls, { opacity: 0, scale: 0.4 });
      gsap.set(path.current, { strokeDasharray: 1, strokeDashoffset: 1 });

      const tl = gsap.timeline({ defaults: { ease: "none" } });

      // Camera pans along the vessel's track
      tl.fromTo(ship.current, { xPercent: 4, scale: 1.12 }, { xPercent: -4, scale: 1.02, duration: 1 }, 0);

      // Route draws itself across the viewport
      tl.fromTo(path.current, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1 }, 0);

      // Port markers appear as the vessel passes them
      WAYPOINTS.forEach((w, i) => {
        const el = markerEls[i];
        if (!el) return;
        tl.to(el, { opacity: 1, scale: 1, duration: 0.04, ease: "back.out(2)" }, w.at);
      });

      // Statements cross-fade
      const windows: [number, number][] = [
        [0.02, 0.3],
        [0.36, 0.6],
        [0.7, 1],
      ];
      statementEls.forEach((el, i) => {
        const [start, end] = windows[i];
        if (i > 0) tl.to(el, { opacity: 1, y: 0, duration: 0.07, ease: "power2.out" }, start);
        if (i < statementEls.length - 1) tl.to(el, { opacity: 0, y: -40, duration: 0.07, ease: "power2.in" }, end - 0.07);
      });

      // Progress rule
      tl.fromTo(bar.current, { scaleX: 0 }, { scaleX: 1, duration: 1 }, 0);

      ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: "+=260%",
        pin: true,
        scrub: 0.8,
        animation: tl,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (!readout.current) return;
          const p = self.progress;
          const lat = 18.9 + (51.5 - 18.9) * p;
          const lng = 72.8 + (-0.1 - 72.8) * p;
          readout.current.textContent = `${lat.toFixed(2)}°N  ·  ${Math.abs(lng).toFixed(2)}°${lng < 0 ? "W" : "E"}`;
        },
      });
    },
    { scope: root, dependencies: [pinned] }
  );

  return (
    <section
      ref={root}
      id="journey"
      aria-label="Container ship route"
      className={`relative overflow-hidden bg-navy text-white ${pinned ? "h-[100svh]" : ""}`}
    >
      {/* Ocean plate */}
      <div className={`absolute inset-0 overflow-hidden ${pinned ? "" : "min-h-[110svh]"}`}>
        <img
          ref={ship}
          src={IMG.journey}
          alt="Cargo ship on a calm sea, sailing along its route"
          loading="lazy"
          decoding="async"
          className="photo absolute left-[-10%] top-0 h-full w-[120%] max-w-none object-cover will-change-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/55 to-navy/25" aria-hidden />
        <div className="absolute inset-0 bg-navy/25" aria-hidden />

        {pinned && (
          <>
            <svg
              viewBox="0 0 1440 900"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full"
              aria-hidden
            >
              <path
                ref={path}
                d={ROUTE_D}
                pathLength={1}
                fill="none"
                stroke="rgba(245,247,248,0.85)"
                strokeWidth={1.2}
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            {WAYPOINTS.map((w, i) => (
              <div
                key={w.title}
                ref={(el) => {
                  markers.current[i] = el;
                }}
                className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${w.x}%`, top: `${w.y}%` }}
              >
                <span className="relative block h-3 w-3 rounded-full border border-white bg-navy">
                  <span className="absolute inset-[3px] rounded-full bg-white" />
                </span>
                <span className="absolute left-6 top-1/2 w-max -translate-y-1/2">
                  <span className="block text-[13px] font-semibold tracking-wide text-white">{w.title}</span>
                  <span className="mt-1 block font-sans text-[11px] tracking-[0.12em] text-white/60">{w.meta}</span>
                </span>
              </div>
            ))}

            <div className="absolute left-6 top-28 lg:left-12">
              <p className="eyebrow text-white/70">Route — illustrative voyage</p>
            </div>
            <div className="absolute bottom-10 right-6 text-right lg:right-12">
              <p className="eyebrow text-white/50">Vessel position</p>
              <p ref={readout} className="mt-2 font-sans text-sm tabular-nums tracking-wider text-white/85">
                18.90°N  ·  72.80°E
              </p>
            </div>
            <div className="absolute inset-x-6 bottom-0 h-px bg-white/15 lg:inset-x-12">
              <div ref={bar} className="h-px origin-left bg-signal" style={{ transform: "scaleX(0)" }} />
            </div>
          </>
        )}
      </div>

      {/* Statements */}
      <div
        className={
          pinned
            ? "absolute inset-0 z-20 flex items-end px-6 pb-28 lg:px-12"
            : "relative z-20 flex flex-col gap-16 px-6 pb-24 pt-40"
        }
      >
        {STATEMENTS.map((s, i) => (
          <div
            key={s.title}
            ref={(el) => {
              statements.current[i] = el;
            }}
            className={pinned ? "absolute bottom-28 left-6 right-6 max-w-3xl lg:left-12" : "max-w-3xl"}
          >
            <p className="eyebrow mb-6 text-white/55">
              0{i + 1} — Passage
            </p>
            <h2 className="display text-[clamp(2.4rem,5.4vw,5.6rem)] text-white">{s.title}</h2>
            <p className="mt-6 max-w-md text-[16px] leading-relaxed text-white/70">{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
