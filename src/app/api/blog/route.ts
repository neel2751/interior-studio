import { NextRequest, NextResponse } from 'next/server';
import { BLOG_POSTS } from '@/data/blog';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page     = parseInt(searchParams.get('page')     || '1',  10);
  const limit    = parseInt(searchParams.get('limit')    || '9',  10);
  const category = searchParams.get('category');
  const tag      = searchParams.get('tag');
  const featured = searchParams.get('featured') === 'true';
  const search   = searchParams.get('search');

  if (BACKEND_URL) {
    try {
      const params = new URLSearchParams();
      params.set('page',  String(page));
      params.set('limit', String(limit));
      if (category) params.set('category', category);
      if (tag)      params.set('tag', tag);
      if (featured) params.set('featured', 'true');
      if (search)   params.set('search', search);

      const res = await fetch(`${BACKEND_URL}/blog?${params}`, {
        next: { tags: ['blog'], revalidate: 1800 },
      });
      if (res.ok) return NextResponse.json(await res.json());
    } catch { /* fall through */ }
  }

  let posts = [...BLOG_POSTS];

  if (category) posts = posts.filter((p) => p.category === category);
  if (tag)      posts = posts.filter((p) => p.tags.includes(tag));
  if (featured) posts = posts.filter((p) => p.featured);
  if (search) {
    const q = search.toLowerCase();
    posts = posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q)
    );
  }

  const total      = posts.length;
  const totalPages = Math.ceil(total / limit);
  const offset     = (page - 1) * limit;
  const paginated  = posts.slice(offset, offset + limit);

  return NextResponse.json({
    success: true,
    data: paginated,
    total,
    page,
    limit,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  });
}