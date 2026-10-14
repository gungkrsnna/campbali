import type { Metadata } from "next";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { getProduct, productsIn } from "@/content/products";
import { testimonials } from "@/content/testimonials";
import { faqs } from "@/content/faq";
import { localePath } from "@/lib/paths";
import { buildWhatsAppUrl } from "@/lib/inquiry";
import { orderPreview } from "@/lib/order-preview";
import { SunHero } from "@/components/concept-sun/SunHero";
import { SunStats } from "@/components/concept-sun/SunStats";
import { SunStory } from "@/components/concept-sun/SunStory";
import { SunTimeline } from "@/components/concept-sun/SunTimeline";
import { SunVco } from "@/components/concept-sun/SunVco";
import { SunCollection } from "@/components/concept-sun/SunCollection";
import { SunProcess } from "@/components/concept-sun/SunProcess";
import { SunValues } from "@/components/concept-sun/SunValues";
import { SunBusiness } from "@/components/concept-sun/SunBusiness";
import { ConceptSwitcher } from "@/components/concepts/ConceptSwitcher";
import { ConceptTheme } from "@/components/concepts/ConceptTheme";
import { Testimonials } from "@/components/sections/Testimonials";
import { HowToOrder } from "@/components/sections/HowToOrder";
import { FaqSection } from "@/components/sections/FaqSection";

export const metadata: Metadata = {
  title: "Concept B · Sun & Earth",
  robots: { index: false },
};

// Home page, concept B — "Sun & Earth". Same content as concept A (/), new
// visual language. <ConceptTheme> switches the palette and fonts for the
// whole document (see globals.css), header and footer included.
export default async function ConceptSunPage() {
  const locale = await getLocale();
  const dict = await getDictionary();
  const t = dict.products;
  const vco = getProduct("virgin-coconut-oil")!;
  const productsLink = { href: localePath(locale, "/products"), label: dict.home.viewAll };

  return (
    <>
      <ConceptTheme concept="sun" />
      <SunHero
        titleLead={dict.home.titleLead}
        titleAccent={dict.home.titleAccent}
        tagline={dict.home.tagline}
        primary={{ href: localePath(locale, "/products"), label: dict.home.ctaProducts }}
        secondary={{ href: localePath(locale, "/our-story"), label: dict.home.ctaStory }}
        images={[
          { src: "/images/home/variants/coconut-linen.webp", alt: dict.home.sunVcoAlt, position: "65% 60%" },
          { src: "/images/home/coconut-hero.webp", alt: dict.home.sunHeroAlt, position: "80% 80%" },
          { src: "/images/products/sesame-oil.webp", alt: dict.home.sunHeroAlt3, position: "45% 60%" },
        ]}
      />

      <SunStats stats={dict.home.stats} />

      <SunStory
        label={dict.nav.story}
        year={dict.home.journeyYear}
        highlight={dict.home.journeyHighlight}
        story={dict.home.journeyStory}
        link={{ href: localePath(locale, "/our-story"), label: dict.home.journeyLink }}
      />

      <SunTimeline label={dict.story.timelineTitle} milestones={dict.story.timeline} />

      <SunVco
        product={vco}
        label={dict.home.vcoLabel}
        detailsLabel={dict.home.vcoDetails}
        image={{ src: vco.image!, alt: vco.name[locale] }}
        locale={locale}
        t={t}
      />

      <SunCollection
        tone="clay"
        title={t.categories.oils}
        intro={dict.home.oilsIntro}
        link={productsLink}
        products={productsIn("oils")}
        locale={locale}
        t={t}
      />

      <SunCollection
        title={t.categories.foods}
        intro={dict.home.pantryIntro}
        link={productsLink}
        products={productsIn("foods")}
        locale={locale}
        t={t}
      />

      <SunProcess
        title={dict.home.processTitle}
        intro={dict.home.processIntro}
        steps={dict.home.processSteps}
      />

      <SunValues
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

      <SunBusiness
        label={dict.home.businessLabel}
        title={dict.home.businessTitle}
        text={dict.home.businessText}
        whatsapp={{ href: buildWhatsAppUrl(dict.home.businessMessage), label: dict.home.businessWhatsApp }}
        contact={{ href: localePath(locale, "/contact"), label: dict.home.businessContact }}
        image={{ src: "/images/home/model-dynamic-coconut-oil.webp", alt: dict.home.businessImageAlt }}
      />

      <ConceptSwitcher locale={locale} active="b" />
    </>
  );
}
