import { NextResponse } from "next/server";
import { postN8nWebhook } from "@/lib/server/n8n-webhook";
import { rateLimit } from "@/lib/rate-limit";

const KIMI_API_URL = "https://api.moonshot.cn/v1/chat/completions";
const KIMI_MODEL = process.env.KIMI_MODEL ?? "moonshot-v1-8k";
const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const OPENROUTER_MODEL = process.env.OPENROUTER_MODEL ?? "openai/gpt-4o-mini";
const MAX_MESSAGE_CHARS = 4000;
const MAX_HISTORY = 8;

const SYSTEM_PROMPT = `You are Speedo, the friendly and knowledgeable AI assistant for Vergeo Group — a full-stack web development and automation agency based in Lusaka, Zambia.

Your role is to:
1. Answer questions about Vergeo Group's services, pricing, and project timelines
2. Help visitors understand what Vergeo can build for them
3. Pre-qualify leads and gather project details
4. Route complex or unsatisfied queries to WhatsApp (+260 761 359 005)

Key information about Vergeo Group:
- Founded by Kaluba Prosper Musonda in Lusaka, Zambia
- Services: Web Development (from $75), Workflow Automation (from $120/mo), UI/UX Design (from $120), SEO (from $60), Branding (from $80), AI Agent Consultation — consultation, workshops & training (from $200), E-Commerce (from $350)
- No project takes longer than 2 weeks
- Replies within 2 hours
- Contact: info@vergeo.company | WhatsApp: +260 761 359 005
- Convergeo is Vergeo's upcoming multivendor marketplace for Zambia, launching 7th July 2026
- Admin panel available at admin.vergeo.company for clients

Web dev pricing ranges:
- SPA: from $75 | PWA: from $150 | E-commerce: from $350 | SaaS: from $700
- Add-ons: Maps +$80, Chatbot +$120, Auth +$90, Payments +$110, Blog +$100, Admin dashboard +$200

Workflow automation:
- Starter: $120/mo | Business: $350/mo | Enterprise: $800/mo
- Monthly maintenance available as add-on

Always be warm, concise, and professional. If you don't know something specific, say "I'll connect you with Kaluba directly" and provide the WhatsApp link. Never make up prices or timelines beyond what's listed above.`;

type ChatMsg = { role: "user" | "assistant" | "system"; content: string };

function resolveProvider(): "openrouter" | "kimi" | null {
  const prefer = process.env.CHAT_PROVIDER?.toLowerCase();
  const hasOr = !!process.env.OPENROUTER_API_KEY;
  const hasKimi = !!process.env.KIMI_API_KEY;
  if (prefer === "kimi" && hasKimi) return "kimi";
  if (prefer === "openrouter" && hasOr) return "openrouter";
  if (hasOr) return "openrouter";
  if (hasKimi) return "kimi";
  return null;
}

function openRouterReferer(): string {
  const u = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (u) return u.startsWith("http") ? u : `https://${u}`;
  const v = process.env.VERCEL_URL?.trim();
  if (v) return `https://${v}`;
  return "https://vergeo.company";
}

async function completeOpenRouter(messages: ChatMsg[], apiKey: string): Promise<string> {
  const res = await fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      "HTTP-Referer": openRouterReferer(),
      "X-Title": "Vergeo Speedo Chat",
    },
    body: JSON.stringify({
      model: OPENROUTER_MODEL,
      messages,
      temperature: 0.7,
      max_tokens: 512,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("OpenRouter API error:", err);
    throw new Error("OpenRouter API returned non-OK status");
  }

  const data = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  return data.choices?.[0]?.message?.content ?? "I couldn't generate a response. Please try again.";
}

async function completeKimi(messages: ChatMsg[], apiKey: string): Promise<string> {
  const res = await fetch(KIMI_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: KIMI_MODEL,
      messages,
      temperature: 0.7,
      max_tokens: 512,
      stream: false,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("Kimi API error:", err);
    throw new Error("Kimi API returned non-OK status");
  }

  const data = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  return data.choices?.[0]?.message?.content ?? "I couldn't generate a response. Please try again.";
}

export async function POST(req: Request) {
  // Rate limit: 30 messages per minute per IP. Protects OpenRouter/Kimi spend.
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimit(`chat:${ip}`, { limit: 30, windowMs: 60_000 })) {
    return NextResponse.json(
      { reply: "Please slow down — you've sent a lot of messages. Try again in a minute." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { message, sessionId, leadName, leadEmail, history } = body as {
    message?: string;
    sessionId?: string;
    leadName?: string;
    leadEmail?: string;
    history?: { role: string; content: string }[];
  };

  if (!message || typeof message !== "string") {
    return NextResponse.json({ error: "No message" }, { status: 400 });
  }

  const trimmed = message.trim().slice(0, MAX_MESSAGE_CHARS);
  if (!trimmed) {
    return NextResponse.json({ error: "Empty message" }, { status: 400 });
  }

  const provider = resolveProvider();

  if (!provider) {
    return NextResponse.json({
      reply:
        "I'm currently in setup mode. Please WhatsApp Kaluba directly at +260 761 359 005 for immediate assistance.",
    });
  }

  const contextNote = leadName
    ? `[Context: Speaking with ${leadName}${leadEmail ? ` (${leadEmail})` : ""}]`
    : "";

  const chatHistory: ChatMsg[] = (history ?? [])
    .slice(-MAX_HISTORY)
    .filter((m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .map((m) => ({
      role: m.role as "user" | "assistant",
      content: String(m.content).slice(0, MAX_MESSAGE_CHARS),
    }));

  const messages: ChatMsg[] = [
    { role: "system", content: SYSTEM_PROMPT + (contextNote ? `\n\n${contextNote}` : "") },
    ...chatHistory,
    { role: "user", content: trimmed },
  ];

  try {
    const apiKey =
      provider === "openrouter" ? process.env.OPENROUTER_API_KEY! : process.env.KIMI_API_KEY!;
    const reply =
      provider === "openrouter"
        ? await completeOpenRouter(messages, apiKey)
        : await completeKimi(messages, apiKey);

    postN8nWebhook({
      event: "chat_message",
      sessionId: sessionId ?? null,
      leadName: leadName ?? null,
      leadEmail: leadEmail ?? null,
      userMessage: trimmed,
      assistantReply: reply.slice(0, 8000),
      provider,
      ts: new Date().toISOString(),
    });

    return NextResponse.json({ reply, sessionId });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({
      reply:
        "I'm having some trouble right now. Please reach Kaluba directly on WhatsApp: +260 761 359 005 or email info@vergeo.company",
    });
  }
}
