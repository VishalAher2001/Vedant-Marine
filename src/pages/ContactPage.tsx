import { PageHero } from "../components/PageHero";
import QuoteSection from "../components/QuoteSection";
import { Eyebrow } from "../components/ui";
import { CONTACT, IMG } from "../lib/content";
import { useSeo } from "../lib/seo";
import { Mail, Clock, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  useSeo({
    title: "Contact & Request a Quote | Vedant Container Lines",
    description:
      "Request a quote from Vedant Container Lines. Offices in Navi Mumbai, India and Dubai, UAE. Tailored quotes within two hours.",
  });

  return (
    <>
      <PageHero
        image={IMG.contactHero}
        imageAlt="Industrial harbour with cranes and a loaded container ship"
        eyebrow="Contact us"
        lines={["Ready to ship", "smarter, safer, sooner?"]}
        intro="Tell us about your shipment. Our team responds with a tailored quote within two hours."
        crumbs={[{ label: "Home", to: "/" }, { label: "Contact" }]}
      />

      <section className="bg-offwhite py-24 text-graphite lg:py-32">
        <div className="mx-auto grid max-w-[1440px] gap-14 px-6 lg:grid-cols-12 lg:px-12">
          <div className="space-y-10 lg:col-span-4">
            <div>
              <Eyebrow>Email</Eyebrow>
              <ul className="mt-5 space-y-3">
                {CONTACT.emails.map((e) => (
                  <li key={e} className="flex items-center gap-3">
                    <Mail size={16} className="text-signal" />
                    <a
                      href={`mailto:${e}`}
                      className="link-underline text-[16px] font-medium"
                    >
                      {e}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Eyebrow>Phone</Eyebrow>
              <ul className="mt-5 space-y-3">
                <li className="flex items-center gap-3">
                  <Phone size={16} className="text-signal" />
                  <a
                    href={`tel:${CONTACT.phoneIndiaTel}`}
                    className="link-underline text-[16px] font-medium"
                  >
                    {CONTACT.phoneIndia}{" "}
                    <span className="text-graphite/50">(India)</span>
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={16} className="text-signal" />
                  <a
                    href={`tel:${CONTACT.phoneUAETel}`}
                    className="link-underline text-[16px] font-medium"
                  >
                    {CONTACT.phoneUAE}{" "}
                    <span className="text-graphite/50">(UAE)</span>
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <Eyebrow>Hours</Eyebrow>
              <p className="mt-5 flex items-center gap-3 text-[16px] font-medium">
                <Clock size={16} className="text-signal" /> {CONTACT.hours}
              </p>
            </div>
          </div>

          {CONTACT.offices.map((o) => (
            <div key={o.country} className="lg:col-span-4">
              <div className="border-t border-graphite/15 pt-6">
                <Eyebrow>{o.country} office</Eyebrow>
                <p className="mt-5 flex items-start gap-3 font-heading text-2xl font-semibold tracking-tight">
                  <MapPin size={20} className="mt-1 shrink-0 text-signal" />{" "}
                  {o.city}
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-graphite/70">
                  {o.address}
                </p>
                <a
                  href={`tel:${o.phone.replace(/[^+\d]/g, "")}`}
                  className="link-underline mt-4 inline-block text-[15px] font-medium"
                >
                  {o.phone}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <QuoteSection
        id="quote"
        background={IMG.contactBg}
        heading={["Tell us about", "your shipment."]}
        intro="Share the essentials below. The more detail you give, the more accurate your quote."
      />
    </>
  );
}
