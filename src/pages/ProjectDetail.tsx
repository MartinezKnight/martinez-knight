import { useParams, Link, Navigate } from "react-router-dom";
import { PROJECTS } from "../data/projects";
import { ContactButton } from "../components/Buttons";
import FadeIn from "../components/FadeIn";
import SectionHeading from "../components/SectionHeading";
import { useTitle } from "../hooks/useTitle";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = PROJECTS.find((p) => p.slug === slug);
  useTitle(project ? project.name : "Project Not Found");
  if (!project) return <Navigate to="/work" replace />;

  const idx = PROJECTS.findIndex((p) => p.slug === slug);
  const next = PROJECTS[(idx + 1) % PROJECTS.length];
  const initials = project.name
    .split(" ")
    .filter((w) => w[0] === w[0].toUpperCase())
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

  return (
    <div className="min-h-screen pt-32 pb-24 px-5 sm:px-8 md:px-10">
      <FadeIn delay={0}>
        <Link to="/work" className="text-cyan text-sm uppercase tracking-widest mb-10 inline-block">
          ← Back to Work
        </Link>
        <p className="text-cyan text-xs uppercase tracking-widest mb-3">{project.category}</p>
        <SectionHeading as="h1" className="mb-8">
          {project.name}
        </SectionHeading>
        <p className="text-text/80 text-lg max-w-2xl leading-relaxed mb-12">{project.long}</p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div
          className="relative w-full max-w-4xl rounded-[40px] sm:rounded-[50px] flex items-center justify-center mb-16 overflow-hidden"
          style={{ background: project.gradient, aspectRatio: "16/9" }}
        >
          <div
            className="absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, #fff 0px, #fff 1px, transparent 1px, transparent 26px)",
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.25),transparent_55%)]" />
          {project.logo ? (
            <img src={project.logo} alt={project.name} className="relative max-h-[40%] max-w-[40%] object-contain drop-shadow-2xl" />
          ) : (
            <span className="relative font-black text-white/25 select-none" style={{ fontSize: "clamp(4rem, 14vw, 220px)" }}>
              {initials}
            </span>
          )}
        </div>
        <p className="text-muted text-xs max-w-md mb-16">
          {project.logo
            ? "Real client logo shown. Project photography to be added when available."
            : "Placeholder panel shown — real project photography/logo to be added here."}
        </p>
      </FadeIn>

      {project.stats && (
        <FadeIn delay={0.12}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mb-16">
            {project.stats.map((s) => (
              <div key={s.label} className="border-t border-white/15 pt-4">
                <div className="text-cyan font-black text-2xl sm:text-3xl mb-1">{s.value}</div>
                <div className="text-muted text-xs leading-snug">{s.label}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      )}

      <FadeIn delay={0.15}>
        <div className="flex flex-wrap items-center gap-6">
          <ContactButton label="Start A Project Like This" />
          <Link to={`/work/${next.slug}`} className="text-white/60 hover:text-cyan text-sm uppercase tracking-widest transition-colors">
            Next: {next.name} →
          </Link>
        </div>
      </FadeIn>
    </div>
  );
}
