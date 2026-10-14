import { Container } from "./Container";

export function PageHeader({ title, intro }: { title: string; intro?: string }) {
  return (
    <section className="border-b border-border bg-surface/60 py-14 sm:py-20">
      <Container>
        <h1 className="font-serif text-4xl font-semibold text-primary sm:text-5xl">
          {title}
        </h1>
        {intro && (
          <p className="mt-4 max-w-2xl text-lg text-muted">{intro}</p>
        )}
      </Container>
    </section>
  );
}
