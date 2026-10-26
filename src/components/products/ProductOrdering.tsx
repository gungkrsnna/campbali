import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { localePath } from "@/lib/paths";
import { Container } from "@/components/ui/Container";
import { buttonClass } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function ProductOrdering({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section aria-labelledby="product-ordering-title" className="border-t border-border bg-surface/30 py-16 sm:py-24">
      <Container>
        <Reveal className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end lg:gap-12">
          <div className="max-w-2xl">
            <h2 id="product-ordering-title" className="text-balance font-serif text-4xl font-normal leading-[1.15] sm:text-5xl">{dict.products.orderingTitle}</h2>
            <p className="mt-5 font-light leading-relaxed text-muted">{dict.products.orderingIntro}</p>
          </div>
          <Link href={localePath(locale, "/inquiry")} className={`${buttonClass("outline")} w-full shrink-0 px-7 py-3 sm:w-auto`}>{dict.nav.inquiry} <span aria-hidden>↗</span></Link>
        </Reveal>
        <ol className="mt-10 grid gap-8 border-t border-border pt-8 sm:mt-12 sm:pt-10 md:grid-cols-3 md:gap-10">
          {dict.home.orderSteps.map((step, index) => (
            <li key={step.title}>
              <Reveal delay={index * 100}>
                <span aria-hidden className="text-xs tracking-[0.2em] text-accent">0{index + 1}</span>
                <h3 className="mt-4 font-serif text-2xl font-normal">{step.title}</h3>
                <p className="mt-3 max-w-sm text-sm font-light leading-relaxed text-muted">{step.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
