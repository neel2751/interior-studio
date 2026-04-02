import { notFound } from "next/navigation";
import { getOfficeServiceBySlug, getOfficeServiceSlugs } from "@/data/officeServices";
import { PROJECTS } from "@/lib/constants";
import OfficeServiceClient from "./OfficeServiceClient";

export async function generateStaticParams() {
  return getOfficeServiceSlugs().map((slug) => ({ slug }));
}

export default async function OfficeSubPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getOfficeServiceBySlug(slug);
  if (!service) notFound();

  const related = PROJECTS.filter((p) => p.category === "commercial").slice(0, 3);

  return <OfficeServiceClient service={service} related={related} />;
}
