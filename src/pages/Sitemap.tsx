import { Link } from "react-router-dom";
import FadeIn from "../components/FadeIn";
import SectionHeading from "../components/SectionHeading";
import { SERVICES } from "../data/services";
import { PROJECTS } from "../data/projects";
import { useTitle } from "../hooks/useTitle";

function Column({ title, links }: { title: string; links: { to: string; label: string }[] }) {
  return (
    <div>
      <p className="text-cyan text-xs tracking-[0.3em] uppercase mb-5">{title}</p>
      <ul className="flex flex-col gap-3">
        {links.map((l) => (
          <li key={l.to}>
            <Link to={l.to} className="text-text/80 hover:text-cyan transition-colors text-sm">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Sitemap() {
  useTitle("Sitemap");
  return (
    <div className="min-h-screen pt-32 pb-24 px-5 sm:px-8 md:px-10">
      <FadeIn delay={0}>
        <Link to="/#top" className="text-cyan text-sm uppercase tracking-widest mb-10 inline-block">
          ← Back to Home
        </Link>
        <p className="text-cyan text-xs tracking-[0.3em] uppercase mb-4">Sitemap</p>
        <SectionHeading as="h1" className="mb-14">
          Every Page,
          <br />
          <span className="italic font-light">In One Place.</span>
        </SectionHeading>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 max-w-5xl">
          <Column
            title="Main"
            links={[
              { to: "/", label: "Home" },
              { to: "/services", label: "Services" },
              { to: "/blog", label: "Blog" },
              { to: "/career", label: "Career" },
              { to: "/contact", label: "Contact Us" },
              { to: "/faq", label: "FAQ" },
            ]}
          />
          <Column
            title="Company"
            links={[
              { to: "/about", label: "About Us" },
              { to: "/work", label: "Work" },
            ]}
          />
          <Column
            title="Services"
            links={SERVICES.map((s) => ({
              to: s.slug === "training-professional-development" ? "/training" : `/services/${s.slug}`,
              label: s.name,
            }))}
          />
          <Column
            title="Work"
            links={PROJECTS.map((p) => ({ to: `/work/${p.slug}`, label: p.name }))}
          />
        </div>
      </FadeIn>
    </div>
  );
}
