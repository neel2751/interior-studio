import { NextResponse } from 'next/server';
import { SERVICES } from '@/data/services';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET() {
  if (BACKEND_URL) {
    try {
      const res = await fetch(`${BACKEND_URL}/services/residential`, {
        next: { tags: ['services', 'services-residential'], revalidate: 3600 },
      });

      if (res.ok) {
        return NextResponse.json(await res.json());
      }
    } catch {
      // Fall through to static data
    }
  }

  const residential = SERVICES.filter((s) => s.slug === 'residential-interior-design');
  return NextResponse.json({
    success: true,
    data: residential,
    count: residential.length,
  });
}
