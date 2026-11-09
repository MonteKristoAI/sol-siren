"use client";

import { useCallback, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, GripVertical, Loader2, Star, X } from "lucide-react";
import { applyOrder, dropIndex, moveBy, moveItem, sameOrder, toFront } from "@/lib/admin/photo-order";

export type PhotoItem = {
  /** Stable identity: a Shopify media id on a saved piece, a local id before it is saved. */
  key: string;
  url: string;
  /** False while Shopify is still processing a freshly uploaded image. */
  ready?: boolean;
  label?: string;
};

/**
 * The photo order IS the gallery order on the listing: number 1 is the cover.
 * Order can be changed three ways, because one of them always suits the device
 * in hand: drag the grip, tap the arrows, or tap the star to make a cover.
 * Nothing here is hover-only, so every control is reachable on a touch screen.
 */
export default function PhotoOrderGrid({
  items,
  onReorder,
  onRemove,
  disabled,
  emptyHint = "No photos yet.",
}: {
  items: PhotoItem[];
  onReorder: (orderedKeys: string[]) => void;
  onRemove?: (key: string) => void;
  disabled?: boolean;
  emptyHint?: string;
}) {
  const gridRef = useRef<HTMLDivElement>(null);
  // While a drag is in flight the grid shows its own order, so the picture
  // follows the finger without a round trip to the server on every swap.
  const [preview, setPreview] = useState<string[] | null>(null);
  const drag = useRef<{ key: string; pointerId: number; startX: number; startY: number; moved: boolean } | null>(null);

  const shown = preview ? applyOrder(items, preview, (i) => i.key) : items;

  const commit = useCallback(
    (next: PhotoItem[]) => {
      const keys = next.map((i) => i.key);
      if (!sameOrder(keys, items.map((i) => i.key))) onReorder(keys);
    },
    [items, onReorder]
  );

  function tileRects() {
    const grid = gridRef.current;
    if (!grid) return [];
    return Array.from(grid.querySelectorAll<HTMLElement>("[data-photo-tile]")).map((el) => {
      const r = el.getBoundingClientRect();
      return { left: r.left, top: r.top, right: r.right, bottom: r.bottom };
    });
  }

  function onPointerDown(e: React.PointerEvent, key: string) {
    if (disabled) return;
    e.preventDefault();
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    drag.current = { key, pointerId: e.pointerId, startX: e.clientX, startY: e.clientY, moved: false };
  }

  function onPointerMove(e: React.PointerEvent) {
    const d = drag.current;
    if (!d || e.pointerId !== d.pointerId) return;
    if (!d.moved) {
      // A short press is a tap, not a drag. Wait for real travel first so the
      // grip can still be tapped without shuffling anything.
      if (Math.abs(e.clientX - d.startX) < 6 && Math.abs(e.clientY - d.startY) < 6) return;
      d.moved = true;
    }
    const order = shown.map((i) => i.key);
    const from = order.indexOf(d.key);
    if (from < 0) return;
    const to = dropIndex(tileRects(), e.clientX, e.clientY, from);
    if (to !== from) setPreview(moveItem(order, from, to));
  }

  function onPointerUp(e: React.PointerEvent) {
    const d = drag.current;
    if (!d || e.pointerId !== d.pointerId) return;
    drag.current = null;
    if (d.moved && preview) commit(applyOrder(items, preview, (i) => i.key));
    setPreview(null);
  }

  function onPointerCancel() {
    drag.current = null;
    setPreview(null);
  }

  if (!items.length) {
    return (
      <div className="rounded border border-dashed border-[#D8CBB4] bg-[#FAF7F1] px-4 py-6 text-center text-xs text-[#6f6554]">
        {emptyHint}
      </div>
    );
  }

  const dragKey = drag.current?.moved ? drag.current.key : null;

  return (
    <div>
      <div
        ref={gridRef}
        className="grid grid-cols-2 gap-2 min-[560px]:grid-cols-3 min-[820px]:grid-cols-4"
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
      >
        {shown.map((m, i) => (
          <div
            key={m.key}
            data-photo-tile
            data-photo-key={m.key}
            className={`overflow-hidden rounded border bg-[#F0E8D9] transition-shadow ${
              dragKey === m.key ? "border-[#1A1A1A] shadow-lg" : "border-[#E4DAC9]"
            }`}
          >
            <div className="relative aspect-[3/4]">
              {m.url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={m.url} alt={m.label || ""} draggable={false} className="h-full w-full select-none object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <Loader2 className="animate-spin text-[#b6a890]" size={16} />
                </div>
              )}
              {m.ready === false && m.url && (
                <span className="absolute inset-x-0 bottom-0 bg-black/50 py-0.5 text-center text-[10px] text-white">
                  processing
                </span>
              )}
              <span
                className={`absolute left-1 top-1 rounded px-1.5 py-0.5 text-[10px] font-medium ${
                  i === 0 ? "bg-[#1A1A1A]/85 text-[#F5EFE6]" : "bg-white/85 text-[#1A1A1A]"
                }`}
              >
                {i === 0 ? "1 · cover" : i + 1}
              </span>
              {onRemove && (
                <button
                  type="button"
                  onClick={() => onRemove(m.key)}
                  disabled={disabled}
                  aria-label={`Remove photo ${i + 1}`}
                  title="Remove this photo"
                  className="absolute right-1 top-1 flex h-7 w-7 items-center justify-center rounded-full bg-black/55 text-white hover:bg-black/80 disabled:opacity-40"
                >
                  <X size={13} />
                </button>
              )}
            </div>
            <div className="flex items-stretch border-t border-[#E4DAC9] bg-white">
              <TileButton
                label={`Make photo ${i + 1} the cover`}
                title="Make cover"
                disabled={disabled || i === 0}
                onClick={() => commit(toFront(shown, i))}
              >
                <Star size={14} />
              </TileButton>
              <TileButton
                label={`Move photo ${i + 1} earlier`}
                title="Move earlier"
                disabled={disabled || i === 0}
                onClick={() => commit(moveBy(shown, i, -1))}
              >
                <ChevronLeft size={15} />
              </TileButton>
              <button
                type="button"
                aria-label={`Drag photo ${i + 1} to reorder`}
                title="Drag to reorder"
                disabled={disabled}
                onPointerDown={(e) => onPointerDown(e, m.key)}
                className="flex h-10 flex-1 touch-none cursor-grab items-center justify-center border-l border-[#E4DAC9] text-[#6f6554] hover:bg-[#F5EFE6] active:cursor-grabbing disabled:opacity-40"
              >
                <GripVertical size={14} />
              </button>
              <TileButton
                label={`Move photo ${i + 1} later`}
                title="Move later"
                disabled={disabled || i === shown.length - 1}
                onClick={() => commit(moveBy(shown, i, 1))}
              >
                <ChevronRight size={15} />
              </TileButton>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-1.5 text-[11px] text-[#6f6554]">
        Photo 1 is the cover. Drag the <GripVertical size={11} className="inline align-[-1px]" /> to move a photo, or use the
        arrows. The star makes a photo the cover.
      </p>
    </div>
  );
}

function TileButton({
  label,
  title,
  disabled,
  onClick,
  children,
}: {
  label: string;
  title: string;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={title}
      disabled={disabled}
      onClick={onClick}
      className="flex h-10 flex-1 items-center justify-center border-l border-[#E4DAC9] text-[#5a5246] first:border-l-0 hover:bg-[#F5EFE6] disabled:opacity-30"
    >
      {children}
    </button>
  );
}
