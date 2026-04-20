# Vergeo Group — Portfolio & Agency Site

Marketing site, portfolio, and admin panel for **Vergeo Group** — the Lusaka-based web-development & automation agency run by Kaluba Prosper Musonda, plus the waitlist for **Convergeo**, Zambia's first multi-vendor marketplace (launching **7 July 2026**).

Public site: [vergeo.company](https://vergeo.company) · Admin: [admin.vergeo.company](https://admin.vergeo.company)

---

## Tech stack

| Layer | Tool |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) on React 19 |
| Styling | Tailwind CSS v4 · `framer-motion` for animation · `next-themes` for dark mode |
| Auth & DB | Supabase (Postgres + Auth) via `@supabase/ssr` (cookie sessions) |
| AI chat | OpenRouter or Kimi (Moonshot) — the chat widget persona "Speedo" |
| Forms | `react-hook-form` · EmailJS for the contact form · n8n webhooks for routing leads to WhatsApp/Gmail |
| Hosting | Vercel |

---

## Getting started

```bash
npm install
cp .env.local.example .env.local   # fill in the values — see below
npm run dev                         # http://localhost:3000
```

### Required environment variables

Copy `.env.local.example` to `.env.local` and fill these in:

| Variable | Where to get it | Required? |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase dashboard → Settings → API | ✓ |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase dashboard → Settings → API | ✓ |
| `SUPABASE_URL` | same as above | ✓ |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase dashboard → Settings → API (**never expose client-side**) | ✓ for waitlist writes & admin data |
| `KIMI_API_KEY` | [platform.moonshot.cn](https://platform.moonshot.cn) | one of Kimi/OpenRouter |
| `OPENROUTER_API_KEY` | [openrouter.ai](https://openrouter.ai) | one of Kimi/OpenRouter |
| `CHAT_PROVIDER` | `openrouter` or `kimi` (optional — auto-detects) | — |
| `OPENROUTER_MODEL` | default `openai/gpt-4o-mini` | — |
| `KIMI_MODEL` | default `moonshot-v1-8k` | — |
| `N8N_CHAT_WEBHOOK_URL` | your n8n workflow URL | optional (chat logs) |
| `N8N_INSTANT_CONNECT_WEBHOOK_URL` | your n8n workflow URL | ✓ for Instant Connect form |
| `N8N_WEBHOOK_SECRET` | any string | optional (`Authorization: Bearer …`) |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | [emailjs.com](https://emailjs.com) | ✓ for `/contact` form |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | EmailJS | ✓ |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | EmailJS | ✓ |
| `NEXT_PUBLIC_SITE_URL` | e.g. `https://vergeo.company` | optional |
| `NEXT_PUBLIC_AVAILABLE` | `"true"` to show the "available for projects" pill | optional |

### Database setup

Run `database_migration.sql` in the Supabase SQL Editor. It creates the `waitlist` and `site_settings` tables and applies RLS policies so the public anon key **cannot** read PII.

### Scripts

```bash
npm run dev       # Next dev server (Turbopack)
npm run build     # Production build
npm run start     # Serve the production build
npm run lint      # ESLint
npx tsc --noEmit  # Type-check only
```

---

## Project layout

```
src/
├── app/
│   ├── (public routes) — /, /projects, /services, /about, /contact, /waitlist, /thank-you, /privacy, /terms
│   ├── admin/          — cookie-auth-gated admin panel (dashboard, projects, waitlist, settings)
│   ├── api/
│   │   ├── chat/       — Speedo chat proxy (OpenRouter/Kimi) + lead qualification
│   │   ├── instant-connect/ — routes instant-connect form to n8n → WhatsApp/Gmail
│   │   └── waitlist/   — writes to Supabase waitlist table
│   ├── layout.tsx      — root metadata + JSON-LD
│   ├── opengraph-image.tsx — dynamically generated OG image
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── admin/          — AdminShell, AdminSidebar, WaitlistTable, ProjectsBoard, SettingsForm
│   ├── layout/         — Navbar, Footer, SiteChrome, PageTransition
│   ├── sections/       — Hero, FeaturedProjects, Services, TrustBar, Testimonials, WaitlistCTA
│   └── ui/             — Badge, ChatWidget, ContactForm, Countdown, PricingCalculator, ProjectCard, Skeleton, WaitlistForm, WhatsAppFloat
├── data/projects.ts    — portfolio projects (static source of truth)
├── lib/
│   ├── actions/        — Server Actions (auth, settings)
│   ├── server/         — server-only helpers (n8n webhook)
│   ├── supabase/       — client.ts (browser) + server.ts (Server Components / Route Handlers)
│   ├── auth.ts         — requireAdminUser() guard
│   ├── constants.ts    — SITE_CONFIG (brand name, socials, location)
│   ├── rate-limit.ts   — in-memory IP rate limiter
│   └── utils.ts
├── proxy.ts            — Next 16 proxy (formerly middleware): admin-subdomain routing + JWT-verified /admin gate
└── types/index.ts
```

## Auth model

Admin auth uses Supabase with the **SSR cookie flow** via `@supabase/ssr`:

1. `proxy.ts` runs on every request, calls `supabase.auth.getUser()` — this **validates** the JWT against Supabase, not just the cookie presence.
2. Unauthenticated requests to `/admin/*` (except `/admin/login`) are redirected to `/admin/login?redirect=<original>`.
3. Each admin page is a **Server Component** that also calls `requireAdminUser()` — defence in depth, so no admin UI ever renders without a valid session.
4. Data reads in the admin panel use the **service-role** client server-side only — the browser never sees your waitlist data over the anon client.

---

## Deploy

```bash
vercel          # deploy a preview
vercel --prod   # deploy to production
```

Set all env vars in Vercel → Project Settings → Environment Variables. For `admin.vergeo.company`, add the subdomain under Domains; the proxy handles routing.

---

## Ops checklist before you ship

- [ ] `database_migration.sql` has been run in Supabase; `SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname='public';` shows RLS enabled
- [ ] A Supabase user exists for the admin (you) — created via the Supabase dashboard
- [ ] All env vars set in Vercel for both Preview and Production
- [ ] Custom domain `vergeo.company` + `admin.vergeo.company` CNAMEd to Vercel
- [ ] EmailJS template verified; a test send reaches inbox
- [ ] n8n webhooks reachable and returning 200 for the contact form
- [ ] `npm run lint` is clean and `npx tsc --noEmit` passes

---

## License

All rights reserved. Contact [info@vergeo.company](mailto:info@vergeo.company).
