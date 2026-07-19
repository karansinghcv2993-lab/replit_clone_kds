# KDS ERP Crew — Enterprise AI Agent Catalogue

A marketing/catalogue site showcasing 90+ enterprise AI agents for Microsoft Dynamics 365, built with TanStack Start (SSR), React 19, Tailwind CSS v4, and Radix UI.

## Running the app

```bash
bun run dev   # starts dev server on port 5000
```

The workflow **"Start application"** is already configured and will run this command automatically.

## Stack

- **Framework:** TanStack Start (SSR) + TanStack Router
- **UI:** React 19, Radix UI, shadcn/ui components, Tailwind CSS v4
- **Build tool:** Vite 8 + Bun
- **Config:** `@lovable.dev/vite-tanstack-config` handles plugin setup — do NOT add TanStack/Tailwind plugins manually in `vite.config.ts`

## Project structure

```
src/
  routes/        # File-based routes (TanStack Router)
  components/    # UI and site-specific components
  data/          # Agent catalogue data
  lib/           # Utilities
  assets/        # Static assets
  styles.css     # Global styles
```

## User preferences

_None recorded yet._
