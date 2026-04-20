import { NextResponse } from "next/server";
import { postN8nWebhook } from "@/lib/server/n8n-webhook";
import { rateLimit } from "@/lib/rate-limit";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimit(`chat-lead:${ip}`, { limit: 10, windowMs: 10 * 60_000 })) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { sessionId, name, email } = body as {
    sessionId?: string;
    name?: string;
    email?: string;
  };

  if (!email || !EMAIL.test(email.trim())) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }

  postN8nWebhook({
    event: "lead_qualified",
    sessionId: sessionId ?? null,
    name: typeof name === "string" ? name.trim().slice(0, 120) : null,
    email: email.trim().toLowerCase().slice(0, 254),
    source: "speedo-chat",
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? process.env.VERCEL_URL ?? null,
    ts: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
