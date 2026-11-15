import { useState } from "react";
import { ExternalLink, CheckCircle2 } from "lucide-react";
import FadeIn from "../components/FadeIn";
import SectionHeading from "../components/SectionHeading";
import TrainingAd from "../components/TrainingAd";
import { useTitle } from "../hooks/useTitle";
import { isSupabaseConfigured, submitApplication } from "../lib/supabase";

const FIELDS_OF_INTEREST = [
  "Web / Software Development",
  "Digital Marketing",
  "Design (Brand / Graphic / UX-UI)",
  "Content Creation / Cinematography",
  "HR / Administration",
  "Data & Research",
  "Sales / Business Development",
  "Other",
];

const EXPERIENCE_LEVELS = ["Entry-level / No experience yet", "1–3 years", "3–7 years", "7+ years"];

export default function Career() {
  useTitle("Recruitment & HR Consultancy | Delta State and Nigeria");
  const [form, setForm] = useState({
    name: "", email: "", phone: "", field: FIELDS_OF_INTEREST[0],
    experience: EXPERIENCE_LEVELS[0], portfolio: "", message: "", consent: false,
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSupabaseConfigured()) {
      setError("The application system is temporarily unavailable. Please try again later.");
      setStatus("error");
      return;
    }
    setStatus("sending");
    setError("");
    try {
      await submitApplication("candidate_applications", {
        full_name: form.name.trim(), email: form.email.trim(), phone: form.phone.trim(),
        field_of_interest: form.field, form_data: { ...form, consent: true }, consent: true,
      });
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "We could not submit your registration. Please try again.");
      setStatus("error");
    }
  };

  const inputCls =
    "bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-white text-sm outline-none focus:border-cyan transition-colors";

  return (
    <div className="min-h-screen pt-32 pb-24 px-5 sm:px-8 md:px-10">
      <FadeIn delay={0}>
        <p className="text-center text-cyan text-xs tracking-[0.3em] uppercase mb-4">Join Us</p>
        <SectionHeading as="h1" className="text-center mb-6">
          Careers.
        </SectionHeading>
        <p className="text-center text-white/60 max-w-lg mx-auto text-base leading-relaxed mb-2">
          Martinez Knight, formerly known as Martinez Knight HR Management and
          Consultancy, has roots in HR management and recruitment support,
          including our early work in Asaba, Delta State, Nigeria. Our background
          includes HR consultancy and recruitment support for employers and
          candidates. We continue to support candidate registration and
          recruitment-related engagements alongside our wider digital and
          business services. There are no open
          internal roles at present, but you may register your interest below
          for suitable opportunities with client organisations.
        </p>
      </FadeIn>

      {/* candidate registration form */}
      <div className="max-w-xl mx-auto mt-14 mb-16">
        <FadeIn delay={0.05}>
          <div className="liquid-glass rounded-2xl p-6 sm:p-10">
            {status === "sent" ? (
              <div className="text-center py-10">
                <CheckCircle2 size={40} className="text-cyan mx-auto mb-4" />
                <h3 className="text-white text-xl font-semibold mb-2">Registration received</h3>
                <p className="text-white/60 text-sm">Thank you for registering your interest. Your details have been submitted securely and will be reviewed when a suitable opportunity arises.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <h3 className="text-white text-lg font-semibold">Register your interest</h3>
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
                    <span className="text-white/50 text-xs uppercase tracking-wide">Experience Level</span>
                    <select
                      value={form.experience}
                      onChange={(e) => setForm({ ...form, experience: e.target.value })}
                      className={inputCls}
                    >
                      {EXPERIENCE_LEVELS.map((opt) => (
                        <option key={opt} value={opt} className="bg-[#0a0c10]">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <label className="flex flex-col gap-1.5">
                  <span className="text-white/50 text-xs uppercase tracking-wide">Field of Interest</span>
                  <select
                    value={form.field}
                    onChange={(e) => setForm({ ...form, field: e.target.value })}
                    className={inputCls}
                  >
                    {FIELDS_OF_INTEREST.map((opt) => (
                      <option key={opt} value={opt} className="bg-[#0a0c10]">
                        {opt}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="text-white/50 text-xs uppercase tracking-wide">CV, Portfolio, or LinkedIn Link</span>
                  <input
                    value={form.portfolio}
                    onChange={(e) => setForm({ ...form, portfolio: e.target.value })}
                    className={inputCls}
                    placeholder="https://..."
                  />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="text-white/50 text-xs uppercase tracking-wide">Anything else we should know?</span>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={4}
                    className={`${inputCls} resize-none`}
                    placeholder="Tell us about yourself"
                  />
                </label>
                <label className="flex items-start gap-3 text-xs leading-5 text-white/55">
                  <input type="checkbox" required checked={form.consent} onChange={(e) => setForm({ ...form, consent: e.target.checked })} className="mt-1 accent-cyan" />
                  <span>I consent to Martinez Knight storing and reviewing my details for recruitment opportunities and contacting me about suitable roles.</span>
                </label>
                {status === "error" && <p role="alert" className="rounded-xl border border-red-400/30 bg-red-400/5 p-3 text-sm text-red-200">{error}</p>}
                <button type="submit" disabled={status === "sending"} className="mt-2 rounded-full bg-white text-black font-medium text-sm px-6 py-3.5 hover:bg-white/90 transition-colors disabled:opacity-50">
                  {status === "sending" ? "Submitting..." : "Register Interest"}
                </button>
              </form>
            )}
          </div>
        </FadeIn>
      </div>

      <div className="max-w-xl mx-auto flex flex-col items-center text-center">
        <FadeIn delay={0.1}>
          <p className="text-white/40 text-xs uppercase tracking-widest mb-4">Looking For A Role Right Now?</p>
          <a
            href="https://jobinabuja.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="group liquid-glass rounded-2xl p-6 flex items-center justify-between gap-4 hover:border-cyan/30 transition-colors w-full mb-10"
          >
            <div className="text-left">
              <p className="text-white font-medium text-sm sm:text-base group-hover:text-cyan transition-colors">
                Browse tech openings in Abuja on Jobinabuja.com
              </p>
              <p className="text-white/45 text-xs mt-1">
                An independent Abuja job board — not run by Martinez Knight, linked here as a resource.
              </p>
            </div>
            <ExternalLink size={18} className="text-white/40 flex-shrink-0 group-hover:text-cyan transition-colors" />
          </a>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="w-full">
            <TrainingAd />
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
