import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ContactButton } from "./Buttons";
import SectionHeading from "./SectionHeading";

export default function ContactSection() {
  // Replace with your full phone number in international format (no + or spaces)
  const whatsappNumber = "+2347039148743"; 
  const whatsappMessage = encodeURIComponent("Hello! I would like to book a free 30-minute strategy consultation.");

  return (
    <section id="contact" className="max-w-[100rem] mx-auto px-5 sm:px-8 py-20 md:py-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="relative text-center"
      >
        <p className="text-cyan text-xs tracking-[0.3em] uppercase mb-6">Ready To Lead Your Market?</p>
        <SectionHeading className="mb-6">
          Let's Build The System
          <br />
          <span className="italic font-light">Your Business Runs On.</span>
        </SectionHeading>
        <p className="text-white/60 max-w-md mx-auto mb-10 text-sm leading-relaxed">
          Book a free 30-minute strategy consultation with a senior Martinez Knight strategist.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <ContactButton
            label="Book Free Consultation"
            href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
          />
          <Link
            to="/work"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/15 text-white text-sm font-medium px-6 py-3 hover:bg-white/5 transition-colors"
          >
            See our work
            <ChevronRight size={14} />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
