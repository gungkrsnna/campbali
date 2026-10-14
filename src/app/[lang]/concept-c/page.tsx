import type { Metadata } from "next";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { getProduct, productsIn } from "@/content/products";
import { testimonials } from "@/content/testimonials";
import { faqs } from "@/content/faq";
import { localePath } from "@/lib/paths";
import { buildWhatsAppUrl } from "@/lib/inquiry";
import { orderPreview } from "@/lib/order-preview";
import { ConceptTheme } from "@/components/concepts/ConceptTheme";
import { ConceptSwitcher } from "@/components/concepts/ConceptSwitcher";
import { LuxeHero } from "@/components/concept-luxe/LuxeHero";
import { LuxeStats } from "@/components/concept-luxe/LuxeStats";
import { LuxeStory } from "@/components/concept-luxe/LuxeStory";
import { LuxeTimeline } from "@/components/concept-luxe/LuxeTimeline";
import { LuxeVco } from "@/components/concept-luxe/LuxeVco";
import { LuxeCollection } from "@/components/concept-luxe/LuxeCollection";
import { LuxeProcess } from "@/components/concept-luxe/LuxeProcess";
import { LuxeValues } from "@/components/concept-luxe/LuxeValues";
import { LuxeBusiness } from "@/components/concept-luxe/LuxeBusiness";
import { Testimonials } from "@/components/sections/Testimonials";
import { HowToOrder } from "@/components/sections/HowToOrder";
import { FaqSection } from "@/components/sections/FaqSection";

export const metadata: Metadata = {
  title: "Concept C · Deep Green Luxe",
  robots: { index: false },
};

// Home page, concept C — "Deep Green Luxe". Same content as concepts A and B,
// dark forest-green visual language. <ConceptTheme> switches the palette and
// fonts for the whole document (see globals.css).
export default async function ConceptLuxePage() {
  const locale = await getLocale();
  const dict = await getDictionary();
  const t = dict.products;
  const vco = getProduct("virgin-coconut-oil")!;
  const productsLink = { href: localePath(locale, "/products"), label: dict.home.viewAll };

  return (
    <>
      <ConceptTheme concept="luxe" />

      <LuxeHero
        eyebrow={dict.footer.motto}
        titleLead={dict.home.titleLead}
        titleAccent={dict.home.titleAccent}
        tagline={dict.home.tagline}
        primary={{ href: localePath(locale, "/products"), label: dict.home.ctaProducts }}
        secondary={{ href: localePath(locale, "/our-story"), label: dict.home.ctaStory }}
        image={{ src: "/images/home/model-dynamic-coconut-oil.webp", alt: dict.home.businessImageAlt }}
      />

      <LuxeStats stats={dict.home.stats} />

      <LuxeStory
        label={dict.nav.story}
        year={dict.home.journeyYear}
        highlight={dict.home.journeyHighlight}
        story={dict.home.journeyStory}
        link={{ href: localePath(locale, "/our-story"), label: dict.home.journeyLink }}
      />

      <LuxeTimeline label={dict.story.timelineTitle} milestones={dict.story.timeline} />

      <LuxeVco
        product={vco}
        label={dict.home.vcoLabel}
        detailsLabel={dict.home.vcoDetails}
        locale={locale}
        t={t}
      />

      <LuxeCollection
        eyebrow={dict.home.luxeCollection}
        title={t.categories.oils}
        intro={dict.home.oilsIntro}
        link={productsLink}
        products={productsIn("oils")}
        locale={locale}
        t={t}
      />

      <LuxeCollection
        eyebrow={dict.home.luxeCollection}
        title={t.categories.foods}
        intro={dict.home.pantryIntro}
        link={productsLink}
        products={productsIn("foods")}
        locale={locale}
        t={t}
      />

      <LuxeProcess
        eyebrow={dict.home.luxeProcess}
        title={dict.home.processTitle}
        intro={dict.home.processIntro}
        steps={dict.home.processSteps}
        image={{ src: "/images/home/symmetrical/coconut-grove.webp", alt: dict.home.processImageAlt }}
      />

      <LuxeValues
        title={dict.home.ethosTitle}
        mission={dict.ethos.mission}
        pillars={dict.ethos.pillars}
        link={{ href: localePath(locale, "/ethos"), label: dict.home.ethosLink }}
      />

      <Testimonials
        title={dict.home.testimonialsTitle}
        quotes={testimonials.map((q) => ({ quote: q.quote[locale], name: q.name, role: q.role[locale] }))}
      />

      <HowToOrder
        title={dict.home.orderTitle}
        intro={dict.home.orderIntro}
        steps={dict.home.orderSteps}
        cta={{ href: localePath(locale, "/products"), label: dict.home.orderCta }}
        preview={orderPreview(dict, locale)}
      />

      <FaqSection
        title={dict.home.faqTitle}
        intro={dict.home.faqIntro}
        items={faqs.map((f) => ({ question: f.question[locale], answer: f.answer[locale] }))}
        more={{ href: buildWhatsAppUrl(dict.home.faqMessage), label: dict.home.faqMore }}
      />

      <LuxeBusiness
        label={dict.home.businessLabel}
        title={dict.home.businessTitle}
        text={dict.home.businessText}
        whatsapp={{ href: buildWhatsAppUrl(dict.home.businessMessage), label: dict.home.businessWhatsApp }}
        contact={{ href: localePath(locale, "/contact"), label: dict.home.businessContact }}
        image={{ src: "/images/home/model-satin-turn-coconut-oil.webp", alt: dict.home.luxeHeroAlt }}
      />

      <ConceptSwitcher locale={locale} active="c" />
    </>
  );
}
