function n8nHeaders(): Record<string, string> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  const secret = process.env.N8N_WEBHOOK_SECRET;
  if (secret) headers.Authorization = `Bearer ${secret}`;
  return headers;
}

/**
 * Fire-and-forget POST to n8n (or any receiver). Never throws.
 */
export function postN8nWebhook(payload: Record<string, unknown>): void {
  const url = process.env.N8N_CHAT_WEBHOOK_URL;
  if (!url) return;

  void fetch(url, {
    method: "POST",
    headers: n8nHeaders(),
    body: JSON.stringify(payload),
  }).catch(() => {});
}

/**
 * Awaited POST for user-facing flows (e.g. contact forms). Use with
 * N8N_INSTANT_CONNECT_WEBHOOK_URL — workflow can branch to Gmail + WAHA.
 */
export async function sendN8nWebhook(
  url: string | undefined,
  payload: Record<string, unknown>
): Promise<
  { ok: true } | { ok: false; skipped: true } | { ok: false; skipped: false; error: string }
> {
  const trimmed = url?.trim();
  if (!trimmed) return { ok: false, skipped: true };

  try {
    const res = await fetch(trimmed, {
      method: "POST",
      headers: n8nHeaders(),
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      return {
        ok: false,
        skipped: false,
        error: `Webhook returned ${res.status}`,
      };
    }
    return { ok: true };
  } catch {
    return { ok: false, skipped: false, error: "Webhook request failed" };
  }
}
