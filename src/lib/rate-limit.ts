/**
 * Minimal in-memory rate limiter. Good enough for low-volume public forms.
 * For higher throughput or multi-instance deployments, swap for
 * @upstash/ratelimit backed by Redis.
 *
 * Returns `true` when the request should be **rejected** (over limit),
 * `false` when it should proceed.
 *
 * Note: on Vercel each serverless invocation may use a fresh module instance,
 * so this limiter only meaningfully throttles bursts that hit the same warm
 * instance. It does stop obvious abusers hammering from a single IP, but it
 * is NOT a security boundary.
 */
type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

export function rateLimit(
  key: string,
  { limit, windowMs }: { limit: number; windowMs: number }
): boolean {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }

  if (bucket.count >= limit) return true;
  bucket.count += 1;
  return false;
}

/**
 * Occasional sweep so the Map doesn't grow unboundedly over a long-running
 * process. Called opportunistically.
 */
export function sweepRateLimit() {
  const now = Date.now();
  for (const [k, b] of buckets.entries()) {
    if (b.resetAt < now) buckets.delete(k);
  }
}
