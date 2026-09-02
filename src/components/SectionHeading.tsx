import type { ReactNode } from "react";

/**
 * The one heading style used for every top-level section/page title on the
 * dark side of the site (About, Services, Work, Contact, FAQ, Sitemap,
 * ServiceDetail). Previously each section set its own clamp() size — this
 * pins them all to the same scale so nothing feels bigger/smaller or in a
 * different weight than its neighbors.
 */
export default function SectionHeading({
  children,
  className = "",
  as: Tag = "h2",
  variant = "dark",
}: {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2";
  /** "dark": white→blue gradient fill for the dark-bg pages/sections (default).
   *  "light": plain Montserrat, no gradient fill — for sections on a white/light
   *  background (e.g. Services), where the dark-mode gradient reads as invisible. */
  variant?: "dark" | "light";
}) {
  const face = variant === "dark" ? "hero-heading font-serif" : "light-heading";
  return (
    <Tag
      className={`${face} font-black uppercase leading-[0.95] tracking-tight break-words ${className}`}
      style={{ fontSize: "clamp(2.2rem, 7vw, 5.5rem)" }}
    >
      {children}
    </Tag>
  );
}
