import { Link } from "react-router-dom";
import { ArrowUpRight, Mail, MessageCircle, Phone } from "lucide-react";
import { CONTACT, LOGO_URL, NAV_LINKS, SERVICES } from "../lib/content";
import { getExternalLinkProps } from "../lib/security";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy text-white">
      <div className="mx-auto max-w-[1440px] px-6 pb-10 pt-24 lg:px-12 lg:pt-32">
        <div className="grid gap-16 lg:grid-cols-12">
          {/* Intro */}
          <div className="lg:col-span-4">
            <span className="inline-block rounded-[3px] bg-white px-3 py-2">
              <img src={LOGO_URL} alt="Vedant Container Lines" className="h-11 w-auto" loading="lazy" />
            </span>
            <p className="mt-8 max-w-sm text-[15px] leading-relaxed text-white/65">
              Vedant Container Lines (India) Pvt. Ltd. is an extension of Vedant Clearing Pvt. Ltd. — a two-decade-old
              logistics group delivering NVOCC and international freight forwarding services.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <a
                href={`https://wa.me/${CONTACT.phoneIndiaTel.replace("+", "")}`}
                {...getExternalLinkProps()}
                aria-label="WhatsApp us"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/80 transition-all duration-500 hover:border-signal hover:bg-signal hover:text-white"
              >
                <MessageCircle size={17} />
              </a>
              <a
                href={`mailto:${CONTACT.emails[0]}`}
                aria-label="Email us"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/80 transition-all duration-500 hover:border-signal hover:bg-signal hover:text-white"
              >
                <Mail size={17} />
              </a>
              <a
                href={`tel:${CONTACT.phoneIndiaTel}`}
                aria-label="Call us"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/80 transition-all duration-500 hover:border-signal hover:bg-signal hover:text-white"
              >
                <Phone size={17} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 lg:col-span-5 lg:grid-cols-2">
            <div>
              <p className="eyebrow text-white/45">Company</p>
              <ul className="mt-6 space-y-3.5">
                {NAV_LINKS.filter((l) => !l.hash).map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="link-underline text-[15px] text-white/85 transition-colors hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow text-white/45">Services</p>
              <ul className="mt-6 space-y-3.5">
                {SERVICES.map((s) => (
                  <li key={s.slug}>
                    <Link
                      to={`/services/${s.slug}`}
                      className="link-underline text-[15px] text-white/85 transition-colors hover:text-white"
                    >
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* Offices & contact */}
          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-3 lg:grid-cols-1">
            {CONTACT.offices.map((o) => (
              <div key={o.country}>
                <p className="eyebrow text-white/45">{o.country} Office</p>
                <p className="mt-4 text-[14px] leading-relaxed text-white/75">{o.address}</p>
                <a href={`tel:${o.phone.replace(/[^+\d]/g, "")}`} className="mt-3 inline-block text-[14px] text-white hover:text-signal">
                  {o.phone}
                </a>
              </div>
            ))}
            <div>
              <p className="eyebrow text-white/45">Email</p>
              <ul className="mt-4 space-y-2">
                {CONTACT.emails.map((e) => (
                  <li key={e}>
                    <a href={`mailto:${e}`} className="link-underline text-[14px] text-white/85 hover:text-white">
                      {e}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Large typographic sign-off */}
        <div className="mt-24 border-t border-white/10 pt-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <p className="display text-[clamp(2.6rem,7.4vw,7.5rem)] text-white">
              Moving global trade.
              <span className="block text-white/35">Connecting possibilities.</span>
            </p>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 self-start text-sm font-semibold text-white lg:self-end"
            >
              Start a shipment enquiry
              <ArrowUpRight size={16} className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>
          <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-[12.5px] text-white/45 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Vedant Container Lines (India) Pvt. Ltd. All rights reserved.</p>
            <p>{CONTACT.hours}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
