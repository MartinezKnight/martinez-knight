import FadeIn from "../components/FadeIn";
import SectionHeading from "../components/SectionHeading";
import { ContactButton } from "../components/Buttons";
import { useTitle } from "../hooks/useTitle";

export default function Career() {
  useTitle("Careers");
  return (
    <div className="min-h-screen pt-32 pb-24 px-5 sm:px-8 md:px-10 flex flex-col items-center text-center">
      <FadeIn delay={0}>
        <p className="text-cyan text-xs tracking-[0.3em] uppercase mb-4">Join Us</p>
        <SectionHeading as="h1" className="mb-6">
          Careers.
        </SectionHeading>
        <p className="text-white/60 max-w-lg mx-auto text-base leading-relaxed mb-4">
          There are no open roles listed right now. We also run corporate
          training and trainee programmes as part of our Training &amp;
          Professional Development service — if you're looking to build real
          skills or start a career in digital infrastructure, reach out and
          tell us where you're at.
        </p>
        <p className="text-white/40 max-w-lg mx-auto text-sm leading-relaxed mb-10">
          Nothing open today doesn't mean nothing's coming — check back, or
          send your CV and we'll keep it on file.
        </p>
        <ContactButton label="Get In Touch" />
      </FadeIn>
    </div>
  );
}
