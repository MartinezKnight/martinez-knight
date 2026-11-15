import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import FadeIn from "../components/FadeIn";
import { ContactButton } from "../components/Buttons";
import SectionHeading from "../components/SectionHeading";
import { useTitle } from "../hooks/useTitle";

const FAQS = [
  {
    q: "What does \"Digital Infrastructure & Business Transformation\" actually mean?",
    a: "It means we don't just build you a website and disappear. We build and manage the systems your business relies on, including your website, hosting, business email, CRM, automation, SEO and technical support. These services are designed to work together, with one team responsible for delivery.",
  },
  {
    q: "How much does a typical engagement cost?",
    a: "Our SME Digital Infrastructure package starts at a ₦500,000 setup fee plus ₦50,000–₦150,000/month ongoing support, depending on scope. Pitch decks run ₦150,000–₦500,000 per project, business automation ₦300,000–₦2,000,000 per project. Your final investment depends on the scope of work. Contact us to discuss your requirements and receive a tailored quotation.",
  },
  {
    q: "How long does a project take?",
    a: "A standard website and infrastructure setup typically takes 2–6 weeks from kickoff. Automation and systems work varies more with scope. We'll give you a specific timeline before any work starts.",
  },
  {
    q: "Do you only work with hotels and hospitality businesses?",
    a: "No. We work with businesses across hospitality, real estate, wellness, architecture, construction, retail, logistics and technology. Our work includes digital infrastructure, business growth, automation and corporate documentation.",
  },
  {
    q: "Do you offer ongoing support after launch, or just the build?",
    a: "Ongoing support is an important part of our delivery model. Depending on the project, this can include hosting, technical support, updates and maintenance after launch.",
  },
  {
    q: "I already have a website. Can you just take over hosting/email/CRM?",
    a: "Yes. We regularly migrate existing infrastructure to a more stable, unified setup — see how we handled Elpazio's zero-downtime migration in our Work section.",
  },
  {
    q: "Can you train our team instead of just building the system for us?",
    a: "Yes. Our Training & Professional Development service covers corporate training, practical skills workshops and career development programmes.",
  },
];

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <FadeIn delay={index * 0.05}>
      <div className="border-b border-white/10 py-6">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between gap-6 text-left"
        >
          <span className="text-white text-base sm:text-lg font-medium">{q}</span>
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            className="text-cyan text-2xl flex-shrink-0"
          >
            +
          </motion.span>
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ overflow: "hidden" }}
            >
              <p className="text-text/70 leading-relaxed pt-4 max-w-2xl">{a}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FadeIn>
  );
}

export default function FAQ() {
  useTitle("FAQ");
  return (
    <div className="min-h-screen pt-32 pb-24 px-5 sm:px-8 md:px-10">
      <FadeIn delay={0}>
        <Link to="/#top" className="text-cyan text-sm uppercase tracking-widest mb-10 inline-block">
          ← Back to Home
        </Link>
        <p className="text-cyan text-xs tracking-[0.3em] uppercase mb-4">Questions</p>
        <SectionHeading as="h1" className="mb-14">
          Frequently Asked
          <br />
          <span className="italic font-light">Questions.</span>
        </SectionHeading>
      </FadeIn>

      <div className="max-w-3xl">
        {FAQS.map((f, i) => (
          <FAQItem key={f.q} q={f.q} a={f.a} index={i} />
        ))}
      </div>

      <FadeIn delay={0.1}>
        <div className="mt-16 max-w-3xl">
          <p className="text-muted mb-6">Didn't find what you're looking for?</p>
          <ContactButton label="Ask Us Directly" href="/contact?source=faq-page" />
        </div>
      </FadeIn>
    </div>
  );
}
