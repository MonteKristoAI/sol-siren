import type { Metadata } from "next";
import Link from "next/link";
import { Search } from "lucide-react";
import Footer from "@/components/Footer";
import { getSearchIndex } from "@/lib/search-index";
import { searchItems, listingLine, imageAt, SEARCH_SUGGESTIONS } from "@/lib/search";

export const revalidate = 60;

// Results pages are for shoppers, not crawlers. Google indexing a thin
// "no results for X" page would compete with the shop and the product pages
// that are meant to rank.
export const metadata: Metadata = {
  title: "Search | Sol Siren Vintage",
  robots: { index: false, follow: true },
};

export default async function Page({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const q = (searchParams.q || "").trim();
  const items = await getSearchIndex();
  const { results, loose } = q ? searchItems(items, q) : { results: [], loose: false };

  return (
    <>
      <main className="bg-background pt-28 md:pt-32 min-h-[70vh]">
        <div className="mx-auto max-w-7xl px-6 md:px-16">
          <h1 className="font-display text-4xl md:text-5xl font-light tracking-wide text-foreground text-center">
            Search
          </h1>

          {/* A plain GET form, so search works with or without JavaScript. */}
          <form action="/search" className="mt-8 md:mt-10 mx-auto max-w-xl flex items-center gap-3 border border-border px-4 py-3">
            <Search size={18} className="shrink-0 text-muted-foreground" aria-hidden="true" />
            <input
              type="search"
              name="q"
              defaultValue={q}
              placeholder="Search by name, era, or material"
              aria-label="Search by name, era, or material"
              className="flex-1 bg-transparent font-body text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            <button
              type="submit"
              className="shrink-0 font-body text-[10px] tracking-ultra-wide uppercase text-foreground hover:opacity-70 transition-opacity"
            >
              Search
            </button>
          </form>

          {q && (
            <p className="mt-6 text-center font-body text-sm text-muted-foreground">
              {results.length === 0
                ? `Nothing matches “${q}”.`
                : loose
                  ? `Closest pieces to “${q}” — ${results.length} ${results.length === 1 ? "piece" : "pieces"}`
                  : `${results.length} ${results.length === 1 ? "piece" : "pieces"} for “${q}”`}
            </p>
          )}

          {!q && (
            <div className="mt-8 text-center">
              <p className="font-body text-sm text-muted-foreground">
                Type a piece&rsquo;s name, a material, or a decade.
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-2">
                {SEARCH_SUGGESTIONS.map((s) => (
                  <Link
                    key={s}
                    href={`/search?q=${encodeURIComponent(s)}`}
                    className="border border-border px-4 py-2 font-body text-xs tracking-wide uppercase text-foreground/70 hover:text-foreground hover:border-foreground transition-colors"
                  >
                    {s}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {q && results.length === 0 && (
            <div className="mt-8 text-center">
              <p className="font-body text-sm text-muted-foreground max-w-md mx-auto">
                Every piece is one of one, so a coat may already have found its next
                owner. Try a material like suede, a decade like 1970s, or browse the
                whole shop.
              </p>
              <Link
                href="/shop"
                className="mt-6 inline-block border border-foreground bg-foreground text-primary-foreground px-8 py-3 font-body text-[10px] tracking-ultra-wide uppercase hover:bg-foreground/90 transition-colors"
              >
                Browse the shop
              </Link>
            </div>
          )}

          {results.length > 0 && (
            <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-24 md:pb-32">
              {results.map((hit) => (
                <div key={hit.slug} className="group">
                  <Link
                    href={`/product/${hit.slug}`}
                    className={`relative aspect-[3/4] overflow-hidden border border-border bg-muted block ${hit.sold ? "opacity-75" : ""}`}
                  >
                    {hit.image ? (
                      <img
                        src={imageAt(hit.image, 700)}
                        alt={hit.title}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center">
                        <p className="font-display text-lg text-muted-foreground/60">
                          Photos coming soon
                        </p>
                      </div>
                    )}
                    {hit.sold && (
                      <div className="absolute top-4 left-4 bg-foreground text-primary-foreground font-body text-[10px] tracking-ultra-wide uppercase px-3 py-1.5">
                        Sold
                      </div>
                    )}
                  </Link>
                  <Link href={`/product/${hit.slug}`} className="block mt-4 space-y-1">
                    <h2 className="font-display text-lg font-light text-foreground hover:opacity-70 transition-opacity">
                      {hit.name}
                    </h2>
                    <p className="font-body text-xs tracking-wide text-muted-foreground">
                      {listingLine(hit.name, hit.title)}
                    </p>
                    <p className="font-body text-sm font-medium text-foreground">
                      ${hit.price}.00
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
