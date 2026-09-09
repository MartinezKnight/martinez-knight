import { Link } from "react-router-dom";
import {
  Globe,
  TrendingUp,
  Workflow,
  Check,
  ArrowRight,
  Code2,
  Palette,
  Video,
  PenTool,
  Megaphone,
  Database,
} from "lucide-react";
import FadeIn from "../components/FadeIn";
import SectionHeading from "../components/SectionHeading";
import { useTitle } from "../hooks/useTitle";

const CATALOG = [
  {
    category: "Development",
    courses: [
      { icon: Code2, name: "Web Development", desc: "Front-end and back-end fundamentals, shipped as real projects." },
      { icon: Globe, name: "WordPress Development", desc: "Themes, plugins, and no-code builds for real client sites." },
    ],
  },
  {
    category: "Design & Creative",
    courses: [
      { icon: Palette, name: "Brand & Graphic Design", desc: "Visual identity, layout, and design systems." },
      { icon: Video, name: "Cinematography", desc: "Shooting and editing video for brands and social." },
      { icon: PenTool, name: "Content Creation", desc: "Writing, photography, and content built for platforms." },
    ],
  },
  {
    category: "Marketing & Growth",
    courses: [
      { icon: Megaphone, name: "Digital Marketing", desc: "SEO, paid ads, and campaigns that convert." },
    ],
  },
  {
    category: "Business Systems",
    courses: [
      { icon: Database, name: "CRM & Automation", desc: "Pipelines, workflows, and the tools that run operations." },
    ],
  },
];

const PILLARS = [
  {
    icon: Globe,
    weeks: "Weeks 1–4",
    title: "Digital Infrastructure",
    desc: "Set up a business online, end to end: domains, DNS, hosting, professional email, and a live 4–6 page website.",
    outcomes: ["Domain, DNS & professional email setup", "A shipped no-code website", "Landing pages, forms & booking", "Security, backups & handover docs"],
  },
  {
    icon: TrendingUp,
    weeks: "Weeks 5–8",
    title: "Digital Growth",
    desc: "Turn traffic into leads: analytics instrumentation, SEO, content, and paid ads — measured against real numbers.",
    outcomes: ["GA4, GTM & Search Console set up", "SEO plan + published article", "4-week content calendar", "Meta Ads fundamentals + reporting"],
  },
  {
    icon: Workflow,
    weeks: "Weeks 9–12",
    title: "Business Systems & Automation",
    desc: "Design the operational backbone: CRM pipelines, SOPs, and automations that remove manual work.",
    outcomes: ["A working CRM pipeline", "An ops workspace (SOPs, onboarding)", "3 live automations, built and tested", "Client-ready SOW & handover pack"],
  },
];

const TRACKS = [
  {
    id: "foundation",
    name: "Foundation Track",
    length: "3 Months",
    tagline: "For undergrads & fresh grads building job-ready basics.",
    includes: ["Infrastructure + Growth fundamentals", "Automation basics", "Portfolio basics", "Job-readiness focus"],
  },
  {
    id: "professional",
    name: "Professional Track",
    length: "6 Months",
    tagline: "For anyone serious about freelancing or employment.",
    includes: ["Everything in Foundation", "Advanced web + productized delivery", "CRO, retargeting & lead scoring", "Capstone: full business operating system"],
    featured: true,
  },
];

export default function Training() {
  useTitle("Training & Professional Development");
  return (
    <div className="relative min-h-screen pt-32 pb-24 px-5 sm:px-8 md:px-10 overflow-hidden">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full blur-[140px] opacity-[0.16] pointer-events-none"
        style={{ background: "linear-gradient(135deg, #00d4e8, #1a8fff)" }}
      />

      {/* hero */}
      <FadeIn delay={0}>
        <p className="text-center text-cyan text-xs tracking-[0.3em] uppercase mb-4">
          Training &amp; Professional Development
        </p>
        <SectionHeading as="h1" className="text-center mb-6 max-w-4xl mx-auto">
          Learn The Skills.
          <br />
          <span className="shiny-text">Build The Real Thing.</span>
        </SectionHeading>
        <p className="text-center text-white/60 max-w-xl mx-auto text-base sm:text-lg leading-relaxed mb-10">
          Hands-on training in the tools and skills real digital businesses run
          on. Taught by the team that builds these for real clients, not from
          a textbook.
        </p>
        <div className="flex justify-center">
          <Link
            to="/training/apply"
            className="inline-flex items-center gap-2 rounded-full bg-white text-black font-medium text-sm sm:text-base px-8 py-4 hover:bg-white/90 transition-colors"
          >
            Apply Now
            <ArrowRight size={16} />
          </Link>
        </div>
      </FadeIn>

      {/* course catalog, by category */}
      <div className="max-w-5xl mx-auto mt-24 mb-24">
        <FadeIn delay={0}>
          <p className="text-center text-white/40 text-xs uppercase tracking-widest mb-3">Course Catalog</p>
          <h2 className="text-center text-white text-2xl sm:text-3xl font-semibold mb-14 max-w-xl mx-auto">
            Pick the skill you want to build.
          </h2>
        </FadeIn>
        <div className="flex flex-col gap-12">
          {CATALOG.map((group, gi) => (
            <div key={group.category}>
              <FadeIn delay={gi * 0.05}>
                <p className="text-cyan text-xs uppercase tracking-widest mb-4">{group.category}</p>
              </FadeIn>
              <div className="grid sm:grid-cols-2 gap-4">
                {group.courses.map((c, i) => (
                  <FadeIn key={c.name} delay={gi * 0.05 + i * 0.05} y={20}>
                    <div className="liquid-glass rounded-xl p-5 flex items-start gap-4 h-full">
                      <c.icon size={20} className="text-white flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-white text-sm font-semibold mb-1">{c.name}</p>
                        <p className="text-white/55 text-xs leading-relaxed">{c.desc}</p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* the generalist programme — 3 pillars */}
      <div className="max-w-6xl mx-auto mb-24">
        <FadeIn delay={0}>
          <p className="text-center text-white/40 text-xs uppercase tracking-widest mb-3">The Full Programme</p>
          <h2 className="text-center text-white text-2xl sm:text-3xl font-semibold mb-2 max-w-2xl mx-auto">
            Or go deeper: become a full digital generalist.
          </h2>
          <p className="text-center text-white/50 text-sm max-w-lg mx-auto mb-14">
            Our flagship track combines infrastructure, growth, and automation into one job-ready skill set.
          </p>
        </FadeIn>
        <div className="grid md:grid-cols-3 gap-6">
          {PILLARS.map((p, i) => (
            <FadeIn key={p.title} delay={i * 0.1} y={30}>
              <div className="liquid-glass rounded-2xl p-6 h-full flex flex-col">
                <p className="text-cyan text-xs uppercase tracking-widest mb-4">{p.weeks}</p>
                <p.icon size={24} className="text-white mb-4" />
                <h3 className="text-white text-lg font-semibold mb-2">{p.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed mb-5">{p.desc}</p>
                <ul className="flex flex-col gap-2 mt-auto">
                  {p.outcomes.map((o) => (
                    <li key={o} className="flex items-start gap-2 text-white/70 text-xs">
                      <Check size={13} className="text-cyan flex-shrink-0 mt-0.5" />
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* format */}
      <FadeIn delay={0}>
        <div className="max-w-3xl mx-auto text-center mb-24">
          <p className="text-white/40 text-xs uppercase tracking-widest mb-4">Format</p>
          <p className="text-white/70 text-base sm:text-lg leading-relaxed">
            2–3 live sessions a week (2 hours each), plus a weekly hands-on lab
            and a capstone studio project. Every learner graduates with a
            deployed website, a growth campaign report, a working CRM +
            automation system, and a client-style capstone presentation.
          </p>
        </div>
      </FadeIn>

      {/* tracks */}
      <div className="max-w-4xl mx-auto mb-24">
        <FadeIn delay={0}>
          <p className="text-center text-white/40 text-xs uppercase tracking-widest mb-14">Choose Your Track</p>
        </FadeIn>
        <div className="grid sm:grid-cols-2 gap-6">
          {TRACKS.map((t, i) => (
            <FadeIn key={t.name} delay={i * 0.1} y={30}>
              <div
                className={`rounded-2xl p-7 h-full flex flex-col ${
                  t.featured ? "liquid-glass border border-cyan/30" : "border border-white/10"
                }`}
              >
                {t.featured && (
                  <span className="text-cyan text-[10px] uppercase tracking-widest mb-3">Most comprehensive</span>
                )}
                <h3 className="text-white text-xl font-semibold">{t.name}</h3>
                <p className="text-white/40 text-sm mb-1">{t.length}</p>
                <p className="text-white/60 text-sm leading-relaxed mb-5">{t.tagline}</p>
                <ul className="flex flex-col gap-2.5 mb-7">
                  {t.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-white/70 text-sm">
                      <Check size={14} className="text-cyan flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  to={`/training/apply?track=${t.id}`}
                  className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-full border border-white/15 text-white text-sm font-medium px-5 py-3 hover:bg-white/5 transition-colors"
                >
                  Apply for {t.name}
                  <ArrowRight size={14} />
                </Link>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* final CTA */}
      <FadeIn delay={0}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-white text-2xl sm:text-3xl font-semibold mb-4">Ready to start?</h2>
          <p className="text-white/60 text-sm sm:text-base mb-8">
            Tell us who you are and what you want to learn — we'll follow up with next steps.
          </p>
          <Link
            to="/training/apply"
            className="inline-flex items-center gap-2 rounded-full bg-white text-black font-medium text-sm sm:text-base px-8 py-4 hover:bg-white/90 transition-colors"
          >
            Apply Now
            <ArrowRight size={16} />
          </Link>
        </div>
      </FadeIn>
    </div>
  );
}
