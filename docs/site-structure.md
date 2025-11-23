# Site structure

## Pages
- `/` — homepage with hero, orchestration/finance/compliance messaging, logo cloud, and CTA.
- `/product` — overview of OS Core, Operator, and Prism Console.
- `/pricing` — indicative Solo/Team/Enterprise tiers.
- `/regulated` — messaging for finance, legal, Big-4, and other regulated buyers.
- `/about` — story and philosophy.
- `/contact` — early access/contact form (static placeholder).
- `/legal/privacy` and `/legal/terms` — placeholder legal stubs.
- Legacy routes remain under `/app` for console/status demos.

## Components
- `src/components/Layout/*` — shared SiteLayout, NavBar, Footer.
- `src/components/Hero.tsx` — hero block for homepage.
- `src/components/FeatureSection.tsx` — reusable feature grid.
- `src/components/SplitSection.tsx` — text/visual split layout.
- `src/components/LogoCloud.tsx` — industry target placeholders.
- `src/components/CTASection.tsx` — bold call-to-action block.

## Navigation
Navigation links are defined in `src/lib/routes.ts` and consumed by `NavBar`. Update that file when adding or renaming pages.
