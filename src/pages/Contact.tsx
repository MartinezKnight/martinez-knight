import { useState } from "react";
import { Phone, MessageCircle, MapPin, Sparkles, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import FadeIn from "../components/FadeIn";
import SectionHeading from "../components/SectionHeading";
import { SOCIALS } from "../data/socials";
import { FacebookIcon, InstagramIcon, XIcon, LinkedInIcon } from "../components/SocialIcons";
import { useTitle } from "../hooks/useTitle";

const SOCIAL_ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Facebook: FacebookIcon,
  Instagram: InstagramIcon,
  X: XIcon,
  LinkedIn: LinkedInIcon,
};

const AREAS_OF_INTEREST = [
  "Digital Infrastructure",
  "Digital Growth",
  "Business Systems & Automation",
  "Training & Professional Development",
  "Business & Corporate Services",
  "Brand & Media",
  "Something Else",
];

const FAQS = [
  {
    q: "What does \"Digital Infrastructure & Business Transformation\" actually mean?",
    a: "It means we don't just build you a website and disappear. We build and run the whole system your business operates on — website, hosting, business email, CRM, automation, SEO and support — as one connected package, not six separate vendors who don't talk to each other.",
  },
  {
    q: "How much does a typical engagement cost?",
    a: "Depends entirely on scope. Book a consult and we'll give you a real number, not a range.",
  },
  {
    q: "How long does a project take?",
    a: "A standard website and infrastructure setup typically takes 2–6 weeks from kickoff. Automation and systems work varies more with scope. We'll give you a specific timeline before any work starts.",
  },
  {
    q: "Do you only work with hotels and hospitality businesses?",
    a: "No. Hospitality is one of our strongest sectors — see Elpazio in our Work section — but we also work with real estate, spas, architecture and construction firms, retail, logistics, and technology companies.",
  },
  {
    q: "Do you offer ongoing support after launch, or just the build?",
    a: "Ongoing support is core to how we work — most engagements include a monthly retainer for hosting, technical support, updates and maintenance. We don't disappear after handover.",
  },
  {
    q: "I already have a website. Can you just take over hosting/email/CRM?",
    a: "Yes. We regularly migrate existing infrastructure to a more stable, unified setup — see how we handled Elpazio's zero-downtime migration in our Work section.",
  },
  {
    q: "Can you train our team instead of just building the system for us?",
    a: "Yes — Training & Professional Development is one of our core service lines. See the Training page for courses and tracks.",
  },
];

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <FadeIn delay={index * 0.04}>
      <div className="border-b border-white/10 py-6">
        <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between gap-6 text-left">
          <span className="text-white text-base font-medium">{q}</span>
          <motion.span animate={{ rotate: open ? 45 : 0 }} className="text-cyan text-2xl flex-shrink-0">
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
              <p className="text-white/60 leading-relaxed pt-4 max-w-2xl">{a}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FadeIn>
  );
}

export default function Contact() {
  useTitle("Contact Us");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    interest: AREAS_OF_INTEREST[0],
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Phone / WhatsApp: ${form.phone}`,
      `Company / Organization: ${form.company}`,
      `Area of interest: ${form.interest}`,
      "",
      form.message,
    ].join("\n");
    window.location.href = `mailto:hello@martinezknight.com?subject=${encodeURIComponent(
      "New Enquiry — " + form.interest
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const inputCls =
    "bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-white text-sm outline-none focus:border-cyan transition-colors";

  return (
    <div className="min-h-screen pt-32 pb-24 px-5 sm:px-8 md:px-10">
      <FadeIn delay={0}>
        <p className="text-center text-cyan text-xs tracking-[0.3em] uppercase mb-6">Ready To Lead Your Market?</p>
        <SectionHeading as="h1" className="text-center mb-6 max-w-3xl mx-auto">
          Let's Build The System
          <br />
          <span className="italic font-light">Your Business Runs On.</span>
        </SectionHeading>
        <p className="text-center text-white/60 max-w-md mx-auto mb-10 text-sm leading-relaxed">
          Tell us what you need and we'll follow up with next steps.
        </p>
      </FadeIn>

      {/* quick channels */}
      <FadeIn delay={0.08}>
        <div className="max-w-2xl mx-auto grid sm:grid-cols-3 gap-6 mb-16">
          <a href="tel:+2347039148743" className="text-center hover:opacity-80 transition-opacity">
            <Phone size={20} className="text-cyan mx-auto mb-3" />
            <p className="text-white/40 text-xs uppercase tracking-widest mb-1.5">Call</p>
            <p className="text-white text-sm font-medium">+234 703 914 8743</p>
          </a>
          <a
            href="https://wa.me/2347039148743"
            target="_blank"
            rel="noopener noreferrer"
            className="text-center hover:opacity-80 transition-opacity"
          >
            <MessageCircle size={20} className="text-cyan mx-auto mb-3" />
            <p className="text-white/40 text-xs uppercase tracking-widest mb-1.5">WhatsApp</p>
            <p className="text-white text-sm font-medium">Chat with us</p>
          </a>
          <div className="text-center">
            <MapPin size={20} className="text-cyan mx-auto mb-3" />
            <p className="text-white/40 text-xs uppercase tracking-widest mb-1.5">Based in</p>
            <p className="text-white text-sm font-medium">Abuja, Nigeria</p>
          </div>
        </div>
      </FadeIn>

      {/* social row */}
      <FadeIn delay={0.1}>
        <div className="flex items-center justify-center gap-5 mb-20">
          {SOCIALS.map((s) => {
            const Icon = SOCIAL_ICONS[s.name];
            return (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:text-cyan hover:border-cyan/40 transition-colors"
              >
                <Icon size={16} />
              </a>
            );
          })}
        </div>
      </FadeIn>

      {/* lead form */}
      <div className="max-w-xl mx-auto mb-16">
        <FadeIn delay={0}>
          <div className="liquid-glass rounded-2xl p-6 sm:p-10">
            {sent ? (
              <div className="text-center py-10">
                <CheckCircle2 size={40} className="text-cyan mx-auto mb-4" />
                <h3 className="text-white text-xl font-semibold mb-2">Your email client should be opening now</h3>
                <p className="text-white/60 text-sm">
                  If it didn't, email us directly at{" "}
                  <a href="mailto:hello@martinezknight.com" className="text-cyan hover:underline">
                    hello@martinezknight.com
                  </a>{" "}
                  or call{" "}
                  <a href="tel:+2347039148743" className="text-cyan hover:underline">
                    +234 703 914 8743
                  </a>
                  .
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <h3 className="text-white text-lg font-semibold">Tell us about your project</h3>
                <div className="grid sm:grid-cols-2 gap-5">
                  <label className="flex flex-col gap-1.5">
                    <span className="text-white/50 text-xs uppercase tracking-wide">Full Name</span>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={inputCls}
                      placeholder="Your name"
                    />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="text-white/50 text-xs uppercase tracking-wide">Email</span>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={inputCls}
                      placeholder="you@email.com"
                    />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="text-white/50 text-xs uppercase tracking-wide">Phone / WhatsApp</span>
                    <input
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className={inputCls}
                      placeholder="080..."
                    />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="text-white/50 text-xs uppercase tracking-wide">Company / Organization</span>
                    <input
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      className={inputCls}
                      placeholder="Your company"
                    />
                  </label>
                </div>
                <label className="flex flex-col gap-1.5">
                  <span className="text-white/50 text-xs uppercase tracking-wide">Area of Interest</span>
                  <select
                    value={form.interest}
                    onChange={(e) => setForm({ ...form, interest: e.target.value })}
                    className={inputCls}
                  >
                    {AREAS_OF_INTEREST.map((opt) => (
                      <option key={opt} value={opt} className="bg-[#0a0c10]">
                        {opt}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="text-white/50 text-xs uppercase tracking-wide">Brief description of your requirement</span>
                  <textarea
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={4}
                    className={`${inputCls} resize-none`}
                    placeholder="Tell us what you need"
                  />
                </label>
                <button
                  type="submit"
                  className="mt-2 rounded-full bg-white text-black font-medium text-sm px-6 py-3.5 hover:bg-white/90 transition-colors"
                >
                  Send Enquiry
                </button>
              </form>
            )}
          </div>
        </FadeIn>
      </div>

      {/* collaborate callout */}
      <div className="max-w-xl mx-auto mb-24">
        <FadeIn delay={0.1}>
          <a
            href="https://app.notion.com/p/22bcef2b2d2d80dca632df41ba3d41a8?pvs=21"
            target="_blank"
            rel="noopener noreferrer"
            className="group block liquid-glass rounded-2xl p-6 hover:border-cyan/30 transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-cyan/10 flex items-center justify-center flex-shrink-0">
                <Sparkles size={20} className="text-cyan" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm sm:text-base mb-1">Want to collaborate?</p>
                <p className="text-white/55 text-sm leading-relaxed">
                  If you're building something bold and need a strategist, marketer, or product
                  architect who understands both people and systems —{" "}
                  <span className="text-cyan group-hover:underline">let's talk</span>.
                </p>
              </div>
            </div>
          </a>
        </FadeIn>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto">
        <FadeIn delay={0}>
          <p className="text-center text-white/40 text-xs uppercase tracking-widest mb-2">Questions</p>
          <h2 className="text-center text-white text-2xl font-semibold mb-10">Frequently Asked</h2>
        </FadeIn>
        {FAQS.map((f, i) => (
          <FAQItem key={f.q} q={f.q} a={f.a} index={i} />
        ))}
      </div>
    </div>
  );
}
