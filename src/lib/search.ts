// Storefront search. Pure scoring logic, no I/O, so it runs identically on the
// server (the /search page) and in the browser (the nav overlay).
//
// The catalogue is small (around 60 one-of-one pieces), so there is no search
// engine here and no need for one. Every piece carries its own era, material
// and colour in the title Erin writes, which is what shoppers actually type:
// a name ("Tallulah"), a material ("shearling"), a decade ("70s"), a style
// ("penny lane"). Those four cases drive the weights below.

export type SearchItem = {
  slug: string;
  name: string;
  title: string;
  price: number;
  image: string;
  category: string;
  categoryLabel: string;
  sold: boolean;
  /** Era / material / colour words pulled from tags and the listing's spec lines. */
  keywords: string;
};

export type SearchHit = SearchItem & { score: number };

export type SearchOutcome = {
  results: SearchHit[];
  /** True when nothing matched every word and we fell back to partial matches. */
  loose: boolean;
};

/**
 * Lowercase, drop diacritics and punctuation. "Après" and "apres" must be the
 * same word, and "60's" has to survive as "60s" rather than splitting into
 * "60" and "s".
 */
export function normalize(input: string): string {
  return (input || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/['’`]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function tokenize(query: string): string[] {
  return normalize(query).split(" ").filter(Boolean);
}

// Words shoppers use that the listings do not. Decades are the big one: the
// titles say "1970s" and almost nobody types that.
const ALIASES: Record<string, string[]> = {
  "40s": ["1940s"],
  "50s": ["1950s"],
  "60s": ["1960s"],
  "70s": ["1970s"],
  "80s": ["1980s"],
  "90s": ["1990s"],
  forties: ["1940s"],
  fifties: ["1950s"],
  sixties: ["1960s"],
  seventies: ["1970s"],
  eighties: ["1980s"],
  nineties: ["1990s"],
  jewellery: ["jewelry"],
  necklace: ["necklace", "chain", "pendant"],
  pendant: ["necklace", "disc", "tag"],
  sheepskin: ["shearling"],
  shearling: ["shearling", "sherpa", "borg"],
  gold: ["gold", "14k"],
  "14k": ["gold"],
  afghan: ["afghan", "penny"],
  pennylane: ["penny", "lane"],
};

/** Every form of a token worth testing: the token, its aliases, and its singular. */
function variants(token: string): string[] {
  const out = [token, ...(ALIASES[token] || [])];
  // Generic plural, so "coats", "jackets" and "necklaces" need no alias entry.
  if (token.length > 3 && token.endsWith("s") && !/\ds$/.test(token)) {
    out.push(token.slice(0, -1));
  }
  return Array.from(new Set(out));
}

// The piece's own name beats everything: someone typing "TALLULAH" wants that
// coat, not the twelve other listings with "suede" in them.
const WEIGHT = {
  nameWhole: 120,
  nameWord: 100,
  namePrefix: 70,
  nameLoose: 45,
  titleWord: 30,
  titlePrefix: 26,
  titleLoose: 14,
  categoryWord: 22,
  categoryPrefix: 20,
  keywordWord: 18,
  keywordPrefix: 16,
};

function fieldScore(
  haystack: string,
  token: string,
  exact: number,
  prefix: number,
  loose: number,
): number {
  if (!haystack) return 0;
  const words = haystack.split(" ");
  if (words.includes(token)) return exact;
  if (words.some((w) => w.startsWith(token))) return prefix;
  if (loose && haystack.includes(token)) return loose;
  return 0;
}

type Prepared = {
  item: SearchItem;
  name: string;
  title: string;
  category: string;
  keywords: string;
};

function prepare(item: SearchItem): Prepared {
  return {
    item,
    name: normalize(item.name),
    title: normalize(item.title),
    category: normalize(item.categoryLabel + " " + item.category),
    keywords: normalize(item.keywords),
  };
}

/** Best score any single field gives this token. 0 means the token is absent. */
function scoreToken(p: Prepared, token: string): number {
  let best = 0;
  for (const v of variants(token)) {
    if (p.name === v) best = Math.max(best, WEIGHT.nameWhole);
    best = Math.max(best, fieldScore(p.name, v, WEIGHT.nameWord, WEIGHT.namePrefix, WEIGHT.nameLoose));
    best = Math.max(best, fieldScore(p.title, v, WEIGHT.titleWord, WEIGHT.titlePrefix, WEIGHT.titleLoose));
    best = Math.max(best, fieldScore(p.category, v, WEIGHT.categoryWord, WEIGHT.categoryPrefix, 0));
    best = Math.max(best, fieldScore(p.keywords, v, WEIGHT.keywordWord, WEIGHT.keywordPrefix, 0));
  }
  return best;
}

function rank(hits: SearchHit[]): SearchHit[] {
  return hits.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    // Something she can actually sell outranks a sold piece on a tie.
    if (a.sold !== b.sold) return a.sold ? 1 : -1;
    return a.name.localeCompare(b.name);
  });
}

/**
 * Score the catalogue against a query.
 *
 * Strict pass first: a piece has to match every word typed, which keeps
 * "black leather" off the brown suede coats. If that returns nothing we run a
 * loose pass instead of showing an empty screen, and flag it so the UI can say
 * these are the closest pieces rather than exact ones.
 */
export function searchItems(items: SearchItem[], query: string, limit?: number): SearchOutcome {
  const tokens = tokenize(query);
  if (tokens.length === 0) return { results: [], loose: false };

  const whole = normalize(query);
  const prepared = items.map(prepare);

  const strict: SearchHit[] = [];
  const loose: SearchHit[] = [];

  for (const p of prepared) {
    let total = 0;
    let matched = 0;
    for (const token of tokens) {
      const s = scoreToken(p, token);
      if (s > 0) {
        matched += 1;
        total += s;
      }
    }
    if (matched === 0) continue;

    // A multi-word query that reads straight out of the name or title is the
    // strongest signal there is ("penny lane", "fox fur", "herkimer diamond").
    if (tokens.length > 1) {
      if (p.name.includes(whole)) total += 60;
      else if (p.title.includes(whole)) total += 20;
    }
    if (!p.item.sold) total += 6;

    const hit: SearchHit = { ...p.item, score: total };
    if (matched === tokens.length) strict.push(hit);
    else loose.push(hit);
  }

  const isLoose = strict.length === 0;
  const ranked = rank(isLoose ? loose : strict);
  return {
    results: typeof limit === "number" ? ranked.slice(0, limit) : ranked,
    loose: isLoose && ranked.length > 0,
  };
}

/**
 * Ask Shopify's CDN for the size the surface actually renders, so the overlay
 * pulls a thumbnail and the results grid pulls something that still looks sharp
 * on a retina screen. Local archive images are static files and pass through.
 */
export function imageAt(url: string, width: number): string {
  if (!url || !url.includes("cdn.shopify.com")) return url;
  return `${url}${url.includes("?") ? "&" : "?"}width=${width}`;
}

/**
 * The listing title without the piece's own name in front of it. Results already
 * show the name in display type, so "COLLETTE — Vintage 1970s English Suede..."
 * would spend its first ten characters repeating itself and then truncate the
 * words a shopper actually wants.
 */
export function listingLine(name: string, title: string): string {
  // Collapse runs of whitespace first: a couple of Erin's titles carry a double
  // space, which otherwise stops the name matching its own prefix.
  const clean = title.replace(/\s+/g, " ").trim();
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const stripped = clean.replace(new RegExp(`^${escaped}\\s*[\u2014\u2013-]\\s*`, "i"), "").trim();
  return stripped || clean;
}

/** Shown in the empty overlay, so the box is never a blank stare. */
export const SEARCH_SUGGESTIONS = [
  "Fur",
  "Penny Lane",
  "Shearling",
  "1970s",
  "Puffer",
  "Herkimer",
];
