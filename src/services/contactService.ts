import api, { type ApiResponse } from '@/lib/api';
import type { Inquiry, InquiryResponse } from '@/types/inquiry';
const ENDPOINTS = {
  submit: '/contact',
  info:   '/contact/info',
} as const;

export const contactService = {

  submit: (data: Inquiry) =>
    api.post<InquiryResponse>(ENDPOINTS.submit, data),

  getInfo: () =>
    api.get<ApiResponse<unknown>>(ENDPOINTS.info, {
      revalidate: 86400, // 24 hours
    }),
};

export default contactService;