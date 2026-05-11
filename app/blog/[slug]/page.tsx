import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllPosts, getPostBySlug } from '@/lib/blog-data';
import NewsletterSignup from '@/components/NewsletterSignup';
import BlogCard from '@/components/BlogCard';

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: { canonical: `https://competitor-review-spy.com/blog/${post.slug}` },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      type: 'article',
      url: `https://competitor-review-spy.com/blog/${post.slug}`,
      publishedTime: post.publishedAt,
    },
  };
}

function renderContent(content: string) {
  const lines = content.split('\n');
  return lines.map((line, i) => {
    if (line.startsWith('## ')) return <h2 key={i} className="font-heading text-3xl text-cream tracking-wide mt-10 mb-4">{line.slice(3)}</h2>;
    if (line.startsWith('### ')) return <h3 key={i} className="font-heading text-2xl text-cream tracking-wide mt-8 mb-3">{line.slice(4)}</h3>;
    if (line.startsWith('**') && line.endsWith('**')) {
      return <p key={i} className="font-semibold text-cream mb-3">{line.slice(2, -2)}</p>;
    }
    if (line.startsWith('---')) return <hr key={i} className="border-cream-border my-8" />;
    if (line.startsWith('*') && line.endsWith('*') && line.startsWith('*Ready') === false) {
      return <p key={i} className="italic text-cream-muted text-sm mb-3">{line.slice(1, -1)}</p>;
    }
    if (line.trim() === '') return <div key={i} className="mb-4" />;
    // Inline bold
    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    if (parts.length > 1) {
      return (
        <p key={i} className="text-cream-muted leading-relaxed mb-3">
          {parts.map((part, j) =>
            part.startsWith('**') && part.endsWith('**')
              ? <strong key={j} className="text-cream font-semibold">{part.slice(2, -2)}</strong>
              : part
          )}
        </p>
      );
    }
    return <p key={i} className="text-cream-muted leading-relaxed mb-3">{line}</p>;
  });
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const allPosts = getAllPosts();
  const related = allPosts.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 2);
  const fallbackRelated = allPosts.filter((p) => p.slug !== post.slug).slice(0, 2);
  const relatedPosts = related.length > 0 ? related : fallbackRelated;

  const date = new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.publishedAt,
    author: { '@type': 'Organization', name: 'Competitor Review Spy' },
    publisher: { '@type': 'Organization', name: 'Competitor Review Spy', url: 'https://competitor-review-spy.com' },
    mainEntityOfPage: `https://competitor-review-spy.com/blog/${post.slug}`,
  };

  return (
    <main className="min-h-screen bg-bg">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <nav className="border-b border-cream-border px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
        <Link href="/" className="font-heading text-red-accent tracking-widest text-xl">REVIEW SPY</Link>
        <Link href="/analyze" className="text-sm font-semibold text-cream-muted hover:text-cream transition-colors">
          Get Report — $9 →
        </Link>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <nav className="text-cream-muted/50 text-xs mb-8">
          <Link href="/" className="hover:text-cream">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:text-cream">Blog</Link>
          <span className="mx-2">/</span>
          <span className="text-cream">{post.title}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Article */}
          <article className="flex-1 max-w-2xl">
            <div className="mb-6">
              <span className="text-xs font-semibold bg-red-accent/20 text-red-accent px-2.5 py-1 rounded-full uppercase tracking-wide">
                {post.category}
              </span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl text-cream tracking-wide leading-tight mb-4">{post.title}</h1>
            <div className="flex items-center gap-4 text-cream-muted/50 text-xs mb-10 border-b border-cream-border pb-6">
              <span>{date}</span>
              <span>·</span>
              <span>{post.readTime} min read</span>
            </div>
            <div className="prose-custom">{renderContent(post.content)}</div>

            {/* Bottom CTA */}
            <div className="mt-12 border border-red-accent/40 bg-red-accent/5 rounded-xl p-6">
              <h3 className="font-heading text-2xl text-cream tracking-wide mb-2">See How You Compare</h3>
              <p className="text-cream-muted text-sm mb-4">
                Get a full side-by-side comparison of your Google reviews vs. up to 3 competitors. Live data, $9 one-time.
              </p>
              <Link href="/analyze" className="inline-block bg-red-accent hover:bg-red-hover text-white font-semibold text-sm px-6 py-3 rounded-lg transition-colors">
                Get your report →
              </Link>
            </div>

            {/* Cross-link */}
            <div className="mt-6 border border-cream-border rounded-xl p-5">
              <p className="text-cream-muted text-sm">
                Want to automate your review replies?{' '}
                <a href="https://reviewreplyai.ca" target="_blank" rel="noopener noreferrer" className="text-red-accent hover:underline font-semibold">
                  Try ReviewReply AI →
                </a>
              </p>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:w-72 space-y-6 shrink-0">
            <div className="bg-red-accent/5 border border-red-accent/40 rounded-xl p-6 sticky top-6">
              <h3 className="font-heading text-xl text-cream tracking-wide mb-2">Get Your Report</h3>
              <p className="text-cream-muted text-sm mb-4">Compare your reviews to 3 competitors. $9 one-time.</p>
              <Link href="/analyze" className="block text-center bg-red-accent hover:bg-red-hover text-white font-semibold text-sm py-3 rounded-lg transition-colors">
                Start now →
              </Link>
            </div>
            <NewsletterSignup />
            {relatedPosts.length > 0 && (
              <div>
                <h3 className="font-semibold text-cream text-sm mb-3">Related Articles</h3>
                <div className="space-y-3">
                  {relatedPosts.map((p) => <BlogCard key={p.slug} post={p} />)}
                </div>
              </div>
            )}
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
