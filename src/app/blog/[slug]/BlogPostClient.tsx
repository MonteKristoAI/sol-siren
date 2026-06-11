"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { blogPosts } from "@/data/blog";
import Footer from "@/components/Footer";

const BlogPostClient = () => {
  const params = useParams();
  const slug = params?.slug as string;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <main className="bg-background pt-32 pb-24 px-6 text-center min-h-screen">
        <h1 className="font-display text-4xl text-foreground">Post not found</h1>
        <Link
          href="/blog"
          className="mt-6 inline-block font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back to Journal
        </Link>
      </main>
    );
  }

  return (
    <main className="bg-background pt-24 md:pt-32">
      <article className="mx-auto max-w-3xl px-6 md:px-8 pb-24 md:pb-32">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-block font-body text-[10px] tracking-ultra-wide uppercase text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          ← Back to Journal
        </Link>

        {/* Meta */}
        <p className="font-body text-[10px] tracking-ultra-wide uppercase text-muted-foreground mb-4">
          {post.date}
        </p>

        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-foreground leading-tight">
          {post.title}
        </h1>

        <p className="mt-6 font-body text-base text-muted-foreground leading-relaxed">
          {post.excerpt}
        </p>

        {/* Hero image */}
        <div className="mt-10 aspect-[16/9] overflow-hidden bg-muted">
          <img
            src={post.image}
            alt={post.title}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Content */}
        {post.htmlBody ? (
          <div
            className="mt-10 font-body text-sm md:text-base text-foreground/80 leading-relaxed [&_h2]:font-display [&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:font-light [&_h2]:text-foreground [&_h2]:mt-12 [&_h2]:mb-4 [&_h3]:font-display [&_h3]:text-xl [&_h3]:text-foreground [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:mb-5 [&_ul]:mb-6 [&_ul]:pl-5 [&_ul]:list-disc [&_li]:mb-2 [&_img]:my-8 [&_img]:w-full [&_img]:h-auto [&_svg]:my-8 [&_svg]:max-w-full [&_svg]:h-auto [&_figure]:my-8 [&_figcaption]:text-xs [&_figcaption]:opacity-60 [&_table]:w-full [&_table]:my-8 [&_table]:text-sm [&_th]:text-left [&_th]:p-2 [&_td]:p-2 [&_.byline]:text-xs [&_.byline]:tracking-wide [&_.byline]:uppercase [&_.byline]:opacity-60 [&_.byline]:mb-6 [&_aside.mk-takeaways]:border [&_aside.mk-takeaways]:border-border [&_aside.mk-takeaways]:p-6 [&_aside.mk-takeaways]:my-8 [&_aside.mk-cta]:border [&_aside.mk-cta]:border-border [&_aside.mk-cta]:p-8 [&_aside.mk-cta]:mt-12 [&_aside.mk-cta]:text-center [&_a.mk-cta-button]:inline-block [&_a.mk-cta-button]:mt-4 [&_a.mk-cta-button]:border [&_a.mk-cta-button]:border-foreground [&_a.mk-cta-button]:px-6 [&_a.mk-cta-button]:py-3 [&_a.mk-cta-button]:text-xs [&_a.mk-cta-button]:tracking-widest [&_a.mk-cta-button]:uppercase [&_a]:underline [&_a]:underline-offset-2"
            dangerouslySetInnerHTML={{ __html: post.htmlBody }}
          />
        ) : (
          <div className="mt-10 space-y-6">
            {post.content.split("\n\n").map((paragraph, i) => (
              <p
                key={i}
                className="font-body text-sm md:text-base text-foreground/80 leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>
        )}

        <div className="w-12 h-[1px] bg-border my-12" />

        <Link
          href="/blog"
          className="inline-block font-body text-[10px] tracking-ultra-wide uppercase text-foreground border-b border-foreground pb-0.5 hover:opacity-70 transition-opacity"
        >
          ← All Posts
        </Link>
      </article>

      <Footer />
    </main>
  );
};

export default BlogPostClient;
