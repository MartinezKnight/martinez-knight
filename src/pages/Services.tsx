import { Link } from "react-router-dom";
import FadeIn from "../components/FadeIn";
import SectionHeading from "../components/SectionHeading";
import { ContactButton } from "../components/Buttons";
import { SERVICES } from "../data/services";
import { useTitle } from "../hooks/useTitle";

export default function Services() {
  useTitle("Services");
  return (
    <div className="min-h-screen pt-32 pb-24 px-5 sm:px-8 md:px-10">
      <FadeIn delay={0}>
        <p className="text-cyan text-xs tracking-[0.3em] uppercase mb-4">What We Do</p>
        <SectionHeading as="h1" className="mb-6 max-w-3xl">
          Six services.
          <br />
          <span className="italic font-light">One connected system.</span>
        </SectionHeading>
        <p className="text-white/60 max-w-2xl text-base sm:text-lg leading-relaxed mb-16 md:mb-20">
          Every service below is built to talk to the others. Your website, CRM,
          automation and marketing aren't separate projects run by separate
          vendors — they're one system with six moving parts, built and run by
          one team.
        </p>
      </FadeIn>

      <div className="max-w-5xl mx-auto flex flex-col">
        {SERVICES.map((s, i) => (
          <FadeIn key={s.slug} delay={i * 0.05} y={24}>
            <div className="grid md:grid-cols-12 gap-6 md:gap-10 py-10 border-t border-white/10 first:border-t-0 first:pt-0 items-start">
              <span className="md:col-span-2 font-black text-white/15 leading-none text-4xl md:text-5xl">
                {s.n}
              </span>
              <div className="md:col-span-6 min-w-0">
                <h2 className="text-white text-xl sm:text-2xl font-semibold mb-3">{s.name}</h2>
                <p className="text-white/60 text-sm sm:text-base leading-relaxed">{s.long}</p>
              </div>
              <div className="md:col-span-4 min-w-0">
                <p className="text-white/40 text-xs uppercase tracking-widest mb-3">Includes</p>
                <ul className="flex flex-col gap-2 mb-5">
                  {s.included.slice(0, 4).map((item) => (
                    <li key={item} className="text-white/70 text-sm flex items-start gap-2">
                      <span className="text-cyan flex-shrink-0">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  to={s.slug === "training-professional-development" ? "/training" : `/services/${s.slug}`}
                  className="text-sm font-medium text-white hover:text-cyan transition-colors"
                >
                  Full details →
                </Link>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={0.1}>
        <div className="max-w-5xl mx-auto mt-16 flex justify-center">
          <ContactButton label="Book a Free Consult" />
        </div>
      </FadeIn>
    </div>
  );
}
