import { notFound } from "next/navigation";
import {
  getResidentialServiceBySlug,
  getResidentialServiceSlugs,
} from "@/data/residentialServices";
import { PROJECTS } from "@/lib/constants";
import ResidentialServiceClient from "./ResidentialServiceClient";

export async function generateStaticParams() {
  return getResidentialServiceSlugs().map((slug) => ({ slug }));
}

export default async function ResidentialSubPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getResidentialServiceBySlug(slug);
  if (!service) notFound();

  const related = PROJECTS.filter((p) => p.category === "residential").slice(0, 3);

  return <ResidentialServiceClient service={service} related={related} />;
}
