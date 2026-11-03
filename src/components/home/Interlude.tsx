import { IMG } from "../../lib/content";
import { ClipImage, Eyebrow } from "../ui";

/** Full-bleed aerial moment between the About and Services chapters. */
export default function Interlude() {
  return (
    <section aria-label="Operations" className="relative h-[92svh] min-h-[580px] overflow-hidden bg-navy text-white">
      <div className="absolute inset-0">
        <ClipImage src={IMG.interlude} alt="Aerial view of cargo ships crossing open blue ocean" className="h-full w-full" parallax={8} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-navy/10" aria-hidden />

      <div className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-end px-6 pb-16 lg:px-12 lg:pb-24">
        <Eyebrow className="mb-8 text-white/75">Our approach</Eyebrow>
        <p className="display max-w-5xl text-[clamp(2.2rem,4.8vw,5rem)] text-white">
          We obsess over the small details — paperwork, customs codes, port windows —
          <span className="text-white/45"> so your team can focus on the big ones.</span>
        </p>
      </div>
    </section>
  );
}
