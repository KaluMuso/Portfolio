# Vergeo Group portfolio — codebase health report

_Date: 2026-04-20  ·  Branch: `main`  ·  Last commit: `0a62fb4` ("fix: navbar/footer logo, PDF download, admin isolation & UI overhaul")_

## TL;DR

The site is **broadly healthy** — TypeScript passes clean, dependencies are sensible, project images all resolve, and the migration to Next.js 16 conventions (`proxy.ts`, async `params` in dynamic routes) is mostly done.

But there are a small number of **real problems you should fix before the next deploy**, the biggest of which is that the admin auth gate doesn't actually gate anything. There are also three lint errors that will start failing CI the moment you turn on `--max-warnings=0`, and a handful of cleanup items.

Severity legend: 🔴 critical · 🟠 high · 🟡 medium · 🟢 low

---

## 🔴 Critical — fix before next deploy

### 1. Admin auth is effectively broken
**Files:** `src/proxy.ts`, `src/app/admin/login/page.tsx`, `src/components/admin/AdminShell.tsx`

`proxy.ts` guards `/admin/*` by checking for two cookies:

```ts
const accessToken  = request.cookies.get("sb-access-token")?.value;
const refreshToken = request.cookies.get("sb-refresh-token")?.value;
if (!accessToken && !refreshToken) {
  return NextResponse.redirect(new URL("/admin/login", request.url));
}
```

Two problems:

1. **Those cookies are never set.** The `@supabase/supabase-js` browser client persists the session in `localStorage` by default, not cookies. So a real, logged-in admin who hard-refreshes `/admin/dashboard` will be bounced to `/admin/login` because the proxy sees no cookies. (Client-side `router.push` after login works because the proxy doesn't run on client navigations — which is why this hasn't been noticed.)
2. **The check is presence-only.** Even if you fix #1, `cookies.get(...).value` is just "is there a string here?" — an attacker can set `document.cookie = "sb-access-token=anything"` in their browser and the proxy waves them through. The actual content of the JWT is never validated.

Result: the proxy is a placebo. The only real protection is `AdminShell`'s `useEffect → supabase.auth.getSession()` check, which runs **after** the page renders — so there's a brief flash of admin UI for unauthenticated users.

**Fix:** Use `@supabase/ssr` (or the official Next.js helpers) to:
- Persist the session in HttpOnly cookies on login (server-side Set-Cookie)
- Verify the JWT in `proxy.ts` with `supabase.auth.getUser()` (which actually validates the token against Supabase)
- Server-render admin pages and gate them with the same check, so no UI ever renders for unauthenticated requests.

### 2. Likely PII exposure on the `waitlist` table
**Files:** `database_migration.sql`, `src/app/admin/waitlist/page.tsx`, `src/app/admin/dashboard/page.tsx`

Both admin pages query Supabase from the **browser** using the public anon key:

```ts
const supabase = createBrowserClient();
const { data } = await supabase.from("waitlist").select("*")...
```

That works only if Row Level Security on `waitlist` allows reads for the anon role — in which case **anyone on the internet** with the public anon key (which is bundled into your client JS, so trivially extractable) can read the entire waitlist, including names, emails, phone numbers, WhatsApp, and district. This is PII.

The migration file in the repo (`database_migration.sql`) only contains an `ALTER TABLE` adding columns — no `CREATE TABLE`, no RLS policies — so I can't verify what's actually live in Supabase. **Please log in to the Supabase dashboard and confirm:**
- `waitlist` has RLS enabled
- The only allowed reads are for authenticated users (or only for a specific service-role-backed API)

If that's not the case, fix it today and treat the leak as a disclosure event for those signups. Long-term: move admin reads off the browser anon client and onto a server route handler that uses the service-role key after verifying the admin's session.

---

## 🟠 High — fix this week

### 3. Three ESLint errors
`npx eslint src` returns 3 errors and 4 warnings. Current `package.json` runs `eslint` without `--max-warnings=0`, so it doesn't fail CI today — but these are real React bugs:

- **`src/components/admin/AdminShell.tsx:47`** — `Sidebar` is declared inside the parent component (rendered at lines 110 and 118). React treats it as a brand-new component on every render, so any state inside `Sidebar` gets reset on every parent re-render. Move the declaration outside `AdminShell`, or extract it into its own file.
- **`src/components/layout/Navbar.tsx:28`** — `useEffect(() => { setOpen(false); }, [pathname]);` synchronously calls `setState` inside an effect, causing a cascade re-render. Either gate the call (`if (open) setOpen(false)`) or, better, close the menu in the link's `onClick` instead of reacting to `pathname`.
- **AdminShell** raises the error twice (one for desktop sidebar, one for mobile overlay).

### 4. README is still the boilerplate
`README.md` is the unmodified `create-next-app` template. For a portfolio/agency site this is a bad first impression on anyone landing in the GitHub repo. Add: project description, env setup (Supabase, EmailJS, OpenRouter/Kimi, n8n webhook URLs), and deploy instructions.

### 5. `database_migration.sql` is incomplete
The file only contains an `ALTER TABLE waitlist ADD COLUMN ...`. Nobody can spin up a fresh environment from this — there's no `CREATE TABLE`, no indexes, no RLS. Either move all schema into versioned migrations (Supabase CLI), or at minimum add a `01_init.sql` with the full table + RLS.

### 6. Big uncommitted change set
`git status` shows **33 modified files** and several untracked directories (`src/app/api/chat/lead/`, `src/app/api/instant-connect/`, `src/lib/server/`) that contain real code (the n8n webhook plumbing, the lead-qualification endpoint). One bad `git reset` and that work is gone. Commit it.

---

## 🟡 Medium — clean up soon

### 7. `og-image.png` is referenced but doesn't exist
`src/app/layout.tsx:27` declares:

```ts
openGraph: { images: [{ url: "/og-image.png", width: 1200, height: 630 }] }
```

…but `public/og-image.png` is missing. Social previews fall back to the auto-generated `src/app/opengraph-image.tsx`, which works — so just **delete the explicit `images` entry** from `layout.tsx` (let Next.js use the route-based OG image), or actually drop a PNG at `public/og-image.png`. As-is, the metadata claims an asset that 404s.

### 8. No spam protection on public form endpoints
- `POST /api/waitlist`, `POST /api/instant-connect`, and the EmailJS contact form all accept anonymous POSTs with no rate limit, captcha, or honeypot.
- The chat endpoint will burn through OpenRouter / Kimi credits if anyone hits it in a loop.

For a Lusaka-based agency this is unlikely to be a major target, but it's a 30-minute fix: add a hidden honeypot field to each form, and rate-limit the API routes by IP (Upstash Ratelimit + KV is the standard Next pattern).

### 9. `next.config.ts` doesn't reflect Next 16 defaults
The config is minimal (just `images.formats`). With Next 16:
- `images.qualities` now defaults to `[75]` only — if you ever pass a `quality` prop to `<Image>` outside that, it gets coerced. Worth pinning explicitly: `qualities: [50, 75, 90]`.
- `images.minimumCacheTTL` jumped from 60s → 4h. Probably fine for a portfolio, just be aware.
- You may want to add `reactCompiler: true` (now stable) for the perf win.

### 10. `git ls-files` shows .env files are correctly gitignored (good)
…but `.gitignore` has both `.env*` and `.env*.local` listed, which is redundant. Tidy.

---

## 🟢 Low — polish

### 11. Unused imports / dead vars (lint warnings)
- `X` in `AdminShell.tsx`, `Loader2` in `ChatWidget.tsx`, `copied` state in `WaitlistForm.tsx`, `X` in `WhatsAppFloat.tsx`.
- `truncate` and `formatDate` in `src/lib/utils.ts` look unused. Either delete or use them.

### 12. Project portfolio links are weak
In `src/data/projects.ts`, several projects use `githubUrl: "https://github.com/KaluMuso"` — the user profile, not a specific repo. For a portfolio piece, this looks like a dead link. Either link to the actual repo or omit the field so the "View Source" button doesn't render.

### 13. Branding consistency check passed
No legacy "Prosper Nation" references remain in source (the rebrand from commit `a048450` looks clean). Twitter handle `@king5gates` appears only in `layout.tsx` — intentional.

### 14. `SITE_CONFIG.url` carries a stale comment
`src/lib/constants.ts:5` — `url: "https://vergeo.company", // Replace with your real domain`. The URL is correct; just delete the comment.

### 15. Two duplicate `company-profile.pdf` files
There's one at the repo root and one at `public/company-profile.pdf`. The root copy isn't served and is just bloat — delete it (and add `*.pdf` to `.gitignore` if you don't want them tracked at all, otherwise keep `public/` only).

---

## What I checked vs. what I couldn't

**Verified clean:**
- TypeScript: `tsc --noEmit` exits 0 with no errors.
- `proxy.ts` is correctly named and located for Next 16.
- `[slug]/page.tsx` correctly uses `Promise<{ slug }>` — Next 16 async-params compliant.
- `sitemap.ts` doesn't use `generateSitemaps`, so the new async-`id` breaking change doesn't apply.
- No `.env*` files are tracked in git history.
- All referenced project images (`public/images/projects/*.png`) exist.
- No service-role key usage in client code.

**Could not verify:**
- `next build` — the sandbox can't reach `registry.npmjs.org` to download the SWC binary. Last successful build artifact in `.next/` is from 2026-04-19, so it built fine yesterday. If you want, run `npm run build` locally and share output — I'll triage anything new.
- Supabase RLS policies — needs a look at the live Supabase project (see issue #2).
- Runtime behaviour of the chat endpoint with real provider keys.

---

## Suggested next steps, in order

1. **Today:** verify Supabase RLS on `waitlist`. If reads aren't locked down, lock them down. (#2)
2. **This week:** rip out the cookie-presence check in `proxy.ts` and replace with `@supabase/ssr` + real JWT verification. Server-render admin pages. (#1)
3. **This week:** fix the 3 lint errors. (#3)
4. **Before launch:** add basic rate limiting + honeypot on public POST endpoints. (#8)
5. **Background:** commit the uncommitted work (#6), write a real README (#4), complete the schema migration (#5).
