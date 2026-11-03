import { Counter } from "../components/home/About";
import { CtaBand, PageHero } from "../components/PageHero";
import { ScrubText, Eyebrow, MaskLines } from "../components/ui";
import { IMG } from "../lib/content";
import { useSeo } from "../lib/seo";

const VALUES = [
  {
    title: "Ethical practices",
    text: "Our leadership and team are committed to ethical practice in every shipment we coordinate.",
  },
  {
    title: "Flexibility",
    text: "Solutions shaped around the way your business moves, rather than a single fixed template.",
  },
  {
    title: "Customer satisfaction, on time",
    text: "Reliable, secure and timely service, with a team that keeps you informed at every stage.",
  },
];

export default function AboutPage() {
  useSeo({
    title: "About Us | Vedant Container Lines (India) Pvt. Ltd.",
    description:
      "Two decades of logistics experience. Vedant Container Lines is an extension of Vedant Clearing Pvt. Ltd., delivering NVOCC and international freight forwarding across India, the Far East, the Middle East, Europe, the UK and the US.",
  });

  return (
    <>
      <PageHero
        image={IMG.aboutHero}
        imageAlt="Aerial view of a cargo vessel moored at an industrial port"
        eyebrow="About Vedant"
        lines={["Built on Experience.", "Driven by Global Connections."]}
        intro="Vedant Container Lines (India) Pvt. Ltd. is an extension of Vedant Clearing Pvt. Ltd., a two-decade-old logistics group."
        crumbs={[{ label: "Home", to: "/" }, { label: "About" }]}
      />

      <section className="bg-offwhite py-28 text-graphite lg:py-40">
        <div className="mx-auto grid max-w-[1440px] gap-16 px-6 lg:grid-cols-12 lg:px-12">
          <div className="lg:col-span-6">
            <Eyebrow>Our story</Eyebrow>
            <ScrubText
              className="mt-8 font-editorial text-[clamp(1.6rem,2.8vw,2.4rem)] leading-[1.35] tracking-[-0.015em]"
              text="With over two decades of experience, Vedant Clearing Pvt. Ltd. and Vedant Container Lines have built a strong reputation in the logistics and supply chain industry."
            />
          </div>
          <div className="space-y-6 text-[16px] leading-relaxed text-graphite/75 lg:col-span-5 lg:col-start-8 lg:pt-16">
            <p>
              Vedant Container Lines, an extension of Vedant Clearing Pvt. Ltd., specializes in international freight
              forwarding and supply chain solutions. We offer reliable, secure and timely services through a strong network
              across India, the Far East, the Middle East, Europe, the UK, the US and other major global trade hubs.
            </p>
            <p>
              From a single port in Mumbai to consignees across six continents, we move your business with the calm
              certainty of a team that has done this thousands of times.
            </p>
            <p>
              We can also optimise your packaging, manage your materials sourcing and orchestrate the complete supply chain
              — so you can focus on growth, not paperwork.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-navy py-28 text-white lg:py-36">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Eyebrow className="text-white/70">Leadership</Eyebrow>
              <blockquote className="mt-8 font-editorial text-[clamp(1.6rem,2.8vw,2.3rem)] leading-[1.3]">
                “Led by Managing Director Mr. Mahesh Krishna Minde, we are committed to ethical practices, flexibility and
                delivering customer satisfaction on time.”
              </blockquote>
              <p className="mt-8 text-sm tracking-wide text-white/60">Mr. Mahesh Krishna Minde — Managing Director</p>
            </div>
            <ol className="divide-y divide-white/10 border-y border-white/10 lg:col-span-6 lg:col-start-7">
              {VALUES.map((v, i) => (
                <li key={v.title} className="grid grid-cols-[3rem_1fr] gap-4 py-8 sm:grid-cols-[4rem_1fr]">
                  <span className="font-editorial text-[13px] tabular-nums text-signal">0{i + 1}</span>
                  <div>
                    <h3 className="font-heading text-xl font-semibold tracking-tight sm:text-2xl">{v.title}</h3>
                    <p className="mt-3 max-w-md text-[15px] leading-relaxed text-white/60">{v.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-offwhite py-28 text-graphite lg:py-36">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <MaskLines
            as="h2"
            lines={["Measured in years,", "delivered by people."]}
            className="max-w-3xl font-heading text-[clamp(2.2rem,4.2vw,3.8rem)] font-semibold leading-[1.04] tracking-[-0.03em]"
          />
          <div className="mt-20 grid gap-12 sm:grid-cols-3">
            <Counter to={20} suffix="+" label="Years of logistics group heritage" />
            <Counter to={6} label="Continents reached by our consignees" />
            <Counter to={24} suffix="h" label="Technical support, around the clock" />
          </div>
        </div>
      </section>

      <CtaBand
        title="Let’s talk about your next shipment."
        text="Share your origin, destination and cargo, and our team will come back with a tailored quote."
      />
    </>
  );
}
