import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { CtaBand, PageHero } from "../components/PageHero";
import { ClipImage, Eyebrow } from "../components/ui";
import { IMG, SERVICES } from "../lib/content";
import { useSeo } from "../lib/seo";

export default function ServicesPage() {
  useSeo({
    title: "Services | NVOCC, Freight Forwarding, Customs & Warehousing | Vedant Container Lines",
    description:
      "Explore NVOCC, international freight forwarding, door-to-door delivery, cross trade, customs clearance, warehousing, road transport and cargo insurance.",
  });

  return (
    <>
      <PageHero
        image={IMG.servicesHero}
        imageAlt="Container port with cranes and cargo ships at berth"
        eyebrow="Services overview"
        lines={["Eight services.", "One coordinated chain."]}
        intro="NVOCC, freight forwarding, delivery, cross trade, clearance, warehousing, road transport and cargo insurance, planned together."
        crumbs={[{ label: "Home", to: "/" }, { label: "Services" }]}
      />

      <div className="bg-offwhite text-graphite">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          {SERVICES.map((s, i) => (
            <article
              key={s.slug}
              className={`flex flex-col gap-12 border-b border-graphite/10 py-20 lg:items-center lg:gap-20 lg:py-28 ${
                i % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
              }`}
            >
              <div className="w-full lg:w-7/12">
                <ClipImage src={s.hero} alt={`${s.title} — logistics photography`} className="aspect-[4/3] w-full lg:aspect-[16/11]" parallax={5} />
              </div>
              <div className="w-full lg:w-4/12">
                <p className="font-editorial text-[clamp(3.5rem,6vw,5.5rem)] leading-none text-signal">{s.num}</p>
                <h2 className="mt-6 font-heading text-[clamp(1.8rem,3vw,2.6rem)] font-semibold leading-[1.1] tracking-[-0.02em]">
                  {s.title}
                </h2>
                <p className="mt-6 text-[16px] leading-relaxed text-graphite/70">{s.intro}</p>
                <Link
                  to={`/services/${s.slug}`}
                  className="group mt-10 inline-flex items-center gap-3 text-sm font-semibold text-navy"
                >
                  <span className="link-underline">Explore {s.title}</span>
                  <ArrowUpRight size={17} className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>
        <div className="mx-auto max-w-[1440px] px-6 pb-4 pt-16 lg:px-12">
          <Eyebrow className="text-graphite/60">Every service connects to the rest</Eyebrow>
        </div>
      </div>

      <CtaBand
        title="Not sure which service fits?"
        text="Tell us about your shipment and our team will recommend the right combination of services."
      />
    </>
  );
}
