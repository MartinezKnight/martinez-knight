import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { LiveProjectButton } from "./Buttons";
import { asset } from "../lib/assets";
import type { Project } from "../data/projects";

function domainFor(project: Project) {
  if (project.liveUrl) {
    try {
      return new URL(project.liveUrl).hostname;
    } catch {
      /* fall through */
    }
  }
  return project.category;
}

function BrowserMock({ project }: { project: Project }) {
  const initials = project.name
    .split(" ")
    .filter((w) => w[0] === w[0].toUpperCase())
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

  // mouse-tracking 3D tilt — the panel leans toward the cursor instead of
  // just lifting on hover, which is what actually reads as "premium" rather
  // than a generic card hover
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });
  const rotateX = useTransform(springY, [0, 1], [7, -7]);
  const rotateY = useTransform(springX, [0, 1], [-7, 7]);
  const glowX = useTransform(springX, [0, 1], ["0%", "100%"]);
  const glowY = useTransform(springY, [0, 1], ["0%", "100%"]);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };
  const handleLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className="relative rounded-2xl overflow-hidden bg-[#f4f5f7] shadow-2xl transition-shadow duration-500 group-hover:shadow-[0_40px_90px_-15px_rgba(0,0,0,0.65)]"
    >
      {/* cursor-following sheen */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([gx, gy]) => `radial-gradient(400px circle at ${gx} ${gy}, rgba(255,255,255,0.35), transparent 60%)`
          ),
        }}
      />

      {/* browser chrome */}
      <div className="h-8 flex items-center gap-2 px-3 bg-white border-b border-black/[0.06] relative z-10">
        <span className="w-2 h-2 rounded-full bg-[#ff5f57]" />
        <span className="w-2 h-2 rounded-full bg-[#febc2e]" />
        <span className="w-2 h-2 rounded-full bg-[#28c840]" />
        <span className="mx-auto -translate-x-2 text-[10px] text-black/40 font-medium">
          {domainFor(project)}
        </span>
      </div>

      {project.screenshot ? (
        <div className="aspect-[16/11] relative z-10 overflow-hidden bg-white">
          <img
            src={project.screenshot}
            alt={`${project.name} website`}
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            loading="lazy"
            onError={(e) => {
              // if the proxy ever fails, hide the broken image rather than
              // show a broken-image icon — the badge + chrome still read fine
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
          <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 bg-black/70 backdrop-blur-sm rounded-full px-2.5 py-1 z-20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#28c840]" />
            <span className="text-white text-[10px] font-medium">Live site</span>
          </div>
        </div>
      ) : (
        <div className="aspect-[16/11] bg-white p-3.5 flex flex-col gap-3 relative z-10">
          <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 bg-black/70 backdrop-blur-sm rounded-full px-2.5 py-1 z-20">
            <span className={`w-1.5 h-1.5 rounded-full ${project.liveUrl ? "bg-[#28c840]" : "bg-[#febc2e]"}`} />
            <span className="text-white text-[10px] font-medium">
              {project.liveUrl ? "Live site" : "In development"}
            </span>
          </div>
          {/* nav row */}
          <div className="flex items-center justify-between">
            {project.logo ? (
              <img src={asset(project.logo)} alt="" className="h-4 w-auto max-w-[70px] object-contain" />
            ) : (
              <span className="text-[10px] font-bold text-black/70">{initials}</span>
            )}
            <div className="flex items-center gap-1.5">
              {[1, 2, 3].map((i) => (
                <span key={i} className="w-4 h-1 rounded-full bg-black/10" />
              ))}
            </div>
          </div>

          {/* hero block */}
          <div
            className="flex-1 rounded-lg relative overflow-hidden flex flex-col justify-center px-4"
            style={{ background: project.gradient }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.25),transparent_60%)]" />
            <div className="relative w-2/3 h-2 rounded-full bg-white/90 mb-1.5" />
            <div className="relative w-1/2 h-2 rounded-full bg-white/60 mb-3" />
            <div className="relative w-14 h-4 rounded-full bg-white/95" />
          </div>

          {/* content grid */}
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="rounded-md border border-black/[0.06] p-1.5">
                <div className="w-full h-4 rounded-sm mb-1.5" style={{ background: project.gradient, opacity: 0.25 }} />
                <div className="w-full h-1 rounded-full bg-black/10 mb-1" />
                <div className="w-2/3 h-1 rounded-full bg-black/10" />
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const navigate = useNavigate();
  const reverse = index % 2 === 1;
  const summary =
    project.desc ?? (project.long.length > 220 ? project.long.slice(0, 220).trim() + "…" : project.long);
  const go = () => navigate(`/work/${project.slug}`);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="grid md:grid-cols-2 gap-8 md:gap-14 items-center py-14 md:py-20 border-t border-white/10 first:border-t-0 first:pt-0"
    >
      {/* visual panel — a browser-chrome mockup of the delivered site, not a flat gradient card */}
      <div className={`group relative ${reverse ? "md:order-2" : "md:order-1"}`}>
        <span className="absolute -top-5 -left-3 font-black text-white/10 leading-none text-6xl md:text-7xl select-none pointer-events-none z-0">
          {project.n}
        </span>
        <button type="button" onClick={go} aria-label={`View ${project.name} case study`} className="block w-full cursor-pointer text-left rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan focus-visible:outline-offset-4">
          <div className="relative z-10">
            <BrowserMock project={project} />
          </div>
          <span className="relative z-10 flex items-center gap-1.5 text-cyan text-xs font-semibold uppercase tracking-wider mt-4">
            Explore case study <ArrowUpRight size={14} />
          </span>
        </button>
      </div>

      {/* text panel */}
      <div className={reverse ? "md:order-1" : "md:order-2"}>
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <p className="text-cyan text-xs uppercase tracking-wider">{project.category}</p>
          <span className="text-white/25 text-xs">/</span>
          <span className="text-white/45 text-xs">{project.category.toLowerCase().includes("internal venture") ? "Martinez Knight venture" : "Client engagement"}</span>
        </div>
        <h3 className="text-white text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight mb-4">
          {project.name}
        </h3>
        <p className="text-white/65 text-sm sm:text-base leading-7 mb-6 max-w-lg">{summary}</p>
        {project.deliverables && (
          <div className="flex flex-wrap gap-2 mb-6 max-w-lg">
            {project.deliverables.slice(0, 4).map((item) => (
              <span key={item} className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1.5 text-[11px] text-white/55">{item}</span>
            ))}
            {project.deliverables.length > 4 && <span className="px-2 py-1.5 text-[11px] text-white/40">+{project.deliverables.length - 4} more</span>}
          </div>
        )}

        {project.stats && (
          <div className="grid grid-cols-2 gap-3 mb-7 max-w-md">
            {project.stats.slice(0, 4).map((s) => (
              <div key={s.label} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <div
                  className="font-bold text-lg bg-clip-text text-transparent"
                  style={{ backgroundImage: project.gradient }}
                >
                  {s.value}
                </div>
                <div className="text-white/50 text-[11px] mt-0.5 leading-snug">{s.label}</div>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3">
          <button type="button" onClick={go} className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-xs font-semibold uppercase tracking-wider text-black transition-colors hover:bg-cyan">
            Read case study <ArrowUpRight size={14} />
          </button>
          {project.liveUrl && <LiveProjectButton label="Visit live site" href={project.liveUrl} />}
        </div>
      </div>
    </motion.div>
  );
}
