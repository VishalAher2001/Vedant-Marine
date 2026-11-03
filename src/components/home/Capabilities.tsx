import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap, useGSAP, prefersReducedMotion } from "../../lib/gsap";
import { CAPABILITIES, type Capability } from "../../lib/content";
import { Eyebrow, MaskLines } from "../ui";

function ApiPanel({ active }: { active: boolean }) {
  return (
    <div
      className={`absolute inset-0 flex flex-col justify-between bg-navy p-8 text-white transition-all duration-[900ms] ease-out sm:p-12 ${
        active ? "scale-100 opacity-100" : "scale-[1.03] opacity-0"
      }`}
      aria-hidden={!active}
    >
      <div className="flex items-center justify-between">
        <span className="eyebrow text-white/55">Integration · REST</span>
        <span className="font-sans text-[11px] tracking-[0.2em] text-white/40">v1</span>
      </div>
      <pre className="overflow-hidden font-sans text-[12.5px] leading-[1.9] text-white/75 sm:text-[13.5px]">
        <span className="text-white/40">{"// shipment status"}</span>
        {"\n"}
        <span className="text-signal">GET</span> /shipments/&#123;reference&#125;
        {"\n\n"}
        {"{"}
        {"\n  "}"<span className="text-white">status</span>": "<span className="text-ice">in_transit</span>",
        {"\n  "}"<span className="text-white">vessel_stage</span>": "<span className="text-ice">departed_origin</span>",
        {"\n  "}"<span className="text-white">updated_at</span>": "<span className="text-ice">2026-06-14T09:30:00+05:30</span>"
        {"\n"}
        {"}"}
      </pre>
      <p className="max-w-xs text-sm leading-relaxed text-white/55">
        Connect your ERP or booking workflow to shipment data. Integration scope is agreed with our technical team.
      </p>
    </div>
  );
}

function VisualPanel({ cap, active }: { cap: Capability; active: boolean }) {
  if (!cap.image) return <ApiPanel active={active} />;
  return (
    <img
      src={cap.image}
      alt={`${cap.title} — ${cap.full}`}
      loading="lazy"
      decoding="async"
      className={`photo absolute inset-0 h-full w-full object-cover transition-all duration-[900ms] ease-out ${
        active ? "scale-100 opacity-100" : "scale-[1.06] opacity-0"
      }`}
    />
  );
}

export default function Capabilities() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      if (!root.current || prefersReducedMotion()) return;
      gsap.fromTo(
        root.current.querySelectorAll(".cap-rule"),
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.4,
          ease: "power3.inOut",
          stagger: 0.08,
          scrollTrigger: { trigger: root.current, start: "top 70%", once: true },
        }
      );
    },
    { scope: root }
  );

  const cap = CAPABILITIES[active];

  return (
    <section ref={root} id="capabilities" aria-label="Logistics capabilities" className="bg-offwhite py-28 text-graphite lg:py-40">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <Eyebrow>Logistics capabilities</Eyebrow>
              <MaskLines
                as="h2"
                lines={["Eight ways we", "keep cargo moving."]}
                className="mt-8 font-heading text-[clamp(2.2rem,4.2vw,3.8rem)] font-semibold leading-[1.04] tracking-[-0.03em]"
              />

              <div className="relative mt-14 hidden aspect-[4/5] w-full overflow-hidden bg-ice lg:block">
                {CAPABILITIES.map((c, i) => (
                  <VisualPanel key={c.id} cap={c} active={i === active} />
                ))}
                <div className="absolute bottom-5 left-5 z-10 bg-offwhite/95 px-4 py-2 text-graphite">
                  <p className="eyebrow text-[10px]">{cap.code}</p>
                  <p className="mt-1 font-heading text-sm font-semibold">{cap.title}</p>
                </div>
              </div>
            </div>
          </div>

          <ol className="lg:col-span-6 lg:col-start-7" aria-label="Capabilities">
            {CAPABILITIES.map((c, i) => {
              const on = i === active;
              return (
                <li key={c.id} className="relative">
                  <span className="cap-rule block h-px origin-left bg-graphite/15" aria-hidden />
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-pressed={on}
                    className="group grid w-full grid-cols-[auto_1fr] gap-x-8 py-8 text-left sm:py-10"
                  >
                    <span className="pt-2 font-sans text-[11px] tracking-[0.2em] text-graphite/45">{c.code}</span>
                    <span>
                      <span className="flex items-start justify-between gap-6">
                        <span
                          className={`font-heading text-[1.6rem] font-semibold leading-tight tracking-tight transition-colors duration-500 sm:text-[2rem] ${
                            on ? "text-navy" : "text-graphite/45 group-hover:text-graphite"
                          }`}
                        >
                          {c.title}
                        </span>
                        <ArrowUpRight
                          size={20}
                          className={`mt-2 shrink-0 transition-all duration-500 ${on ? "translate-x-0 text-signal opacity-100" : "-translate-x-2 opacity-0"}`}
                        />
                      </span>
                      <span className="mt-2 block text-[13px] uppercase tracking-[0.14em] text-graphite/50">{c.full}</span>
                      <span
                        className={`grid grid-rows-[1fr] transition-all duration-700 ease-out ${
                          on ? "lg:grid-rows-[1fr] lg:opacity-100" : "lg:grid-rows-[0fr] lg:opacity-0"
                        }`}
                      >
                        <span className="overflow-hidden">
                          <span className="mt-4 block max-w-lg text-[15px] leading-relaxed text-graphite/70">{c.desc}</span>
                        </span>
                      </span>
                      {c.image && (
                        <span className="mt-6 block aspect-[16/9] overflow-hidden lg:hidden">
                          <img src={c.image} alt="" loading="lazy" className="photo h-full w-full object-cover" />
                        </span>
                      )}
                    </span>
                  </button>
                </li>
              );
            })}
            <span className="cap-rule block h-px origin-left bg-graphite/15" aria-hidden />
          </ol>
        </div>
      </div>
    </section>
  );
}
