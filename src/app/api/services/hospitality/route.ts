import { NextResponse } from 'next/server';
import { SERVICES } from '@/data/services';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET() {
  if (BACKEND_URL) {
    try {
      const res = await fetch(`${BACKEND_URL}/services/hospitality`, {
        next: { tags: ['services', 'services-hospitality'], revalidate: 3600 },
      });
      if (res.ok) return NextResponse.json(await res.json());
    } catch { /* fall through */ }
  }

  const hospitality = SERVICES.filter((s) => s.slug === 'hospitality-space');
  return NextResponse.json({
    success: true,
    data: hospitality,
    count: hospitality.length,
  });
}