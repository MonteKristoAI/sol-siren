// Pure ordering helpers for the admin photo grids.
//
// Photo order is the gallery order on the live listing: position 1 is the cover
// (Shopify's featuredImage) and the rest follow in this exact sequence. The UI
// never mutates an array in place, so React always sees a new reference.

/** Move the item at `from` so it lands at `to`. Out-of-range input is a no-op. */
export function moveItem<T>(list: T[], from: number, to: number): T[] {
  if (from === to) return list;
  if (from < 0 || from >= list.length) return list;
  if (to < 0 || to >= list.length) return list;
  const next = list.slice();
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

/** Nudge one item earlier (-1) or later (+1). Stops at the ends. */
export function moveBy<T>(list: T[], index: number, delta: number): T[] {
  return moveItem(list, index, index + delta);
}

/** Make the item at `index` the cover, keeping everything else in order. */
export function toFront<T>(list: T[], index: number): T[] {
  return moveItem(list, index, 0);
}

/** True when both lists hold the same keys in the same sequence. */
export function sameOrder(a: readonly string[], b: readonly string[]): boolean {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
  return true;
}

/**
 * Reorder `list` to follow `keys`. Anything in `list` that `keys` does not
 * mention keeps its relative order and is appended, so a photo that arrived
 * while a drag was in flight is never dropped.
 */
export function applyOrder<T>(list: T[], keys: readonly string[], keyOf: (item: T) => string): T[] {
  const byKey = new Map(list.map((item) => [keyOf(item), item]));
  const out: T[] = [];
  for (const k of keys) {
    const item = byKey.get(k);
    if (item !== undefined) {
      out.push(item);
      byKey.delete(k);
    }
  }
  for (const item of list) if (byKey.has(keyOf(item))) out.push(item);
  return out;
}

/**
 * Index the dragged item should take, given the pointer position and the
 * on-screen rectangles of the tiles. Each tile claims the pointer once it is
 * past the tile's centre, which is what makes a drag feel like it swaps.
 */
export function dropIndex(
  rects: readonly { left: number; top: number; right: number; bottom: number }[],
  x: number,
  y: number,
  fallback: number
): number {
  for (let i = 0; i < rects.length; i++) {
    const r = rects[i];
    if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) return i;
  }
  // Outside every tile: pick the nearest centre, so a drag into the grid's
  // padding still resolves instead of snapping back.
  let best = fallback;
  let bestDist = Infinity;
  for (let i = 0; i < rects.length; i++) {
    const r = rects[i];
    const cx = (r.left + r.right) / 2;
    const cy = (r.top + r.bottom) / 2;
    const d = (cx - x) ** 2 + (cy - y) ** 2;
    if (d < bestDist) {
      bestDist = d;
      best = i;
    }
  }
  return best;
}
