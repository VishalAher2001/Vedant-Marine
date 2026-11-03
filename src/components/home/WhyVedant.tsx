import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "../../lib/gsap";
import { IMG, STRENGTHS } from "../../lib/content";
import { ClipImage, Eyebrow, MaskLines } from "../ui";

export default function WhyVedant() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!root.current || prefersReducedMotion()) return;
      gsap.fromTo(
        root.current.querySelectorAll(".why-rule"),
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.4,
          ease: "power3.inOut",
          stagger: 0.14,
          scrollTrigger: { trigger: root.current.querySelector(".why-list"), start: "top 75%", once: true },
        }
      );
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="why"
      aria-label="Why choose Vedant"
      className="relative overflow-hidden bg-deep py-28 text-white lg:py-40"
    >
      <div className="absolute inset-y-0 right-0 hidden w-[46%] lg:block">
        <ClipImage src={IMG.whyBg} alt="Cargo ship laden with containers sailing through coastal waters" className="h-full w-full" parallax={6} />
        <div className="absolute inset-0 bg-gradient-to-r from-deep via-deep/60 to-deep/20" aria-hidden />
      </div>

      <div className="relative mx-auto grid max-w-[1440px] gap-16 px-6 lg:grid-cols-12 lg:px-12">
        <div className="lg:col-span-5">
          <Eyebrow className="text-white/70">Why choose Vedant</Eyebrow>
          <MaskLines
            as="h2"
            lines={["The kind of partner", "you only need to", "brief once."]}
            className="mt-8 font-heading text-[clamp(2.3rem,4.6vw,4.2rem)] font-semibold leading-[1.03] tracking-[-0.03em]"
          />
          <p className="mt-10 max-w-md text-[16px] leading-relaxed text-white/65">
            We obsess over the small details — paperwork, customs codes, port windows — so your team can focus on the
            big ones.
          </p>
        </div>

        <ol className="why-list lg:col-span-6 lg:col-start-7">
          {STRENGTHS.map((s, i) => (
            <li key={s.title} className="relative py-9">
              <span className="why-rule absolute inset-x-0 top-0 block h-px origin-left bg-white/20" aria-hidden />
              <div className="grid grid-cols-[3.5rem_1fr] gap-4 sm:grid-cols-[5rem_1fr]">
                <span className="font-editorial text-[13px] tabular-nums text-signal">0{i + 1}</span>
                <div>
                  <h3 className="font-heading text-[1.35rem] font-semibold leading-snug tracking-tight sm:text-2xl">{s.title}</h3>
                  <p className="mt-3 max-w-md text-[15px] leading-relaxed text-white/60">{s.desc}</p>
                </div>
              </div>
            </li>
          ))}
          <span className="why-rule relative block h-px origin-left bg-white/20" aria-hidden />
        </ol>
      </div>
    </section>
  );
}
