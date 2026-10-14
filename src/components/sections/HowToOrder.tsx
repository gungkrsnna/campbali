import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { buttonClass } from "@/components/ui/Button";

type Step = { title: string; text: string };

// Home: explains the list → WhatsApp → reply flow (there is no checkout).
// Left: heading and the three steps as a vertical numbered list on a hairline.
// Right: a WhatsApp-style chat preview that SHOWS the outcome — the real
// message format a customer sends, and a reply from us.
export function HowToOrder({
  title,
  intro,
  steps,
  cta,
  preview,
}: {
  title: string;
  intro: string;
  steps: Step[];
  cta: { href: string; label: string };
  preview: { label: string; brand: string; message: string; reply: string };
}) {
  return (
    <section className="bg-surface/70 py-20 sm:py-28 lg:py-36">
      <Container className="grid gap-14 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-6 lg:col-span-5">
          <Reveal>
            <h2 className="font-serif text-[2.75rem] font-medium leading-[1.05] tracking-tight text-primary sm:text-6xl">
              {title}
            </h2>
            <p className="mt-6 max-w-sm leading-relaxed text-muted">{intro}</p>
          </Reveal>

          <ol className="mt-12">
            {steps.map((step, i) => (
              <li key={step.title} className="relative pb-10 last:pb-0">
                {/* Hairline joining the numerals (not after the last step). */}
                {i < steps.length - 1 && (
                  <span aria-hidden className="absolute bottom-0 left-5 top-12 w-px bg-border" />
                )}
                <Reveal delay={i * 150} className="flex gap-6">
                  <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border bg-background font-serif text-lg italic text-accent">
                    {i + 1}
                  </span>
                  <div className="pt-1">
                    <h3 className="font-serif text-2xl font-medium leading-tight text-primary">
                      {step.title}
                    </h3>
                    <p className="mt-2 max-w-sm leading-relaxed text-muted">{step.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>

          <Reveal delay={450}>
            <Link href={cta.href} className={`${buttonClass()} mt-12 px-7 py-3`}>
              {cta.label}
            </Link>
          </Reveal>
        </div>

        <Reveal delay={200} className="md:col-span-6 md:col-start-7 lg:col-span-6 lg:col-start-7">
          <figure className="rounded-sm bg-primary/[0.07] p-5 sm:p-8 lg:p-10">
            <figcaption className="text-[11px] font-medium uppercase tracking-[0.3em] text-muted">
              {preview.label}
            </figcaption>

            {/* Decorative chat window — illustrative only. */}
            <div aria-hidden className="mt-6 overflow-hidden rounded-xl bg-background shadow-sm shadow-primary/10">
              <div className="flex items-center gap-3 border-b border-border px-4 py-3">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-primary font-serif text-sm text-primary-foreground">
                  CB
                </span>
                <span className="text-sm font-medium text-foreground">{preview.brand}</span>
                <span className="ml-auto h-2 w-2 rounded-full bg-[#25d366]" />
              </div>

              <div className="space-y-3 px-4 py-5 text-[13px] leading-relaxed sm:px-5">
                <p className="ml-auto max-w-[88%] whitespace-pre-line rounded-lg rounded-tr-sm bg-primary/10 px-3.5 py-2.5 text-foreground/90">
                  {preview.message}
                  <span className="mt-1 block text-right text-[10px] text-muted">09:41 ✓✓</span>
                </p>
                <p className="max-w-[80%] rounded-lg rounded-tl-sm border border-border bg-surface px-3.5 py-2.5 text-foreground/90">
                  {preview.reply}
                  <span className="mt-1 block text-right text-[10px] text-muted">09:52</span>
                </p>
              </div>
            </div>
          </figure>
        </Reveal>
      </Container>
    </section>
  );
}
