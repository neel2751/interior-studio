import api, { type ApiResponse, type PaginatedApiResponse } from '@/lib/api';
import { CACHE_TAGS } from '@/lib/constants';
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: {
    name: string;
    avatar?: string;
  };
  category: string;
  tags: string[];
  publishedAt: string;
  updatedAt: string;
  readTime?: number;
  featured?: boolean;
}

export interface BlogListParams {
  page?: number;
  limit?: number;
  category?: string;
  tag?: string;
  featured?: boolean;
  search?: string;
}

const ENDPOINTS = {
  all:      '/blog',
  bySlug:   (slug: string) => `/blog/${slug}`,
  featured: '/blog/featured',
  categories: '/blog/categories',
  tags:     '/blog/tags',
} as const;

export const blogService = {

  getAll: (params?: BlogListParams) =>
    api.get<PaginatedApiResponse<BlogPost>>(ENDPOINTS.all, {
      params,
      tags: [CACHE_TAGS.blog],
      revalidate: 1800, 
    }),

  getBySlug: (slug: string) =>
    api.get<ApiResponse<BlogPost>>(ENDPOINTS.bySlug(slug), {
      tags: [CACHE_TAGS.blog, `blog-${slug}`],
      revalidate: 1800,
    }),

  getFeatured: (limit = 3) =>
    api.get<ApiResponse<BlogPost[]>>(ENDPOINTS.featured, {
      params: { limit },
      tags: [CACHE_TAGS.blog, 'blog-featured'],
      revalidate: 1800,
    }),

  getCategories: () =>
    api.get<ApiResponse<string[]>>(ENDPOINTS.categories, {
      tags: [CACHE_TAGS.blog],
      revalidate: 3600,
    }),
  getTags: () =>
    api.get<ApiResponse<string[]>>(ENDPOINTS.tags, {
      tags: [CACHE_TAGS.blog],
      revalidate: 3600,
    }),

  getSlugs: async (): Promise<string[]> => {
    const res = await api.get<PaginatedApiResponse<BlogPost>>(ENDPOINTS.all, {
      params: { limit: 100 },
      tags: [CACHE_TAGS.blog],
      revalidate: 3600,
    });
    return (res.data ?? []).map((p) => p.slug);
  },
};

export default blogService;