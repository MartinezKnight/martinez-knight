// Routes a real image through the wsrv.nl proxy (fetched server-side on
// their end, re-served from their CDN) so it isn't rejected by the source
// site's own hotlink protection when loaded as a plain <img> here.
function proxied(url: string, w = 800, h = 550) {
  return `https://wsrv.nl/?url=${encodeURIComponent(url)}&w=${w}&h=${h}&fit=cover&output=webp`;
}

export interface Project {
  n: string;
  slug: string;
  category: string;
  name: string;
  desc?: string;
  long: string;
  gradient: string;
  logo?: string;
  stats?: { label: string; value: string }[];
  /** A real preview image from the live site, routed through the wsrv.nl
   * image proxy — the sites' own hosting blocks hotlinked <img> requests
   * from other domains (confirmed: URLs are correct, browser loads were
   * being rejected), so wsrv.nl fetches server-side and re-serves it from
   * its own CDN. Omit while the site is still in development. */
  screenshot?: string;
  /** What we actually built, drawn from the six real service lines — shown
   * as tags on the case study page. Keep it honest and sized to the account. */
  deliverables?: string[];
  /** For internal ventures (e.g. HubConnect) rather than client engagements —
   * the founder's role, key contributions, a pitch video, and reference links. */
  role?: string;
  contributions?: string[];
  videoUrl?: string;
  links?: { label: string; url: string }[];
  /** Live client site — powers the "Visit Live Site" link and the Live/In
   * development badge on the Work page. Omit while still in development. */
  liveUrl?: string;
}

export const PROJECTS: Project[] = [
  {
    n: "01",
    slug: "goodland-xclusive-company",
    category: "Real Estate & Interiors",
    name: "Goodland Xclusive Company",
    desc: "Interior fit-out and real estate.",
    long: "Goodland Xclusive Company needed a digital presence that could carry the weight of high-value interior fit-out and real estate work — Martinez Knight built the infrastructure and brand presence to match.",
    gradient: "linear-gradient(135deg, #00d4e8 0%, #1a8fff 100%)",
    logo: "/media/goodland-logo.png",
    liveUrl: "https://goodland.africa/",
    screenshot: proxied("https://goodland.africa/wp-content/uploads/2026/08/hotel_hotel_2020_114622_22_900x550.jpg"),
    deliverables: ["Website", "Business Email", "Hosting"],
  },
  {
    n: "02",
    slug: "geycci-beauty-spa",
    category: "Spa & Wellness",
    name: "Geycci Beauty & Spa",
    desc: "Spa and salon.",
    long: "A digital presence for Geycci Beauty & Spa built to match the calm, premium experience clients expect the moment they walk in the door.",
    gradient: "linear-gradient(135deg, #1a8fff 0%, #7621B0 100%)",
    logo: "/media/geycci-logo.png",
    liveUrl: "https://geycci.com/",
    screenshot: proxied("https://geycci.com/wp-content/uploads/2023/03/b-2-1.png"),
    deliverables: ["Website", "Business Email", "Hosting", "Booking System"],
  },
  {
    n: "03",
    slug: "space-spectrum-limited",
    category: "Architecture, Engineering & Construction",
    name: "Space Spectrum Limited",
    desc: "A premier AEC consultancy in Abuja delivering architecture, structural engineering, MEP and construction management since 2000.",
    long: "Space Spectrum Limited is a premier architecture, engineering and construction consultancy based in Abuja, with 20+ years delivering landmark residential, commercial, institutional and healthcare developments across Nigeria for clients including Delta State Government, UNDP and Lafarge Africa. Martinez Knight built the digital presence to match that track record.",
    gradient: "linear-gradient(135deg, #7621B0 0%, #BE4C00 100%)",
    logo: "/media/space-spectrum-logo.png",
    liveUrl: "https://spacespectrumltd.com/",
    screenshot: proxied("https://www.spacespectrumltd.com/images/og-home.jpg"),
    deliverables: ["Website", "Business Email", "Hosting", "Brand Identity"],
  },
  {
    n: "04",
    slug: "kadtech-solutions-limited",
    category: "Retail & Device Repair",
    name: "Kadtech Solutions Limited",
    desc: "Gadgets and device repair.",
    long: "Kadtech Solutions Limited runs on fast-moving retail and repair traffic — Martinez Knight built the digital infrastructure to keep pace with it.",
    gradient: "linear-gradient(135deg, #BE4C00 0%, #00d4e8 100%)",
    logo: "/media/kadtech-logo.png",
    liveUrl: "https://kadtech-website.vercel.app/",
    screenshot: proxied("https://kadtech-website.vercel.app/store/storefront.png"),
    deliverables: ["Website", "Business Email", "Hosting"],
  },
  {
    n: "05",
    slug: "elpazio-limited",
    category: "Technology & Managed Services",
    name: "Elpazio Limited",
    desc: "A 35-year-old technology solutions powerhouse serving Marriott, Sheraton, Radisson Blu, NCC and Bouygues — Martinez Knight runs their entire digital operation, from server backend to paid advertising.",
    long: "Elpazio Limited is a 35-year-old technology solutions powerhouse serving Marriott, Sheraton, Radisson Blu, NCC and Bouygues. Martinez Knight doesn't just design for Elpazio — we run their entire digital operation. Highlights from the engagement: a zero-downtime, zero-data-loss migration of their entire hosting and email infrastructure; a full brand identity system including corporate letterhead and company profile; a rebuilt website; a professional product & sales brochure; and a social media presence built from zero across Facebook, Instagram, TikTok, X, YouTube, LinkedIn and Google Business. Martinez Knight also represented Elpazio at the International Hospitality & Tourism Expo Forum (IHTEF 9.0).",
    gradient: "linear-gradient(135deg, #00d4e8 0%, #7621B0 100%)",
    logo: "/media/elpazio-logo.png",
    liveUrl: "https://elpazio.com/",
    screenshot: proxied("https://elpazio.com/wp-content/uploads/2026/03/Futuristic-300x169.png"),
    deliverables: [
      "Website",
      "Hosting & Email Migration",
      "Brand Identity",
      "Corporate Documents",
      "Social Media Management",
      "Paid Advertising",
    ],
    stats: [
      { label: "Email & data downtime during migration", value: "0" },
      { label: "Flagship projects delivered (H1 2026)", value: "8" },
      { label: "Marketing assets produced", value: "30+" },
      { label: "Industry expo represented", value: "IHTEF 9.0" },
    ],
  },
  {
    n: "06",
    slug: "hubconnect",
    category: "Digital Economy · Internal Venture",
    name: "HubConnect",
    long: "HubConnect is a Martinez Knight venture, not a client engagement — a digital platform designed to activate Africa's 24/7 economy by connecting people to work, services, and earnings in real time. For over 6 years we've been quietly building the foundations of a digital-first platform that responds to the broken way work gets hired, paid, and recognized.",
    gradient: "linear-gradient(135deg, #1a8fff 0%, #00d4e8 100%)",
    logo: "/media/hubconnect-logo.png",
    liveUrl: "https://martinezknight.github.io/hubconnect/",
    deliverables: ["Website", "Business Email", "Hosting"],
    role: "Founder, Product Architect, Growth Strategist (2019–Present)",
    contributions: [
      "Designed a multi-service digital economy framework for millions of underemployed Africans",
      "Built a job tier system with real-time pay rates, task-level KPIs, and daily earnings",
      "Developed service verticals: microjobs, real estate access, investment tokenization, career learning",
      "Led UX coordination, product concepting, and pitch delivery at national platforms (e.g. NIDCOM)",
    ],
    videoUrl: "https://youtu.be/S6nu4tf4WWk",
    links: [
      { label: "Investor Pitch (Notion)", url: "https://www.notion.so/HubConnect-Nigeria-Limited-Investor-Pitch-2082bbe147f4801da8fde4682ac14b63" },
      { label: "Field Ops Tracking System", url: "https://fundhubconnecthq.notion.site/Field-Recruitment-Operations-Tracking-System-2532bbe147f480cb90abfb93f9883536" },
      { label: "UX Screens (Figma)", url: "https://www.figma.com/proto/1ALSSDI78z6iijsdLH1QRb/Hubconnect" },
    ],
  },
  {
    n: "07",
    slug: "stannath-global-logistics",
    category: "Logistics & Supply Chain",
    name: "StanNath Global Logistics",
    long: "StanNath Global Logistics needed systems built for the pace and complexity of logistics and supply chain operations.",
    gradient: "linear-gradient(135deg, #BE4C00 0%, #1a8fff 100%)",
    logo: "/media/clients/stan-nath-logo.png",
    deliverables: ["Brand Identity", "Website (in progress)"],
  },
  {
    n: "08",
    slug: "alabastore",
    category: "Retail",
    name: "AlabaStore",
    long: "AlabaStore's digital presence was built to match the scale and pace of Nigeria's retail electronics market.",
    gradient: "linear-gradient(135deg, #7621B0 0%, #00d4e8 100%)",
    logo: "/media/alabastore-logo.png",
    liveUrl: "https://www.alabastore.com/",
    screenshot: proxied("https://www.alabastore.com/wp-content/uploads/2026/09/September-2_074641-1.jpg"),
    deliverables: ["Website", "Business Email", "Hosting", "SEO"],
  },
];
