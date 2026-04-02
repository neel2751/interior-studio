import { NextRequest, NextResponse } from 'next/server';
import { PROJECTS, getProjectsByCategory } from '@/data/projects';
import type { Project, ProjectFilter } from '@/types/project';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') as ProjectFilter['category'] | null;
  const featured  = searchParams.get('featured') === 'true';
  const page      = parseInt(searchParams.get('page')  || '1',  10);
  const limit     = parseInt(searchParams.get('limit') || '12', 10);

  if (BACKEND_URL) {
    try {
      const params = new URLSearchParams();
      if (category) params.set('category', category);
      if (featured)  params.set('featured', 'true');
      params.set('page',  String(page));
      params.set('limit', String(limit));

      const res = await fetch(`${BACKEND_URL}/projects?${params}`, {
        next: { tags: ['projects'], revalidate: 3600 },
      });

      if (res.ok) {
        const data = await res.json();
        return NextResponse.json(data);
      }
    } catch {
      // Backend not reachable — fall through to static data
    }
  }

  let projects: Project[] = category
    ? getProjectsByCategory(category)
    : PROJECTS;

  if (featured) {
    projects = projects.filter((p) => p.featured);
  }

  const total      = projects.length;
  const totalPages = Math.ceil(total / limit);
  const offset     = (page - 1) * limit;
  const paginated  = projects.slice(offset, offset + limit);

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