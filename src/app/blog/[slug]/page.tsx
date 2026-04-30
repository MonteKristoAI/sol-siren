import { Metadata } from 'next';
import { blogPosts } from '@/data/blog';
import BlogPostClient from './BlogPostClient';

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = blogPosts.find((p) => p.slug === params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found | Sol Siren',
    };
  }

  return {
    title: `${post.title} | Sol Siren`,
    description: post.excerpt,
    openGraph: {
      images: [post.image],
    },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return <BlogPostClient />;
}
