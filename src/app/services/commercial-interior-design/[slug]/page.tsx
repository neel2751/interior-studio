import { notFound } from "next/navigation";
import { getCommercialServiceBySlug, getCommercialServiceSlugs } from "@/data/commercialServices";
import { PROJECTS } from "@/lib/constants";
import CommercialServiceClient from "./CommercialServiceClient";

export async function generateStaticParams() {
  return getCommercialServiceSlugs().map((slug) => ({ slug }));
}

export default async function CommercialSubPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getCommercialServiceBySlug(slug);
  if (!service) notFound();

  const related = PROJECTS.filter((p) => p.category === "commercial").slice(0, 3);

  return <CommercialServiceClient service={service} related={related} />;
}
