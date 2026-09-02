import { motion } from "framer-motion";
import { ChevronRight, LayoutDashboard, Users, Mail, Zap, TrendingUp, Search, Bell } from "lucide-react";
import { Link } from "react-router-dom";
import HeroWave from "./HeroWave";
import SectionHeading from "./SectionHeading";

const NAV = [
  { icon: LayoutDashboard, label: "Overview", active: true },
  { icon: Users, label: "CRM", count: 128 },
  { icon: Mail, label: "Inbox", count: 6 },
  { icon: Zap, label: "Automations" },
];

const STATS = [
  { label: "New leads (30d)", value: "142", delta: "+18%" },
  { label: "Site uptime", value: "99.98%", delta: "0 downtime" },
  { label: "Automated tasks", value: "3,204", delta: "this month" },
];

const ACTIVITY = [
  { who: "Website", what: "New contact form submission — Adaeze O.", time: "2m" },
  { who: "CRM", what: "Deal moved to \"Proposal Sent\" — Kadtech renewal", time: "18m" },
  { who: "Automation", what: "Welcome sequence sent to 12 new leads", time: "1h" },
  { who: "Hosting", what: "SSL certificate auto-renewed", time: "3h" },
];

export default function Hero() {
  return (
    <section className="relative pt-32 md:pt-40 pb-16 md:pb-24 px-5 sm:px-8 overflow-hidden">
      {/* ambient glow, no stock footage — keeps things honest and on-brand */}
      <div
        className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1100px] h-[560px] rounded-full blur-[140px] opacity-[0.16] pointer-events-none"
        style={{ background: "linear-gradient(135deg, #00d4e8, #1a8fff)" }}
      />

      {/* the wave-like hero animation — layered, morphing, on-brand gradient */}
      <div
        className="absolute inset-x-0 bottom-0 h-[300px] sm:h-[380px] md:h-[440px] pointer-events-none"
        style={{
          maskImage: "linear-gradient(to bottom, transparent, black 15%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 15%)",
        }}
      >
        <HeroWave />
      </div>

      <div className="relative max-w-[100rem] mx-auto grid lg:grid-cols-12 gap-14 lg:gap-10 items-center">
        {/* text — left */}
        <div className="lg:col-span-5 text-center lg:text-left min-w-0">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <SectionHeading>
              Your business.
              <br />
              <span className="shiny-text">Systemized.</span>
            </SectionHeading>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-8 text-white/60 max-w-md mx-auto lg:mx-0 text-base lg:text-lg leading-[1.6]"
          >
            Martinez Knight designs, builds and runs the websites, hosting, CRM,
            automation and marketing systems your business runs on — as one
            connected system, by one team.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-9 flex flex-col items-center lg:items-start gap-4"
          >
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 rounded-full bg-white text-black font-medium text-sm px-6 py-3.5 transition-all hover:bg-white/90 active:scale-[0.98]"
              >
                Start Your Project
                <ChevronRight size={16} />
              </Link>
              <Link
                to="/work"
                className="inline-flex items-center rounded-full border border-white/15 text-white text-sm font-medium px-6 py-3.5 hover:bg-white/5 transition-colors"
              >
                See Our Work
              </Link>
            </div>
            <span className="text-xs text-white/40">Digital infrastructure, built for Nigerian businesses</span>
          </motion.div>
        </div>

        {/* dashboard mockup — right, same section as the hero copy, given real room to breathe */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7 rounded-2xl overflow-hidden border border-white/10 bg-[#0a0c10]/90 backdrop-blur-2xl shadow-[0_40px_100px_-20px_rgba(0,0,0,0.7)]"
        >
          <div className="h-11 flex items-center gap-3 px-5 border-b border-white/10 bg-black/30">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <span className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>
            <span className="text-xs text-white/50 mx-auto -translate-x-3">app.martinezknight.com/dashboard</span>
          </div>

          <div className="grid grid-cols-12 min-h-[420px]">
            <div className="hidden sm:block col-span-4 lg:col-span-3 border-r border-white/10 bg-black/20 p-4">
              <div className="rounded-lg bg-white text-black text-xs font-semibold px-3 py-2.5 flex items-center gap-2 mb-5">
                <Zap size={14} />
                One system, live
              </div>
              <nav className="flex flex-col gap-1">
                {NAV.map((item) => (
                  <div
                    key={item.label}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm ${
                      item.active ? "bg-white/10 text-white" : "text-white/55 hover:bg-white/5"
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <item.icon size={15} />
                      {item.label}
                    </span>
                    {item.count && (
                      <span className="text-[11px] text-white/40 bg-white/5 rounded-full px-1.5 py-0.5">
                        {item.count}
                      </span>
                    )}
                  </div>
                ))}
              </nav>
            </div>

            <div className="col-span-12 sm:col-span-8 lg:col-span-9 p-5 md:p-7">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-white text-sm font-semibold">Overview</p>
                  <p className="text-white/40 text-xs mt-0.5">Everything your business runs on, one screen.</p>
                </div>
                <div className="hidden sm:flex items-center gap-3 text-white/40">
                  <Search size={16} />
                  <Bell size={16} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                {STATS.map((s) => (
                  <div key={s.label} className="liquid-glass rounded-xl p-4">
                    <p className="text-white/45 text-[11px] uppercase tracking-wide mb-2">{s.label}</p>
                    <p className="text-white text-2xl font-semibold">{s.value}</p>
                    <p className="text-[#00d4e8] text-xs mt-1 flex items-center gap-1">
                      <TrendingUp size={12} />
                      {s.delta}
                    </p>
                  </div>
                ))}
              </div>

              <div className="liquid-glass rounded-xl p-4 sm:p-5">
                <p className="text-white/45 text-[11px] uppercase tracking-wide mb-3">Live activity</p>
                <div className="flex flex-col divide-y divide-white/5">
                  {ACTIVITY.map((a) => (
                    <div key={a.what} className="flex items-center justify-between gap-4 py-2.5">
                      <div className="min-w-0">
                        <span className="text-[#1a8fff] text-xs font-medium">{a.who}</span>
                        <p className="text-white/70 text-sm truncate">{a.what}</p>
                      </div>
                      <span className="text-white/35 text-xs flex-shrink-0">{a.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
