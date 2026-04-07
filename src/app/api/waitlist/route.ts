import { NextResponse } from "next/server";
// Using Supabase since you already know that stack
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Only create the client if the environment variables exist
const supabase = (supabaseUrl && supabaseServiceKey) 
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null;

export async function POST(req: Request) {
  if (!supabase) {
    return NextResponse.json({ error: "Supabase is not configured" }, { status: 500 });
  }

  try {
    const body = await req.json();
    const { name, email, businessType } = body;

    if (!name || !email) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const { error } = await supabase
      .from("waitlist")
      .insert([{ name, email, business_type: businessType }]);

    if (error) {
      // Duplicate email — treat as success to avoid enumeration
      if (error.code === "23505") {
        return NextResponse.json({ success: true, message: "Already on list" });
      }
      return NextResponse.json({ error: "Insert failed", details: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
