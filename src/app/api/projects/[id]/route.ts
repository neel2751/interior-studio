
import { NextRequest, NextResponse } from 'next/server';
import { getProjectById } from '@/data/projects';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (BACKEND_URL) {
    try {
      const res = await fetch(`${BACKEND_URL}/projects/${id}`, {
        next: { tags: ['projects', `project-${id}`], revalidate: 3600 },
      });

      if (res.ok) {
        const data = await res.json();
        return NextResponse.json(data);
      }

      if (res.status === 404) {
        return NextResponse.json(
          { success: false, error: 'Project not found' },
          { status: 404 }
        );
      }
    } catch {
    }
  }

  const project = getProjectById(id);

  if (!project) {
    return NextResponse.json(
      { success: false, error: 'Project not found' },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, data: project });
}