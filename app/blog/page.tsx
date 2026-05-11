import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllPosts } from '@/lib/blog-data';
import BlogCard from '@/components/BlogCard';
import NewsletterSignup from '@/components/NewsletterSignup';

export const metadata: Metadata = {
  title: 'Blog — Google Review Strategy for Small Business',
  description:
    'Practical guides on competitor review analysis, google review benchmarks, and review strategy for small business owners.',
  alternates: { canonical: 'https://competitor-review-spy.com/blog' },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = [...new Set(posts.map((p) => p.category))];

  return (
    <main className="min-h-screen bg-bg">
      <nav className="border-b border-cream-border px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
        <Link href="/" className="font-heading text-red-accent tracking-widest text-xl">REVIEW SPY</Link>
        <Link href="/analyze" className="text-sm font-semibold text-cream-muted hover:text-cream transition-colors">
          Get Report — $9 →
        </Link>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-12">
          <nav className="text-cream-muted/50 text-xs mb-4">
            <Link href="/" className="hover:text-cream">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-cream">Blog</span>
          </nav>
          <h1 className="font-heading text-5xl md:text-6xl text-cream tracking-wide mb-3">
            Review Strategy Blog
          </h1>
          <p className="text-cream-muted text-lg max-w-2xl">
            Practical guides on competitor review analysis, Google review benchmarks,
            and how to improve your review profile as a small business.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Articles grid */}
          <div className="flex-1">
            {/* Category filter */}
            <div className="flex flex-wrap gap-2 mb-8">
              <span className="text-xs font-semibold bg-red-accent text-white px-3 py-1.5 rounded-full">All</span>
              {categories.map((cat) => (
                <span key={cat} className="text-xs font-semibold bg-cream-faint border border-cream-border text-cream-muted px-3 py-1.5 rounded-full cursor-pointer hover:border-red-accent/50 transition-colors">
                  {cat}
                </span>
              ))}
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {posts.map((post) => <BlogCard key={post.slug} post={post} />)}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:w-72 space-y-6 shrink-0">
            {/* CTA Card */}
            <div className="bg-red-accent/5 border border-red-accent/40 rounded-xl p-6">
              <h3 className="font-heading text-xl text-cream tracking-wide mb-2">See Your Competitive Position</h3>
              <p className="text-cream-muted text-sm mb-4">
                Compare your Google reviews against 3 competitors. Live data, instant report.
              </p>
              <Link href="/analyze" className="block text-center bg-red-accent hover:bg-red-hover text-white font-semibold text-sm py-3 rounded-lg transition-colors">
                Get report — $9
              </Link>
            </div>
            <NewsletterSignup />
            {/* Cross-link */}
            <div className="bg-cream-faint border border-cream-border rounded-xl p-5">
              <p className="text-cream-muted text-xs mb-3">Want to automate your review replies?</p>
              <a href="https://reviewreplyai.ca" target="_blank" rel="noopener noreferrer"
                className="text-sm font-semibold text-cream hover:text-red-accent transition-colors">
                Automate your Google review replies →
              </a>
            </div>
          </aside>
        </div>
      </div>

      <footer className="border-t border-cream-border px-6 py-8 mt-12 text-center">
        <p className="text-cream-muted/40 text-xs">
          © {new Date().getFullYear()} Competitor Review Spy ·{' '}
          <a href="https://reviewreplyai.ca" className="hover:text-red-accent transition-colors">
            Automate your Google review replies
          </a>
        </p>
      </footer>
    </main>
  );
}
