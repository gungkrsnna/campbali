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
        <Reveal className="py-20 sm:py-24 md:pr-12 lg:pr-20">
          <Eyebrow>{label}</Eyebrow>
          <h2 className="mt-8 font-serif text-5xl font-normal leading-[1.05] sm:text-6xl">{title}</h2>
          <p className="mt-8 max-w-md font-light leading-relaxed text-muted">{text}</p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
            <a href={whatsapp.href} target="_blank" rel="noopener noreferrer" className={`${buttonClass()} px-8 py-3.5`}>
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
