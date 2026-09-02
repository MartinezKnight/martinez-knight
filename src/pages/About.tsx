import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import FadeIn from "../components/FadeIn";
import SectionHeading from "../components/SectionHeading";
import { ContactButton } from "../components/Buttons";
import { PROJECTS } from "../data/projects";
import { SERVICES } from "../data/services";
import { TEAM } from "../data/team";
import { useTitle } from "../hooks/useTitle";

const STORY =
  "Martinez Knight started as a website design agency. We repositioned as a digital infrastructure and business transformation company because the businesses we work with kept needing more than a site — a system they could run their whole operation on.";

function AnimatedText() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.3"] });
  const chars = STORY.split("");
  return (
    <p
      ref={ref}
      className="text-white font-medium text-center leading-relaxed max-w-[600px] mx-auto"
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
  { value: `${PROJECTS.length}`, label: "Real client projects" },
  { value: "70+", label: "Brands served since 2019" },
  { value: `${SERVICES.length}`, label: "Connected service lines" },
];

export default function About() {
  useTitle("About");
  return (
    <div className="min-h-screen pt-32 pb-24 px-5 sm:px-8 md:px-10">
      <FadeIn delay={0}>
        <p className="text-center text-muted text-xs tracking-[0.3em] uppercase mb-4">Our Story</p>
        <SectionHeading as="h1" className="text-center mb-14">
          About Us
        </SectionHeading>
      </FadeIn>

      <AnimatedText />

      <div className="max-w-3xl mx-auto grid grid-cols-3 gap-4 sm:gap-6 mt-16">
        {STATS.map((s, i) => (
          <FadeIn key={s.label} delay={0.1 + i * 0.08}>
            <div className="liquid-glass rounded-2xl p-5 sm:p-6 text-center">
              <div
                className="font-bold bg-clip-text text-transparent"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.1rem)", backgroundImage: "linear-gradient(120deg, #00d4e8, #1a8fff)" }}
              >
                {s.value}
              </div>
              <div className="mt-2 text-white/50 text-[11px] sm:text-xs leading-snug">{s.label}</div>
            </div>
          </FadeIn>
        ))}
      </div>

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
                      src={m.photo}
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
            <p className="text-center text-white/45 text-sm max-w-md mx-auto mt-6 leading-relaxed">
              Every project on the Work page is delivered by the same small,
              senior team — from first strategy call to the system going live.
              Team profiles are on their way here.
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
