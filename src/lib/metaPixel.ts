// Meta (Facebook) Pixel helper.
//
// Safe to import anywhere — every function no-ops on the server and when the
// pixel stub hasn't loaded yet (missing ID, ad-blocker, SSR). Events fired a
// beat before the base snippet finishes loading are queued and flushed once
// `fbq` is available, so ViewContent / AddToCart never get dropped on first
// paint.

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fbq?: (...args: any[]) => void;
    _fbq?: unknown;
  }
}

export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

function ready(): boolean {
  return typeof window !== "undefined" && typeof window.fbq === "function";
}

// Minimal pending queue: protects the exact events Meta flagged as missing
// (ViewContent / AddToCart) against a race with the afterInteractive loader.
const pending: Array<() => void> = [];
let flushTimer: ReturnType<typeof setInterval> | null = null;

function run(fn: () => void): void {
  if (typeof window === "undefined") return;
  if (ready()) {
    fn();
    return;
  }
  pending.push(fn);
  if (flushTimer) return;

  let waited = 0;
  flushTimer = setInterval(() => {
    waited += 200;
    if (ready()) {
      pending.splice(0).forEach((f) => f());
      clearInterval(flushTimer!);
      flushTimer = null;
    } else if (waited >= 5000) {
      // Pixel never loaded (blocked / not configured) — drop the queue.
      pending.length = 0;
      clearInterval(flushTimer!);
      flushTimer = null;
    }
  }, 200);
}

/**
 * Fire a standard PageView. Called once by the base snippet on initial load
 * and again on every client-side route change.
 */
export function pageview(): void {
  run(() => window.fbq!("track", "PageView"));
}

/** Fire any standard or custom Meta event with optional parameters. */
export function event(
  name: string,
  options: Record<string, unknown> = {},
): void {
  run(() => window.fbq!("track", name, options));
}

/**
 * Shopify Storefront IDs are GIDs ("gid://shopify/ProductVariant/123").
 * Meta catalog content_ids are plain values, so reduce a GID to its trailing
 * id. Pass-through for values that are already plain.
 */
export function gidToId(gid: string | undefined | null): string {
  if (!gid) return "";
  const tail = gid.split("/").pop() || gid;
  return tail.split("?")[0];
}
