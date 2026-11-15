import { useEffect, useRef, useState } from "react";

const ROW1 = [
  "Website Development", "Business Email", "Hosting & Infrastructure",
  "CRM Automation", "SEO & Analytics", "Technical Support",
];
const ROW2 = [
  "Pitch Deck Design", "HR Automation", "Workflow Systems",
  "Booking Platforms", "Brand Identity", "Inventory Systems",
];

const ICONS_ROW1 = ["#00d4e8", "#1a8fff", "#00d4e8", "#1a8fff", "#00d4e8", "#1a8fff"];
const ICONS_ROW2 = ["#BE4C00", "#7621B0", "#BE4C00", "#7621B0", "#BE4C00", "#7621B0"];

function Row({
  items,
  colors,
  direction,
  offset,
}: {
  items: string[];
  colors: string[];
  direction: 1 | -1;
  offset: number;
}) {
  const tripled = [...items, ...items, ...items];
  const tripledColors = [...colors, ...colors, ...colors];
  return (
    <div
      className="flex gap-3 whitespace-nowrap will-change-transform"
      style={{ transform: `translateX(${direction * -offset}px)` }}
    >
      {tripled.map((t, i) => (
        <div
          key={i}
          className="liquid-glass flex-shrink-0 flex items-center gap-2.5 rounded-2xl px-6 py-5 md:px-8 md:py-6 text-text/85 text-sm md:text-base font-medium transition-transform duration-300 hover:-translate-y-1"
        >
          <span
            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ background: tripledColors[i], boxShadow: `0 0 8px ${tripledColors[i]}` }}
          />
          {t}
        </div>
      ))}
    </div>
  );
}

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    function onScroll() {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const raw = (window.scrollY - (rect.top + window.scrollY) + window.innerHeight) * 0.3;
      setOffset(raw);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section ref={sectionRef} className="pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden" aria-label="Technology and business capabilities">
      <div className="mx-auto max-w-5xl px-5 sm:px-8 mb-8 text-center">
        <p className="text-white/45 text-xs uppercase tracking-[0.18em]">Capabilities</p>
        <h2 className="mt-3 text-white text-2xl sm:text-3xl font-semibold tracking-tight">Technology that supports the way you work.</h2>
        <p className="mt-3 mx-auto max-w-2xl text-white/55 text-sm sm:text-base leading-relaxed">From your online presence to the systems behind daily operations, we help bring essential business tools together.</p>
      </div>
      <div className="flex flex-col gap-3">
        <Row items={ROW1} colors={ICONS_ROW1} direction={1} offset={offset} />
        <Row items={ROW2} colors={ICONS_ROW2} direction={-1} offset={offset} />
      </div>
    </section>
  );
}
