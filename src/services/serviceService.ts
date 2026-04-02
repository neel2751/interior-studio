import api, { type ApiResponse, type PaginatedApiResponse } from '@/lib/api';
import { CACHE_TAGS } from '@/lib/constants';
import type { Service, ServiceType } from '@/types/service';
const ENDPOINTS = {
  all:          '/services',
  bySlug:       (slug: string) => `/services/${slug}`,
  byCategory:   (category: ServiceType) => `/services/category/${category}`,
  residential:  '/services/residential',
  commercial:   '/services/commercial',
  office:       '/services/office',
  hospitality:  '/services/hospitality',
} as const;

export interface ServiceListParams {
  category?: ServiceType;
  page?: number;
  limit?: number;
  search?: string;
}

export const serviceService = {

  getAll: (params?: ServiceListParams) =>
    api.get<ApiResponse<Service[]>>(ENDPOINTS.all, {
      params,
      tags: [CACHE_TAGS.services],
      revalidate: 3600,
    }),

  getBySlug: (slug: string) =>
    api.get<ApiResponse<Service>>(ENDPOINTS.bySlug(slug), {
      tags: [CACHE_TAGS.services, `service-${slug}`],
      revalidate: 3600,
    }),

  getByCategory: (category: ServiceType) =>
    api.get<ApiResponse<Service[]>>(ENDPOINTS.byCategory(category), {
      tags: [CACHE_TAGS.services, `services-${category}`],
      revalidate: 3600,
    }),

  getResidential: () =>
    api.get<ApiResponse<Service[]>>(ENDPOINTS.residential, {
      tags: [CACHE_TAGS.services, 'services-residential'],
      revalidate: 3600,
    }),

  getResidentialBySlug: (slug: string) =>
    api.get<ApiResponse<Service>>(ENDPOINTS.bySlug(slug), {
      tags: [CACHE_TAGS.services, `service-${slug}`],
      revalidate: 3600,
    }),

  getCommercial: () =>
    api.get<ApiResponse<Service[]>>(ENDPOINTS.commercial, {
      tags: [CACHE_TAGS.services, 'services-commercial'],
      revalidate: 3600,
    }),

  getOffice: () =>
    api.get<ApiResponse<Service[]>>(ENDPOINTS.office, {
      tags: [CACHE_TAGS.services, 'services-office'],
      revalidate: 3600,
    }),

  getHospitality: () =>
    api.get<ApiResponse<Service[]>>(ENDPOINTS.hospitality, {
      tags: [CACHE_TAGS.services, 'services-hospitality'],
      revalidate: 3600,
    }),

  getSlugs: async (): Promise<string[]> => {
    const res = await api.get<ApiResponse<Service[]>>(ENDPOINTS.all, {
      tags: [CACHE_TAGS.services],
      revalidate: 3600,
    });
    return (res.data ?? []).map((s) => s.slug);
  },
};

export default serviceService;