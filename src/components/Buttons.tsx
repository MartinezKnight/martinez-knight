import { Link } from "react-router-dom";

const gradientStyle = {
  background: "linear-gradient(120deg, #00d4e8 0%, #1a8fff 100%)",
  boxShadow: "0px 4px 16px rgba(0, 160, 220, 0.35)",
};
const btnClass =
  "inline-flex items-center rounded-full px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base font-semibold uppercase tracking-widest text-[#04070a] transition-transform duration-300 hover:-translate-y-0.5";

export function ContactButton({
  label = "Enquire Now",
  href = "/contact",
  full = false,
}: {
  label?: string;
  href?: string;
  full?: boolean;
}) {
  const cls = `${btnClass} ${full ? "w-full justify-center" : ""}`;
  // mailto/tel links (and any external link) use a plain anchor;
  // in-app section links use react-router Link so navigation actually
  // works from any page, not just when already on the home page.
  if (href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("http")) {
    return (
      <a href={href} className={cls} style={gradientStyle}>
        {label}
      </a>
    );
  }
  return (
    <Link to={href} className={cls} style={gradientStyle}>
      {label}
    </Link>
  );
}

export function LiveProjectButton({
  label = "View Project",
  onClick,
}: {
  label?: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center rounded-full border-2 border-cyan/60 px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base font-medium uppercase tracking-widest text-cyan transition-colors duration-300 hover:bg-cyan/10"
    >
      {label}
    </button>
  );
}
