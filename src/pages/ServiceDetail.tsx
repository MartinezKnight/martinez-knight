import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { SERVICES } from "../data/services";
import { ContactButton } from "../components/Buttons";
import FadeIn from "../components/FadeIn";
import SectionHeading from "../components/SectionHeading";
import { useTitle } from "../hooks/useTitle";

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = SERVICES.find((s) => s.slug === slug);
  useTitle(service ? service.name : "Service Not Found");
  if (!service) return <Navigate to="/services" replace />;
  if (slug === "training-professional-development") return <Navigate to="/training" replace />;

  const idx = SERVICES.findIndex((s) => s.slug === slug);
  const next = SERVICES[(idx + 1) % SERVICES.length];

  return (
    <div className="min-h-screen pt-32 pb-24 px-5 sm:px-8 md:px-10">
      <FadeIn delay={0}>
        <Link to="/services" className="text-cyan text-sm uppercase tracking-widest mb-10 inline-block">
          ← Back to Services
        </Link>
        <p className="text-muted text-xs tracking-[0.3em] uppercase mb-4">Service {service.n}</p>
        <SectionHeading as="h1" className="mb-8">
          {service.name}
        </SectionHeading>
        <p className="text-text/80 text-lg max-w-2xl leading-relaxed mb-16">{service.long}</p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="max-w-2xl mb-20">
          <p className="text-cyan text-xs uppercase tracking-widest mb-6">What's Included</p>
          <ul className="flex flex-col gap-4">
            {service.included.map((item, i) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4 text-text/90 border-b border-white/10 pb-4"
              >
                <span className="text-cyan">→</span>
                {item}
              </motion.li>
            ))}
          </ul>
        </div>
      </FadeIn>

      <FadeIn delay={0.15}>
        <div className="flex flex-wrap items-center gap-6">
          <ContactButton label="Enquire About This Service" />
          <Link to={`/services/${next.slug}`} className="text-white/60 hover:text-cyan text-sm uppercase tracking-widest transition-colors">
            Next: {next.name} →
          </Link>
        </div>
      </FadeIn>
    </div>
  );
}
