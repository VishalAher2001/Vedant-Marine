import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { gsap, useGSAP, isDesktop, prefersReducedMotion } from "../../lib/gsap";
import { SERVICES } from "../../lib/content";
import { ClipImage, Eyebrow, MaskLines } from "../ui";

export default function ServicesRail() {
  // Desktop with motion: vertical scroll drives a horizontal track. Otherwise: native snap scroller.
  const [horizontal] = useState(() => isDesktop() && !prefersReducedMotion());
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!horizontal || !root.current || !track.current) return;
      const distance = () => Math.max(0, track.current!.scrollWidth - window.innerWidth);

      const tween = gsap.to(track.current, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          pin: true,
          start: "top top",
          end: () => `+=${distance()}`,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.min(SERVICES.length, Math.round(self.progress * (SERVICES.length - 1)) + 1);
            if (counter.current) counter.current.textContent = String(idx).padStart(2, "0");
          },
        },
      });

      // Progress rule mirrors the horizontal position
      gsap.fromTo(
        bar.current,
        { scaleX: 0 },
        { scaleX: 1, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: () => `+=${distance()}`, scrub: 0.8 } }
      );

      return () => tween.kill();
    },
    { scope: root, dependencies: [horizontal] }
  );

  return (
    <section
      ref={root}
      id="services"
      aria-label="Our services"
      className={`relative overflow-hidden bg-offwhite text-graphite ${horizontal ? "h-[100svh]" : "py-28"}`}
    >
      <div className={`mx-auto flex max-w-[1440px] flex-col justify-between gap-8 px-6 lg:flex-row lg:items-end lg:px-12 ${horizontal ? "pt-28 lg:pt-32" : ""}`}>
        <div>
          <Eyebrow>Our services</Eyebrow>
          <MaskLines
            as="h2"
            lines={["What we move,", "store and protect."]}
            className="mt-6 font-heading text-[clamp(2.2rem,4.4vw,4rem)] font-semibold leading-[1.02] tracking-[-0.03em]"
  
          />
        </div>
        <div className="flex items-center gap-6 text-sm">
          <p className="font-editorial text-lg tabular-nums">
            <span ref={counter}>01</span>
            <span className="opacity-40"> / {String(SERVICES.length).padStart(2, "0")}</span>
          </p>
          {horizontal ? (
            <div className="relative h-px w-40 bg-graphite/15">
              <div ref={bar} className="absolute inset-0 origin-left bg-signal" style={{ transform: "scaleX(0)" }} />
            </div>
          ) : (
            <p className="eyebrow opacity-60">Swipe to explore →</p>
          )}
        </div>
      </div>

      <div
        ref={track}
        className={
          horizontal
            ? "mt-12 flex w-max gap-10 pl-6 pr-[30vw] will-change-transform lg:mt-14 lg:pl-[max(3rem,calc((100vw-1440px)/2+3rem))]"
            : "scroll-track mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-6"
        }
      >
        {SERVICES.map((s) => (
          <article
            key={s.slug}
            className={`group relative shrink-0 snap-start ${horizontal ? "w-[40vw]" : "w-[82vw] sm:w-[60vw]"}`}
          >
            <Link to={`/services/${s.slug}`} className="block" aria-label={`Explore ${s.title}`}>
              <div className="relative">
                <ClipImage
                  src={s.image}
                  alt={`${s.title} — container logistics photography`}
                  className={`w-full ${horizontal ? "h-[52svh]" : "h-[360px] sm:h-[420px]"}`}
                />
                <span className="pointer-events-none absolute left-6 top-5 font-editorial text-[clamp(3rem,5vw,4.5rem)] leading-none text-white mix-blend-difference">
                  {s.num}
                </span>
              </div>
              <div className="mt-6 flex items-start justify-between gap-6">
                <div>
                  <h3 className="font-heading text-[1.6rem] font-semibold leading-tight tracking-tight lg:text-[1.9rem]">
                    {s.title}
                  </h3>
                  <p className="mt-2 max-w-md text-[15px] leading-relaxed opacity-65">{s.teaser}</p>
                </div>
                <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-graphite/20 transition-all duration-500 group-hover:border-signal group-hover:bg-signal group-hover:text-white">
                  <ArrowUpRight size={18} className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </Link>
          </article>
        ))}
        <div className="flex w-[30vw] shrink-0 items-end pb-2 lg:hidden" aria-hidden />
      </div>
    </section>
  );
}
