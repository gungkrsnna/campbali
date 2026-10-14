import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { TextLink } from "@/components/ui/TextLink";
import { buttonClass } from "@/components/ui/Button";
import { Arch } from "./Arch";

// Concept B closer: wholesale invitation on earth brown, with an arched
// lifestyle photo. Flows into the brown footer.
export function SunBusiness({
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
    <section className="overflow-hidden bg-primary py-20 text-primary-foreground sm:py-28 lg:py-36">
      <Container className="grid items-center gap-14 md:grid-cols-12 md:gap-8">
        <Reveal className="md:col-span-6 lg:col-span-6">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-sun">{label}</p>
          <h2 className="mt-6 font-serif text-[2.5rem] font-normal leading-[1] sm:text-5xl lg:text-6xl">
            {title}
          </h2>
          <p className="mt-8 max-w-md leading-relaxed text-primary-foreground/75">{text}</p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
            <a
              href={whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${buttonClass("light")} px-8 py-3.5 text-base`}
            >
              {whatsapp.label}
            </a>
            <TextLink href={contact.href} tone="dark">
              {contact.label}
            </TextLink>
          </div>
        </Reveal>

        <Reveal delay={150} className="mx-auto w-full max-w-sm md:col-span-5 md:col-start-8 md:max-w-none">
          <Arch
            src={image.src}
            alt={image.alt}
            sizes="(min-width: 768px) 40vw, 90vw"
            position="50% 20%"
            className="border-[10px] border-primary-foreground/10"
          />
        </Reveal>
      </Container>
    </section>
  );
}
