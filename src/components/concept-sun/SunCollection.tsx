import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Product } from "@/content/products";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { TextLink } from "@/components/ui/TextLink";
import { SunProductCard } from "./SunProductCard";

const tones = {
  clay: { section: "bg-clay/10", intro: "text-muted", link: "light" as const },
  sand: { section: "", intro: "text-muted", link: "light" as const },
};

// Concept B product group: heading + cards. "clay" puts the group on a soft
// terracotta tint (cold-pressed oils); "sand" keeps the page colour (pantry).
export function SunCollection({
  title,
  intro,
  link,
  products,
  locale,
  t,
  tone = "sand",
}: {
  title: string;
  intro: string;
  link: { href: string; label: string };
  products: Product[];
  locale: Locale;
  t: Dictionary["products"];
  tone?: keyof typeof tones;
}) {
  const style = tones[tone];
  const cols = products.length <= 2 ? "md:grid-cols-2 lg:max-w-4xl" : "md:grid-cols-4";

  return (
    <section className={`py-20 sm:py-28 lg:py-32 ${style.section}`}>
      <Container>
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="font-serif text-[2.5rem] font-normal leading-[1] text-primary sm:text-5xl">{title}</h2>
            <p className={`mt-5 max-w-md leading-relaxed ${style.intro}`}>{intro}</p>
          </div>
          <TextLink href={link.href} tone={style.link}>
            {link.label}
          </TextLink>
        </Reveal>

        <ul className={`mt-12 grid grid-cols-2 gap-3 sm:mt-16 sm:gap-6 ${cols}`}>
          {products.map((p, i) => (
            <li key={p.slug} className="text-foreground">
              <Reveal delay={i * 100} className="h-full">
                <SunProductCard product={p} locale={locale} t={t} />
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
