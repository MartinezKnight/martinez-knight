import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { PROJECTS } from "../data/projects";
import { ContactButton, LiveProjectButton } from "../components/Buttons";
import FadeIn from "../components/FadeIn";
import SectionHeading from "../components/SectionHeading";
import { asset } from "../lib/assets";
import { useTitle } from "../hooks/useTitle";

function youtubeId(url: string) {
  const m = url.match(/(?:youtu\.be\/|v=)([a-zA-Z0-9_-]{6,})/);
  return m ? m[1] : null;
}

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
        <div className="flex items-center gap-2 mb-3">
          <span className={`w-1.5 h-1.5 rounded-full ${project.liveUrl ? "bg-[#28c840]" : "bg-[#febc2e]"}`} />
          <p className="text-cyan text-xs uppercase tracking-widest">{project.category}</p>
        </div>
        <SectionHeading as="h1" className="mb-8">
          {project.name}
        </SectionHeading>
        <p className="text-text/80 text-lg max-w-2xl leading-relaxed mb-6">{project.long}</p>
        {project.liveUrl && (
          <div className="mb-12">
            <LiveProjectButton label="Visit Live Site" href={project.liveUrl} />
          </div>
        )}
      </FadeIn>

      {/* brand mark panel */}
      <FadeIn delay={0.1}>
        <div
          className="relative w-full max-w-4xl rounded-[40px] sm:rounded-[50px] flex items-center justify-center mb-6 overflow-hidden"
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
            <img src={asset(project.logo)} alt={project.name} className="relative max-h-[40%] max-w-[40%] object-contain drop-shadow-2xl" />
          ) : (
            <span className="relative font-black text-white/25 select-none" style={{ fontSize: "clamp(4rem, 14vw, 220px)" }}>
              {initials}
            </span>
          )}
          {!project.liveUrl && (
            <div className="absolute top-5 right-5 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#febc2e]" />
              <span className="text-white text-xs font-medium">In development</span>
            </div>
          )}
        </div>
      </FadeIn>

      {/* what we delivered */}
      {project.deliverables && (
        <FadeIn delay={0.12}>
          <div className="max-w-4xl mb-14">
            <p className="text-white/40 text-xs uppercase tracking-widest mb-3">What We Delivered</p>
            <div className="flex flex-wrap gap-2.5">
              {project.deliverables.map((d) => (
                <span
                  key={d}
                  className="text-sm text-white/80 px-4 py-2 rounded-full border border-white/15 bg-white/[0.03]"
                >
                  {d}
                </span>
              ))}
            </div>
          </div>
        </FadeIn>
      )}

      {/* role + key contributions (internal ventures like HubConnect) */}
      {project.role && (
        <FadeIn delay={0.13}>
          <div className="max-w-4xl mb-14">
            <p className="text-white/40 text-xs uppercase tracking-widest mb-2">Role</p>
            <p className="text-white text-sm mb-6">{project.role}</p>
            {project.contributions && (
              <>
                <p className="text-white/40 text-xs uppercase tracking-widest mb-3">Key Contributions</p>
                <ul className="flex flex-col gap-2.5">
                  {project.contributions.map((c) => (
                    <li key={c} className="flex items-start gap-2.5 text-white/70 text-sm leading-relaxed">
                      <span className="text-cyan flex-shrink-0 mt-1">→</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </FadeIn>
      )}

      {/* pitch video */}
      {project.videoUrl && youtubeId(project.videoUrl) && (
        <FadeIn delay={0.14}>
          <div className="max-w-4xl mb-14">
            <p className="text-white/40 text-xs uppercase tracking-widest mb-3">Pitch Video</p>
            <div className="rounded-2xl overflow-hidden aspect-video border border-white/10">
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId(project.videoUrl)}`}
                title={`${project.name} pitch video`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </FadeIn>
      )}

      {/* reference links */}
      {project.links && (
        <FadeIn delay={0.15}>
          <div className="max-w-4xl mb-14">
            <p className="text-white/40 text-xs uppercase tracking-widest mb-3">Reference Materials</p>
            <div className="flex flex-col gap-2">
              {project.links.map((l) => (
                <a
                  key={l.url}
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-cyan transition-colors w-fit"
                >
                  {l.label}
                  <ExternalLink size={12} />
                </a>
              ))}
            </div>
          </div>
        </FadeIn>
      )}

      {project.stats && (
        <FadeIn delay={0.16}>
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

      <FadeIn delay={0.2}>
        <div className="flex flex-wrap items-center gap-6">
          <ContactButton label="Start A Project Like This" />
          <Link
            to={`/work/${next.slug}`}
            className="group flex items-center gap-1.5 text-white/60 hover:text-cyan text-sm uppercase tracking-widest transition-colors"
          >
            Next: {next.name}
            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </FadeIn>
    </div>
  );
}
