import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, ChevronRight, ChevronDown, LockKeyhole } from "lucide-react";
import { SERVICES } from "../data/services";
import { asset } from "../lib/assets";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/blog", label: "Blog" },
  { to: "/career", label: "Career" },
  { to: "/business-discovery", label: "Business Growth" },
  { to: "/contact", label: "Contact Us" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const location = useLocation();

  const isActive = (to: string) => location.pathname === to;
  const servicesActive = location.pathname.startsWith("/services") || location.pathname === "/training";

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 w-full max-w-full z-50 bg-black/40 backdrop-blur-md border-b border-white/10"
      >
        <div className="w-full max-w-[100rem] min-w-0 mx-auto flex items-center justify-between px-4 sm:px-8 py-3.5">
          <Link to="/" className="flex min-w-0 items-center gap-2.5 shrink-0 pl-1">
            <img src={asset("/media/logo.png")} alt="Martinez Knight" className="h-8 sm:h-9 w-auto max-w-[58px] object-contain shrink-0" />
            <span className="light-heading text-white font-semibold text-base md:text-lg tracking-tight hidden sm:inline">
              Martinez Knight
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${
                isActive("/") ? "text-white" : "text-white/70 hover:text-white"
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`text-sm font-medium transition-colors ${
                isActive("/about") ? "text-white" : "text-white/70 hover:text-white"
              }`}
            >
              About Us
            </Link>

            {/* Services dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                  servicesActive ? "text-white" : "text-white/70 hover:text-white"
                }`}
              >
                Services
                <ChevronDown size={14} className={`transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-72"
                  >
                    <div className="bg-[#0a0c10] border border-white/10 rounded-2xl p-2 shadow-2xl">
                      {SERVICES.map((s) => (
                        <Link
                          key={s.slug}
                          to={s.slug === "training-professional-development" ? "/training" : `/services/${s.slug}`}
                          className="block px-3.5 py-2.5 rounded-xl text-sm text-white/80 hover:bg-white/5 hover:text-white transition-colors"
                        >
                          {s.name}
                        </Link>
                      ))}
                      <Link
                        to="/services"
                        className="block px-3.5 py-2.5 rounded-xl text-sm text-cyan hover:bg-white/5 transition-colors mt-1 border-t border-white/10"
                      >
                        View all services →
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {LINKS.slice(2).map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`text-sm font-medium transition-colors ${
                  isActive(l.to) ? "text-white" : "text-white/70 hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <Link
              to="/business-discovery"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-white text-black text-sm font-medium px-5 py-2.5 transition-all hover:bg-white/90 active:scale-[0.98]"
            >
              Get Started
              <ChevronRight size={14} />
            </Link>

            <Link to="/internal/prospects" aria-label="Admin sign in" title="Admin sign in" className="hidden lg:inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-2 text-xs text-white/65 hover:text-cyan hover:border-cyan/40 transition-colors">
              <LockKeyhole size={13} /> Admin
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={open}
              className="md:hidden w-11 h-11 flex items-center justify-center rounded-full border border-white/10 bg-white/5 touch-manipulation"
            >
              {open ? <X size={18} className="text-white" /> : <Menu size={18} className="text-white" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed top-[64px] left-0 w-full z-40 md:hidden bg-black/90 backdrop-blur-md border-b border-white/10 px-5 py-4 flex flex-col gap-1 touch-manipulation max-h-[80vh] overflow-y-auto"
          >
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="py-3 text-sm text-white/85 border-b border-white/5"
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={() => setOpen(false)}
              className="py-3 text-sm text-white/85 border-b border-white/5"
            >
              About Us
            </Link>

            <button
              onClick={() => setMobileServicesOpen((v) => !v)}
              className="py-3 text-sm text-white/85 border-b border-white/5 flex items-center justify-between"
            >
              Services
              <ChevronDown size={16} className={`transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {mobileServicesOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ overflow: "hidden" }}
                  className="border-b border-white/5"
                >
                  <div className="flex flex-col pb-2 pl-3">
                    {SERVICES.map((s) => (
                      <Link
                        key={s.slug}
                        to={s.slug === "training-professional-development" ? "/training" : `/services/${s.slug}`}
                        onClick={() => setOpen(false)}
                        className="py-2.5 text-sm text-white/60"
                      >
                        {s.name}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {LINKS.slice(2).map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="py-3 text-sm text-white/85 border-b border-white/5 last:border-none"
              >
                {l.label}
              </Link>
            ))}
            <Link to="/internal/prospects" onClick={() => setOpen(false)} className="mt-2 flex items-center gap-2 border-t border-white/10 py-3 text-sm text-white/65">
              <LockKeyhole size={15} /> Admin Sign In
            </Link>
            <Link
              to="/business-discovery"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-full bg-white text-black text-sm font-medium px-5 py-3"
            >
              Get Started
              <ChevronRight size={14} />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
