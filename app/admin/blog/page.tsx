'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function AdminBlogPage() {
  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState('');
  const [form, setForm] = useState({ title: '', slug: '', category: '', content: '', excerpt: '', meta_description: '', published: false });
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [posts, setPosts] = useState<any[]>([]);

  async function handleAuth(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch('/api/admin/posts', { headers: { 'x-admin-password': password } });
    if (res.ok) { setAuthed(true); const d = await res.json(); setPosts(d.posts ?? []); }
    else setAuthError('Wrong password');
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('saving');
    const res = await fetch('/api/admin/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-password': password },
      body: JSON.stringify({ ...form, site: 'crs', read_time: Math.ceil(form.content.split(' ').length / 200) }),
    });
    if (res.ok) { setStatus('saved'); setForm({ title: '', slug: '', category: '', content: '', excerpt: '', meta_description: '', published: false }); }
    else setStatus('error');
  }

  const inputCls = "w-full bg-cream-faint border border-cream-border rounded-lg px-4 py-3 text-cream text-sm placeholder:text-cream-muted/40 focus:outline-none focus:border-red-accent";

  if (!authed) return (
    <main className="min-h-screen bg-bg flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <h1 className="font-heading text-4xl text-cream tracking-wide mb-8 text-center">Admin Login</h1>
        <form onSubmit={handleAuth} className="space-y-4">
          <input type="password" placeholder="Admin password" value={password} onChange={e => setPassword(e.target.value)} className={inputCls} />
          {authError && <p className="text-red-accent text-sm">{authError}</p>}
          <button type="submit" className="w-full bg-red-accent text-white font-semibold py-3 rounded-lg">Login</button>
        </form>
      </div>
    </main>
  );

  return (
    <main className="min-h-screen bg-bg">
      <nav className="border-b border-cream-border px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
        <Link href="/" className="font-heading text-red-accent tracking-widest text-xl">REVIEW SPY</Link>
        <span className="text-cream-muted text-sm">Admin Panel</span>
      </nav>
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="font-heading text-4xl text-cream tracking-wide mb-8">New Blog Post</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-cream-muted text-xs mb-1 block">Title *</label>
              <input className={inputCls} placeholder="Post title" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value, slug: f.slug || e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') }))} required /></div>
            <div><label className="text-cream-muted text-xs mb-1 block">Slug *</label>
              <input className={inputCls} placeholder="url-slug" value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} required /></div>
          </div>
          <div><label className="text-cream-muted text-xs mb-1 block">Category</label>
            <input className={inputCls} placeholder="e.g. Review Strategy" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} /></div>
          <div><label className="text-cream-muted text-xs mb-1 block">Excerpt</label>
            <textarea className={`${inputCls} h-20 resize-none`} placeholder="Short description (1–2 sentences)" value={form.excerpt} onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))} /></div>
          <div><label className="text-cream-muted text-xs mb-1 block">Meta Description</label>
            <input className={inputCls} placeholder="SEO meta description (150 chars)" value={form.meta_description} onChange={e => setForm(f => ({ ...f, meta_description: e.target.value }))} /></div>
          <div><label className="text-cream-muted text-xs mb-1 block">Content (Markdown) *</label>
            <textarea className={`${inputCls} h-64 resize-y font-mono text-xs`} placeholder="## Heading&#10;&#10;Your content here..." value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} required /></div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={form.published} onChange={e => setForm(f => ({ ...f, published: e.target.checked }))} className="w-4 h-4 accent-red-500" />
            <span className="text-cream text-sm">Publish immediately</span>
          </label>
          <button type="submit" disabled={status === 'saving'} className="bg-red-accent hover:bg-red-hover text-white font-semibold px-8 py-3 rounded-lg transition-colors disabled:opacity-60">
            {status === 'saving' ? 'Saving…' : status === 'saved' ? '✓ Saved!' : 'Save Post'}
          </button>
          {status === 'error' && <p className="text-red-accent text-sm">Error saving post.</p>}
        </form>

        {posts.length > 0 && (
          <div className="mt-16">
            <h2 className="font-heading text-2xl text-cream tracking-wide mb-4">Published Posts</h2>
            <div className="space-y-2">
              {posts.map((p: any) => (
                <div key={p.id} className="flex items-center justify-between bg-cream-faint border border-cream-border rounded-lg px-4 py-3">
                  <span className="text-cream text-sm">{p.title}</span>
                  <span className={`text-xs px-2 py-0.5 rounded ${p.published ? 'bg-green-positive/20 text-green-positive' : 'bg-cream-faint text-cream-muted'}`}>
                    {p.published ? 'Published' : 'Draft'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
