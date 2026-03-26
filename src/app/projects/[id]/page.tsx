import { notFound } from 'next/navigation';
import { PROJECTS } from '@/lib/constants';
import ProjectGallery from '@/components/projects/ProjectGallery';
import ProjectDetails from '@/components/projects/ProjectDetails';
import Section from '@/components/common/Section';

interface ProjectPageProps {
  params: {
    id: string;
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = PROJECTS.find(p => p.id === params.id);

  if (!project) {
    notFound();
  }

  return (
    <div className="pt-20">
      <Section>
        <div className="space-y-12">
          <ProjectGallery project={project} />
          <ProjectDetails project={project} />
        </div>
      </Section>
    </div>
  );
}

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({
    id: project.id,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const project = PROJECTS.find(p => p.id === params.id);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} - Interior Studio Ltd`,
    description: project.description,
    openGraph: {
      title: `${project.title} - Interior Studio Ltd`,
      description: project.description,
      images: [project.images[0]],
    },
  };
}
