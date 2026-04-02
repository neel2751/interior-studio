import { NextRequest, NextResponse } from 'next/server';
import { getBlogPostBySlug } from '@/data/blog';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  if (BACKEND_URL) {
    try {
      const res = await fetch(`${BACKEND_URL}/blog/${slug}`, {
        next: { tags: ['blog', `blog-${slug}`], revalidate: 1800 },
      });
      if (res.ok) return NextResponse.json(await res.json());
      if (res.status === 404)
        return NextResponse.json(
          { success: false, error: 'Post not found' },
          { status: 404 }
        );
    } catch { /* fall through */ }
  }
  const post = getBlogPostBySlug(slug);
  if (!post)
    return NextResponse.json(
      { success: false, error: 'Post not found' },
      { status: 404 }
    );

  return NextResponse.json({ success: true, data: post });
}