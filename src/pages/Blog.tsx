import FadeIn from "../components/FadeIn";
import SectionHeading from "../components/SectionHeading";
import { ContactButton } from "../components/Buttons";
import { useTitle } from "../hooks/useTitle";

export default function Blog() {
  useTitle("Blog");
  return (
    <div className="min-h-screen pt-32 pb-24 px-5 sm:px-8 md:px-10 flex flex-col items-center text-center">
      <FadeIn delay={0}>
        <p className="text-cyan text-xs tracking-[0.3em] uppercase mb-4">Insights</p>
        <SectionHeading as="h1" className="mb-6">
          The Blog.
        </SectionHeading>
        <p className="text-white/60 max-w-lg mx-auto text-base leading-relaxed mb-10">
          We're writing about digital infrastructure, systems, and what actually
          moves a Nigerian business forward. First posts are on the way — check
          back soon, or get in touch if there's something specific you'd like
          us to cover.
        </p>
        <ContactButton label="Get In Touch" />
      </FadeIn>
    </div>
  );
}
