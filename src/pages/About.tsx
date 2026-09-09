import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Users2, LineChart, Rocket, Code2 } from "lucide-react";
import FadeIn from "../components/FadeIn";
import SectionHeading from "../components/SectionHeading";
import { ContactButton } from "../components/Buttons";
import { PROJECTS } from "../data/projects";
import { SERVICES } from "../data/services";
import { TEAM } from "../data/team";
import { asset } from "../lib/assets";
import { useTitle } from "../hooks/useTitle";

const STORY =
  "Martinez Knight Limited started in 2018 as a Human Resources Management and Consultancy firm, formally commencing operations in 2019. What began as a mission to enhance business growth through skilled workforce management has grown into a group spanning HR, data research, technology, and venture capital.";

function AnimatedText() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.3"] });
  const chars = STORY.split("");
  return (
    <p
      ref={ref}
      className="text-white font-medium text-center leading-relaxed max-w-[680px] mx-auto"
      style={{ fontSize: "clamp(1.05rem, 2vw, 1.4rem)" }}
    >
      {chars.map((c, i) => {
        const start = i / chars.length;
        const end = start + 1 / chars.length;
        const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);
        return (
          <motion.span key={i} style={{ opacity }}>
            {c}
          </motion.span>
        );
      })}
    </p>
  );
}

const STATS = [
  { value: `${PROJECTS.length}`, label: "Real client projects (Technology division)" },
  { value: "70+", label: "Brands served since 2019" },
  { value: `${SERVICES.length}`, label: "Connected technology service lines" },
];

const DIVISIONS = [
  {
    icon: Users2,
    name: "Human Resources Management & Consultancy",
    tag: "Our founding line of business",
    desc: "Tailored HR solutions integrated with each client's business objectives, ensuring a workforce that's skilled, motivated, and aligned with strategic goals.",
    services: [
      "Recruitment & Talent Acquisition",
      "Employee Training & Development",
      "Performance Management",
      "Employee Engagement & Retention Strategies",
      "HR Audits & Compliance",
      "Payroll & Benefits Management",
    ],
  },
  {
    icon: LineChart,
    name: "Data & Research Services",
    tag: "Data-driven decision-making",
    desc: "Cutting-edge data and research services for startups, SMEs, and corporates who need real insight, not guesswork.",
    services: [
      "Market Research & Feasibility Studies",
      "Data Collection & Analytics",
      "Consumer & Business Insights",
      "Industry Reports & White Papers",
      "Custom Research Solutions",
    ],
  },
  {
    icon: Rocket,
    name: "Venture Capital & Investment Services",
    tag: "Proposed new business line",
    desc: "Funding solutions and investment opportunities for startups and SMEs across Nigeria and beyond.",
    services: [
      "Seed Funding & Angel Investments",
      "Venture Capital Advisory & Fundraising",
      "Business Strategy & Growth Consulting",
      "Investment Portfolio Management",
      "Startup & Entrepreneur Support Programs",
    ],
  },
  {
    icon: Code2,
    name: "Martinez Knight Technology & Designs",
    tag: "This website — subsidiary, est. 2021",
    desc: "IT and digital transformation services from our base at 30 Agadez Crescent, Aminu Kano Crescent, Wuse 2, Abuja. Everything else on this site — Services, Work, Training — belongs to this division.",
    services: [
      "Web & Mobile App Development",
      "IT Infrastructure Management",
      "Digital Marketing & Branding Solutions",
      "Graphic Design & UX/UI Development",
      "Technology Consulting & Support",
    ],
    featured: true,
  },
];

const APPROACH = [
  {
    title: "Client-Centric Focus",
    desc: "Every project is customized to align with our clients' specific objectives, ensuring measurable impact and success.",
  },
  {
    title: "Innovative Solutions",
    desc: "We leverage the latest tools, technologies, and industry insights to offer cutting-edge solutions across all service lines.",
  },
  {
    title: "Global Best Practices",
    desc: "Our methods and operations adhere to global standards in HR management, data research, technology, and venture capital.",
  },
  {
    title: "Ethical Practices",
    desc: "Integrity and professionalism are at the core of everything we do, ensuring transparency and accountability in all client engagements.",
  },
];

export default function About() {
  useTitle("About");
  return (
    <div className="min-h-screen pt-32 pb-24 px-5 sm:px-8 md:px-10">
      <FadeIn delay={0}>
        <p className="text-center text-muted text-xs tracking-[0.3em] uppercase mb-4">Our Story</p>
        <SectionHeading as="h1" className="text-center mb-3">
          About Us
        </SectionHeading>
        <p className="text-center text-white/35 text-xs mb-14">RC Number: 2732692 · Registered with the CAC of Nigeria</p>
      </FadeIn>

      <AnimatedText />

      <div className="max-w-3xl mx-auto flex items-stretch justify-center divide-x divide-white/10 mt-20 mb-4">
        {STATS.map((s, i) => (
          <FadeIn key={s.label} delay={0.1 + i * 0.08}>
            <div className="text-center px-6 sm:px-10">
              <div
                className="font-bold bg-clip-text text-transparent leading-none"
                style={{ fontSize: "clamp(2.2rem, 5vw, 3.4rem)", backgroundImage: "linear-gradient(120deg, #00d4e8, #1a8fff)" }}
              >
                {s.value}
              </div>
              <div className="mt-3 text-white/45 text-[11px] sm:text-xs uppercase tracking-wide leading-snug max-w-[9rem] mx-auto">
                {s.label}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* vision & mission */}
      <div className="max-w-4xl mx-auto mt-24 sm:mt-32 grid sm:grid-cols-2 gap-6">
        <FadeIn delay={0}>
          <div className="liquid-glass rounded-2xl p-7 h-full">
            <p className="text-cyan text-xs uppercase tracking-widest mb-3">Vision</p>
            <p className="text-white/75 text-sm leading-relaxed">
              To be a globally recognized, client-centric firm that partners with organizations to build
              sustainable human capital, drive data-based business insights, and foster innovative ventures
              across industries.
            </p>
          </div>
        </FadeIn>
        <FadeIn delay={0.08}>
          <div className="liquid-glass rounded-2xl p-7 h-full">
            <p className="text-cyan text-xs uppercase tracking-widest mb-3">Mission</p>
            <p className="text-white/75 text-sm leading-relaxed">
              To provide comprehensive and professional services in Human Resources, Data Research, Technology
              Solutions, and Venture Capital, delivering measurable value and impact through innovative
              approaches and operational excellence.
            </p>
          </div>
        </FadeIn>
      </div>

      {/* four business lines */}
      <div className="max-w-5xl mx-auto mt-24 sm:mt-32">
        <FadeIn delay={0}>
          <p className="text-center text-muted text-xs tracking-[0.3em] uppercase mb-4">What We Do</p>
          <h2 className="text-center font-serif font-semibold text-white text-2xl sm:text-3xl mb-14 max-w-2xl mx-auto">
            Four business lines, one group.
          </h2>
        </FadeIn>
        <div className="flex flex-col gap-6">
          {DIVISIONS.map((d, i) => (
            <FadeIn key={d.name} delay={i * 0.06} y={24}>
              <div className={`rounded-2xl p-6 sm:p-7 ${d.featured ? "liquid-glass border border-cyan/25" : "border border-white/10"}`}>
                <div className="flex flex-col sm:flex-row sm:items-start gap-5">
                  <div className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                    <d.icon size={20} className="text-cyan" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-cyan text-[11px] uppercase tracking-widest mb-1">{d.tag}</p>
                    <h3 className="text-white text-lg font-semibold mb-2">{d.name}</h3>
                    <p className="text-white/60 text-sm leading-relaxed mb-4">{d.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {d.services.map((s) => (
                        <span key={s} className="text-xs text-white/70 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03]">
                          {s}
                        </span>
                      ))}
                    </div>
                    {d.featured && (
                      <Link to="/services" className="inline-block mt-4 text-sm text-cyan hover:underline">
                        Explore our technology services →
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* approach */}
      <div className="max-w-5xl mx-auto mt-24 sm:mt-32">
        <FadeIn delay={0}>
          <p className="text-center text-muted text-xs tracking-[0.3em] uppercase mb-4">Our Approach</p>
          <h2 className="text-center font-serif font-semibold text-white text-2xl sm:text-3xl mb-14 max-w-2xl mx-auto">
            Results, delivered the right way.
          </h2>
        </FadeIn>
        <div className="grid sm:grid-cols-2 gap-6">
          {APPROACH.map((a, i) => (
            <FadeIn key={a.title} delay={i * 0.06} y={20}>
              <div className="border-t border-white/10 pt-5">
                <h3 className="text-white font-semibold text-sm mb-2">{a.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{a.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* team */}
      <div className="max-w-4xl mx-auto mt-24 sm:mt-32">
        <FadeIn delay={0}>
          <p className="text-center text-muted text-xs tracking-[0.3em] uppercase mb-4">The Team</p>
          <h2 className="text-center font-serif font-semibold text-white text-2xl sm:text-3xl mb-4">
            One team, every discipline.
          </h2>
        </FadeIn>

        {TEAM.length > 0 ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
            {TEAM.map((m, i) => (
              <FadeIn key={m.name} delay={0.1 + i * 0.06}>
                <div className="liquid-glass rounded-2xl p-6 text-center">
                  {m.photo ? (
                    <img
                      src={asset(m.photo)}
                      alt={m.name}
                      className="w-20 h-20 rounded-full object-cover mx-auto mb-4 border border-white/10"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 mx-auto mb-4 flex items-center justify-center text-white/40 text-lg font-semibold">
                      {m.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                    </div>
                  )}
                  <p className="text-white font-semibold text-sm">{m.name}</p>
                  <p className="text-cyan text-xs mt-1">{m.role}</p>
                  {m.bio && <p className="text-white/45 text-xs mt-3 leading-relaxed">{m.bio}</p>}
                </div>
              </FadeIn>
            ))}
          </div>
        ) : (
          <FadeIn delay={0.15}>
            <p className="text-center text-white/45 text-sm max-w-lg mx-auto mt-6 leading-relaxed">
              Our team consists of qualified professionals across HR, data analytics, technology, and
              venture capital, committed to continuous professional development. Individual team
              profiles are on their way here.
            </p>
          </FadeIn>
        )}
      </div>

      <FadeIn delay={0.2}>
        <div className="flex justify-center mt-20">
          <ContactButton label="Talk To Us" />
        </div>
      </FadeIn>
    </div>
  );
}
