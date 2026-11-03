import { useMemo, useRef, useState } from "react";
import { geoNaturalEarth1, geoPath, geoGraticule10 } from "d3-geo";
import { feature } from "topojson-client";
import countriesData from "world-atlas/countries-110m.json";
import { gsap, useGSAP, prefersReducedMotion } from "../../lib/gsap";
import { NETWORK_REGIONS, NETWORK_ROUTES } from "../../lib/content";
import { Eyebrow, MaskLines } from "../ui";

const W = 1000;
const H = 540;

// Static projection geometry, computed once.
const built = (() => {
  const projection = geoNaturalEarth1().fitExtent(
    [
      [14, 14],
      [W - 14, H - 14],
    ],
    { type: "Sphere" } as const
  );
  const path = geoPath(projection);
  const world = feature(countriesData as any, (countriesData as any).objects.countries) as any;
  const land = world.features
    .filter((f: any) => f.id !== "010") // omit Antarctica for a cleaner composition
    .map((f: any) => path(f) as string);
  const graticule = path(geoGraticule10()) as string;
  const points = Object.fromEntries(
    NETWORK_REGIONS.map((r) => [r.name, projection(r.coords) as [number, number]])
  );
  const routes = NETWORK_ROUTES.map(([a, b]) => {
    const d = path({
      type: "LineString",
      coordinates: [NETWORK_REGIONS.find((r) => r.name === a)!.coords, NETWORK_REGIONS.find((r) => r.name === b)!.coords],
    } as any) as string;
    return { key: `${a}-${b}`, from: a, to: b, d };
  });
  return { land, graticule, points, routes };
})();

export default function GlobalNetwork() {
  const root = useRef<HTMLElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const regions = useMemo(() => NETWORK_REGIONS, []);

  useGSAP(
    () => {
      if (!root.current || !svg.current || prefersReducedMotion()) return;
      const routeEls = svg.current.querySelectorAll<SVGPathElement>(".route");
      routeEls.forEach((p) => {
        gsap.fromTo(
          p,
          { strokeDasharray: 1, strokeDashoffset: 1 },
          {
            strokeDashoffset: 0,
            duration: 2.4,
            ease: "power2.inOut",
            delay: 0.2,
            scrollTrigger: { trigger: root.current, start: "top 60%", once: true },
          }
        );
      });
      gsap.fromTo(
        svg.current.querySelectorAll(".marker"),
        { opacity: 0 },
        {
          opacity: 1,
          stagger: 0.12,
          duration: 0.8,
          scrollTrigger: { trigger: root.current, start: "top 60%", once: true },
        }
      );

      // Travelling vessel markers along each great-circle route
      const movers = svg.current.querySelectorAll<SVGPathElement>(".route");
      movers.forEach((p, i) => {
        const dot = svg.current!.querySelector<SVGCircleElement>(`.mover[data-i="${i}"]`);
        if (!dot) return;
        const len = p.getTotalLength();
        const state = { t: (i * 0.17) % 1 };
        gsap.to(state, {
          t: 1,
          duration: 9 + i * 1.3,
          ease: "none",
          repeat: -1,
          onUpdate: () => {
            if (!len) return;
            const pt = p.getPointAtLength(len * state.t);
            dot.setAttribute("cx", String(pt.x));
            dot.setAttribute("cy", String(pt.y));
          },
        });
      });
    },
    { scope: root }
  );

  const isRouteActive = (from: string, to: string) => !active || active === from || active === to;

  return (
    <section
      ref={root}
      id="global-network"
      aria-label="Global network"
      className="relative overflow-hidden bg-navy py-28 text-white lg:py-36"
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-5">
            <Eyebrow className="text-white/70">Global network</Eyebrow>
            <MaskLines
              as="h2"
              lines={["Connecting Markets.", "Across Every Horizon."]}
              className="mt-8 font-heading text-[clamp(2.2rem,4.4vw,4rem)] font-semibold leading-[1.03] tracking-[-0.03em]"
            />
            <p className="mt-8 max-w-md text-[16px] leading-relaxed text-white/65">
              Our network spans India, the Far East, the Middle East, Europe, the United Kingdom and the United States,
              with offices in India and the UAE and a wider network of partners and agents.
            </p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="eyebrow mb-4 text-white/45">Coverage regions</p>
            <ul className="divide-y divide-white/10 border-y border-white/10">
              {regions.map((r) => (
                <li key={r.name}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(r.name)}
                    onMouseLeave={() => setActive(null)}
                    onFocus={() => setActive(r.name)}
                    onBlur={() => setActive(null)}
                    className="group flex w-full items-center justify-between gap-6 py-4 text-left"
                  >
                    <span className="font-heading text-lg font-medium transition-colors duration-500 group-hover:text-signal">
                      {r.name}
                    </span>
                    <span className="text-[13px] text-white/50 transition-opacity duration-500" style={{ opacity: !active || active === r.name ? 1 : 0.35 }}>
                      {r.note}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative mt-20 lg:mt-24">
          <svg
            ref={svg}
            viewBox={`0 0 ${W} ${H}`}
            className="h-auto w-full"
            role="img"
            aria-label="Map of Vedant Container Lines coverage regions and shipping routes"
          >
            <rect width={W} height={H} fill="#071B2D" />
            <path d={built.graticule} fill="none" stroke="#ffffff" strokeOpacity={0.05} strokeWidth={0.6} />
            <g fill="#123F5D" stroke="#0B263D" strokeWidth={0.4}>
              {built.land.map((d: string, i: number) => (
                <path key={i} d={d} />
              ))}
            </g>

            <g fill="none" strokeLinecap="round">
              {built.routes.map((r, i) => (
                <path
                  key={r.key}
                  className="route"
                  d={r.d}
                  pathLength={1}
                  stroke="#2B8CFF"
                  strokeWidth={1.2}
                  strokeOpacity={isRouteActive(r.from, r.to) ? 0.9 : 0.15}
                  style={{ transition: "stroke-opacity 0.6s ease" }}
                  data-i={i}
                />
              ))}
            </g>

            {built.routes.map((r, i) => (
              <circle key={`m-${r.key}`} className="mover" data-i={i} r={2.2} fill="#DCEAF4" opacity={0.9} cx={-10} cy={-10} />
            ))}

            {regions.map((r) => {
              const [x, y] = built.points[r.name];
              const on = !active || active === r.name;
              return (
                <g key={r.name} className="marker" style={{ transition: "opacity 0.6s" }} opacity={on ? 1 : 0.35}>
                  <circle cx={x} cy={y} r={active === r.name ? 9 : 6} fill="none" stroke="#DCEAF4" strokeOpacity={0.4} style={{ transition: "r 0.5s" }} />
                  <circle cx={x} cy={y} r={3} fill="#FFFFFF" />
                  <text
                    x={x + 12}
                    y={y + 4}
                    fill="#FFFFFF"
                    fontSize={12}
                    style={{ letterSpacing: "0.14em", textTransform: "uppercase", fontFamily: "Inter, sans-serif", fontWeight: 600 }}
                  >
                    {r.name}
                  </text>
                </g>
              );
            })}
          </svg>
          <p className="mt-6 text-[12px] tracking-wide text-white/40">
            Map illustrates regions named in the company profile. Routes are indicative, not a schedule.
          </p>
        </div>
      </div>
    </section>
  );
}
