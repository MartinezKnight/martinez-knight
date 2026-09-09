import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CheckCircle2, ChevronDown } from "lucide-react";
import FadeIn from "../components/FadeIn";
import SectionHeading from "../components/SectionHeading";
import { useTitle } from "../hooks/useTitle";

const COURSES = [
  "Web Development",
  "WordPress Development",
  "Digital Marketing",
  "Cinematography",
  "Content Creation",
  "Brand & Graphic Design",
  "Business Systems & Automation",
  "Full Digital Generalist Programme (all of the above)",
];

const TRACK_OPTIONS: { value: string; label: string }[] = [
  { value: "foundation", label: "3-Month Foundation Track" },
  { value: "professional", label: "6-Month Professional Track" },
  { value: "unsure", label: "Not sure yet" },
  { value: "corporate", label: "N/A — this is for corporate team training" },
];

const EDUCATION_LEVELS = ["Currently in school", "Undergraduate", "Graduate", "Postgraduate", "Other"];
const AVAILABILITY = ["Weekday evenings", "Weekends", "Flexible / either works"];
const HEARD_FROM = ["Instagram / social media", "WhatsApp", "Friend or referral", "Google search", "Other"];

const FAQS = [
  {
    q: "Is this only for people already in tech?",
    a: "No. Corporate training is for teams adopting new tools regardless of background. The course and trainee tracks are for anyone building a career in digital or creative work — some come in with zero prior experience.",
  },
  {
    q: "Is it paid, free, or do I pay to attend?",
    a: "Depends on the course and track. Corporate training is commissioned by the business. Course and track fees are confirmed with you directly once we know what you're looking for — nothing is charged upfront by filling in this form.",
  },
  {
    q: "How long does a programme run?",
    a: "Individual courses run on their own shorter schedules. The Foundation and Professional tracks run 3 and 6 months respectively. We'll confirm exact timing once we understand your goals.",
  },
  {
    q: "Is this remote, in Abuja, or both?",
    a: "Martinez Knight is headquartered in Abuja, Nigeria, where most hands-on training happens. Corporate sessions and select courses can also run remotely — tell us your situation and we'll confirm what's possible.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10 py-5">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between gap-4 text-left">
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

export default function TrainingApply() {
  useTitle("Apply — Training & Professional Development");
  const [params] = useSearchParams();
  const trackFromUrl = params.get("track");
  const initialTrack = TRACK_OPTIONS.some((t) => t.value === trackFromUrl) ? trackFromUrl! : TRACK_OPTIONS[2].value;

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    education: EDUCATION_LEVELS[1],
    availability: AVAILABILITY[2],
    heardFrom: HEARD_FROM[0],
    track: initialTrack,
    courses: [] as string[],
    message: "",
  });
  const [sent, setSent] = useState(false);

  const toggleCourse = (course: string) => {
    setForm((f) => ({
      ...f,
      courses: f.courses.includes(course) ? f.courses.filter((c) => c !== course) : [...f.courses, course],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Static site, no backend — hands off to the visitor's email client with
    // the form pre-filled. Swap for a form service (Formspree, Web3Forms) or
    // a real endpoint if you want submissions landing somewhere without that.
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Phone / WhatsApp: ${form.phone}`,
      `City: ${form.city}`,
      `Education level: ${form.education}`,
      `Track: ${TRACK_OPTIONS.find((t) => t.value === form.track)?.label}`,
      `Course(s) of interest: ${form.courses.length ? form.courses.join(", ") : "None selected"}`,
      `Availability: ${form.availability}`,
      `Heard about us via: ${form.heardFrom}`,
      "",
      form.message,
    ].join("\n");
    window.location.href = `mailto:hello@martinezknight.com?subject=${encodeURIComponent(
      "Training Programme Application"
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const inputCls =
    "bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-white text-sm outline-none focus:border-cyan transition-colors";

  return (
    <div className="min-h-screen pt-32 pb-24 px-5 sm:px-8 md:px-10">
      <FadeIn delay={0}>
        <p className="text-center text-cyan text-xs tracking-[0.3em] uppercase mb-4">Application</p>
        <SectionHeading as="h1" className="text-center mb-6 max-w-3xl mx-auto">
          Tell Us
          <br />
          <span className="italic font-light">Who You Are.</span>
        </SectionHeading>
        <p className="text-center text-white/60 max-w-lg mx-auto text-base leading-relaxed mb-6">
          Fill this in and we'll follow up with next steps for the course or track you're interested in.
        </p>
        {trackFromUrl && TRACK_OPTIONS.some((t) => t.value === trackFromUrl) && (
          <div className="max-w-lg mx-auto mb-10">
            <div className="flex items-center justify-center gap-2.5 text-sm bg-cyan/10 border border-cyan/30 rounded-full px-5 py-3 text-center">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan flex-shrink-0" />
              <span className="text-white">
                Applying for: <span className="font-semibold text-cyan">{TRACK_OPTIONS.find((t) => t.value === trackFromUrl)?.label}</span>
              </span>
            </div>
          </div>
        )}
      </FadeIn>

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
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {/* bio */}
                <div>
                  <h3 className="text-white text-sm font-semibold uppercase tracking-wide mb-4">Your details</h3>
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
                      <span className="text-white/50 text-xs uppercase tracking-wide">City</span>
                      <input
                        value={form.city}
                        onChange={(e) => setForm({ ...form, city: e.target.value })}
                        className={inputCls}
                        placeholder="Abuja"
                      />
                    </label>
                    <label className="flex flex-col gap-1.5">
                      <span className="text-white/50 text-xs uppercase tracking-wide">Education Level</span>
                      <select
                        value={form.education}
                        onChange={(e) => setForm({ ...form, education: e.target.value })}
                        className={inputCls}
                      >
                        {EDUCATION_LEVELS.map((opt) => (
                          <option key={opt} value={opt} className="bg-[#0a0c10]">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="flex flex-col gap-1.5">
                      <span className="text-white/50 text-xs uppercase tracking-wide">Availability</span>
                      <select
                        value={form.availability}
                        onChange={(e) => setForm({ ...form, availability: e.target.value })}
                        className={inputCls}
                      >
                        {AVAILABILITY.map((opt) => (
                          <option key={opt} value={opt} className="bg-[#0a0c10]">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                </div>

                {/* courses */}
                <div>
                  <h3 className="text-white text-sm font-semibold uppercase tracking-wide mb-1">
                    Which course(s) are you interested in?
                  </h3>
                  <p className="text-white/40 text-xs mb-4">Select all that apply.</p>
                  <div className="grid sm:grid-cols-2 gap-2.5">
                    {COURSES.map((course) => (
                      <label
                        key={course}
                        className={`flex items-center gap-2.5 rounded-lg border px-3.5 py-2.5 text-sm cursor-pointer transition-colors ${
                          form.courses.includes(course)
                            ? "border-cyan bg-cyan/10 text-white"
                            : "border-white/10 text-white/70 hover:border-white/25"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={form.courses.includes(course)}
                          onChange={() => toggleCourse(course)}
                          className="accent-cyan"
                        />
                        {course}
                      </label>
                    ))}
                  </div>
                </div>

                {/* track + how heard */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <label className="flex flex-col gap-1.5">
                    <span className="text-white/50 text-xs uppercase tracking-wide">Preferred Track</span>
                    <select
                      value={form.track}
                      onChange={(e) => setForm({ ...form, track: e.target.value })}
                      className={inputCls}
                    >
                      {TRACK_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value} className="bg-[#0a0c10]">
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="text-white/50 text-xs uppercase tracking-wide">How did you hear about us?</span>
                    <select
                      value={form.heardFrom}
                      onChange={(e) => setForm({ ...form, heardFrom: e.target.value })}
                      className={inputCls}
                    >
                      {HEARD_FROM.map((opt) => (
                        <option key={opt} value={opt} className="bg-[#0a0c10]">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <label className="flex flex-col gap-1.5">
                  <span className="text-white/50 text-xs uppercase tracking-wide">Anything else we should know?</span>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={4}
                    className={`${inputCls} resize-none`}
                    placeholder="Tell us a bit about your goals"
                  />
                </label>

                <button
                  type="submit"
                  className="mt-2 rounded-full bg-white text-black font-medium text-sm px-6 py-3.5 hover:bg-white/90 transition-colors"
                >
                  Send Application
                </button>
              </form>
            )}
          </div>
        </FadeIn>
      </div>

      {/* FAQ */}
      <div className="max-w-2xl mx-auto mt-20">
        <FadeIn delay={0}>
          <p className="text-center text-white/40 text-xs uppercase tracking-widest mb-2">Questions</p>
        </FadeIn>
        {FAQS.map((f, i) => (
          <FadeIn key={f.q} delay={i * 0.05}>
            <FAQItem q={f.q} a={f.a} />
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
