import { NextResponse } from 'next/server';
import { SERVICES } from '@/data/services';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET() {
  if (BACKEND_URL) {
    try {
      const res = await fetch(`${BACKEND_URL}/services`, {
        next: { tags: ['services'], revalidate: 3600 },
      });

      if (res.ok) {
        const data = await res.json();
        return NextResponse.json(data);
      }
    } catch {
      // Fall through to static data
    }
  }

  return NextResponse.json({
    success: true,
    data: SERVICES,
    count: SERVICES.length,
  });
}