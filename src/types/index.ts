export * from './project';
export * from './service';
export * from './inquiry';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: Pagination;
}

export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article';
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface NavLink {
  name: string;
  href: string;
  icon?: string;
  badge?: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  social: {
    instagram?: string;
    linkedin?: string;
    facebook?: string;
    twitter?: string;
  };
}

export interface BusinessHours {
  weekdays: string;
  saturday: string;
  sunday: string;
}

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'checkbox' | 'radio';
  required?: boolean;
  placeholder?: string;
  options?: string[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
}

export interface Animation {
  type: 'fade' | 'slide' | 'scale' | 'rotate';
  duration: number;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    muted: string;
  };
  fonts: {
    primary: string;
    secondary: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}
export interface SiteConfig {
  name: string;
  url: string;
  description: string;
  logo: string;
  favicon: string;
  ogImage: string;
  contact: ContactInfo;
  businessHours: BusinessHours;
  social: ContactInfo['social'];
  theme: Theme;
}

export interface AppError {
  code: string;
  message: string;
  details?: any;
  timestamp: Date;
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export type DeviceType = 'mobile' | 'tablet' | 'desktop';

export interface Breakpoints {
  sm: number;
  md: number;
  lg: number;
  xl: number;
  '2xl': number;
}

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredBy<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
export type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};
