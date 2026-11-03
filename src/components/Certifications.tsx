import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "../lib/gsap";
import { CERT_LOGOS } from "../lib/content";
import { Eyebrow, MaskLines } from "./ui";

const DESCRIPTIONS: Record<string, string> = {
  FFI: "Membership as displayed on the company website.",
  FICCI: "Federation of Indian Chambers of Commerce & Industry.",
  ISO: "ISO certification as displayed on the company website.",
  MSME: "MSME registration as displayed on the company website.",
};

export default function Certifications({ heading = true }: { heading?: boolean }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!root.current || prefersReducedMotion()) return;
      gsap.fromTo(
        root.current.querySelectorAll(".cert-tile"),
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 1.4,
          ease: "power4.inOut",
          stagger: 0.12,
          scrollTrigger: { trigger: root.current, start: "top 75%", once: true },
        }
      );
    },
    { scope: root }
  );

  return (
    <section ref={root} id="certifications" aria-label="Certifications and memberships" className="bg-white py-28 text-graphite lg:py-36">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          {heading && (
            <div className="lg:col-span-6">
              <Eyebrow>Certifications &amp; trust</Eyebrow>
              <MaskLines
                as="h2"
                lines={["Memberships and", "certifications."]}
                className="mt-8 font-heading text-[clamp(2.2rem,4.2vw,3.8rem)] font-semibold leading-[1.04] tracking-[-0.03em]"
              />
            </div>
          )}
          <p className="max-w-md text-[16px] leading-relaxed text-graphite/65 lg:col-span-4 lg:col-start-9">
            The logos below are the certifications and memberships published on the company’s website.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-px bg-graphite/10 md:grid-cols-4">
          {CERT_LOGOS.map((c) => (
            <figure key={c.key} className="cert-tile flex flex-col bg-white">
              <div className="flex aspect-[4/3] items-center justify-center p-10">
                <img
                  src={c.src}
                  alt={`${c.name} logo`}
                  loading="lazy"
                  decoding="async"
                  className="max-h-20 w-auto max-w-[70%] object-contain transition-transform duration-700 hover:scale-105"
                />
              </div>
              <figcaption className="border-t border-graphite/10 px-6 py-5">
                <p className="font-heading text-sm font-semibold tracking-wide">{c.name}</p>
                <p className="mt-1 text-[13px] leading-relaxed text-graphite/55">{DESCRIPTIONS[c.key]}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
