import { ExternalLink } from "lucide-react";
import FadeIn from "../components/FadeIn";
import SectionHeading from "../components/SectionHeading";
import TrainingAd from "../components/TrainingAd";
import { useTitle } from "../hooks/useTitle";

const NEWS = [
  {
    date: "September 2026",
    title: "GITEX Nigeria 2026 opens in Abuja, pushing a \"sovereign AI\" agenda",
    summary:
      "The second edition of GITEX Nigeria opened in Abuja under the theme \"Beyond Connectivity: The Bridge to Sovereign AI and Innovation,\" bringing government officials, global tech firms and investors together to discuss digital infrastructure, AI and data governance before moving to Lagos for the startup and investor-focused leg.",
    source: "Economic Confidential",
    url: "https://economicconfidential.com/gitex-nigeria-sovereign/",
  },
  {
    date: "2026",
    title: "Nigeria's digital economy on track for $18.3bn in 2026",
    summary:
      "Industry reports cited by BusinessDay project Nigeria's digital economy revenue nearly doubling from 2021 levels, driven by AI adoption, a maturing fintech sector, and wider cloud and broadband rollout — alongside a more defined regulatory push from NITDA.",
    source: "BusinessDay NG",
    url: "https://businessday.ng/technology/article/2026-marks-turning-point-for-nigerias-tech-ecosystem-on-regulation-innovation/",
  },
  {
    date: "September 2026",
    title: "Government talent programme passes 1.8m registrations",
    summary:
      "Officials at GITEX Nigeria disclosed that the federal 3 Million Technical Talent (3MTT) programme has logged around 1.87 million registrations nationwide, with more than 125,000 people trained so far in cloud computing, AI, cybersecurity and software engineering.",
    source: "Economic Confidential",
    url: "https://economicconfidential.com/gitex-nigeria-sovereign/",
  },
  {
    date: "Q2 2026",
    title: "Telecoms now the dominant driver of Nigeria's ICT sector",
    summary:
      "Telecoms accounted for 9.72 percentage points of the ICT sector's 16.35% contribution to GDP in the second quarter of 2026, underlining how much of the country's digital growth still rides on connectivity infrastructure.",
    source: "Techeconomy",
    url: "https://techeconomy.ng/",
  },
];

const EXPOS = [
  {
    name: "GITEX Nigeria — Tech Expo & Future Economy Conference",
    when: "31 Aug – 3 Sep 2026",
    where: "Abuja & Lagos",
    url: "https://gitexnigeria.ng/",
  },
  {
    name: "Nigeria Innovation Summit",
    when: "2026",
    where: "Nigeria",
    url: "https://innovationsummit.ng/",
  },
  {
    name: "Africa Technology Expo (ATE)",
    when: "2026",
    where: "Nigeria",
    url: "https://africatechnologyexpo.com/",
  },
  {
    name: "Lagos Tech Fest",
    when: "2026",
    where: "Lagos",
    url: "https://tech.eventhive.ng/",
  },
];

export default function Blog() {
  useTitle("Blog");
  return (
    <div className="min-h-screen pt-32 pb-24 px-5 sm:px-8 md:px-10">
      <FadeIn delay={0}>
        <p className="text-center text-cyan text-xs tracking-[0.3em] uppercase mb-4">Insights</p>
        <SectionHeading as="h1" className="text-center mb-6">
          The Blog.
        </SectionHeading>
        <p className="text-center text-white/60 max-w-lg mx-auto text-base leading-relaxed mb-16">
          We're still writing our own original pieces on digital infrastructure
          and systems — in the meantime, here's what's moving in tech right
          now, curated from real reporting.
        </p>
      </FadeIn>

      {/* curated news */}
      <div className="max-w-4xl mx-auto mb-20">
        <FadeIn delay={0}>
          <p className="text-white/40 text-xs uppercase tracking-widest mb-6">In The News</p>
        </FadeIn>
        <div className="flex flex-col">
          {NEWS.map((n, i) => (
            <FadeIn key={n.title} delay={i * 0.06}>
              <a
                href={n.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6 py-6 border-t border-white/10 first:border-t-0"
              >
                <span className="text-white/40 text-xs uppercase tracking-widest sm:w-28 flex-shrink-0 pt-0.5">
                  {n.date}
                </span>
                <div className="flex-1">
                  <p className="text-white font-medium text-sm sm:text-base mb-1.5 group-hover:text-cyan transition-colors flex items-start gap-1.5">
                    {n.title}
                    <ExternalLink size={13} className="flex-shrink-0 mt-1 opacity-50" />
                  </p>
                  <p className="text-white/55 text-sm leading-relaxed mb-1.5">{n.summary}</p>
                  <span className="text-white/35 text-xs">{n.source}</span>
                </div>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* expos */}
      <div className="max-w-4xl mx-auto mb-20">
        <FadeIn delay={0}>
          <p className="text-white/40 text-xs uppercase tracking-widest mb-6">Industry Expos &amp; Events</p>
        </FadeIn>
        <div className="grid sm:grid-cols-2 gap-4">
          {EXPOS.map((e, i) => (
            <FadeIn key={e.name} delay={i * 0.06} y={20}>
              <a
                href={e.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group liquid-glass rounded-xl p-5 flex flex-col gap-1 h-full hover:border-cyan/30 transition-colors"
              >
                <p className="text-white font-medium text-sm group-hover:text-cyan transition-colors flex items-start gap-1.5">
                  {e.name}
                  <ExternalLink size={12} className="flex-shrink-0 mt-1 opacity-50" />
                </p>
                <p className="text-white/50 text-xs">
                  {e.when} · {e.where}
                </p>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <FadeIn delay={0}>
          <TrainingAd />
        </FadeIn>
      </div>
    </div>
  );
}
