import { NextResponse } from "next/server";
import { getSearchIndex } from "@/lib/search-index";

// The nav overlay fetches this once, the first time someone opens search, and
// filters it locally. One cached response for the whole catalogue beats a
// round trip per keystroke, and it matches the 60s revalidate the shop and
// product pages already use.
export const revalidate = 60;

export async function GET() {
  const items = await getSearchIndex();
  return NextResponse.json(
    { items },
    {
      headers: {
        // No stale-while-revalidate here on purpose. Every piece is one of one,
        // so serving a five-minute-stale index would show a coat as available
        // after it sold.
        "Cache-Control": "public, s-maxage=60",
      },
    },
  );
}
