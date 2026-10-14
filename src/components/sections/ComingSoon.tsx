import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { LogoMark } from "@/components/ui/LogoMark";
import { TextLink } from "@/components/ui/TextLink";
import { buttonClass } from "@/components/ui/Button";

// Placeholder for pages still being designed: the page's name, a quiet
// "coming soon" statement, and two ways forward (home, WhatsApp).
export function ComingSoon({
  page,
  title,
  text,
  home,
  whatsapp,
}: {
  page: string;
  title: string;
  text: string;
  home: { href: string; label: string };
  whatsapp: { href: string; label: string };
}) {
  return (
    <section className="flex min-h-[calc(100svh-4rem)] items-center py-24">
      <Container className="flex flex-col items-center text-center">
        <LogoMark className="h-12 w-12 text-primary/20 motion-safe:animate-fade-up" />
        <p className="mt-10 text-[11px] font-medium uppercase tracking-[0.3em] text-muted motion-safe:animate-fade-up [animation-delay:100ms]">
          {page}
        </p>
        <h1 className="mt-6 font-serif text-5xl font-medium italic leading-[1.05] tracking-tight text-primary sm:text-7xl motion-safe:animate-fade-up [animation-delay:200ms]">
          {title}
        </h1>
        <span
          aria-hidden
          className="mt-10 h-px w-16 bg-accent motion-safe:animate-fade-up [animation-delay:300ms]"
        />
        <p className="mt-8 max-w-md leading-relaxed text-muted motion-safe:animate-fade-up [animation-delay:380ms]">
          {text}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 motion-safe:animate-fade-up [animation-delay:460ms]">
          <Link href={home.href} className={`${buttonClass()} px-7 py-3`}>
            {home.label}
          </Link>
          <TextLink href={whatsapp.href}>{whatsapp.label}</TextLink>
        </div>
      </Container>
    </section>
  );
}
