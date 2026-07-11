# Plan — Clone mywaveagent.ai homepage

## Goal
Recreate the mywaveagent.ai homepage in this TanStack Start project as a single interactive page. All in-page interactions (tabs, filters, buttons, modals) work. Buttons that would navigate to another site/page on the original (e.g. "Back to MyWave.ai", "View all solutions", "Watch Demo" going to a video page) are rendered as visually identical buttons but do nothing / open a small "demo unavailable" toast, as requested.

## Scope (what the homepage contains)
1. **Hero** — dark wave background, MYWAVE.ai logo, "AI Agent Catalogue" title, subtitle, three CTA buttons (Agent Highlights, Full Agent Catalogue, Back to MyWave.ai) and 4 stat tiles (352+, 7, 10+, SAP Certified).
2. **Agent Highlights section** — "See agents in action" with a tab bar: Order to Cash (5), Procure to Pay (7), Supply Chain (3), Cross-Functional (4), SAP Business One (9). Switching tabs updates the grid of demo agent cards below. Each card has a "Demo" button that opens a modal ("Demo video not available in this clone").
3. **End-to-End Process Solutions** — grid of ~17 solution cards, each showing steps count, title, description, and automation stats. Clicking a card opens a modal with the same detail (original links to solution pages).
4. **Full Agent Library** — filter tab bar (All, O2C, P2P, Supply Chain, Finance, Platform, Insurance, Manufacturing, Retail & CPG, Healthcare, Trade Finance, Banking, SAP B1). Selecting a filter narrows the visible agents. Shows category badges. "N shown" counter updates live. Includes a search input for convenience.
5. **Footer** — minimal, matching the source (copyright / contact line, no external nav).

## Implementation approach

### Routing
- Single route: replace placeholder in `src/routes/index.tsx` with the full homepage. Update `head()` metadata on `__root.tsx` (title, description, og tags) to reflect "MyWave AI Agent Catalogue".
- No new routes needed — everything is on `/`.

### Data
- Extract all 352 agents (with category, name, description, hasDemo flag) plus the 17 solutions and 5 highlight tab groups from the fetched markdown into typed constants in `src/data/agents.ts` and `src/data/solutions.ts`. Static import — no backend, no Lovable Cloud.

### Components (`src/components/home/`)
- `HeroSection.tsx` — dark gradient bg, wave background image (generated), logo (generated or CSS text), CTAs (smooth-scroll to sections), stat tiles.
- `HighlightsSection.tsx` — controlled tabs (shadcn Tabs) driving a grid of `AgentDemoCard`s. Demo button opens a shared `DemoModal` (Dialog) with placeholder message.
- `SolutionsSection.tsx` — responsive card grid; click opens `SolutionModal` with steps count + automation stats.
- `CatalogueSection.tsx` — filter tab bar + search input + virtualized-safe grid of `AgentCard`s with category badges and live "N shown" count.
- `SiteFooter.tsx` — minimal footer.
- Shared `DemoModal.tsx`, `SolutionModal.tsx`.

### Design system
- Update `src/styles.css`:
  - Dark hero palette (deep navy `#0a0f2c`-ish in oklch) with electric blue accent (`#2f6bff`-ish).
  - Light body background (white/near-white) for the lower sections.
  - Semantic tokens: `--hero-bg`, `--hero-gradient`, `--accent-blue`, `--tab-active`, `--card-surface`, `--badge-bg`.
  - Font: Inter (system fallback) — matches the original's clean sans.
- Only semantic tokens in components; no hardcoded hex.

### Assets
- Generate one hero wave background image (`src/assets/hero-wave.jpg`, ~1920×1080).
- Logo rendered as inline SVG-style component (small wave mark + "MYWAVE.ai" text) — no image needed.

### Interactivity rules (per user request)
- Tabs, filters, search, modals: fully functional.
- Buttons that on the original navigate elsewhere ("Back to MyWave.ai", "View all solutions", "Contact us to get started", "See all 44 O2C agents", "Watch Demo"): render with identical styling but on click either (a) smooth-scroll to a relevant on-page section when meaningful (e.g. "Browse Full Catalogue" scrolls to catalogue), or (b) show a small toast / open the demo modal explaining the target is external.

### Tech details
- TanStack Query not needed (static data).
- shadcn components: Tabs, Dialog, Input, Button, Badge, Card, Sonner (toasts).
- No server functions, no auth, no DB.

## File changes
- Modify: `src/styles.css`, `src/routes/__root.tsx` (head metadata + Toaster mount), `src/routes/index.tsx`.
- Add: `src/data/agents.ts`, `src/data/solutions.ts`, `src/data/highlights.ts`, `src/components/home/HeroSection.tsx`, `HighlightsSection.tsx`, `SolutionsSection.tsx`, `CatalogueSection.tsx`, `SiteFooter.tsx`, `DemoModal.tsx`, `SolutionModal.tsx`, `Logo.tsx`, `src/assets/hero-wave.jpg`.
- Add sitemap/robots per project convention.

## Out of scope
- Actual demo videos, real navigation to /solutions/* pages, contact form submission, authentication.
