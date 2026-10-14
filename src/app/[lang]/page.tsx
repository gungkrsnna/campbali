import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { getProduct, productsIn } from "@/content/products";
import { localePath } from "@/lib/paths";
import { Hero } from "@/components/sections/Hero";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { StorySection } from "@/components/sections/StorySection";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { VcoSpotlight } from "@/components/sections/VcoSpotlight";
import { OilsCollection } from "@/components/sections/OilsCollection";
import { PantrySection } from "@/components/sections/PantrySection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ValuesBand } from "@/components/sections/ValuesBand";
import { Testimonials } from "@/components/sections/Testimonials";
import { HowToOrder } from "@/components/sections/HowToOrder";
import { FaqSection } from "@/components/sections/FaqSection";
import { BusinessSection } from "@/components/sections/BusinessSection";
import { buildWhatsAppUrl } from "@/lib/inquiry";
import { orderPreview } from "@/lib/order-preview";
import { ConceptSwitcher } from "@/components/concepts/ConceptSwitcher";
import { testimonials } from "@/content/testimonials";
import { faqs } from "@/content/faq";

export default async function HomePage() {
  const locale = await getLocale();
  const dict = await getDictionary();
  const t = dict.products;
  const vco = getProduct("virgin-coconut-oil")!;
  const productsLink = { href: localePath(locale, "/products"), label: dict.home.viewAll };

  return (
    <>
      <Hero
        titleLead={dict.home.titleLead}
        titleAccent={dict.home.titleAccent}
        tagline={dict.home.tagline}
        primary={{ href: localePath(locale, "/products"), label: dict.home.ctaProducts }}
        secondary={{ href: localePath(locale, "/our-story"), label: dict.home.ctaStory }}
      />

      <StatsStrip stats={dict.home.stats} />

      <StorySection
        label={dict.nav.story}
        year={dict.home.journeyYear}
        highlight={dict.home.journeyHighlight}
        story={dict.home.journeyStory}
        storyLink={{ href: localePath(locale, "/our-story"), label: dict.home.journeyLink }}
      />

      <TimelineSection label={dict.story.timelineTitle} milestones={dict.story.timeline} />

      <VcoSpotlight
        product={vco}
        label={dict.home.vcoLabel}
        detailsLabel={dict.home.vcoDetails}
        locale={locale}
        t={t}
      />

      <OilsCollection
        title={t.categories.oils}
        intro={dict.home.oilsIntro}
        link={productsLink}
        products={productsIn("oils")}
        locale={locale}
        t={t}
      />

      <PantrySection
        title={t.categories.foods}
        intro={dict.home.pantryIntro}
        link={productsLink}
        products={productsIn("foods")}
        locale={locale}
        t={t}
      />

      <ProcessSection
        title={dict.home.processTitle}
        intro={dict.home.processIntro}
        steps={dict.home.processSteps}
        image={{ src: "/images/home/symmetrical/coconut-grove.webp", alt: dict.home.processImageAlt }}
      />

      <ValuesBand
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

      <BusinessSection
        label={dict.home.businessLabel}
        title={dict.home.businessTitle}
        text={dict.home.businessText}
        whatsapp={{
          href: buildWhatsAppUrl(dict.home.businessMessage),
          label: dict.home.businessWhatsApp,
        }}
        contact={{ href: localePath(locale, "/contact"), label: dict.home.businessContact }}
        image={{ src: "/images/home/model-dynamic-coconut-oil.webp", alt: dict.home.businessImageAlt }}
      />

      <ConceptSwitcher locale={locale} active="a" />
    </>
  );
}
