// Structured "Size & Fit" block, kept in the product description between markers
// so it renders on the site AND can be re-edited from admin fields (no HTML).
// Pure functions — safe to import from both client and server.

export const SF_START = "<!--SIZEFIT-START-->";
export const SF_END = "<!--SIZEFIT-END-->";

export type SizeFit = {
  estimatedSize?: string;
  shoulder?: string;
  bust?: string;
  sleeve?: string;
  length?: string;
  waist?: string;
};

export const SIZE_FIT_FIELDS: { key: keyof SizeFit; label: string; placeholder: string }[] = [
  { key: "estimatedSize", label: "Estimated modern size", placeholder: "S/M" },
  { key: "shoulder", label: "Shoulder", placeholder: "16" },
  { key: "bust", label: "Bust", placeholder: "40-42" },
  { key: "sleeve", label: "Sleeve", placeholder: "24" },
  { key: "length", label: "Length", placeholder: "42" },
  { key: "waist", label: "Waist", placeholder: "" },
];

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Append inch mark to bare numbers/ranges; leave alone if a unit is already there.
function meas(label: string, v?: string): string {
  const val = (v || "").trim();
  if (!val) return "";
  const withUnit = /["'”]|cm|in\b|inch/i.test(val) ? val : `${val}"`;
  return `${label}: ${esc(withUnit)}<br>`;
}

export function stripSizeFit(html: string): string {
  const re = new RegExp(`${SF_START}[\\s\\S]*?${SF_END}`, "g");
  return (html || "").replace(re, "").replace(/\s+$/, "");
}

export function buildSizeFit(sf: SizeFit): string {
  const est = (sf.estimatedSize || "").trim();
  const measurements =
    meas("Shoulder", sf.shoulder) +
    meas("Bust", sf.bust) +
    meas("Sleeve", sf.sleeve) +
    meas("Length", sf.length) +
    meas("Waist", sf.waist);
  if (!est && !measurements) return "";
  const parts = [`<h3>SIZE &amp; FIT</h3>`];
  if (est) parts.push(`<p>Estimated modern size: ${esc(est)}</p>`);
  if (measurements) parts.push(`<p><strong>Measurements (taken flat):</strong><br>${measurements}</p>`);
  return `${SF_START}\n${parts.join("\n")}\n${SF_END}`;
}

// Story (description) with the size-fit block appended (block always at the end).
export function composeDescription(storyHtml: string, sf: SizeFit): string {
  const story = stripSizeFit(storyHtml).trim();
  const block = buildSizeFit(sf);
  if (!block) return story;
  return story ? `${story}\n${block}` : block;
}

export function isSizeFitEmpty(sf: SizeFit): boolean {
  return !Object.values(sf).some((v) => (v || "").trim());
}
