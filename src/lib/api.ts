import { Project } from '@/types/project';
import { Service } from '@/types/service';



export async function getProjects(): Promise<Project[]> {
  
  
  const { PROJECTS } = await import('@/lib/constants');
  return PROJECTS;
}

export async function getServices(): Promise<Service[]> {
  
  const { SERVICES } = await import('@/lib/constants');
  return SERVICES;
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await getProjects();
  return projects.filter(project => project.featured);
}

export async function getProjectById(id: string): Promise<Project | null> {
  const projects = await getProjects();
  return projects.find(project => project.id === id) || null;
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await getProjects();
  return projects.find(project => project.id === slug) || null;
}

export async function getProjectsByCategory(category: 'residential' | 'commercial'): Promise<Project[]> {
  const projects = await getProjects();
  return projects.filter(project => project.category === category);
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const services = await getServices();
  return services.find(service => service.slug === slug) || null;
}

export async function getRelatedProjects(
  projectId: string, 
  category: 'residential' | 'commercial',
  limit: number = 3
): Promise<Project[]> {
  const projects = await getProjects();
  return projects
    .filter(project => project.id !== projectId && project.category === category)
    .slice(0, limit);
}

export async function searchProjects(query: string): Promise<Project[]> {
  const projects = await getProjects();
  const lowercaseQuery = query.toLowerCase();
  
  return projects.filter(project => 
    project.title.toLowerCase().includes(lowercaseQuery) ||
    project.description.toLowerCase().includes(lowercaseQuery) ||
    project.location.toLowerCase().includes(lowercaseQuery) ||
    project.client.toLowerCase().includes(lowercaseQuery)
  );
}

export async function searchServices(query: string): Promise<Service[]> {
  const services = await getServices();
  const lowercaseQuery = query.toLowerCase();
  
  return services.filter(service => 
    service.title.toLowerCase().includes(lowercaseQuery) ||
    service.description.toLowerCase().includes(lowercaseQuery) ||
    service.detailedDescription.toLowerCase().includes(lowercaseQuery)
  );
}
