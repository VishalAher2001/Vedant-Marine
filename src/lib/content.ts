import { photo } from "./gsap";

/* ------------------------------------------------------------------ */
/*  Brand                                                              */
/* ------------------------------------------------------------------ */

export const LOGO_URL =
  "https://vedantgroup.org/wp-content/uploads/2026/06/vedant-logos-08-1.png";

export const CERT_LOGOS = [
  { key: "FFI", name: "FFi", src: "https://vedantgroup.org/wp-content/uploads/2026/07/FFi-Logo.webp" },
  { key: "FICCI", name: "FICCI", src: "https://vedantgroup.org/wp-content/uploads/2026/07/Ficc-Logo.webp" },
  { key: "ISO", name: "ISO", src: "https://vedantgroup.org/wp-content/uploads/2026/07/ISO-Logo.webp" },
  { key: "MSME", name: "MSME", src: "https://vedantgroup.org/wp-content/uploads/2026/07/MSME-Logo.webp" },
];

export const CONTACT = {
  phoneIndia: "+91-97692 01823",
  phoneIndiaTel: "+919769201823",
  phoneUAE: "+971 56 359 2427",
  phoneUAETel: "+971563592427",
  emails: ["mahesh@vedantgroup.org", "mahesh@vmscontainerline.ae"],
  hours: "Mon – Sat · 10am to 7pm",
  offices: [
    {
      country: "India",
      city: "Navi Mumbai",
      address:
        "Office No. 110, 1st Floor, Raheja Arcade, Plot No. 61, Sector-11, CBD Belapur, Navi Mumbai – 400 614, MH, India.",
      phone: "+91-97692 01823",
    },
    {
      country: "UAE",
      city: "Dubai",
      address:
        "404, 4th Floor, Al-Rifaa Plaza, Khalid Bin Al Waleed Road, Al Fahidi, P.O. Box 44413, Dubai, United Arab Emirates.",
      phone: "+971 56 359 2427",
    },
  ],
};

export const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Global Network", to: "/#global-network", hash: "global-network" },
  { label: "Certifications", to: "/certifications" },
  { label: "Contact", to: "/contact" },
];

/* ------------------------------------------------------------------ */
/*  Photography (Pexels, colour-graded on site via .photo)            */
/* ------------------------------------------------------------------ */

export const IMG = {
  heroOcean: photo(40536199, 2400, 1500),
  journey: photo(9806482, 2400, 1500),
  about: photo(20581299, 1600, 1100),
  interlude: photo(36112907, 2400, 1400),
  whyBg: photo(9312571, 2400, 1400),
  contactBg: photo(21234960, 2400, 1400),
  aboutHero: photo(6595780, 2400, 1500),
  servicesHero: photo(13409736, 2400, 1500),
  certsHero: photo(34024846, 2400, 1500),
  contactHero: photo(24702864, 2400, 1500),
};

/* ------------------------------------------------------------------ */
/*  Services — copy sourced from vedantgroup.org/services              */
/* ------------------------------------------------------------------ */

export type Service = {
  slug: string;
  num: string;
  title: string;
  teaser: string;
  intro: string;
  body: string[];
  highlights: string[];
  image: string;
  hero: string;
  related: string[];
};

export const SERVICES: Service[] = [
  {
    slug: "nvocc",
    num: "01",
    title: "NVOCC",
    teaser: "Flexible container solutions on a strong global shipping network.",
    intro:
      "Vedant Container Lines provides reliable NVOCC services through a strong global shipping network, offering flexible container solutions and efficient cargo management.",
    body: [
      "We ensure secure, cost-effective, and timely transportation, backed by seamless coordination and professional logistics support.",
      "As an NVOCC, Vedant Container Lines works across India, the Far East, the Middle East, Europe, the UK and the US, giving your cargo a single point of contact from booking to delivery.",
    ],
    highlights: [
      "Flexible container solutions",
      "Efficient cargo management",
      "Secure, cost-effective transportation",
      "Seamless coordination and logistics support",
    ],
    image: photo(31061213, 1400, 900),
    hero: photo(27130409, 2400, 1500),
    related: ["fcl", "lcl", "tracking", "api"],
  },
  {
    slug: "international-freight-forwarding",
    num: "02",
    title: "International Freight Forwarding",
    teaser: "Planning, documentation and transport management across borders.",
    intro:
      "Our international freight forwarding services simplify global cargo movement through efficient planning, documentation, and transportation management.",
    body: [
      "With an extensive logistics network and customer-focused approach, we deliver reliable shipping solutions tailored to your business needs.",
      "From a single port in Mumbai to consignees across six continents, we coordinate each leg of the journey so your team can focus on growth.",
    ],
    highlights: [
      "Efficient shipment planning",
      "Documentation handled end to end",
      "Transportation management",
      "Solutions tailored to your business",
    ],
    image: photo(38087942, 1400, 900),
    hero: photo(37601393, 2400, 1500),
    related: ["fcl", "air", "customs", "tracking"],
  },
  {
    slug: "door-to-door-delivery",
    num: "03",
    title: "Door-to-Door Delivery",
    teaser: "One team managing every stage from pickup to final destination.",
    intro:
      "We offer comprehensive door-to-door delivery services that manage every stage of your shipment, from pickup to final destination.",
    body: [
      "Our dedicated logistics team ensures safe handling, timely deliveries, and a hassle-free shipping experience.",
      "Pickup, port movement, customs formalities and final delivery are planned as one continuous journey, with a single coordinator accountable for the outcome.",
    ],
    highlights: [
      "Pickup from your premises",
      "Safe handling throughout transit",
      "Timely final-mile delivery",
      "One coordinator for the full journey",
    ],
    image: photo(27732803, 1400, 900),
    hero: photo(12418932, 2400, 1500),
    related: ["drayage", "customs", "tracking", "warehouse"],
  },
  {
    slug: "cross-trade-services",
    num: "04",
    title: "Cross Trade Services",
    teaser: "Cargo moving between two international locations, bypassing your home country.",
    intro:
      "Vedant Container Lines specializes in Cross Trade Services, enabling seamless cargo movement between two international locations without passing through the customer’s home country.",
    body: [
      "Our global network and expert coordination ensure efficient, reliable, and cost-effective cross-border logistics.",
      "Cross trade is a specialist discipline: documentation, routing and partner coordination all have to align across more than two jurisdictions. That is the work our team is built to handle.",
    ],
    highlights: [
      "Origin-to-destination routing",
      "Coordination across global partners",
      "Cost-effective cross-border movement",
      "Expert documentation handling",
    ],
    image: photo(6876835, 1400, 900),
    hero: photo(35628765, 2400, 1500),
    related: ["fcl", "customs", "tracking", "api"],
  },
  {
    slug: "custom-clearance",
    num: "05",
    title: "Custom Clearance",
    teaser: "Smooth import and export with compliance handled for you.",
    intro:
      "Our customs clearance services ensure smooth import and export processes by managing documentation, regulatory compliance, and customs formalities efficiently.",
    body: [
      "We help minimize delays and ensure your shipments move quickly through customs.",
      "Our team tracks port windows and customs codes closely, so paperwork is ready before the vessel arrives and your cargo is not left waiting.",
    ],
    highlights: [
      "Import and export documentation",
      "Regulatory compliance",
      "Customs formalities managed efficiently",
      "Fewer delays at the border",
    ],
    image: photo(29002683, 1400, 900),
    hero: photo(24246926, 2400, 1500),
    related: ["fcl", "drayage", "warehouse", "tracking"],
  },
  {
    slug: "road-transport",
    num: "06",
    title: "Road Transport",
    teaser: "Safe, reliable and on-schedule cargo movement across domestic destinations.",
    intro:
      "Our road transport services provide safe, reliable, and timely cargo movement across domestic destinations.",
    body: [
      "Supported by an experienced logistics team and an efficient transportation network, we ensure every shipment reaches its destination securely and on schedule.",
      "Road legs are planned in line with port and warehouse slots, so inland movement stays synchronised with the rest of your supply chain.",
    ],
    highlights: [
      "Domestic cargo movement",
      "Experienced logistics team",
      "Efficient transportation network",
      "Secure, on-schedule delivery",
    ],
    image: photo(36136848, 1400, 900),
    hero: photo(2199293, 2400, 1500),
    related: ["drayage", "fcl", "warehouse", "tracking"],
  },
  {
    slug: "warehousing",
    num: "07",
    title: "Warehousing",
    teaser: "Secure storage, inventory control and streamlined order fulfilment.",
    intro:
      "Our warehousing solutions offer secure storage, efficient inventory management, and streamlined order fulfillment to support your supply chain.",
    body: [
      "With professionally managed facilities and flexible storage options, we ensure your goods remain safe, organized, and ready for timely distribution.",
      "Storage, stock control and dispatch are coordinated with your shipping schedule, so inventory is where it needs to be when it needs to be there.",
    ],
    highlights: [
      "Secure storage",
      "Efficient inventory management",
      "Streamlined order fulfilment",
      "Flexible storage options",
    ],
    image: photo(4483773, 1400, 900),
    hero: photo(27111449, 2400, 1500),
    related: ["lcl", "drayage", "customs", "tracking"],
  },
  {
    slug: "cargo-insurance",
    num: "08",
    title: "Cargo Insurance",
    teaser: "Protection against loss, theft, damage and unforeseen transit risks.",
    intro:
      "Our cargo insurance services provide comprehensive protection against loss, theft, damage, and unforeseen transit risks.",
    body: [
      "With reliable coverage and dedicated claim support, we help safeguard your valuable shipments and provide complete peace of mind throughout the transportation process.",
      "Cover is arranged alongside your freight plan, so protection is in place from the moment your cargo leaves origin.",
    ],
    highlights: [
      "Protection against loss and theft",
      "Cover for damage in transit",
      "Dedicated claim support",
      "Peace of mind throughout transport",
    ],
    image: photo(14392678, 1400, 900),
    hero: photo(16678060, 2400, 1500),
    related: ["fcl", "air", "warehouse", "tracking"],
  },
];

export const serviceBySlug = (slug: string) => SERVICES.find((s) => s.slug === slug);

/* ------------------------------------------------------------------ */
/*  Logistics capabilities                                             */
/* ------------------------------------------------------------------ */

export type Capability = {
  id: string;
  code: string;
  title: string;
  full: string;
  desc: string;
  image?: string;
};

export const CAPABILITIES: Capability[] = [
  {
    id: "fcl",
    code: "CAP—01",
    title: "FCL",
    full: "Full Container Load",
    desc: "A container reserved for your cargo alone, sealed at origin and moved through to destination.",
    image: photo(33675681, 1400, 1000),
  },
  {
    id: "lcl",
    code: "CAP—02",
    title: "LCL",
    full: "Less than Container Load",
    desc: "Share container space with other consignments, consolidated at origin and split at destination.",
    image: photo(10834810, 1400, 1000),
  },
  {
    id: "air",
    code: "CAP—03",
    title: "International Air Freight",
    full: "Time-critical cargo by air",
    desc: "Air freight for urgent consignments, coordinated with origin pickup and destination delivery.",
    image: photo(32509735, 1400, 1000),
  },
  {
    id: "drayage",
    code: "CAP—04",
    title: "Pickup & Delivery Drayage",
    full: "Port, depot and door",
    desc: "Container movement between the port, depot and your premises, planned around port windows.",
    image: photo(38422417, 1400, 1000),
  },
  {
    id: "customs",
    code: "CAP—05",
    title: "Customs Brokerage & Foreign Trade",
    full: "Compliance and formalities",
    desc: "Documentation, regulatory compliance and customs formalities managed by our clearance team.",
    image: photo(4487363, 1400, 1000),
  },
  {
    id: "warehouse",
    code: "CAP—06",
    title: "Warehousing & Distribution",
    full: "Storage to dispatch",
    desc: "Secure storage, inventory management and order fulfilment that keeps stock moving.",
    image: photo(4170172, 1400, 1000),
  },
  {
    id: "tracking",
    code: "CAP—07",
    title: "Real-Time Tracking",
    full: "Shipment visibility",
    desc: "Follow your consignment from booking to delivery with status updates from our coordinators.",
    image: photo(39621561, 1400, 1000),
  },
  {
    id: "api",
    code: "CAP—08",
    title: "API Integration",
    full: "Connected systems",
    desc: "Link your ERP or booking workflow to our shipment data for faster, cleaner operations.",
  },
];

/* ------------------------------------------------------------------ */
/*  Why Vedant                                                         */
/* ------------------------------------------------------------------ */

export const STRENGTHS = [
  {
    title: "Global Supply Chain Solutions",
    desc: "Ocean, road, warehousing and documentation coordinated under one plan rather than handed between vendors.",
  },
  {
    title: "Careful Handling of Valuable Goods",
    desc: "Secure, professionally managed handling for high-value shipments from pickup to final delivery.",
  },
  {
    title: "Transparent Pricing",
    desc: "Clear, tailored quotations so you know what your shipment costs before it sails.",
  },
  {
    title: "Professional Logistics Coordination",
    desc: "Port windows, customs codes and carrier schedules managed with the detail most teams don’t have time for.",
  },
  {
    title: "24-Hour Technical Support",
    desc: "Round-the-clock technical support for your shipping operations.",
  },
];

/* ------------------------------------------------------------------ */
/*  Global network — regions named on vedantgroup.org                 */
/* ------------------------------------------------------------------ */

export const NETWORK_REGIONS = [
  { name: "India", note: "Head office, Navi Mumbai — our single port of departure", coords: [72.88, 19.08] as [number, number] },
  { name: "Middle East", note: "UAE office, Dubai", coords: [55.27, 25.2] as [number, number] },
  { name: "Far East", note: "Trade lanes across Asia", coords: [121.47, 31.23] as [number, number] },
  { name: "Europe", note: "Consignee and partner network", coords: [9.99, 53.55] as [number, number] },
  { name: "United Kingdom", note: "Consignee and partner network", coords: [-0.12, 51.5] as [number, number] },
  { name: "United States", note: "Consignee and partner network", coords: [-74.0, 40.71] as [number, number] },
];

export const NETWORK_ROUTES: [string, string][] = [
  ["India", "Middle East"],
  ["India", "Far East"],
  ["Middle East", "Europe"],
  ["Europe", "United Kingdom"],
  ["Europe", "United States"],
  ["India", "United States"],
];
