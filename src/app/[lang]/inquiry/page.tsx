import type { Metadata } from "next";
import { PageTransition } from "@/components/layout/PageTransition";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { localePath } from "@/lib/paths";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { InquiryView } from "@/components/inquiry/InquiryView";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return { title: dict.inquiry.title, robots: { index: false } };
}

export default async function InquiryPage() {
  const locale = await getLocale();
  const dict = await getDictionary();

  return (
    <PageTransition>
      <PageHeader title={dict.inquiry.title} intro={dict.inquiry.intro} />
      <Container className="py-12">
        <InquiryView
          locale={locale}
          t={dict.inquiry}
          browseHref={localePath(locale, "/products")}
        />
      </Container>
    </PageTransition>
  );
}
