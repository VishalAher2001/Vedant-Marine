import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "../../lib/gsap";
import { IMG } from "../../lib/content";
import { ClipImage, Eyebrow, MaskLines, ScrubText } from "../ui";

export function Counter({ to, suffix = "", label }: { to: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      if (prefersReducedMotion()) return;
      const obj = { v: 0 };
      ref.current.textContent = "0";
      gsap.to(obj, {
        v: to,
        duration: 2.2,
        ease: "power2.out",
        onUpdate: () => {
          if (ref.current) ref.current.textContent = String(Math.round(obj.v));
        },
        scrollTrigger: { trigger: ref.current, start: "top 90%", once: true },
      });
    },
    { scope: ref }
  );

  return (
    <div className="border-t border-current/15 pt-6">
      <p className="font-editorial text-[clamp(3rem,5vw,4.6rem)] font-normal leading-none tracking-tight">
        <span ref={ref}>{to}</span>
        {suffix && <span className="text-signal">{suffix}</span>}
      </p>
      <p className="mt-3 max-w-[14rem] text-[13px] leading-relaxed opacity-70">{label}</p>
    </div>
  );
}

const ROUTE_NODES = [
  { label: "India", x: 40, y: 110 },
  { label: "UAE", x: 160, y: 60 },
  { label: "Europe", x: 300, y: 50 },
  { label: "UK", x: 410, y: 95 },
  { label: "United States", x: 560, y: 40 },
];

function RouteGraphic() {
  const root = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      if (!root.current || prefersReducedMotion()) return;
      const paths = root.current.querySelectorAll<SVGPathElement>(".arc");
      paths.forEach((p) => {
        const len = p.getTotalLength();
        gsap.fromTo(
          p,
          { strokeDasharray: len, strokeDashoffset: len },
          {
            strokeDashoffset: 0,
            duration: 1.8,
            ease: "power2.inOut",
            scrollTrigger: { trigger: root.current, start: "top 85%", once: true },
          }
        );
      });
      gsap.fromTo(
        root.current.querySelectorAll(".node"),
        { opacity: 0 },
        {
          opacity: 1,
          stagger: 0.25,
          duration: 0.6,
          scrollTrigger: { trigger: root.current, start: "top 85%", once: true },
        }
      );
    },
    { scope: root }
  );

  const arcs = ROUTE_NODES.slice(0, -1).map((n, i) => {
    const m = ROUTE_NODES[i + 1];
    const cx = (n.x + m.x) / 2;
    const cy = Math.min(n.y, m.y) - 40;
    return `M ${n.x} ${n.y} Q ${cx} ${cy} ${m.x} ${m.y}`;
  });

  return (
    <svg ref={root} viewBox="0 0 600 160" className="w-full" role="img" aria-label="Route graphic from India through the UAE, Europe, the United Kingdom and the United States">
      {arcs.map((d, i) => (
        <path key={i} className="arc" d={d} fill="none" stroke="currentColor" strokeOpacity={0.55} strokeWidth={1} />
      ))}
      {ROUTE_NODES.map((n) => (
        <g key={n.label} className="node">
          <circle cx={n.x} cy={n.y} r={4} fill="currentColor" />
          <circle cx={n.x} cy={n.y} r={10} fill="none" stroke="currentColor" strokeOpacity={0.3} />
          <text x={n.x} y={n.y + 26} textAnchor="middle" fontSize={11} fill="currentColor" opacity={0.7} style={{ letterSpacing: "0.12em", textTransform: "uppercase" }}>
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

export default function About() {
  const root = useRef<HTMLElement>(null);

  // Ocean-to-operations: background drifts from navy to off-white as the section rises.
  useGSAP(
    () => {
      if (!root.current || prefersReducedMotion()) return;
      gsap.fromTo(
        root.current,
        { backgroundColor: "#071B2D", color: "#FFFFFF" },
        {
          backgroundColor: "#F5F7F8",
          color: "#18232C",
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top 85%", end: "top 25%", scrub: true },
        }
      );
    },
    { scope: root }
  );

  const highlights = [
    "Vedant Container Lines (India) Pvt. Ltd.",
    "An extension of Vedant Clearing Pvt. Ltd.",
    "Two-decade-old logistics group heritage",
    "International logistics and supply chain coordination",
    "Reliable shipping partnerships",
  ];

  return (
    <section ref={root} id="about" className="relative overflow-hidden bg-navy py-28 lg:py-40">
      <div className="mx-auto grid max-w-[1440px] gap-20 px-6 lg:grid-cols-12 lg:gap-16 lg:px-12">
        {/* Image */}
        <div className="relative lg:col-span-6">
          <ClipImage
            src={IMG.about}
            alt="Container vessel alongside cranes and stacked containers at port"
            className="aspect-[4/5] w-full lg:aspect-[4/5] lg:max-h-[86vh]"
            parallax={6}
          />
          <div className="absolute -bottom-6 left-6 bg-offwhite px-5 py-4 text-graphite lg:-right-10 lg:left-auto lg:bottom-16">
            <p className="eyebrow text-[10px] text-graphite/60">Port operations</p>
            <p className="mt-1 font-heading text-sm font-semibold">Coordinated from first booking to final delivery</p>
          </div>
        </div>

        {/* Copy */}
        <div className="lg:col-span-5 lg:col-start-8 lg:flex lg:flex-col lg:justify-center">
          <Eyebrow>About Vedant</Eyebrow>
          <MaskLines
            lines={["Built on Experience.", "Driven by Global Connections."]}
            as="h2"
            className="mt-8 font-heading text-[clamp(2.2rem,4.2vw,3.9rem)] font-semibold leading-[1.04] tracking-[-0.03em]"
          />

          <ScrubText
            className="mt-10 font-editorial text-[clamp(1.25rem,2vw,1.6rem)] leading-[1.45] tracking-[-0.01em]"
            text="Vedant Container Lines (India) Pvt. Ltd. is an extension of Vedant Clearing Pvt. Ltd., a two-decade-old logistics group delivering comprehensive NVOCC and international freight forwarding."
          />

          <p className="mt-8 max-w-md text-[15px] leading-relaxed opacity-70">
            Led by Managing Director Mr. Mahesh Krishna Minde, the group is built on ethical practices, flexibility and on-time customer
            satisfaction. Our network spans India, the Far East, the Middle East, Europe, the UK and the US.
          </p>

          <ul className="mt-10 divide-y divide-current/15 border-y border-current/15">
            {highlights.map((h) => (
              <li key={h} className="flex items-baseline gap-5 py-4 text-[15px]">
                <span className="font-editorial text-xs tabular-nums opacity-50">—</span>
                <span className="font-medium">{h}</span>
              </li>
            ))}
          </ul>

          <div className="mt-16 grid grid-cols-3 gap-6">
            <Counter to={20} suffix="+" label="Years of logistics group heritage" />
            <Counter to={6} label="Continents reached by our consignees" />
            <Counter to={24} suffix="h" label="Technical support, around the clock" />
          </div>

          <div className="mt-20 text-signal">
            <RouteGraphic />
          </div>
        </div>
      </div>
    </section>
  );
}
