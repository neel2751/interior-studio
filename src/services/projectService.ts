import api, { type ApiResponse, type PaginatedApiResponse } from '@/lib/api';
import { CACHE_TAGS } from '@/lib/constants';
import type { Project, ProjectFilter } from '@/types/project';

const ENDPOINTS = {
  all:       '/projects',
  byId:      (id: string) => `/projects/${id}`,
  featured:  '/projects/featured',
  search:    '/projects/search',
} as const;

export interface ProjectListParams extends ProjectFilter {
  page?: number;
  limit?: number;
  search?: string;
  sort?: 'newest' | 'oldest' | 'title';
}

export const projectService = {

  getAll: (params?: ProjectListParams) =>
    api.get<PaginatedApiResponse<Project>>(ENDPOINTS.all, {
      params,
      tags: [CACHE_TAGS.projects],
      revalidate: 3600,
    }),

  getById: (id: string) =>
    api.get<ApiResponse<Project>>(ENDPOINTS.byId(id), {
      tags: [CACHE_TAGS.projects, `project-${id}`],
      revalidate: 3600,
    }),

  getFeatured: () =>
    api.get<ApiResponse<Project[]>>(ENDPOINTS.featured, {
      tags: [CACHE_TAGS.projects, 'projects-featured'],
      revalidate: 3600,
    }),

  search: (query: string) =>
    api.get<ApiResponse<Project[]>>(ENDPOINTS.search, {
      params: { q: query },
      tags: [CACHE_TAGS.projects],
    }),

  getIds: async (): Promise<string[]> => {
    const res = await api.get<PaginatedApiResponse<Project>>(ENDPOINTS.all, {
      params: { limit: 100 },
      tags: [CACHE_TAGS.projects],
      revalidate: 3600,
    });
    return (res.data ?? []).map((p) => p.id);
  },
};

export default projectService;