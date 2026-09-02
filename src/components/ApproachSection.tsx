import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SectionHeading from "./SectionHeading";
import { SERVICES } from "../data/services";

const DOT_COLORS = ["#ffffff", "#00d4e8", "#1a8fff", "#7621B0", "#BE4C00", "#e5e5e5"];

export default function ApproachSection() {
  return (
    <section id="services" className="max-w-[100rem] mx-auto px-5 sm:px-8 py-20 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="min-w-0 mb-10 md:mb-14"
      >
        <div className="flex items-center gap-2 text-white/50 text-xs uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-white" />
          Our Approach
          <span className="px-2 py-0.5 rounded-full border border-white/10 text-white/50 normal-case tracking-normal">
            One system
          </span>
        </div>

        <SectionHeading className="mt-5">
          Six services.
          <br />
          One connected system.
        </SectionHeading>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="min-w-0"
        >
          <p className="text-white/60 text-base leading-[1.6] max-w-md">
            Every service we run is built to talk to the others — your website,
            CRM, automation and marketing aren't separate projects, they're one
            system with six moving parts.
          </p>

          <Link
            to="/services"
            className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-white border border-white/15 rounded-full px-6 py-3 hover:bg-white/5 transition-colors"
          >
            Explore all services
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="liquid-glass rounded-2xl p-5"
        >
          <p className="text-white/40 text-xs px-1 pb-4">What's included, end to end</p>
          <div className="flex flex-col gap-3">
            {SERVICES.map((s, i) => (
              <Link
                key={s.slug}
                to={`/services/${s.slug}`}
                className="liquid-glass rounded-lg p-4 flex items-start gap-3 hover:bg-white/[0.04] transition-colors"
              >
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5"
                  style={{ background: DOT_COLORS[i % DOT_COLORS.length] }}
                />
                <div className="min-w-0">
                  <p className="text-white text-sm font-semibold">{s.name}</p>
                  <p className="text-white/45 text-xs mt-1 leading-relaxed">{s.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
