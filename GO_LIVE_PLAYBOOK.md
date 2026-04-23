# Vergeo — Go-Live Playbook

Work through top to bottom. Each step has a **test** you should pass before moving on. Test gates are marked ⏱.

---

## STEP A — Supabase fix (2 min)

Your Settings page errors with `record "new" has no field "updated_at"`. One-time fix:

1. Open Supabase Dashboard → SQL Editor → New query
2. Paste the contents of `sql_patches/01_fix_site_settings_updated_at.sql`
3. Run

⏱ **Test:** open admin → Settings → click Save Changes. Should show "Saved!" not the old error.

---

## STEP B — Vercel env vars (10 min)

Open [Vercel → kalu-portfolio → Settings → Environment Variables](https://vercel.com/vergeo-projects/kalu-portfolio/settings/environment-variables).

Set these for **Production** + **Preview**:

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://lrhhoosaijqxafetcamk.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Settings → API → anon key |
| `SUPABASE_URL` | same as NEXT_PUBLIC version |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Settings → API → service_role key |
| `OPENROUTER_API_KEY` | **this fixes the "Speedo is offline" bug** |
| `KIMI_API_KEY` | (optional fallback) |
| `OPENROUTER_MODEL` | `openai/gpt-4o-mini` |
| `N8N_INSTANT_CONNECT_WEBHOOK_URL` | `https://automation.vergeo.company/webhook/instant-connect` |
| `N8N_CHAT_WEBHOOK_URL` | `https://automation.vergeo.company/webhook/vergeo-chat` |
| `N8N_WEBHOOK_SECRET` | see STEP C1 below first to know what value to put here |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | emailjs.com |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | emailjs.com |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | emailjs.com |
| `NEXT_PUBLIC_SITE_URL` | `https://vergeo.company` |

After saving, **Deployments → latest → Redeploy** (env changes only apply on new deploys).

⏱ **Test:** visit https://vergeo.company, open Speedo, ask "how much does a website cost?". Should get a real LLM answer, not "Speedo is offline".

---

## STEP C — n8n workflows use credentials (not env vars) (15 min)

Follow the click-by-click instructions in **N8N_WIRING.md**. It covers:

- **C1** — reading your `Vergeo Webhook Secret` credential's actual value (you need this for STEP B `N8N_WEBHOOK_SECRET`)
- **C2** — rewiring Instant Connect Notifier: replace the hardcoded-Bearer IF node with native headerAuth + credential; confirm WAHA node uses your `0761359005 - WAHA` credential
- **C3** — rewiring Vergeo Chat Webhook Pipeline: attach credentials to webhook, Supabase, Gmail, OpenRouter, and WAHA nodes; activate
- **C4** — archive the old conflicting "Vergeo Chat Agent" workflow

⏱ **Tests (in N8N_WIRING.md):**
- **Test A** (curl to `/webhook/instant-connect`) → WhatsApp + Gmail arrive
- **Test B** (curl lead_qualified to `/webhook/vergeo-chat`) → row in `chat_leads` + WhatsApp + Gmail
- **Test C** (curl chat_message to `/webhook/vergeo-chat`) → row in `chat_messages`

---

## STEP D — End-to-end smoke test on the live site

Do these in order. Use an incognito window.

### D1 — Admin login + theme toggle
1. https://admin.vergeo.company → log in
2. Click the sun/moon icon in the top bar → theme switches (admin + public both flip)

⏱ Pass: dashboard loads, theme toggle works.

### D2 — Admin settings save
1. Settings → change availability message → Save

⏱ Pass: "Saved!" toast, refresh persists the value.

### D3 — Waitlist public form
1. https://vergeo.company/waitlist → submit fake signup

⏱ Pass: redirects to /thank-you, new row in Supabase `waitlist` table.

### D4 — Contact / Instant Connect form
1. https://vergeo.company/contact → submit

⏱ Pass: WhatsApp + Gmail arrive within 30s.

### D5 — Chatbot Speedo
1. Open Speedo on homepage → ask "how much does a website cost?"
2. Chat for 3 messages → inline lead-capture card appears
3. Fill + Send my details

⏱ Pass:
- Real LLM answer (not "Speedo is offline")
- Lead card appears after ~3 messages
- WhatsApp "[LEAD]…" message arrives after submitting the card
- Row in `chat_leads`

---

## STEP E — Deploy (I handle)

When D1–D5 all pass, tell me "ready to deploy" and I'll:
1. Commit the code changes from this session
2. Push to main → Vercel auto-deploys
3. Run the tests above against the live deploy to confirm nothing regressed

---

## Common stuck points

| Symptom | Fix |
|---|---|
| "Speedo is offline" after Step B | Env vars only pick up on new deploys. Force redeploy. |
| Admin login loops forever | Browser devtools → Application → Cookies. If no `sb-*` cookies after login, `NEXT_PUBLIC_SUPABASE_URL` mismatch between client/server. |
| n8n returns 401 | `N8N_WEBHOOK_SECRET` in Vercel ≠ value inside the n8n `Vergeo Webhook Secret` credential. The header the portfolio sends is `Authorization: Bearer ${N8N_WEBHOOK_SECRET}` — the credential should match that entire string (with "Bearer " if the credential stores the full header value, without if it only stores the raw secret). |
| WAHA returns 422 | `chatId` format must be `{number without +}@c.us`. For +260 761 359 005 → `260761359005@c.us`. |
| Settings page still errors | Run STEP A again, then confirm with `select column_name from information_schema.columns where table_name='site_settings';` — `updated_at` must be in the list. |
| Admin page shows "Supabase admin client requires…" | `SUPABASE_URL` or `SUPABASE_SERVICE_ROLE_KEY` missing in Vercel. Set both, redeploy. |
