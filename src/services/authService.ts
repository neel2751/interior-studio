import api, { type ApiResponse } from '@/lib/api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  avatar?: string;
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
  refreshToken?: string;
}

const TOKEN_KEY = 'auth_token';
const REFRESH_KEY = 'refresh_token';

export const tokenStorage = {
  get: () =>
    typeof window !== 'undefined' ? localStorage.getItem(TOKEN_KEY) : null,

  set: (token: string) =>
    typeof window !== 'undefined' && localStorage.setItem(TOKEN_KEY, token),

  clear: () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
  },
};

const ENDPOINTS = {
  login:    '/auth/login',
  register: '/auth/register',
  logout:   '/auth/logout',
  me:       '/auth/me',
  refresh:  '/auth/refresh',
} as const;
export const authService = {

  /** Login — stores token in localStorage on success */
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const res = await api.post<ApiResponse<AuthResponse>>(
      ENDPOINTS.login,
      credentials
    );
    if (res.data?.token) {
      tokenStorage.set(res.data.token);
    }
    return res.data!;
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    const res = await api.post<ApiResponse<AuthResponse>>(
      ENDPOINTS.register,
      data
    );
    if (res.data?.token) {
      tokenStorage.set(res.data.token);
    }
    return res.data!;
  },

  logout: async (): Promise<void> => {
    try {
      await api.post(ENDPOINTS.logout);
    } finally {
      tokenStorage.clear();
    }
  },

  getMe: () =>
    api.get<ApiResponse<AuthUser>>(ENDPOINTS.me),

  /** Check if user is logged in */
  isAuthenticated: (): boolean => !!tokenStorage.get(),
};

export default authService;