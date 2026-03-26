import { notFound } from 'next/navigation';
import { SERVICES } from '@/lib/constants';
import ServiceDetail from '@/components/services/ServiceDetail';
import Section from '@/components/common/Section';

interface ServicePageProps {
  params: {
    slug: string;
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = SERVICES.find(s => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="pt-20">
      <Section>
        <ServiceDetail service={service} />
      </Section>
    </div>
  );
}

export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.slug,
  }));
}
