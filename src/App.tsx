import { useEffect } from "react";
import { HashRouter, Link, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import ServicePage from "./pages/ServicePage";
import CertificationsPage from "./pages/CertificationsPage";
import ContactPage from "./pages/ContactPage";
import { ScrollTrigger } from "./lib/gsap";
import { useSeo } from "./lib/seo";

/** Resets scroll on navigation and keeps ScrollTrigger measurements accurate. */
function ScrollManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 120);
    return () => window.clearTimeout(t);
  }, [pathname]);

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    return () => window.removeEventListener("load", refresh);
  }, []);

  return null;
}

function NotFound() {
  useSeo({ title: "Page not found | Vedant Container Lines", description: "The page you are looking for could not be found." });
  return (
    <section className="flex min-h-[100svh] flex-col items-center justify-center bg-navy px-6 text-center text-white">
      <p className="eyebrow text-white/60">Error 404</p>
      <h1 className="display mt-6 text-[clamp(3rem,8vw,7rem)]">Off the charts.</h1>
      <p className="mt-6 max-w-md text-white/65">This page has drifted off our route. Head back to the home port.</p>
      <Link to="/" className="link-underline mt-10 text-sm font-semibold">
        Return home
      </Link>
    </section>
  );
}

function AppShell() {
  return (
    <>
      <ScrollManager />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:slug" element={<ServicePage />} />
          <Route path="/certifications" element={<CertificationsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AppShell />
    </HashRouter>
  );
}
