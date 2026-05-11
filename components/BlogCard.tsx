import Link from 'next/link';
import type { BlogPost } from '@/lib/blog-data';

const CATEGORY_COLORS: Record<string, string> = {
  'Competitor Analysis': 'bg-red-accent/20 text-red-accent',
  'Review Strategy': 'bg-blue-500/20 text-blue-400',
  'Reputation Management': 'bg-purple-500/20 text-purple-400',
  'Industry Benchmarks': 'bg-green-positive/20 text-green-positive',
};

export default function BlogCard({ post }: { post: BlogPost }) {
  const color = CATEGORY_COLORS[post.category] ?? 'bg-cream-faint text-cream-muted';
  const date = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="h-full bg-cream-faint border border-cream-border rounded-xl p-6 hover:border-red-accent/50 transition-all duration-200 hover:bg-red-accent/5">
        <div className="flex items-center gap-3 mb-4">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide ${color}`}>
            {post.category}
          </span>
          <span className="text-cream-muted text-xs">{post.readTime} min read</span>
        </div>
        <h2 className="font-heading text-xl text-cream tracking-wide leading-tight mb-3 group-hover:text-red-accent transition-colors">
          {post.title}
        </h2>
        <p className="text-cream-muted text-sm leading-relaxed mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-cream-muted text-xs">{date}</span>
          <span className="text-red-accent text-sm font-semibold group-hover:translate-x-1 transition-transform inline-block">
            Read →
          </span>
        </div>
      </article>
    </Link>
  );
}
