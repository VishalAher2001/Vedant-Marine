import { useRef } from "react";
import {
  gsap,
  ScrollTrigger,
  useGSAP,
  prefersReducedMotion,
} from "../../lib/gsap";
import { IMG } from "../../lib/content";
import { Btn, Eyebrow } from "../ui";

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const eyebrow = useRef<HTMLDivElement>(null);
  const ctas = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (!root.current || !frame.current || !img.current) return;

      if (prefersReducedMotion()) return;

      // Intro: image settles from 1.08 → 1.00, eyebrow clip-reveal, CTAs rise.
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .fromTo(
          img.current,
          { scale: 1.08 },
          { scale: 1, duration: 3, ease: "power2.out" },
          0,
        )
        .fromTo(
          eyebrow.current,
          { clipPath: "inset(0 100% 0 0)" },
          { clipPath: "inset(0 0% 0 0)", duration: 1.4, ease: "power4.inOut" },
          0.35,
        )
        .fromTo(
          ctas.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1.2 },
          0.9,
        );

      // Scroll: subtle parallax on the photo, frame recedes into a framed still.
      gsap
        .timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        })
        .to(img.current, { yPercent: 14, ease: "none" }, 0)
        .to(
          frame.current,
          { scale: 0.9, borderRadius: "18px", ease: "none" },
          0,
        )
        .to(content.current, { yPercent: -28, opacity: 0, ease: "none" }, 0);

      gsap.fromTo(
        dot.current,
        { y: -24 },
        { y: 56, duration: 1.6, ease: "power2.inOut", repeat: -1 },
      );

      ScrollTrigger.refresh();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-navy text-white"
      aria-label="Introduction"
    >
      <div
        ref={frame}
        className="absolute inset-0 origin-top overflow-hidden will-change-transform"
      >
        <img
          ref={img}
          src={IMG.heroOcean}
          alt="Large container ship carrying stacked containers across open ocean waters"
          className="photo absolute inset-x-0 -top-[6%] h-[112%] w-full origin-center object-cover will-change-transform"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-navy/45" aria-hidden />
        <div
          className="absolute inset-0 bg-gradient-to-t from-navy via-navy/35 to-navy/10"
          aria-hidden
        />
        <div
          className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-navy/70 to-transparent"
          aria-hidden
        />
      </div>

      <div
        ref={content}
        className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-end px-6 pb-20 pt-32 lg:px-12 lg:pb-28"
      >
        <div ref={eyebrow}>
          <Eyebrow className="text-white/80">
            Global Maritime &amp; Logistics Solutions
          </Eyebrow>
        </div>

        <h1 className="display mt-8 text-[clamp(3.1rem,8.2vw,8.4rem)] text-white">
          <span className="block">Connecting Oceans.</span>
          <span className="block">Empowering Global Commerce.</span>
        </h1>

        <div className="mt-12 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <p className="max-w-md text-[17px] leading-relaxed text-white/80 lg:text-lg">
            Connecting businesses to global markets through dependable shipping,
            intelligent logistics and seamless supply chain coordination.
          </p>
          <div ref={ctas} className="flex flex-wrap items-center gap-4">
            <Btn to="/services" variant="primary">
              Explore Our Services
            </Btn>
            <Btn to="/contact" variant="ghost">
              Let’s Discuss Your Shipment
            </Btn>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 right-6 z-10 hidden items-center gap-4 md:flex lg:right-12">
        <span className="eyebrow text-white/70">Scroll</span>
        <span className="relative block h-14 w-px overflow-hidden bg-white/25">
          <span
            ref={dot}
            className="absolute left-0 top-0 block h-5 w-px bg-white"
          />
        </span>
      </div>
    </section>
  );
}
