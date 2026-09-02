import { Mail, MapPin, MessageCircle } from "lucide-react";
import FadeIn from "../components/FadeIn";
import SectionHeading from "../components/SectionHeading";
import { ContactButton } from "../components/Buttons";
import { useTitle } from "../hooks/useTitle";

const CHANNELS = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@martinezknight.com",
    href: "mailto:hello@martinezknight.com?subject=Project%20Enquiry",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Chat with us",
    href: "https://wa.me/2347039148743",
  },
  {
    icon: MapPin,
    label: "Based in",
    value: "Abuja, Nigeria",
  },
];

export default function Contact() {
  useTitle("Contact Us");
  return (
    <div className="min-h-screen pt-32 pb-24 px-5 sm:px-8 md:px-10 flex flex-col items-center text-center">
      <FadeIn delay={0}>
        <p className="text-cyan text-xs tracking-[0.3em] uppercase mb-6">Ready To Lead Your Market?</p>
        <SectionHeading as="h1" className="mb-6">
          Let's Build The System
          <br />
          <span className="italic font-light">Your Business Runs On.</span>
        </SectionHeading>
        <p className="text-white/60 max-w-md mx-auto mb-10 text-sm leading-relaxed">
          Book a free 30-minute strategy consultation with a senior Martinez Knight strategist.
        </p>
        <ContactButton
          label="Book Free Consultation"
          href="mailto:hello@martinezknight.com?subject=Free%20Strategy%20Consultation%20Request"
        />
      </FadeIn>

      <FadeIn delay={0.15}>
        <div className="mt-20 grid sm:grid-cols-3 gap-8 max-w-2xl">
          {CHANNELS.map((c) => {
            const content = (
              <>
                <c.icon size={20} className="text-cyan mx-auto mb-3" />
                <p className="text-white/40 text-xs uppercase tracking-widest mb-1.5">{c.label}</p>
                <p className="text-white text-sm font-medium">{c.value}</p>
              </>
            );
            return c.href ? (
              <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                {content}
              </a>
            ) : (
              <div key={c.label}>{content}</div>
            );
          })}
        </div>
      </FadeIn>
    </div>
  );
}
