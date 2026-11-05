import { ArrowDownRight } from "lucide-react";
import { Link } from "react-router-dom";
import { CtaBand, PageHero } from "../components/PageHero";
import { Eyebrow } from "../components/ui";
import { IMG, STRENGTHS } from "../lib/content";
import { useSeo } from "../lib/seo";

const APPROACH = [
  {
    number: "01",
    title: "Plan the full journey",
    text: "We bring ocean freight, road transport, warehousing and documentation into one coordinated shipment plan.",
  },
  {
    number: "02",
    title: "Coordinate every handoff",
    text: "Our team manages carrier schedules, port windows and customs formalities across the shipment journey.",
  },
  {
    number: "03",
    title: "Keep your team informed",
    text: "Clear quotations and shipment updates help your team understand the next step and stay focused on business.",
  },
];

export default function WhyVedantPage() {
  useSeo({
    title: "Why Choose Vedant | Vedant Container Lines",
    description:
      "See how Vedant Container Lines coordinates global supply chain services, careful cargo handling, transparent quotations and shipment support.",
  });

  return (
    <>
      <PageHero
        image={IMG.whyBg}
        imageAlt="Container vessel carrying cargo across the ocean"
        eyebrow="Why choose Vedant"
        lines={["One partner.", "A better-connected journey."]}
        intro="A logistics partner that brings the details together—from the first quotation to the final delivery."
        crumbs={[{ label: "Home", to: "/" }, { label: "Why Vedant" }]}
      />

      <section className="bg-offwhite py-24 text-graphite lg:py-36">
        <div className="mx-auto grid max-w-[1440px] gap-14 px-6 lg:grid-cols-12 lg:gap-16 lg:px-12">
          <div className="lg:col-span-5">
            <Eyebrow>What makes the difference</Eyebrow>
            <h2 className="mt-8 max-w-xl font-heading text-[clamp(2.2rem,4.2vw,3.8rem)] font-semibold leading-[1.04] tracking-[-0.03em]">
              The details matter. So does the team behind them.
            </h2>
            <p className="mt-7 max-w-md text-[16px] leading-relaxed text-graphite/70">
              International shipping involves many moving parts. We connect services and people around your cargo, with
              practical coordination at each stage.
            </p>
            <Link
              to="/services"
              className="group mt-9 inline-flex items-center gap-3 text-sm font-semibold text-navy"
            >
              <span className="link-underline">Explore our services</span>
              <ArrowDownRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1"
                aria-hidden
              />
            </Link>
          </div>

          <ol className="divide-y divide-graphite/10 border-y border-graphite/10 lg:col-span-6 lg:col-start-7">
            {STRENGTHS.map((strength, index) => (
              <li key={strength.title} className="grid grid-cols-[3rem_1fr] gap-4 py-7 sm:grid-cols-[4rem_1fr]">
                <span className="font-editorial text-[13px] tabular-nums text-signal">0{index + 1}</span>
                <div>
                  <h3 className="font-heading text-xl font-semibold tracking-tight">{strength.title}</h3>
                  <p className="mt-2 max-w-lg text-[15px] leading-relaxed text-graphite/65">{strength.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-deep py-24 text-white lg:py-36">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Eyebrow className="text-white/70">A considered approach</Eyebrow>
              <h2 className="mt-8 max-w-3xl font-heading text-[clamp(2.2rem,4.2vw,3.8rem)] font-semibold leading-[1.04] tracking-[-0.03em]">
                From first conversation to final delivery.
              </h2>
            </div>
            <p className="max-w-md text-[15px] leading-relaxed text-white/60 lg:col-span-4 lg:col-start-9">
              Every shipment is different. Our role is to understand what it needs and coordinate the right services
              around it.
            </p>
          </div>

          <ol className="mt-16 grid gap-px bg-white/15 sm:grid-cols-2 lg:mt-24 lg:grid-cols-3">
            {APPROACH.map((step) => (
              <li key={step.number} className="min-h-64 bg-deep p-7 sm:p-9 lg:min-h-72 lg:p-10">
                <span className="font-editorial text-sm tabular-nums text-signal">{step.number}</span>
                <h3 className="mt-12 font-heading text-2xl font-semibold tracking-tight">{step.title}</h3>
                <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-white/60">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand
        title="Make your next shipment a more connected one."
        text="Tell us where your cargo needs to go. We’ll help you identify the services and coordination it needs."
      />
    </>
  );
}
