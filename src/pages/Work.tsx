import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FadeIn from "../components/FadeIn";
import SectionHeading from "../components/SectionHeading";
import ProjectCard from "../components/ProjectCard";
import { PROJECTS } from "../data/projects";
import { useTitle } from "../hooks/useTitle";

export default function Work() {
  useTitle("Work");
  const categories = useMemo(() => ["All", ...new Set(PROJECTS.map((p) => p.category))], []);
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === active);

  return (
    <div className="min-h-screen pt-32 pb-24 px-5 sm:px-8 md:px-10">
      <FadeIn delay={0}>
        <p className="text-center text-muted text-xs tracking-[0.3em] uppercase mb-4">Client Work</p>
        <SectionHeading as="h1" className="text-center mb-6">
          Every Project,
          <br />
          <span className="italic font-light">Real Clients.</span>
        </SectionHeading>
        <p className="text-center text-white/50 text-sm max-w-md mx-auto mb-10">
          {PROJECTS.length} businesses running on systems Martinez Knight designed, built and runs.
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-4 max-w-4xl mx-auto">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`text-xs sm:text-sm px-4 py-2 rounded-full border transition-colors ${
                active === c
                  ? "bg-white text-black border-white"
                  : "border-white/15 text-white/60 hover:text-white hover:border-white/30"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </FadeIn>

      <div className="max-w-5xl mx-auto">
        <AnimatePresence mode="popLayout">
          {filtered.map((p, i) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCard project={p} index={i} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
