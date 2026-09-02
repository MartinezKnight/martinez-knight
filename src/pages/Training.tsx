import { useState } from "react";
import { Link } from "react-router-dom";
import { GraduationCap, Users, Briefcase, CheckCircle2, Wrench, UserCheck, Layers, ChevronDown } from "lucide-react";
import FadeIn from "../components/FadeIn";
import SectionHeading from "../components/SectionHeading";
import { PROJECTS } from "../data/projects";
import { useTitle } from "../hooks/useTitle";

const TRACKS = [
  {
    icon: Users,
    title: "Corporate Team Training",
    desc: "Hands-on training for teams adopting new tools — CRM, automation, digital workflows — taught by the people who actually build these systems.",
  },
  {
    icon: GraduationCap,
    title: "Practical Skills Workshops",
    desc: "Focused, practical sessions on the digital skills that move a career forward — not theory-heavy courses, real tools and real workflows.",
  },
  {
    icon: Briefcase,
    title: "Trainee & Apprenticeship Opportunities",
    desc: "Structured opportunities to build real experience working alongside our team on live client systems.",
  },
];

const REASONS = [
  {
    icon: Layers,
    title: "You train on real systems",
    desc: `Not sandbox exercises — the same CRM, automation and infrastructure tooling behind our ${PROJECTS.length} live client builds.`,
  },
  {
    icon: UserCheck,
    title: "Small team, direct access",
    desc: "No anonymous cohort of hundreds. You work directly with the people running the projects, not a teaching assistant.",
  },
  {
    icon: Wrench,
    title: "Built by practitioners",
    desc: "Everyone training you ships client work day to day. This isn't a side hustle for us — it's the same team.",
  },
];

const STEPS = [
  { n: "01", title: "Tell us what you need", desc: "Fill in the form below — team training, a skills workshop, or a trainee opportunity." },
  { n: "02", title: "We scope a plan", desc: "A short call to understand your goals, then a plan built around them — not a fixed syllabus." },
  { n: "03", title: "Start training", desc: "Hands-on from day one, on real tools and real workflows." },
];

const INTERESTS = [
  "Corporate Team Training",
  "Practical Skills Workshop",
  "Trainee / Apprenticeship Opportunity",
  "Something Else",
];

const FAQS = [
  {
    q: "Is this only for people already in tech?",
    a: "No. Corporate training is for teams adopting new tools regardless of background. The trainee/apprenticeship track is for people building a career in digital work — some come in with zero prior experience.",
  },
  {
    q: "Is it paid, free, or do I pay to attend?",
    a: "Depends on the track. Corporate training is commissioned by the business. Trainee and workshop terms vary by programme and are confirmed with you directly once we know what you're looking for — nothing is charged upfront by filling in the form.",
  },
  {
    q: "How long does a programme run?",
    a: "There's no fixed syllabus length. Corporate training is scoped to what the team needs. Trainee opportunities run as long as there's real project work to learn from. We'll give you a specific timeline once we understand your goals.",
  },
  {
    q: "Is this remote, in Abuja, or both?",
    a: "Martinez Knight is based in Abuja, Nigeria, and most hands-on training happens there. Some corporate sessions can run remotely depending on the tools involved — tell us your situation and we'll confirm what's possible.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10 py-5">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 text-left"
      >
        <span className="text-white font-medium text-sm sm:text-base">{q}</span>
        <ChevronDown
          size={18}
          className={`text-white/40 flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <p className="text-white/55 text-sm leading-relaxed mt-3 max-w-2xl">{a}</p>}
    </div>
  );
}

export default function Training() {
  useTitle("Training & Professional Development");
  const [form, setForm] = useState({ name: "", email: "", phone: "", interest: INTERESTS[0], message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Static site, no backend — hands off to the visitor's email client with
    // the form pre-filled. Swap for a form service (Formspree, Web3Forms) or
    // a real endpoint if you want submissions landing somewhere without that.
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      `Interested in: ${form.interest}`,
      "",
      form.message,
    ].join("\n");
    window.location.href = `mailto:hello@martinezknight.com?subject=${encodeURIComponent(
      "Training & Professional Development Enquiry"
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <div className="relative min-h-screen pt-32 pb-24 px-5 sm:px-8 md:px-10 overflow-hidden">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full blur-[140px] opacity-[0.14] pointer-events-none"
        style={{ background: "linear-gradient(135deg, #00d4e8, #1a8fff)" }}
      />

      <FadeIn delay={0}>
        <p className="text-center text-cyan text-xs tracking-[0.3em] uppercase mb-4">Training &amp; Professional Development</p>
        <SectionHeading as="h1" className="text-center mb-6 max-w-3xl mx-auto">
          Build The Skills.
          <br />
          <span className="italic font-light">Run The Systems.</span>
        </SectionHeading>
        <p className="text-center text-white/60 max-w-xl mx-auto text-base leading-relaxed mb-6">
          Systems are only as good as the people running them. We run practical,
          hands-on training programmes — for teams adopting new tools, and for
          individuals building a career in digital and technology work.
        </p>
        <div className="flex items-center justify-center gap-8 text-center mb-20">
          <div>
            <p className="text-white text-2xl font-semibold">{PROJECTS.length}</p>
            <p className="text-white/40 text-xs uppercase tracking-wide mt-1">Real Systems Built</p>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div>
            <p className="text-white text-2xl font-semibold">6</p>
            <p className="text-white/40 text-xs uppercase tracking-wide mt-1">Connected Service Lines</p>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div>
            <p className="text-white text-2xl font-semibold">1</p>
            <p className="text-white/40 text-xs uppercase tracking-wide mt-1">Team, Not A Franchise</p>
          </div>
        </div>
      </FadeIn>

      {/* why train with us */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 mb-20">
        {REASONS.map((r, i) => (
          <FadeIn key={r.title} delay={i * 0.08} y={24}>
            <div className="rounded-2xl border border-white/10 p-6 h-full">
              <r.icon size={20} className="text-cyan mb-4" />
              <h3 className="text-white font-semibold mb-2">{r.title}</h3>
              <p className="text-white/55 text-sm leading-relaxed">{r.desc}</p>
            </div>
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={0}>
        <div className="max-w-3xl mx-auto text-center mb-20">
          <Link
            to="/work"
            className="text-sm text-white/60 hover:text-cyan transition-colors underline underline-offset-4 decoration-white/20"
          >
            See the client systems our trainees and teams actually work on →
          </Link>
        </div>
      </FadeIn>

      {/* tracks */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 mb-20">
        {TRACKS.map((t, i) => (
          <FadeIn key={t.title} delay={i * 0.08} y={24}>
            <div className="liquid-glass rounded-2xl p-6 h-full">
              <t.icon size={22} className="text-cyan mb-4" />
              <h3 className="text-white font-semibold mb-2">{t.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{t.desc}</p>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* how it works */}
      <div className="max-w-3xl mx-auto mb-20">
        <FadeIn delay={0}>
          <p className="text-center text-white/40 text-xs uppercase tracking-widest mb-10">How it works</p>
        </FadeIn>
        <div className="grid sm:grid-cols-3 gap-8">
          {STEPS.map((s, i) => (
            <FadeIn key={s.n} delay={i * 0.08} y={20}>
              <div className="text-center sm:text-left">
                <span className="text-white/15 font-black text-3xl">{s.n}</span>
                <h4 className="text-white font-semibold mt-2 mb-1.5">{s.title}</h4>
                <p className="text-white/50 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* FAQ — addresses the real hesitations, not manufactured trust signals */}
      <div className="max-w-2xl mx-auto mb-20">
        <FadeIn delay={0}>
          <p className="text-center text-white/40 text-xs uppercase tracking-widest mb-2">Questions</p>
        </FadeIn>
        {FAQS.map((f, i) => (
          <FadeIn key={f.q} delay={i * 0.05}>
            <FAQItem q={f.q} a={f.a} />
          </FadeIn>
        ))}
      </div>

      <div className="max-w-2xl mx-auto">
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
                  </a>
                  .
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <h3 className="text-white text-xl font-semibold mb-1">Tell us what you're looking for</h3>
                <div className="grid sm:grid-cols-2 gap-5">
                  <label className="flex flex-col gap-1.5">
                    <span className="text-white/50 text-xs uppercase tracking-wide">Full Name</span>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-white text-sm outline-none focus:border-cyan transition-colors"
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
                      className="bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-white text-sm outline-none focus:border-cyan transition-colors"
                      placeholder="you@email.com"
                    />
                  </label>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <label className="flex flex-col gap-1.5">
                    <span className="text-white/50 text-xs uppercase tracking-wide">Phone</span>
                    <input
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-white text-sm outline-none focus:border-cyan transition-colors"
                      placeholder="080..."
                    />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="text-white/50 text-xs uppercase tracking-wide">I'm interested in</span>
                    <select
                      value={form.interest}
                      onChange={(e) => setForm({ ...form, interest: e.target.value })}
                      className="bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-white text-sm outline-none focus:border-cyan transition-colors"
                    >
                      {INTERESTS.map((opt) => (
                        <option key={opt} value={opt} className="bg-[#0a0c10]">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <label className="flex flex-col gap-1.5">
                  <span className="text-white/50 text-xs uppercase tracking-wide">Message (optional)</span>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={4}
                    className="bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-white text-sm outline-none focus:border-cyan transition-colors resize-none"
                    placeholder="Tell us a bit about what you're looking for"
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
    </div>
  );
}
