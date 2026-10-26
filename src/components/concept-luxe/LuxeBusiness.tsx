import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { TextLink } from "@/components/ui/TextLink";
import { buttonClass } from "@/components/ui/Button";
import { BleedImage, Eyebrow } from "./Bleed";

// Concept C closer: wholesale invitation on the darker surface, a lifestyle
// photo bleeding off the right edge. The (darker still) footer follows.
export function LuxeBusiness({
  label,
  title,
  text,
  whatsapp,
  contact,
  image,
}: {
  label: string;
  title: string;
  text: string;
  whatsapp: { href: string; label: string };
  contact: { href: string; label: string };
  image: { src: string; alt: string };
}) {
  return (
    <section className="relative bg-surface">
      <Container className="md:grid md:min-h-[44rem] md:grid-cols-2 md:items-center">
        <Reveal className="min-w-0 py-12 sm:py-24 md:pr-12 lg:pr-20">
          <Eyebrow>{label}</Eyebrow>
          <h2 className="mt-6 text-balance font-serif text-4xl font-normal leading-[1.1] sm:mt-8 sm:text-6xl">{title}</h2>
          <p className="mt-6 max-w-md font-light leading-relaxed text-muted sm:mt-8">{text}</p>
          <div className="mt-7 flex flex-col items-start gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-5">
            <a href={whatsapp.href} target="_blank" rel="noopener noreferrer" className={`${buttonClass()} w-full px-5 py-3.5 text-center sm:w-auto sm:px-8`}>
              {whatsapp.label}
            </a>
            <TextLink href={contact.href}>{contact.label}</TextLink>
          </div>
        </Reveal>
      </Container>
      <BleedImage src={image.src} alt={image.alt} side="right" position="50% 0%" />
    </section>
  );
}
