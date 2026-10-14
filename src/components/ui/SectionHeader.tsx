import { Reveal } from "./Reveal";
import { TextLink } from "./TextLink";

const tones = {
  light: { title: "text-primary", intro: "text-muted" },
  dark: { title: "text-primary-foreground", intro: "text-primary-foreground/70" },
};

/** Editorial section header: large serif title left, intro + text link right. */
export function SectionHeader({
  title,
  intro,
  link,
  tone = "light",
}: {
  title: string;
  intro: string;
  link?: { href: string; label: string };
  /** "dark" for use on the green brand background. */
  tone?: keyof typeof tones;
}) {
  return (
    <Reveal className="grid gap-6 md:grid-cols-12 md:items-end md:gap-8">
      <h2
        className={`font-serif text-[2.75rem] font-medium leading-[1.05] tracking-tight sm:text-6xl md:col-span-7 lg:text-7xl ${tones[tone].title}`}
      >
        {title}
      </h2>
      <div className="md:col-span-5 md:pb-2">
        <p className={`max-w-md leading-relaxed ${tones[tone].intro}`}>{intro}</p>
        {link && (
          <TextLink href={link.href} tone={tone} className="mt-6">
            {link.label}
          </TextLink>
        )}
      </div>
    </Reveal>
  );
}
