import { Link } from "react-router-dom";
import { ClipImage, Btn, Eyebrow, MaskLines } from "./ui";

export function PageHero({
  image,
  imageAlt,
  eyebrow,
  lines,
  intro,
  crumbs,
  height = "h-[88svh]",
}: {
  image: string;
  imageAlt: string;
  eyebrow: string;
  lines: string[];
  intro?: string;
  crumbs?: { label: string; to?: string }[];
  height?: string;
}) {
  return (
    <section className={`relative ${height} min-h-[600px] w-full overflow-hidden bg-navy text-white`}>
      <div className="absolute inset-0">
        <ClipImage src={image} alt={imageAlt} className="h-full w-full" parallax={6} eager />
      </div>
      <div className="absolute inset-0 bg-navy/40" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/45 to-navy/10" aria-hidden />

      <div className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-end px-6 pb-16 pt-36 lg:px-12 lg:pb-24">
        {crumbs && (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-[12px] tracking-[0.14em] uppercase text-white/60">
              {crumbs.map((c, i) => (
                <li key={c.label} className="flex items-center gap-2">
                  {c.to ? (
                    <Link to={c.to} className="link-underline hover:text-white">
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-white/90">{c.label}</span>
                  )}
                  {i < crumbs.length - 1 && <span aria-hidden>/</span>}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <Eyebrow className="text-white/75">{eyebrow}</Eyebrow>
        <MaskLines
          as="h1"
          lines={lines}
          className="display mt-8 text-[clamp(2.8rem,6.6vw,6.6rem)] text-white"
        />
        {intro && <p className="mt-10 max-w-xl text-[17px] leading-relaxed text-white/75 lg:text-lg">{intro}</p>}
      </div>
    </section>
  );
}

export function CtaBand({ title, text }: { title: string; text: string }) {
  return (
    <section aria-label="Next steps" className="relative overflow-hidden bg-navy py-24 text-white lg:py-32">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-6 lg:grid-cols-12 lg:items-end lg:px-12">
        <div className="lg:col-span-7">
          <Eyebrow className="text-white/70">Next step</Eyebrow>
          <p className="display mt-6 text-[clamp(2.2rem,4.6vw,4.4rem)] text-white">{title}</p>
          <p className="mt-6 max-w-lg text-[16px] leading-relaxed text-white/65">{text}</p>
        </div>
        <div className="flex flex-wrap gap-4 lg:col-span-5 lg:justify-end">
          <Btn to="/contact" variant="primary">
            Request a Quote
          </Btn>
          <Btn to="/services" variant="ghost">
            View All Services
          </Btn>
        </div>
      </div>
    </section>
  );
}
