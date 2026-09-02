import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { ContactButton } from "./Buttons";
import SectionHeading from "./SectionHeading";

const TIERS = [
  {
    name: "Starter",
    desc: "For a business that needs its core online presence built right, the first time.",
    items: ["Website design & build", "Business email setup", "Hosting & domain management", "SEO foundations"],
  },
  {
    name: "Growth",
    desc: "For a business ready to turn its systems into a pipeline, not just a presence.",
    featured: true,
    items: [
      "Everything in Starter",
      "CRM setup & lead capture",
      "SEO & content strategy",
      "Workflow automation",
      "Monthly reporting",
    ],
  },
  {
    name: "Enterprise",
    desc: "For a business running multiple systems that all need to work as one.",
    items: [
      "Everything in Growth",
      "Custom integrations",
      "Team training & SOPs",
      "Brand & corporate documentation",
      "Dedicated account lead",
    ],
  },
];

export default function EngagementSection() {
  return (
    <section className="max-w-[100rem] mx-auto px-5 sm:px-8 py-20 md:py-28 border-t border-white/10">
      <div className="text-center mb-14">
        <div className="flex items-center gap-2 text-white/50 text-xs uppercase tracking-widest justify-center">
          <span className="w-1.5 h-1.5 rounded-full bg-white" />
          How We Work
        </div>
        <SectionHeading className="mt-5">Three ways to start.</SectionHeading>
        <p className="mt-4 text-white/50 text-sm max-w-md mx-auto">
          Every engagement is scoped to what your business actually needs — talk
          to us for a quote built around your systems, not a price list.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {TIERS.map((tier, i) => (
          <motion.div
            key={tier.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className={`liquid-glass rounded-[32px] p-8 flex flex-col ${
              tier.featured ? "border border-cyan/40" : ""
            }`}
          >
            <p className="text-white/60 text-lg">{tier.name}</p>
            <p className="mt-3 text-white/45 text-sm leading-relaxed min-h-[3.4em]">{tier.desc}</p>
            <ul className="mt-6 flex-1 flex flex-col gap-3">
              {tier.items.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-white/80">
                  <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check size={12} className="text-white" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <ContactButton label="Get a Quote" full />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
