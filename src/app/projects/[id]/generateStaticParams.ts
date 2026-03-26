import { PROJECTS } from '@/lib/constants'

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({
    id: project.id,
  }))
}
