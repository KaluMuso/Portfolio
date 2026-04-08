import { NextResponse } from "next/server";

// This forwards to your N8N webhook and returns the AI reply.
// N8N does the heavy lifting: AI agent, memory, WAHA mirror.

export async function POST(req: Request) {
  const { message, sessionId, history } = await req.json();

  if (!message) {
    return NextResponse.json({ error: "No message" }, { status: 400 });
  }

  try {
    const res = await fetch(process.env.N8N_CHAT_WEBHOOK_URL!, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, sessionId, history }),
    });

    const data = await res.json();
    // N8N workflow must return { reply: "..." }
    return NextResponse.json({ reply: data.reply });
  } catch {
    return NextResponse.json(
      { reply: "I'm having trouble right now. Please WhatsApp Kaluba directly." },
      { status: 200 } // Return 200 so the widget shows the fallback gracefully
    );
  }
}
