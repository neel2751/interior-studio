import { SERVICES } from '@/lib/constants'

export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.slug,
  }))
}
