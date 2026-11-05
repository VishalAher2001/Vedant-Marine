import { useEffect, useState, type MouseEvent, type SVGProps } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { CONTACT, LOGO_URL, NAV_LINKS } from "../lib/content";

const scrollToId = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M6.94 8.47a1.64 1.64 0 1 1 0-3.28 1.64 1.64 0 0 1 0 3.28ZM5.55 9.9h2.78v8.18H5.55Zm4.53 0h2.67v1.12h.04c.37-.7 1.28-1.44 2.64-1.44 2.82 0 3.35 1.85 3.35 4.26v4.24h-2.78v-3.97c0-1-.02-2.27-1.38-2.27-1.39 0-1.6 1.08-1.6 2.19v3.95H10.08Z" />
    </svg>
  );
}

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm10.5 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleHash = (hash: string) => (e: MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    if (pathname === "/") {
      scrollToId(hash);
    } else {
      navigate("/");
      window.setTimeout(() => scrollToId(hash), 450);
    }
  };

  const isActive = (to: string, hash?: string) => {
    if (hash) return false;
    if (to === "/") return pathname === "/";
    return pathname.startsWith(to);
  };

  const socialLinks = [
    { label: "LinkedIn", href: "https://www.linkedin.com", icon: LinkedInIcon },
    { label: "Instagram", href: "https://www.instagram.com", icon: InstagramIcon },
  ];

  const onDark = !scrolled && !open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-out ${
          scrolled ? "bg-navy/95 py-3 shadow-[0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-sm" : "bg-transparent py-6"
        }`}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 lg:px-12">
          <Link to="/" aria-label="Vedant Container Lines — Home" className="relative z-10 block">
            <span className="block rounded-[3px] bg-white px-2.5 py-1.5 shadow-sm">
              <img src={LOGO_URL} alt="Vedant Container Lines (India) Pvt. Ltd." className="h-10 w-auto lg:h-11" />
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
            {NAV_LINKS.map((item) => {
              const cls = `link-underline relative text-[13.5px] font-medium tracking-wide text-white/90 transition-colors hover:text-white ${
                isActive(item.to, item.hash) ? "text-white" : ""
              }`;
              return item.hash ? (
                <a key={item.label} href={`#${item.hash}`} onClick={handleHash(item.hash)} className={cls}>
                  {item.label}
                </a>
              ) : (
                <Link key={item.label} to={item.to} className={cls} aria-current={isActive(item.to) ? "page" : undefined}>
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 lg:flex">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/10"
                >
                  <Icon className="h-5 w-5 shrink-0" />
                </a>
              ))}
            </div>
            <Link
              to="/contact"
              className="hidden rounded-full bg-signal px-6 py-3 text-[13px] font-semibold tracking-wide text-white transition-colors duration-500 hover:bg-white hover:text-navy lg:inline-flex"
            >
              Request a Quote
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className={`relative z-10 flex h-11 w-11 items-center justify-center rounded-full transition-colors lg:hidden ${
                onDark ? "text-white" : "text-white"
              } ${open ? "" : "border border-white/25"}`}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-40 flex flex-col bg-navy text-white lg:hidden"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="flex flex-1 flex-col justify-center px-8 pt-24">
              <ul className="space-y-1">
                {NAV_LINKS.map((item, i) => (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.25 + i * 0.07, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden border-b border-white/10 py-3"
                  >
                    {item.hash ? (
                      <a
                        href={`#${item.hash}`}
                        onClick={handleHash(item.hash)}
                        className="font-heading text-[2.4rem] font-semibold leading-tight tracking-tight"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link to={item.to} className="font-heading text-[2.4rem] font-semibold leading-tight tracking-tight">
                        {item.label}
                      </Link>
                    )}
                  </motion.li>
                ))}
              </ul>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="space-y-4 border-t border-white/10 px-8 py-8 text-sm text-white/70"
            >
              <div className="flex items-center gap-3">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-all hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/10"
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                  </a>
                ))}
              </div>
              <Link
                to="/contact"
                className="inline-flex rounded-full bg-signal px-6 py-3 font-semibold text-white"
              >
                Request a Quote
              </Link>
              <p>
                <a href={`tel:${CONTACT.phoneIndiaTel}`} className="text-white">{CONTACT.phoneIndia}</a>
                <span className="mx-2 opacity-40">·</span>
                <a href={`mailto:${CONTACT.emails[0]}`} className="text-white">{CONTACT.emails[0]}</a>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
