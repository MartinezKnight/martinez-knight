import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Phone, MessageCircle, Mail, MapPin, CheckCircle2, ArrowRight } from "lucide-react";
import FadeIn from "../components/FadeIn";
import SectionHeading from "../components/SectionHeading";
import { SOCIALS } from "../data/socials";
import { FacebookIcon, InstagramIcon, XIcon, LinkedInIcon } from "../components/SocialIcons";
import { useTitle } from "../hooks/useTitle";
import { isSupabaseConfigured, submitDiscovery } from "../lib/supabase";

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

export default function Contact() {
  useTitle("Contact Us");
  const [searchParams] = useSearchParams();
  const requestedService = searchParams.get("service") || "";
  const enquirySource = searchParams.get("source") || "website-contact";
  const interestOptions = requestedService && !AREAS_OF_INTEREST.includes(requestedService)
    ? [requestedService, ...AREAS_OF_INTEREST]
    : AREAS_OF_INTEREST;
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    interest: requestedService,
    message: "",
    consent: false,
  });
  useEffect(() => {
    if (requestedService) setForm((current) => ({ ...current, interest: requestedService }));
  }, [requestedService]);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSupabaseConfigured()) {
      setError("The enquiry system is temporarily unavailable. Please contact us by phone or WhatsApp.");
      setStatus("error");
      return;
    }
    setStatus("sending");
    setError("");
    try {
      await submitDiscovery({
        businessName: form.company.trim() || `${form.name.trim()} (Individual enquiry)`,
        contactName: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        industry: "Not provided",
        location: "Not provided",
        source: "Website contact form — " + enquirySource,
        consent: form.consent ? "yes" : "no",
        contactForm: { ...form, consent: form.consent },
        mainPriority: form.interest || "General enquiry",
        otherNotes: [form.interest ? `Service / area of interest: ${form.interest}` : "Service / area of interest: Not specified", form.message.trim()].join("\n\n"),
      });
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "We could not submit your enquiry. Please try again.");
      setStatus("error");
    }
  };

  const inputCls =
    "bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-white text-sm outline-none focus:border-cyan transition-colors";

  return (
    <div className="min-h-screen pt-32 pb-24 px-5 sm:px-8 md:px-10">
      <FadeIn delay={0}>
        <p className="text-center text-cyan text-xs tracking-[0.3em] uppercase mb-6">Contact Martinez Knight</p>
        <SectionHeading as="h1" className="text-center mb-6 max-w-3xl mx-auto">
          Let's Talk About
          <br />
          <span className="italic font-light">What Your Business Needs.</span>
        </SectionHeading>
        <p className="text-center text-white/60 max-w-xl mx-auto mb-10 text-sm leading-relaxed">
          Whether you need a specific service, want to discuss a project, or have a general business enquiry, share a few details and our team will guide you to the right next step.
        </p>
      </FadeIn>

      {/* quick channels */}
      <FadeIn delay={0.08}>
        <div className="max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 mb-16">
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
          <a href="mailto:martinezknighthrmc@gmail.com" className="text-center hover:opacity-80 transition-opacity">
            <Mail size={20} className="text-cyan mx-auto mb-3" />
            <p className="text-white/40 text-xs uppercase tracking-widest mb-1.5">Email</p>
            <p className="text-white text-sm font-medium break-all">martinezknighthrmc@gmail.com</p>
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
      <div className="max-w-3xl mx-auto mb-16">
        <FadeIn delay={0}>
          <div className="liquid-glass rounded-3xl border border-white/10 p-7 sm:p-11 shadow-2xl shadow-black/20">
            {status === "sent" ? (
              <div className="text-center py-10">
                <CheckCircle2 size={40} className="text-cyan mx-auto mb-4" />
                <h3 className="text-white text-xl font-semibold mb-2">Enquiry received</h3>
                <p className="text-white/60 text-sm">Thank you. Your enquiry has been securely submitted to Martinez Knight. Our team will review it and get back to you.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="mb-3 border-b border-white/10 pb-5"><p className="mb-2 text-xs uppercase tracking-[.22em] text-cyan">01 / General enquiry</p><h3 className="text-white text-2xl sm:text-3xl font-semibold">Tell us what you have in mind.</h3><p className="mt-2 max-w-xl text-sm leading-6 text-white/45">A short, direct enquiry for projects, services, partnerships and questions. For a deeper business assessment, use Business Growth & Discovery below.</p></div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <label className="flex flex-col gap-1.5">
                    <span className="text-white/50 text-xs uppercase tracking-wide">Full Name</span>
                    <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} placeholder="Your name" />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="text-white/50 text-xs uppercase tracking-wide">Email</span>
                    <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputCls} placeholder="you@email.com" />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="text-white/50 text-xs uppercase tracking-wide">Phone / WhatsApp</span>
                    <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputCls} placeholder="080..." />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="text-white/50 text-xs uppercase tracking-wide">Company / Organization</span>
                    <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className={inputCls} placeholder="Your company" />
                  </label>
                </div>
                <label className="flex flex-col gap-1.5">
                  <span className="text-white/50 text-xs uppercase tracking-wide">What would you like to discuss?</span>
                  <select required value={form.interest} onChange={(e) => setForm({ ...form, interest: e.target.value })} className={inputCls}>
                    <option value="" className="bg-[#0a0c10]">Select a service or enquiry type</option>
                    {interestOptions.map((opt) => <option key={opt} value={opt} className="bg-[#0a0c10]">{opt}</option>)}
                  </select>
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="text-white/50 text-xs uppercase tracking-wide">Brief description of your requirement</span>
                  <textarea required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={4} className={`${inputCls} resize-none`} placeholder="Tell us what you need" />
                </label>
                <label className="flex items-start gap-3 text-xs leading-5 text-white/55">
                  <input type="checkbox" required checked={form.consent} onChange={(e) => setForm({ ...form, consent: e.target.checked })} className="mt-1 accent-cyan" />
                  <span>I agree that Martinez Knight may use these details to respond to this enquiry and assess the services I have requested.</span>
                </label>
                {status === "error" && <p role="alert" className="rounded-xl border border-red-400/30 bg-red-400/5 p-3 text-sm text-red-200">{error}</p>}
                <button type="submit" disabled={status === "sending"} className="mt-1 self-center inline-flex items-center justify-center gap-2 rounded-full bg-white text-black font-medium text-xs px-5 py-2.5 hover:bg-white/90 transition-colors disabled:opacity-50">
                  {status === "sending" ? "Submitting..." : "Submit Enquiry"} <ArrowRight size={14} />
                </button>
              </form>
            )}
          </div>
        </FadeIn>
      </div>

      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm text-white/55">Looking for a more detailed assessment of your organisation?</p>
        <Link to="/business-discovery" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-cyan hover:text-white transition-colors">
          Explore Business Growth &amp; Discovery <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}
