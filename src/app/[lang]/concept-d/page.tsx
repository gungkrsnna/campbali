import type { Metadata } from "next";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { getProduct, productsIn } from "@/content/products";
import { site } from "@/content/site";
import { testimonials } from "@/content/testimonials";
import { faqs } from "@/content/faq";
import { localePath } from "@/lib/paths";
import { buildWhatsAppUrl } from "@/lib/inquiry";
import { orderPreview } from "@/lib/order-preview";
import { ConceptTheme } from "@/components/concepts/ConceptTheme";
import { ConceptSwitcher } from "@/components/concepts/ConceptSwitcher";
import { SmoothScroll } from "@/components/concept-motion/SmoothScroll";
import { Cursor } from "@/components/concept-motion/Cursor";
import { Preloader } from "@/components/concept-motion/Preloader";
import { MotionHero } from "@/components/concept-motion/MotionHero";
import { Marquee } from "@/components/concept-motion/Marquee";
import { StoryReveal } from "@/components/concept-motion/StoryReveal";
import { MotionTimeline } from "@/components/concept-motion/MotionTimeline";
import { HorizontalGallery } from "@/components/concept-motion/HorizontalGallery";
import { StackSteps } from "@/components/concept-motion/StackSteps";
import { ValueRows } from "@/components/concept-motion/ValueRows";
import { BigCta } from "@/components/concept-motion/BigCta";
import { Testimonials } from "@/components/sections/Testimonials";
import { HowToOrder } from "@/components/sections/HowToOrder";
import { FaqSection } from "@/components/sections/FaqSection";

export const metadata: Metadata = {
  title: "Concept D · Motion",
  robots: { index: false },
};

// Home page, concept D — "Motion": an immersive, interaction-led take on the
// same content — intro preloader, custom cursor, smooth scrolling, letter-by-
// letter headline, a photo that grows to full screen, scroll-reactive
// marquee, word-by-word story reveal, count-up numbers, a pinned horizontal
// product gallery, stacking process cards and magnetic buttons.
// Every effect falls back to a calm static layout for reduced motion.
export default async function ConceptMotionPage() {
  const locale = await getLocale();
  const dict = await getDictionary();
  const t = dict.products;
  const vco = getProduct("virgin-coconut-oil")!;

  return (
    <>
      <ConceptTheme concept="motion" />
      <SmoothScroll />
      <Cursor />
      <Preloader brand={site.name} />

      <MotionHero
        titleLead={dict.home.titleLead}
        titleAccent={dict.home.titleAccent}
        tagline={dict.home.tagline}
        primary={{ href: localePath(locale, "/products"), label: dict.home.ctaProducts }}
        scrollLabel={dict.home.motionScroll}
        image={{ src: "/images/home/coconut-hero.webp", alt: dict.home.sunHeroAlt }}
      />

      <Marquee
        className="border-y border-border py-8"
        items={[t.categories.vco, t.categories.oils, t.categories.foods, dict.home.ethosTitle, dict.home.journeyHighlight]}
      />

      <StoryReveal
        label={dict.nav.story}
        text={dict.home.journeyStory.join(" ")}
        stats={dict.home.stats}
        link={{ href: localePath(locale, "/our-story"), label: dict.home.journeyLink }}
      />

      <MotionTimeline label={dict.story.timelineTitle} milestones={dict.story.timeline} />

      <HorizontalGallery
        eyebrow={dict.home.luxeCollection}
        title={t.title}
        intro={t.intro}
        scrollHint={dict.home.motionScrollHint}
        products={[vco, ...productsIn("oils"), ...productsIn("foods")]}
        locale={locale}
        t={t}
      />

      <StackSteps eyebrow={dict.home.luxeProcess} title={dict.home.processTitle} steps={dict.home.processSteps} />

      <ValueRows
        eyebrow={dict.home.ethosTitle}
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

      <BigCta
        label={dict.home.businessLabel}
        title={dict.home.businessTitle}
        text={dict.home.businessText}
        whatsapp={{ href: buildWhatsAppUrl(dict.home.businessMessage) }}
        contact={{ href: localePath(locale, "/contact"), label: dict.home.businessContact }}
        circleLabel={dict.home.motionCircle}
      />

      <ConceptSwitcher locale={locale} active="d" />
    </>
  );
}
