import { notFound } from 'next/navigation';
import { PROJECTS } from '@/lib/constants';
import ProjectPageClient from '@/components/projects/ProjectPageClient';

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({ id: project.id }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = PROJECTS.find(p => p.id === id);
  if (!project) return { title: 'Project Not Found' };
  return {
    title: `${project.title} — Interior Studio Ltd`,
    description: project.description,
    openGraph: {
      title: `${project.title} — Interior Studio Ltd`,
      description: project.description,
      images: [project.images[0]],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = PROJECTS.find(p => p.id === id);
  if (!project) notFound();

  const related = PROJECTS
    .filter(p => p.id !== project.id && p.category === project.category)
    .slice(0, 3);

  return <ProjectPageClient project={project} related={related} />;
}