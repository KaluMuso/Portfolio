import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  // Rate limit by IP: 5 signups per 10 minutes per IP.
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimit(`waitlist:${ip}`, { limit: 5, windowMs: 10 * 60_000 })) {
    return NextResponse.json(
      { error: "Too many requests. Please try again shortly." },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot — a hidden form field that real users never fill.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ success: true }); // pretend success
  }

  const { name, companyName, industry, email, phone, whatsapp, district } = body as {
    name?: string;
    companyName?: string;
    industry?: string;
    email?: string;
    phone?: string;
    whatsapp?: string;
    district?: string;
  };

  if (!name || !email || !phone) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: "Supabase is not configured" }, { status: 500 });
  }

  const supabase = createAdminClient();
  const { error } = await supabase
    .from("waitlist")
    .insert([{
      name,
      company_name: companyName,
      industry,
      email,
      phone,
      whatsapp,
      district,
    }]);

  if (error) {
    console.error("Supabase insert error:", error);
    if (error.code === "23505") {
      return NextResponse.json({ success: true, message: "Already on list" });
    }
    return NextResponse.json({ error: "Insert failed", details: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
