import { notFound } from "next/navigation";
import { getHospitalityServiceBySlug, getHospitalityServiceSlugs } from "@/data/hospitalityServices";
import { PROJECTS } from "@/lib/constants";
import HospitalityServiceClient from "./HospitalityServiceClient";

export async function generateStaticParams() {
  return getHospitalityServiceSlugs().map((slug) => ({ slug }));
}

export default async function HospitalitySubPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getHospitalityServiceBySlug(slug);
  if (!service) notFound();

  const related = PROJECTS.filter((p) => service.projectExamples.includes(p.id)).slice(0, 3);

  return <HospitalityServiceClient service={service} related={related} />;
}
