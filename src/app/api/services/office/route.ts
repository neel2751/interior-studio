import { NextResponse } from 'next/server';
import { SERVICES } from '@/data/services';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET() {
  if (BACKEND_URL) {
    try {
      const res = await fetch(`${BACKEND_URL}/services/office`, {
        next: { tags: ['services', 'services-office'], revalidate: 3600 },
      });
      if (res.ok) return NextResponse.json(await res.json());
    } catch { /* fall through */ }
  }

  const office = SERVICES.filter((s) => s.slug === 'office-interior');
  return NextResponse.json({ success: true, data: office, count: office.length });
}