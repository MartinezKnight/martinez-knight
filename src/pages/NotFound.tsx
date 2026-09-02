import { Link } from "react-router-dom";
import FadeIn from "../components/FadeIn";
import { ContactButton } from "../components/Buttons";
import { useTitle } from "../hooks/useTitle";

export default function NotFound() {
  useTitle("Page Not Found");
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-5 sm:px-8 md:px-10 py-32">
      <FadeIn delay={0}>
        <p className="text-cyan text-xs tracking-[0.3em] uppercase mb-6">Error 404</p>
        <h1
          className="hero-heading font-black uppercase leading-none tracking-tight mb-6 font-serif"
          style={{ fontSize: "clamp(3rem, 12vw, 9rem)" }}
        >
          Page Not Found
        </h1>
        <p className="text-muted max-w-md mx-auto mb-10">
          The page you're looking for doesn't exist, moved, or the link is broken.
          Let's get you back to somewhere useful.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <ContactButton label="Back To Home" href="/#top" />
          <Link
            to="/faq"
            className="text-white/60 hover:text-cyan text-sm uppercase tracking-widest transition-colors"
          >
            Visit FAQ →
          </Link>
        </div>
      </FadeIn>
    </div>
  );
}
