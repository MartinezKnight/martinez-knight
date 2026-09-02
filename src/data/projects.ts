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
    logo: "./media/goodland-logo.png",
  },
  {
    n: "02",
    slug: "geycci-beauty-spa",
    category: "Spa & Wellness",
    name: "Geycci Beauty & Spa",
    desc: "Spa and salon.",
    long: "A digital presence for Geycci Beauty & Spa built to match the calm, premium experience clients expect the moment they walk in the door.",
    gradient: "linear-gradient(135deg, #1a8fff 0%, #7621B0 100%)",
    logo: "./media/geycci-logo.png",
  },
  {
    n: "03",
    slug: "space-spectrum-limited",
    category: "Architecture, Engineering & Construction",
    name: "Space Spectrum Limited",
    desc: "A premier AEC consultancy in Abuja delivering architecture, structural engineering, MEP and construction management since 2000.",
    long: "Space Spectrum Limited is a premier architecture, engineering and construction consultancy based in Abuja, with 20+ years delivering landmark residential, commercial, institutional and healthcare developments across Nigeria for clients including Delta State Government, UNDP and Lafarge Africa. Martinez Knight built the digital presence to match that track record.",
    gradient: "linear-gradient(135deg, #7621B0 0%, #BE4C00 100%)",
    logo: "./media/space-spectrum-logo.png",
  },
  {
    n: "04",
    slug: "kadtech-solutions-limited",
    category: "Retail & Device Repair",
    name: "Kadtech Solutions Limited",
    desc: "Gadgets and device repair.",
    long: "Kadtech Solutions Limited runs on fast-moving retail and repair traffic — Martinez Knight built the digital infrastructure to keep pace with it.",
    gradient: "linear-gradient(135deg, #BE4C00 0%, #00d4e8 100%)",
    logo: "./media/kadtech-logo.png",
  },
  {
    n: "05",
    slug: "elpazio-limited",
    category: "Technology & Managed Services",
    name: "Elpazio Limited",
    desc: "A 35-year-old technology solutions powerhouse serving Marriott, Sheraton, Radisson Blu, NCC and Bouygues — Martinez Knight runs their entire digital operation, from server backend to paid advertising.",
    long: "Elpazio Limited is a 35-year-old technology solutions powerhouse serving Marriott, Sheraton, Radisson Blu, NCC and Bouygues. Martinez Knight doesn't just design for Elpazio — we run their entire digital operation. Highlights from the engagement: a zero-downtime, zero-data-loss migration of their entire hosting and email infrastructure; a full brand identity system including corporate letterhead and company profile; a rebuilt website; a professional product & sales brochure; and a social media presence built from zero across Facebook, Instagram, TikTok, X, YouTube, LinkedIn and Google Business. Martinez Knight also represented Elpazio at the International Hospitality & Tourism Expo Forum (IHTEF 9.0).",
    gradient: "linear-gradient(135deg, #00d4e8 0%, #7621B0 100%)",
    logo: "./media/elpazio-logo.png",
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
    category: "Business Solutions",
    name: "HubConnect",
    long: "HubConnect partnered with Martinez Knight to build the digital foundation behind its business solutions offering.",
    gradient: "linear-gradient(135deg, #1a8fff 0%, #00d4e8 100%)",
    logo: "./media/hubconnect-logo.png",
  },
  {
    n: "07",
    slug: "stannath-global-logistics",
    category: "Logistics & Supply Chain",
    name: "StanNath Global Logistics",
    long: "StanNath Global Logistics needed systems built for the pace and complexity of logistics and supply chain operations.",
    gradient: "linear-gradient(135deg, #BE4C00 0%, #1a8fff 100%)",
    logo: "./media/clients/stan-nath-logo.png",
  },
  {
    n: "08",
    slug: "alabastore",
    category: "Retail",
    name: "AlabaStore",
    long: "AlabaStore's digital presence was built to match the scale and pace of Nigeria's retail electronics market.",
    gradient: "linear-gradient(135deg, #7621B0 0%, #00d4e8 100%)",
    logo: "./media/alabastore-logo.png",
  },
];
