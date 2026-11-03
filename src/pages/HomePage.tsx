import Hero from "../components/home/Hero";
import ShipJourney from "../components/home/ShipJourney";
import About from "../components/home/About";
import Interlude from "../components/home/Interlude";
import ServicesRail from "../components/home/ServicesRail";
import GlobalNetwork from "../components/home/GlobalNetwork";
import Capabilities from "../components/home/Capabilities";
import WhyVedant from "../components/home/WhyVedant";
import Certifications from "../components/Certifications";
import QuoteSection from "../components/QuoteSection";
import { IMG } from "../lib/content";
import { useSeo } from "../lib/seo";

export default function HomePage() {
  useSeo({
    title: "Vedant Container Lines (India) Pvt. Ltd. | NVOCC & Freight Forwarding",
    description:
      "NVOCC, international freight forwarding, door-to-door delivery, cross trade, customs clearance, warehousing, road transport and cargo insurance from Vedant Container Lines.",
  });

  return (
    <>
      <Hero />
      <ShipJourney />
      <About />
      <Interlude />
      <ServicesRail />
      <GlobalNetwork />
      <Capabilities />
      <WhyVedant />
      <Certifications />
      <QuoteSection
        id="quote"
        background={IMG.contactBg}
        heading={["Let’s Move Your", "Business Forward."]}
        intro="Tell us about your shipment and let our team help you find the right logistics solution."
      />
    </>
  );
}
