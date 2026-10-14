import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { TextLink } from "@/components/ui/TextLink";
import { buttonClass } from "@/components/ui/Button";

// Home closer: wholesale / reseller invitation on the green brand band,
// split with a lifestyle photo (its sage backdrop sits softly on the green).
// It sits directly above the (also green) footer, so the two read as one
// closing block, separated only by the footer's hairline.
export function BusinessSection({
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
    <section className="bg-primary py-20 text-primary-foreground sm:py-28 lg:py-36">
      <Container className="grid items-center gap-12 md:grid-cols-12 md:gap-8">
        <Reveal className="md:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 768px) 42vw, 100vw"
              className="object-cover object-top"
            />
          </div>
        </Reveal>

        <Reveal delay={150} className="md:col-span-6 md:col-start-7 lg:col-span-5 lg:col-start-8">
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-primary-foreground/60">
            {label}
          </p>
          <h2 className="mt-6 font-serif text-[2.75rem] font-medium leading-[1.05] tracking-tight sm:text-6xl">
            {title}
          </h2>
          <span aria-hidden className="mt-10 block h-px w-16 bg-accent" />
          <p className="mt-8 max-w-md leading-relaxed text-primary-foreground/75">{text}</p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
            <a
              href={whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${buttonClass("light")} px-7 py-3`}
            >
              {whatsapp.label}
            </a>
            <TextLink href={contact.href} tone="dark">
              {contact.label}
            </TextLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
