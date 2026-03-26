export interface Inquiry {
  fullName: string;
  email: string;
  phone: string;
  projectLocation: string;
  projectType: 'residential' | 'commercial';
  message: string;
}

export interface InquiryResponse {
  success: boolean;
  message: string;
  data?: Inquiry;
}
