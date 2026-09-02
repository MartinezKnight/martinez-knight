import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, ChevronRight } from "lucide-react";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/services", label: "Services" },
  { to: "/blog", label: "Blog" },
  { to: "/career", label: "Career" },
  { to: "/contact", label: "Contact Us" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isActive = (to: string) => location.pathname === to;

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-md border-b border-white/10"
      >
        <div className="max-w-[100rem] mx-auto flex items-center justify-between px-5 sm:px-8 py-3.5">
          <Link to="/" className="flex items-center flex-shrink-0">
            <img src="/media/logo.png" alt="Martinez Knight" className="h-7 md:h-8 w-auto" />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {LINKS.map((l, i) => (
              <motion.div
                key={l.to}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.05 }}
              >
                <Link
                  to={l.to}
                  className={`text-sm font-medium transition-colors ${
                    isActive(l.to) ? "text-white" : "text-white/70 hover:text-white"
                  }`}
                >
                  {l.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-white text-black text-sm font-medium px-5 py-2.5 transition-all hover:bg-white/90 active:scale-[0.98]"
            >
              Get Started
              <ChevronRight size={14} />
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
            className="fixed top-[64px] left-0 w-full z-40 md:hidden bg-black/90 backdrop-blur-md border-b border-white/10 px-5 py-4 flex flex-col gap-1 touch-manipulation"
          >
            {LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="py-3 text-sm text-white/85 border-b border-white/5 last:border-none"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/contact"
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
