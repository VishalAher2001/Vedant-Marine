import { useEffect, useState, type MouseEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { CONTACT, LOGO_URL, NAV_LINKS } from "../lib/content";

const scrollToId = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

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

          <div className="flex items-center gap-4">
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
