import { NextRequest, NextResponse } from 'next/server';
import { getServiceBySlug } from '@/data/services';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  if (BACKEND_URL) {
    try {
      const res = await fetch(`${BACKEND_URL}/services/office/${slug}`, {
        next: { tags: ['services', `service-${slug}`], revalidate: 3600 },
      });
      if (res.ok) return NextResponse.json(await res.json());
      if (res.status === 404) return NextResponse.json({ success: false, error: 'Service not found' }, { status: 404 });
    } catch { /* fall through */ }
  }

  const service = getServiceBySlug(slug);
  if (!service) return NextResponse.json({ success: false, error: 'Service not found' }, { status: 404 });
  return NextResponse.json({ success: true, data: service });
}