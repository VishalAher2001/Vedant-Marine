import Certifications from "../components/Certifications";
import { CtaBand, PageHero } from "../components/PageHero";
import { Eyebrow, MaskLines } from "../components/ui";
import { IMG, STRENGTHS } from "../lib/content";
import { useSeo } from "../lib/seo";

export default function CertificationsPage() {
  useSeo({
    title: "Certifications & Memberships | Vedant Container Lines (India) Pvt. Ltd.",
    description:
      "Memberships and certifications published by Vedant Container Lines: FFi, FICCI, ISO and MSME.",
  });

  return (
    <>
      <PageHero
        image={IMG.certsHero}
        imageAlt="Bustling seaport with cranes, containers and cargo ships"
        eyebrow="Certifications & trust"
        lines={["Memberships and", "certifications."]}
        intro="The memberships and certifications published on our website, and the standards behind how we work."
        crumbs={[{ label: "Home", to: "/" }, { label: "Certifications" }]}
      />

      <Certifications heading={false} />

      <section className="bg-navy py-28 text-white lg:py-36">
        <div className="mx-auto grid max-w-[1440px] gap-16 px-6 lg:grid-cols-12 lg:px-12">
          <div className="lg:col-span-5">
            <Eyebrow className="text-white/70">How we work</Eyebrow>
            <MaskLines
              as="h2"
              lines={["Standards we keep", "on every shipment."]}
              className="mt-8 font-heading text-[clamp(2.1rem,4vw,3.6rem)] font-semibold leading-[1.05] tracking-[-0.03em]"
            />
          </div>
          <ol className="divide-y divide-white/10 border-y border-white/10 lg:col-span-6 lg:col-start-7">
            {STRENGTHS.map((s, i) => (
              <li key={s.title} className="grid grid-cols-[3rem_1fr] gap-4 py-7">
                <span className="font-editorial text-[13px] tabular-nums text-signal">0{i + 1}</span>
                <div>
                  <h3 className="font-heading text-xl font-semibold tracking-tight">{s.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-white/60">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand
        title="Ready to work with a certified team?"
        text="Our coordinators are available Monday to Saturday, 10am to 7pm, with 24-hour technical support."
      />
    </>
  );
}
