import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { localePath } from "@/lib/paths";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

export default async function NotFound() {
  const locale = await getLocale();
  const dict = await getDictionary();

  return (
    <Container className="py-24 text-center">
      <p className="font-serif text-6xl font-semibold text-accent">404</p>
      <h1 className="mt-4 font-serif text-2xl text-primary">{dict.notFound.title}</h1>
      <div className="mt-8">
        <ButtonLink href={localePath(locale)}>{dict.notFound.back}</ButtonLink>
      </div>
    </Container>
  );
}
