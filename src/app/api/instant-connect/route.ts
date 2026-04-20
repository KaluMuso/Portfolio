import { NextResponse } from "next/server";
import { sendN8nWebhook } from "@/lib/server/n8n-webhook";
import { rateLimit } from "@/lib/rate-limit";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function trimStr(v: unknown, max: number): string | null {
  if (typeof v !== "string") return null;
  const t = v.trim();
  if (!t) return null;
  return t.slice(0, max);
}

/**
 * POST body: { name?, email, message?, phone?, website? (honeypot) }
 * Forwards to n8n (N8N_INSTANT_CONNECT_WEBHOOK_URL). Configure n8n to send
 * Gmail + WAHA notifications to yourself using this JSON payload.
 */
export async function POST(req: Request) {
  // Rate limit: 5 messages per 10 minutes per IP.
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimit(`instant-connect:${ip}`, { limit: 5, windowMs: 10 * 60_000 })) {
    return NextResponse.json(
      { error: "Too many messages. Please wait a few minutes." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const raw = body as Record<string, unknown>;

  // Honeypot — hidden field.
  if (typeof raw.website === "string" && raw.website.trim() !== "") {
    return NextResponse.json({ ok: true }); // pretend success
  }

  const emailRaw = typeof raw.email === "string" ? raw.email.trim().toLowerCase() : "";
  if (!emailRaw || !EMAIL.test(emailRaw)) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }

  const webhookUrl = process.env.N8N_INSTANT_CONNECT_WEBHOOK_URL;
  const payload = {
    event: "instant_connect",
    name: trimStr(raw.name, 120),
    email: emailRaw.slice(0, 254),
    message: trimStr(raw.message, 4000),
    phone: trimStr(raw.phone, 40),
    source: "portfolio-instant-connect",
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? process.env.VERCEL_URL ?? null,
    ts: new Date().toISOString(),
  };

  const result = await sendN8nWebhook(webhookUrl, payload);

  if ("skipped" in result && result.skipped) {
    console.error("instant-connect: N8N_INSTANT_CONNECT_WEBHOOK_URL is not set");
    return NextResponse.json(
      { error: "Contact form is not configured on the server" },
      { status: 503 }
    );
  }

  if (!result.ok) {
    console.error("instant-connect: n8n webhook failed", result.error);
    return NextResponse.json(
      { error: "Could not deliver your message. Please try again or use WhatsApp." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
