# n8n Wiring Guide — use credentials, not env vars

Your VPS n8n (free tier) doesn't expose the Variables UI. This guide swaps every `$env.*` reference to a credential, so nothing in the workflows depends on shell env vars on the OCI host.

You already have these credentials created — we'll just attach them:

- **`Vergeo Webhook Secret`** (Header Auth) — used to authenticate incoming webhooks from your Next.js app
- **`0761359005 - WAHA`** (WAHA API) — used by the native WAHA node to send WhatsApp
- **`Gmail - VergeoSales`** (Gmail OAuth2) — used for Gmail notifications

Before starting, find out (or decide) the Bearer token value stored inside `Vergeo Webhook Secret`:
1. In n8n → Credentials → click **Vergeo Webhook Secret**
2. Note the **Header Value**. It will be in the form `Bearer <long-random-string>` (or just the raw string — we'll check).
3. Whatever value is there, **that exact value must be set in Vercel as `N8N_WEBHOOK_SECRET`** (without the "Bearer " prefix — the portfolio adds it). If the credential value has `Bearer ` in front, strip it when copying to Vercel.

---

## Workflow A — Instant Connect Notifier (already live, small tidy-up)

Right now it uses a hardcoded Bearer token in an IF node. We'll replace that with proper headerAuth tied to your credential.

1. Open workflow **Instant Connect Notifier** → click **Edit in canvas**
2. Click the **Receive Instant Connect** (webhook) node
3. In the settings panel, find **Authentication** → change from `None` to **Header Auth**
4. **Credential for Header Auth** → select `Vergeo Webhook Secret`
5. Save node
6. Now delete the **Validate Bearer Token** (IF node) entirely — headerAuth on the webhook handles rejection automatically (returns 401 before the workflow even runs)
7. Delete the **Respond 401 Unauthorized** node too (no longer reachable)
8. Connect **Receive Instant Connect → Respond 200 OK** directly (drag the dot from webhook output to 200 OK input)
9. Click the **Send WhatsApp Notification** node:
   - **Resource**: `Chatting`
   - **Operation**: `Send Text`
   - **Credential to connect with**: `0761359005 - WAHA`
   - **Session**: `default` (or whatever your WAHA session is named)
   - **Chat ID**: `260761359005@c.us` (your WhatsApp in `{countrycode + number without +}@c.us` format)
   - **Text**: paste this (adjust names/emojis to taste):
     ```
     *New Instant Connect*
     Name: {{ $('Receive Instant Connect').item.json.body.name ?? 'N/A' }}
     Email: {{ $('Receive Instant Connect').item.json.body.email }}
     Phone: {{ $('Receive Instant Connect').item.json.body.phone ?? 'N/A' }}
     Message: {{ $('Receive Instant Connect').item.json.body.message ?? 'N/A' }}
     ```
   - Set **On Error: Continue (Using Error Output)** — so a WAHA failure doesn't block Gmail
10. Click the **Send Gmail Notification** node:
    - Confirm credential is `Gmail - VergeoSales`
    - Confirm **Send To** is the inbox you actually read
11. Click **Save** top right
12. Toggle **Active** ON (top right)

### Test A — Instant Connect end-to-end

Paste this into your terminal (replace `<WEBHOOK_SECRET>` with the raw secret value from the credential, no "Bearer " prefix):

```bash
curl -X POST https://automation.vergeo.company/webhook/instant-connect \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <WEBHOOK_SECRET>" \
  -d '{"body":{"name":"CLI Test","email":"cli@test.com","phone":"+260000000000","message":"Testing from curl","ts":"2026-04-21T12:00:00Z"}}'
```

**Pass condition**:
- Response: `{"ok":true}`
- Within 30s: WhatsApp message arrives on your number
- Within 30s: Gmail lands in `vergeosales@gmail.com`

If 401: the Bearer token in curl doesn't match the credential. Fix the credential value to match what you'll set in Vercel.

---

## Workflow B — Vergeo Chat Webhook Pipeline (currently inactive)

Same pattern: attach credentials, swap env-var references, activate.

1. Open workflow **Vergeo Chat Webhook Pipeline** → **Edit in canvas**
2. Click the **Vergeo Chat Webhook** node:
   - **Authentication** is already set to Header Auth → just attach **Credential for Header Auth** → `Vergeo Webhook Secret` (same one as workflow A)
3. Click the **Save Lead to Supabase** node → attach credential → `Vergeo Chat - Supabase`
4. Click the **Save Chat Message** node → attach credential → `Vergeo Chat - Supabase`
5. Click the **Notify Sales via Gmail** node → credential → `Gmail - VergeoSales`
6. Click the **Get Lead Intent via OpenRouter** node → credential → `OpenRouter MCP`
7. Click the **Send WhatsApp Alert via WAHA** node — it's currently an HTTP Request; **replace it with a WAHA node**:
   - Delete this node
   - Drop in a new **WAHA → Chatting → Send Text** node in its place
   - **Credential to connect with**: `0761359005 - WAHA`
   - **Session**: `default`
   - **Chat ID**: `260761359005@c.us`
   - **Text**:
     ```
     [LEAD] {{ $('Route by Event Type').item.json.body.name }} | {{ $('Route by Event Type').item.json.body.email }} | src: {{ $('Route by Event Type').item.json.body.source }}
     Intent: {{ $('Get Lead Intent via OpenRouter').item.json.choices?.[0]?.message?.content ?? 'n/a' }}
     ```
   - Reconnect: **Get Lead Intent via OpenRouter → WAHA node → Respond Lead Processed**
8. Save workflow
9. Toggle **Active** ON

### Test B — Chat lead event

```bash
curl -X POST https://automation.vergeo.company/webhook/vergeo-chat \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <WEBHOOK_SECRET>" \
  -d '{"body":{"event":"lead_qualified","sessionId":"test-session","name":"CLI Lead","email":"lead@test.com","source":"speedo-chat","siteUrl":"https://vergeo.company","ts":"2026-04-21T12:00:00Z"}}'
```

**Pass condition**:
- Response: `{"ok":true,"message":"lead_qualified processed"}`
- Row inserted in Supabase `chat_leads`
- Gmail arrives at vergeosales@gmail.com: "New Lead: CLI Lead…"
- WhatsApp message: "[LEAD] CLI Lead | lead@test.com | src: speedo-chat | Intent: …"

### Test C — Chat message event

```bash
curl -X POST https://automation.vergeo.company/webhook/vergeo-chat \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <WEBHOOK_SECRET>" \
  -d '{"body":{"event":"chat_message","sessionId":"test-session","leadName":"Tester","leadEmail":"lead@test.com","userMessage":"hello","assistantReply":"hi there","provider":"openrouter","ts":"2026-04-21T12:00:00Z"}}'
```

**Pass condition**: row appears in Supabase `chat_messages`.

---

## Old "Vergeo Chat Agent" workflow — archive it

That old workflow (`yM37j15yvqGNwxSf`) is still active and will compete for requests. Open it and toggle **Active OFF**, then **Archive** to keep the workspace clean.

---

## Final env var list (VERCEL ONLY — no OCI env vars needed)

Once both workflows use credentials, these are the only env vars you need on the Vercel side:

| Vercel env var | Value |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `SUPABASE_URL` | same as above |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service-role key |
| `OPENROUTER_API_KEY` | your OpenRouter key (**this fixes the "Speedo is offline" bug**) |
| `KIMI_API_KEY` | (optional fallback) |
| `OPENROUTER_MODEL` | `openai/gpt-4o-mini` |
| `N8N_INSTANT_CONNECT_WEBHOOK_URL` | `https://automation.vergeo.company/webhook/instant-connect` |
| `N8N_CHAT_WEBHOOK_URL` | `https://automation.vergeo.company/webhook/vergeo-chat` |
| `N8N_WEBHOOK_SECRET` | the raw secret stored in the `Vergeo Webhook Secret` credential (no "Bearer " prefix) |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | from emailjs.com |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | from emailjs.com |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | from emailjs.com |
| `NEXT_PUBLIC_SITE_URL` | `https://vergeo.company` |

**No OCI shell env vars. No n8n Environments UI. Just credentials.**
