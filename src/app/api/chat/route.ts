import { NextResponse } from "next/server";

const KIMI_API_URL = "https://api.moonshot.cn/v1/chat/completions";
const KIMI_MODEL = "moonshot-v1-8k";

const SYSTEM_PROMPT = `You are Speedo, the friendly and knowledgeable AI assistant for Vergeo Group — a full-stack web development and automation agency based in Lusaka, Zambia.

Your role is to:
1. Answer questions about Vergeo Group's services, pricing, and project timelines
2. Help visitors understand what Vergeo can build for them
3. Pre-qualify leads and gather project details
4. Route complex or unsatisfied queries to WhatsApp (+260 761 359 005)

Key information about Vergeo Group:
- Founded by Kaluba Prosper Musonda in Lusaka, Zambia
- Services: Web Development (from $75), Workflow Automation (from $120/mo), UI/UX Design (from $120), SEO (from $60), Branding (from $80), AI Agent Consultation (from $200), E-Commerce (from $350)
- No project takes longer than 2 weeks
- Replies within 2 hours
- Contact: vergeosales@gmail.com | WhatsApp: +260 761 359 005
- Convergeo is Vergeo's upcoming multivendor marketplace for Zambia, launching 7th July 2026
- Admin panel available at admin.vergeo.company for clients

Web dev pricing ranges:
- SPA: from $75 | PWA: from $150 | E-commerce: from $350 | SaaS: from $700
- Add-ons: Maps +$80, Chatbot +$120, Auth +$90, Payments +$110, Blog +$100, Admin dashboard +$200

Workflow automation:
- Starter: $120/mo | Business: $350/mo | Enterprise: $800/mo
- Monthly maintenance available as add-on

Always be warm, concise, and professional. If you don't know something specific, say "I'll connect you with Kaluba directly" and provide the WhatsApp link. Never make up prices or timelines beyond what's listed above.`;

export async function POST(req: Request) {
  const { message, sessionId, leadName, leadEmail, history } = await req.json();

  if (!message) {
    return NextResponse.json({ error: "No message" }, { status: 400 });
  }

  const apiKey = process.env.KIMI_API_KEY;

  if (!apiKey) {
    return NextResponse.json({
      reply: "I'm currently in setup mode. Please WhatsApp Kaluba directly at +260 761 359 005 for immediate assistance.",
    });
  }

  try {
    const contextNote = leadName
      ? `[Context: Speaking with ${leadName}${leadEmail ? ` (${leadEmail})` : ""}]`
      : "";

    const chatHistory = (history as { role: string; content: string }[] || [])
      .slice(-8)
      .map((m) => ({ role: m.role as "user" | "assistant", content: m.content }));

    const res = await fetch(KIMI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: KIMI_MODEL,
        messages: [
          { role: "system", content: SYSTEM_PROMPT + (contextNote ? `\n\n${contextNote}` : "") },
          ...chatHistory,
          { role: "user", content: message },
        ],
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

    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content || "I couldn't generate a response. Please try again.";

    return NextResponse.json({ reply, sessionId });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({
      reply: "I'm having some trouble right now. Please reach Kaluba directly on WhatsApp: +260 761 359 005 or email vergeosales@gmail.com",
    });
  }
}
