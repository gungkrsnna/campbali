# Camp Bali Website

Next.js 16 (App Router, Cache Components) + TypeScript + Tailwind CSS 4.
Source content: the client brief (`Camp Bali Origins.docx`) and price list live in a local `docs/` folder, which is git-ignored (it contains wholesale prices and contacts).

## Getting started

```bash
cp .env.example .env.local   # set NEXT_PUBLIC_WHATSAPP_NUMBER (digits only, e.g. 6281234567890)
npm install
npm run dev                  # http://localhost:3000 → redirects to /en or /id
```

## Structure

```
src/
├── proxy.ts                  # redirects "/" → "/en" or "/id" (by browser language)
├── app/[lang]/               # every page lives under the locale segment
│   ├── layout.tsx            # root layout: <html lang>, Header, Footer
│   ├── page.tsx              # Home
│   ├── our-story/            # origins + milestone timeline
│   ├── ethos/                # mission + core pillars
│   ├── products/             # catalogue, grouped by category
│   ├── products/[slug]/      # product detail
│   ├── inquiry/              # "My List" → send via WhatsApp / download PDF
│   ├── community/
│   └── contact/
├── i18n/
│   ├── config.ts             # locales list — add a language here
│   ├── get-dictionary.ts     # server-side dictionary loader
│   └── dictionaries/         # en.json, id.json (all page text)
├── content/
│   ├── products.ts           # product catalogue (bilingual)
│   └── site.ts               # site name, contact, navigation
├── lib/
│   ├── inquiry.ts            # WhatsApp message + PDF generation
│   ├── inquiry-store.ts      # list state (localStorage)
│   └── paths.ts              # locale-aware URL helpers
└── components/
    ├── layout/               # Header, Footer, LanguageSwitcher
    ├── sections/             # ProductCard, Timeline, PillarCards
    ├── inquiry/              # AddToListButton, InquiryBadge, InquiryView
    └── ui/                   # Container, Button, PageHeader
```

## Common tasks

- **Edit page text:** `src/i18n/dictionaries/en.json` and `id.json` (keep keys identical).
- **Add a product:** add an entry to `src/content/products.ts`; put its photo in `public/images/products/`.
- **Add a language:** add the code to `locales` in `src/i18n/config.ts`, copy `en.json` to `<code>.json` and translate, then register it in `get-dictionary.ts`.

## Inquiry flow

Visitors add products to a list (stored in their browser), fill in their name/contact, then either:

1. **Send via WhatsApp** — opens `wa.me` with a pre-filled, formatted message.
2. **Download PDF** — generates the inquiry document with jsPDF.

`wa.me` links can only carry text, so the PDF is downloaded rather than attached automatically.
Sending files straight to WhatsApp would need the (paid) WhatsApp Business API and a server.
