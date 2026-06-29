import { blogPosts } from "@/data/blog";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const posts = (blogPosts || []).map((p) => ({
    slug: p.slug,
    title: p.title,
    date: p.date,
    url: `https://www.solsirenvintage.com/blog/${p.slug}`,
  }));
  return Response.json({ posts });
}
