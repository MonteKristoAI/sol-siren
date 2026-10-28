"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, X, Loader2 } from "lucide-react";
import { searchItems, listingLine, imageAt, SEARCH_SUGGESTIONS, type SearchItem } from "@/lib/search";

const OVERLAY_LIMIT = 8;

// The whole catalogue, kept here so reopening search is instant. It is the same
// payload the /search page renders from, and it expires on the same 60 seconds
// the server caches it for: a long-lived tab must not keep offering a coat that
// sold half an hour ago.
const INDEX_TTL_MS = 60_000;
let cachedIndex: SearchItem[] | null = null;
let cachedAt = 0;
let inFlight: Promise<SearchItem[]> | null = null;

function indexIsFresh(): boolean {
  return cachedIndex !== null && Date.now() - cachedAt < INDEX_TTL_MS;
}

async function loadIndex(): Promise<SearchItem[]> {
  if (indexIsFresh()) return cachedIndex as SearchItem[];
  if (!inFlight) {
    inFlight = fetch("/api/search")
      .then((r) => {
        if (!r.ok) throw new Error(`search index ${r.status}`);
        return r.json();
      })
      .then((data: { items: SearchItem[] }) => {
        cachedIndex = data.items || [];
        cachedAt = Date.now();
        return cachedIndex;
      })
      .finally(() => {
        inFlight = null;
      });
  }
  return inFlight;
}

const SearchOverlay = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<SearchItem[] | null>(() => (indexIsFresh() ? cachedIndex : null));
  const [failed, setFailed] = useState(false);
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Pull the catalogue when search is opened, not on every page load, and pull
  // it again if the copy in hand has gone stale.
  useEffect(() => {
    if (!open || (items && indexIsFresh())) return;
    let alive = true;
    loadIndex()
      .then((loaded) => alive && setItems(loaded))
      .catch(() => alive && setFailed(true));
    return () => {
      alive = false;
    };
  }, [open, items]);

  // Hold the page still while the overlay is up.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const outcome = useMemo(
    () => searchItems(items || [], query, OVERLAY_LIMIT),
    [items, query],
  );
  const total = useMemo(
    () => (query.trim() ? searchItems(items || [], query).results.length : 0),
    [items, query],
  );

  useEffect(() => {
    setActive(0);
  }, [query]);

  const close = useCallback(() => {
    setQuery("");
    setActive(0);
    onClose();
  }, [onClose]);

  const goToAll = useCallback(() => {
    const q = query.trim();
    if (!q) return;
    close();
    router.push(`/search?q=${encodeURIComponent(q)}`);
  }, [query, close, router]);

  // Bound to the document, not the input. Escape has to close the overlay from
  // wherever focus happens to be, including after a suggestion chip was clicked.
  useEffect(() => {
    if (!open) return;
    const results = outcome.results;

    const onKey = (e: KeyboardEvent) => {
      // aria-modal says the rest of the page is out of reach, so Tab has to
      // stay inside the panel rather than walking the nav behind it.
      if (e.key === "Tab") {
        const panel = panelRef.current;
        if (!panel) return;
        const focusable = Array.from(
          panel.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
          ),
        ).filter((el) => el.offsetParent !== null);
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const current = document.activeElement as HTMLElement | null;
        if (!current || !panel.contains(current)) {
          e.preventDefault();
          first.focus();
        } else if (e.shiftKey && current === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && current === last) {
          e.preventDefault();
          first.focus();
        }
        return;
      }
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((i) => (results.length ? (i + 1) % results.length : 0));
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((i) => (results.length ? (i - 1 + results.length) % results.length : 0));
        return;
      }
      if (e.key === "Enter") {
        // Let a focused chip or the "view all" button do its own job.
        const tag = (e.target as HTMLElement | null)?.tagName;
        if (tag === "BUTTON" || tag === "A") return;
        e.preventDefault();
        const hit = results[active];
        if (hit) {
          close();
          router.push(`/product/${hit.slug}`);
        } else {
          goToAll();
        }
      }
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, outcome.results, active, close, goToAll, router]);

  const results = outcome.results;
  const typed = query.trim().length > 0;

  if (!open) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[70] bg-foreground/30 backdrop-blur-sm"
      onClick={close}
      role="presentation"
    >
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        ref={panelRef}
        className="relative z-[75] mx-auto mt-0 md:mt-24 w-full md:max-w-2xl bg-background border-b md:border border-border max-h-[100dvh] md:max-h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Search the collection"
      >
        {/* Input row */}
        <div className="flex items-center gap-3 px-5 md:px-6 py-4 border-b border-border">
          <Search size={18} className="shrink-0 text-muted-foreground" aria-hidden="true" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            placeholder="Search by name, era, or material"
            aria-label="Search by name, era, or material"
            role="combobox"
            aria-expanded={results.length > 0}
            aria-controls="search-overlay-list"
            aria-activedescendant={results.length > 0 ? `search-option-${active}` : undefined}
            autoComplete="off"
            className="flex-1 bg-transparent font-body text-base md:text-lg text-foreground placeholder:text-muted-foreground focus:outline-none [&::-webkit-search-cancel-button]:hidden"
          />
          <button
            onClick={close}
            aria-label="Close search"
            className="shrink-0 -mr-1 p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Results */}
        <div className="overflow-y-auto overscroll-contain">
          {!typed && (
            <div className="px-5 md:px-6 py-6">
              <p className="font-body text-[11px] tracking-ultra-wide uppercase text-muted-foreground">
                Try
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {SEARCH_SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setQuery(s);
                      inputRef.current?.focus();
                    }}
                    className="border border-border px-4 py-2 font-body text-xs tracking-wide uppercase text-foreground/70 hover:text-foreground hover:border-foreground transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {typed && !items && !failed && (
            <div className="flex items-center gap-2 px-5 md:px-6 py-8 font-body text-sm text-muted-foreground">
              <Loader2 size={16} className="animate-spin" aria-hidden="true" />
              Loading the collection
            </div>
          )}

          {typed && failed && (
            <div className="px-5 md:px-6 py-8">
              <p className="font-body text-sm text-foreground">
                Search is not loading right now.
              </p>
              <Link
                href="/shop"
                onClick={close}
                className="mt-3 inline-block font-body text-xs tracking-ultra-wide uppercase text-foreground underline underline-offset-4"
              >
                Browse the full shop
              </Link>
            </div>
          )}

          {typed && items && results.length === 0 && (
            <div className="px-5 md:px-6 py-8">
              <p className="font-body text-sm text-foreground">
                Nothing matches &ldquo;{query.trim()}&rdquo;.
              </p>
              <p className="mt-2 font-body text-sm text-muted-foreground">
                Every piece is one of one, so a coat may already be gone. Try a material
                like suede, a decade like 1970s, or browse the shop.
              </p>
              <Link
                href="/shop"
                onClick={close}
                className="mt-4 inline-block font-body text-xs tracking-ultra-wide uppercase text-foreground underline underline-offset-4"
              >
                Browse the full shop
              </Link>
            </div>
          )}

          <p className="sr-only" role="status" aria-live="polite">
            {typed && items
              ? results.length === 0
                ? "No pieces match"
                : `${results.length} ${results.length === 1 ? "piece" : "pieces"} found`
              : ""}
          </p>

          {typed && results.length > 0 && (
            <>
              {outcome.loose && (
                <p className="px-5 md:px-6 pt-4 font-body text-[11px] tracking-ultra-wide uppercase text-muted-foreground">
                  Closest pieces
                </p>
              )}
              {/* A listbox's children have to be the options themselves, so the
                  links sit directly inside it with no <li> in between. */}
              {/* A listbox's children have to be the options themselves, so the
                  links sit directly inside it with no <li> in between. */}
              <div id="search-overlay-list" role="listbox" aria-label="Search results" className="py-2">
                {results.map((hit, i) => (
                  <Link
                    key={hit.slug}
                    href={`/product/${hit.slug}`}
                    id={`search-option-${i}`}
                    role="option"
                    aria-selected={i === active}
                    onClick={close}
                    onMouseEnter={() => setActive(i)}
                    className={`flex items-center gap-4 px-5 md:px-6 py-3 transition-colors ${
                      i === active ? "bg-muted/60" : "hover:bg-muted/40"
                    }`}
                  >
                    <span className="shrink-0 w-12 h-16 bg-muted overflow-hidden border border-border">
                      {hit.image ? (
                        <img
                          src={imageAt(hit.image, 160)}
                          alt=""
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : null}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-baseline gap-2">
                        <span className="font-display text-base font-light text-foreground truncate">
                          {hit.name}
                        </span>
                        {hit.sold && (
                          <span className="shrink-0 font-body text-[9px] tracking-ultra-wide uppercase text-muted-foreground border border-border px-1.5 py-0.5">
                            Sold
                          </span>
                        )}
                      </span>
                      <span className="block font-body text-xs text-muted-foreground truncate">
                        {listingLine(hit.name, hit.title)}
                      </span>
                    </span>
                    <span className="shrink-0 font-body text-sm text-foreground">
                      ${hit.price}.00
                    </span>
                  </Link>
                ))}
              </div>
              {total > results.length && (
                <button
                  onClick={goToAll}
                  className="w-full border-t border-border px-5 md:px-6 py-4 text-left font-body text-xs tracking-ultra-wide uppercase text-foreground hover:bg-muted/40 transition-colors"
                >
                  View all {total} results
                </button>
              )}
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SearchOverlay;
