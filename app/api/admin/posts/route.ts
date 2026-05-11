import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

function checkAuth(req: NextRequest) {
  const pw = req.headers.get('x-admin-password');
  return pw === process.env.ADMIN_PASSWORD;
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { data: posts } = await supabase.from('blog_posts').select('id,title,slug,published,created_at').eq('site', 'crs').order('created_at', { ascending: false });
  return NextResponse.json({ posts: posts ?? [] });
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  const { error } = await supabase.from('blog_posts').insert({
    title: body.title, slug: body.slug, content: body.content,
    excerpt: body.excerpt, category: body.category,
    meta_description: body.meta_description,
    meta_title: body.title, published: body.published ?? false,
    site: body.site ?? 'crs', read_time: body.read_time ?? 5,
  });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
