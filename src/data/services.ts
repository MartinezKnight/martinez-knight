export interface Service {
  n: string;
  slug: string;
  name: string;
  desc: string;
  long: string;
  included: string[];
}

export const SERVICES: Service[] = [
  {
    n: "01",
    slug: "digital-infrastructure",
    name: "Digital Infrastructure",
    desc: "Websites, hosting, business email, SEO, CRM and digital platforms — the backbone your business runs on.",
    long: "Most businesses buy their website, email, hosting and CRM from four different vendors, none of whom talk to each other. We build it as one connected system from the start — so when something needs to change, it changes everywhere at once, not in four separate support tickets.",
    included: [
      "Website design & development",
      "Business email setup (Google Workspace / Microsoft 365)",
      "Hosting, domains & technical maintenance",
      "CRM setup and lead capture",
      "SEO foundations & analytics",
      "Ongoing technical support",
    ],
  },
  {
    n: "02",
    slug: "digital-growth",
    name: "Digital Growth",
    desc: "SEO, visual content, digital marketing, lead generation, advertising and analytics that turn visibility into revenue.",
    long: "Infrastructure gets you online. Growth gets you found. We run the SEO, visual content and paid campaigns that turn a well-built platform into a steady pipeline of qualified leads — measured against numbers you actually care about, not vanity metrics.",
    included: [
      "SEO strategy & execution",
      "Visual content & creative production",
      "Content planning & production",
      "Paid advertising (Google & Meta)",
      "Lead generation funnels",
      "Analytics & monthly reporting",
    ],
  },
  {
    n: "03",
    slug: "business-systems-automation",
    name: "Business Systems & Automation",
    desc: "CRM, workflows, process digitisation, automation, SOPs and operational systems that remove manual work.",
    long: "Every business has processes running on someone's memory, a WhatsApp group, or a spreadsheet nobody trusts. We digitise them — CRM, approvals, onboarding, inventory — and automate the repetitive parts, so your team spends time on the work that actually needs a human.",
    included: [
      "CRM setup & configuration",
      "Workflow & approvals automation",
      "Process digitisation & SOPs",
      "Inventory & operations systems",
      "Custom integrations",
    ],
  },
  {
    n: "04",
    slug: "training-professional-development",
    name: "Training & Professional Development",
    desc: "Corporate training, practical skills development, career programmes and trainee opportunities.",
    long: "Systems are only as good as the people running them. We run practical, hands-on training programmes — for teams adopting new tools, and for individuals building a career in digital and technology work.",
    included: [
      "Corporate team training",
      "Practical skills workshops",
      "Career development programmes",
      "Trainee & apprenticeship opportunities",
    ],
  },
  {
    n: "05",
    slug: "business-corporate-services",
    name: "Business & Corporate Services",
    desc: "Pitch decks, corporate profiles, presentations, business documentation and related strategic support.",
    long: "When you're in front of an investor, a partner, or a board, the documentation has to hold its own. We build pitch decks, corporate profiles and business documentation that are strategically sound, not just well designed.",
    included: [
      "Investor & pitch deck design",
      "Corporate profile development",
      "Presentation design",
      "Business documentation",
      "Strategic advisory support",
    ],
  },
  {
    n: "06",
    slug: "brand-media",
    name: "Brand & Media",
    desc: "Visual identity, creative direction, content production and media that give every other service a voice.",
    long: "Infrastructure and systems need a face. We handle visual identity, creative direction and content production — so everything above, from your CRM to your pitch deck, looks and sounds like the same company.",
    included: [
      "Brand identity & visual systems",
      "Creative direction",
      "Content & media production",
      "Photography & videography coordination",
    ],
  },
];
