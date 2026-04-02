// ============================================================
// GET /api/services/commercial
// Returns all commercial services — backend first, static fallback
// ============================================================

import { NextResponse } from 'next/server';
import { SERVICES } from '@/data/services';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET() {
  if (BACKEND_URL) {
    try {
      const res = await fetch(`${BACKEND_URL}/services/commercial`, {
        next: { tags: ['services', 'services-commercial'], revalidate: 3600 },
      });

      if (res.ok) {
        const data = await res.json();
        return NextResponse.json(data);
      }
    } catch {
      // Fall through to static data
    }
  }

  const commercial = SERVICES.filter((s) =>
    s.slug === 'commercial-interior-design'
  );

  return NextResponse.json({
    success: true,
    data: commercial,
    count: commercial.length,
  });
}