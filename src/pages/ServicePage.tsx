import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { CtaBand, PageHero } from "../components/PageHero";
import { Eyebrow, MaskLines, ScrubText } from "../components/ui";
import { CAPABILITIES, SERVICES, serviceBySlug } from "../lib/content";
import { useSeo } from "../lib/seo";

const PROCESS = [
  { title: "Brief", text: "You share the cargo, origin, destination and timing. We confirm what is needed." },
  { title: "Coordinate", text: "Documentation, carriers and partners are aligned into one plan, with a single point of contact." },
  { title: "Deliver", text: "Your shipment moves to plan, with updates until it reaches its destination." },
];

export default function ServicePage() {
  const { slug } = useParams();
  const service = serviceBySlug(slug ?? "");

  useSeo({
    title: service
      ? `${service.title} | Vedant Container Lines (India) Pvt. Ltd.`
      : "Services | Vedant Container Lines",
    description: service?.intro ?? "Logistics services from Vedant Container Lines.",
  });

  if (!service) return <Navigate to="/services" replace />;

  const idx = SERVICES.indexOf(service);
  const prev = SERVICES[(idx - 1 + SERVICES.length) % SERVICES.length];
  const next = SERVICES[(idx + 1) % SERVICES.length];
  const related = CAPABILITIES.filter((c) => service.related.includes(c.id));

  return (
    <>
      <PageHero
        image={service.hero}
        imageAlt={`${service.title} — logistics photography`}
        eyebrow={`Service ${service.num} of ${String(SERVICES.length).padStart(2, "0")}`}
        lines={[service.title]}
        intro={service.teaser}
        crumbs={[
          { label: "Home", to: "/" },
          { label: "Services", to: "/services" },
          { label: service.title },
        ]}
      />

      {/* Introduction */}
      <section className="bg-offwhite py-28 text-graphite lg:py-36">
        <div className="mx-auto grid max-w-[1440px] gap-16 px-6 lg:grid-cols-12 lg:px-12">
          <div className="lg:col-span-6">
            <Eyebrow>Service introduction</Eyebrow>
            <ScrubText
              className="mt-8 font-editorial text-[clamp(1.7rem,3vw,2.6rem)] leading-[1.25] tracking-[-0.02em]"
              text={service.intro}
            />
          </div>
          <div className="space-y-6 text-[16px] leading-relaxed text-graphite/75 lg:col-span-5 lg:col-start-8 lg:pt-14">
            {service.body.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage / highlights */}
      <section className="bg-navy py-28 text-white lg:py-36">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Eyebrow className="text-white/70">What the service covers</Eyebrow>
              <MaskLines
                as="h2"
                lines={["Built around the", "detail of your cargo."]}
                className="mt-8 font-heading text-[clamp(2.1rem,4vw,3.6rem)] font-semibold leading-[1.05] tracking-[-0.03em]"
              />
            </div>
            <ol className="grid gap-x-12 sm:grid-cols-2 lg:col-span-7">
              {service.highlights.map((h, i) => (
                <li key={h} className="border-t border-white/15 py-8">
                  <span className="font-editorial text-[13px] tabular-nums text-signal">0{i + 1}</span>
                  <p className="mt-4 font-heading text-xl font-semibold leading-snug tracking-tight">{h}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="bg-offwhite py-28 text-graphite lg:py-36">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <Eyebrow>How we work with you</Eyebrow>
          <div className="mt-12 grid gap-px bg-graphite/10 md:grid-cols-3">
            {PROCESS.map((p, i) => (
              <div key={p.title} className="bg-offwhite p-8 lg:p-12">
                <p className="font-editorial text-sm text-signal">0{i + 1}</p>
                <h3 className="mt-10 font-heading text-3xl font-semibold tracking-tight">{p.title}</h3>
                <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-graphite/65">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related capabilities */}
      {related.length > 0 && (
        <section className="bg-white py-28 text-graphite lg:py-36">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <MaskLines
                as="h2"
                lines={["Related logistics", "capabilities."]}
                className="font-heading text-[clamp(2.1rem,4vw,3.6rem)] font-semibold leading-[1.05] tracking-[-0.03em]"
              />
              <Link to="/services" className="link-underline text-sm font-semibold text-navy">
                All services
              </Link>
            </div>
            <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
              {related.map((c) => (
                <article key={c.id} className="group">
                  <div className="relative aspect-[4/5] overflow-hidden bg-navy">
                    {c.image ? (
                      <img
                        src={c.image}
                        alt={c.title}
                        loading="lazy"
                        decoding="async"
                        className="photo h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full flex-col justify-end p-6 text-white">
                        <span className="font-sans text-xs tracking-[0.2em] text-white/50">API · REST</span>
                      </div>
                    )}
                  </div>
                  <p className="mt-5 font-sans text-[11px] tracking-[0.2em] text-graphite/45">{c.code}</p>
                  <h3 className="mt-2 font-heading text-xl font-semibold tracking-tight">{c.title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-graphite/65">{c.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Previous / next service */}
      <nav aria-label="Other services" className="bg-offwhite text-graphite">
        <div className="mx-auto grid max-w-[1440px] md:grid-cols-2">
          {[prev, next].map((s, i) => (
            <Link
              key={s.slug}
              to={`/services/${s.slug}`}
              className={`group flex flex-col gap-6 border-t border-graphite/10 px-6 py-16 transition-colors duration-500 hover:bg-ice lg:px-12 lg:py-20 ${
                i === 0 ? "md:border-r" : ""
              }`}
            >
              <span className="eyebrow text-graphite/50">{i === 0 ? "Previous service" : "Next service"}</span>
              <span className="flex items-center justify-between gap-6">
                <span className="font-heading text-[clamp(1.6rem,3vw,2.6rem)] font-semibold leading-tight tracking-tight">
                  {s.title}
                </span>
                <ArrowUpRight size={24} className={`shrink-0 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 ${i === 0 ? "rotate-[-90deg]" : ""}`} />
              </span>
            </Link>
          ))}
        </div>
      </nav>

      <CtaBand
        title={`Planning a shipment involving ${service.title.toLowerCase()}?`}
        text="Share your cargo, origin and destination. Our team responds with a tailored quote within two hours."
      />
    </>
  );
}
