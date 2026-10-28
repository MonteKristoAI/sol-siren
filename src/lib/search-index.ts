// Builds the searchable catalogue. Server side only: it talks to Shopify and
// reads the local archive, then hands back a payload small enough to ship to
// the browser whole, which is what lets the nav overlay filter as you type
// without a request per keystroke.

import { getAllProducts, toUIProduct, mapCategory, type ShopifyProduct } from "@/lib/shopify";
import { archiveProducts } from "@/lib/archive-products";
import type { SearchItem } from "@/lib/search";

const CATEGORY_LABELS: Record<string, string> = {
  fur: "Fur",
  leather: "Leather",
  "penny-lane-afghan": "Penny Lane / Afghan",
  overcoat: "Overcoat",
  "apres-ski": "Apres Ski",
  jewelry: "Jewelry",
};

export function categoryLabel(slug: string): string {
  return CATEGORY_LABELS[slug] || slug.replace(/-/g, " ");
}

// Erin writes the useful words into spec lines near the end of a listing
// ("Material: Borg Fabric Faux Shearling", "Color: Brown/Chestnut"). Pulling
// just those lines keeps "chestnut" and "satin" findable without dragging the
// whole description, and its measurement tables, into the payload.
const SPEC_LINE =
  /(?:material|fabric|colou?r|estimated era|era|lining|closure|style|trim)\s*:\s*([^\n•]{1,80})/gi;

function specWords(description: string): string {
  if (!description) return "";
  const found: string[] = [];
  let m: RegExpExecArray | null;
  SPEC_LINE.lastIndex = 0;
  while ((m = SPEC_LINE.exec(description)) !== null) {
    found.push(m[1]);
    if (found.length >= 10) break;
  }
  return found.join(" ");
}

const ARCHIVE_TAGS = ["archive", "sold"];

function fromShopify(product: ShopifyProduct): SearchItem {
  const ui = toUIProduct(product);
  const category = mapCategory(product.productType);
  return {
    slug: ui.slug,
    name: ui.name,
    title: ui.variant,
    price: ui.price,
    image: ui.image,
    category,
    categoryLabel: categoryLabel(category),
    sold: ui.sold,
    keywords: [
      product.tags.join(" "),
      product.productType,
      product.vendor,
      specWords(product.description),
    ]
      .filter(Boolean)
      .join(" "),
  };
}

/**
 * Everything a shopper can land on: live pieces, pieces the admin has tagged
 * sold, and the older archive that never lived on Shopify. Sold pieces stay in
 * the index on purpose. Someone who saw a coat on Instagram and types its name
 * should find the piece and read that it is gone, not get an empty result.
 */
export async function getSearchIndex(): Promise<SearchItem[]> {
  let live: SearchItem[] = [];
  try {
    live = (await getAllProducts()).map(fromShopify);
  } catch {
    // Shopify down: the local archive alone still answers a name search.
    live = [];
  }

  const seen = new Set(live.map((i) => i.slug));
  const archived: SearchItem[] = archiveProducts
    .filter((p) => !seen.has(p.slug))
    .map((p) => ({
      slug: p.slug,
      name: p.name,
      title: p.variant,
      price: p.price,
      image: p.image,
      category: p.category,
      categoryLabel: categoryLabel(p.category),
      sold: true,
      keywords: specWords(p.description),
    }));

  return [...live, ...archived];
}

/** Flags a piece the admin pulled from the shop, so the UI can label it. */
export function isArchived(tags: string[]): boolean {
  return tags.some((t) => ARCHIVE_TAGS.includes(t.toLowerCase()));
}
