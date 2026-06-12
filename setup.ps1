# setup.ps1 - Complete TheSiniySky Frontend Setup
# Run this from: C:\Users\akash\Desktop\thesiniysky-frontend

Write-Host "🚀 Starting TheSiniySky Frontend Setup..." -ForegroundColor Green

# ============================================
# ENVIRONMENT FILES
# ============================================

@"
NEXT_PUBLIC_API_URL=https://thesiniysky-backend.onrender.com/api/v1
NEXT_PUBLIC_SOCKET_URL=https://thesiniysky-backend.onrender.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
"@ | Out-File -FilePath ".env.local" -Encoding UTF8

@"
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_SOCKET_URL=
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_RAZORPAY_KEY_ID=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
"@ | Out-File -FilePath ".env.example" -Encoding UTF8

Write-Host "✅ Environment files created" -ForegroundColor Green

# ============================================
# TYPES
# ============================================

@"
// User Types
export type UserRole = 'super_admin' | 'admin' | 'editor' | 'client' | 'visitor';
export type Permission = 'read' | 'write' | 'update' | 'delete' | 'publish';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    user: User;
    accessToken: string;
    refreshToken: string;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

export interface PaginatedResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Project Types
export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  category: string;
  featured: boolean;
  thumbnail: string;
  gallery: string[];
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  clientName?: string;
  startDate: string;
  endDate?: string;
  status: 'draft' | 'published' | 'archived';
  createdAt: string;
  updatedAt: string;
}

// Blog Types
export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: User;
  thumbnail: string;
  featured: boolean;
  trending: boolean;
  tags: string[];
  readTime: number;
  likes: number;
  bookmarks: number;
  status: 'draft' | 'published' | 'archived';
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

// Service Types
export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  icon: string;
  featured: boolean;
  price?: number;
  features: string[];
  createdAt: string;
  updatedAt: string;
}

// Skill Types
export interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: number;
  icon?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

// Experience Types
export interface Experience {
  id: string;
  company: string;
  position: string;
  description: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'freelance';
  order: number;
  createdAt: string;
  updatedAt: string;
}

// Achievement Types
export interface Achievement {
  id: string;
  title: string;
  description: string;
  value: string;
  icon?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

// Testimonial Types
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar?: string;
  featured: boolean;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

// Contact Types
export interface Contact {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  createdAt: string;
  updatedAt: string;
}

// Lead Types
export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  source: string;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost';
  value?: number;
  notes?: string;
  assignedTo?: User;
  createdAt: string;
  updatedAt: string;
}

// Order Types
export interface Order {
  id: string;
  orderNumber: string;
  client: User;
  service: Service;
  amount: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled' | 'refunded';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// Payment Types
export interface Payment {
  id: string;
  order: Order;
  amount: number;
  currency: string;
  method: 'razorpay' | 'stripe';
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded';
  transactionId?: string;
  gatewayResponse?: any;
  createdAt: string;
  updatedAt: string;
}

// Invoice Types
export interface Invoice {
  id: string;
  invoiceNumber: string;
  order: Order;
  client: User;
  amount: number;
  tax: number;
  total: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  dueDate: string;
  paidAt?: string;
  items: InvoiceItem[];
  createdAt: string;
  updatedAt: string;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

// Resource Types
export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'document' | 'video' | 'link' | 'file';
  url: string;
  fileSize?: number;
  category: string;
  downloadable: boolean;
  createdAt: string;
  updatedAt: string;
}

// Media Types
export interface MediaFile {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  thumbnailUrl?: string;
  uploadedBy: User;
  createdAt: string;
  updatedAt: string;
}

// Analytics Types
export interface DashboardAnalytics {
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
  recentActivity: Activity[];
  userGrowth: ChartData[];
  revenueData: ChartData[];
  orderStats: {
    pending: number;
    processing: number;
    completed: number;
    cancelled: number;
  };
}

export interface Activity {
  id: string;
  type: string;
  description: string;
  user: User;
  createdAt: string;
}

export interface ChartData {
  label: string;
  value: number;
  date: string;
}
"@ | Out-File -FilePath "src\types\index.ts" -Encoding UTF8

Write-Host "✅ Types created" -ForegroundColor Green

# ============================================
# LIBRARY FILES
# ============================================

@"
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/stores/auth-store';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://thesiniysky-backend.onrender.com/api/v1';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ` + token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = useAuthStore.getState().refreshToken;
        if (!refreshToken) {
          throw new Error('No refresh token');
        }

        const response = await axios.post(API_URL + '/auth/refresh', {
          refreshToken,
        });

        const { accessToken, refreshToken: newRefreshToken } = response.data.data;
        useAuthStore.getState().setTokens(accessToken, newRefreshToken);
        originalRequest.headers.Authorization = `Bearer ` + accessToken;
        return apiClient(originalRequest);
      } catch (refreshError) {
        useAuthStore.getState().logout();
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
"@ | Out-File -FilePath "src\lib\axios.ts" -Encoding UTF8

@"
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
}
"@ | Out-File -FilePath "src\lib\utils.ts" -Encoding UTF8

@"
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export const projectSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  category: z.string().min(1, 'Category is required'),
  content: z.string().optional(),
  featured: z.boolean().optional(),
  status: z.enum(['draft', 'published', 'archived']).optional(),
});

export const blogSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  excerpt: z.string().min(10, 'Excerpt must be at least 10 characters'),
  content: z.string().min(50, 'Content must be at least 50 characters'),
  category: z.string().min(1, 'Category is required'),
  tags: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
});

export const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  avatar: z.string().optional(),
});

export const newsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
});
"@ | Out-File -FilePath "src\lib\validators.ts" -Encoding UTF8

Write-Host "✅ Library files created" -ForegroundColor Green

# ============================================
# STORES
# ============================================

@"
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  setUser: (user: User | null) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  login: (user: User, accessToken: string, refreshToken: string) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: true,

      setUser: (user) => set({ user }),
      
      setTokens: (accessToken, refreshToken) =>
        set({ accessToken, refreshToken }),
      
      login: (user, accessToken, refreshToken) =>
        set({
          user,
          accessToken,
          refreshToken,
          isAuthenticated: true,
          isLoading: false,
        }),
      
      logout: () =>
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
          isLoading: false,
        }),
      
      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
"@ | Out-File -FilePath "src\stores\auth-store.ts" -Encoding UTF8

@"
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark' | 'system';

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'system',
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'theme-storage',
    }
  )
);
"@ | Out-File -FilePath "src\stores\theme-store.ts" -Encoding UTF8

@"
import { create } from 'zustand';

interface UIState {
  isSidebarOpen: boolean;
  isMobileNavOpen: boolean;
  toggleSidebar: () => void;
  toggleMobileNav: () => void;
  setSidebarOpen: (open: boolean) => void;
  setMobileNavOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>()((set) => ({
  isSidebarOpen: true,
  isMobileNavOpen: false,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  toggleMobileNav: () => set((state) => ({ isMobileNavOpen: !state.isMobileNavOpen })),
  setSidebarOpen: (open) => set({ isSidebarOpen: open }),
  setMobileNavOpen: (open) => set({ isMobileNavOpen: open }),
}));
"@ | Out-File -FilePath "src\stores\ui-store.ts" -Encoding UTF8

Write-Host "✅ Stores created" -ForegroundColor Green

# ============================================
# API LAYER
# ============================================

@"
import { apiClient } from '@/lib/axios';
import { AuthResponse, User, ApiResponse } from '@/types';

export const authApi = {
  register: (data: { name: string; email: string; password: string }) =>
    apiClient.post<AuthResponse>('/auth/register', data),

  login: (data: { email: string; password: string }) =>
    apiClient.post<AuthResponse>('/auth/login', data),

  logout: () => apiClient.post<ApiResponse<null>>('/auth/logout'),

  refresh: (refreshToken: string) =>
    apiClient.post<ApiResponse<{ accessToken: string; refreshToken: string }>>(
      '/auth/refresh',
      { refreshToken }
    ),

  verifyEmail: (token: string) =>
    apiClient.post<ApiResponse<null>>('/auth/verify-email', { token }),

  forgotPassword: (email: string) =>
    apiClient.post<ApiResponse<null>>('/auth/forgot-password', { email }),

  resetPassword: (data: { token: string; password: string }) =>
    apiClient.post<ApiResponse<null>>('/auth/reset-password', data),

  changePassword: (data: { currentPassword: string; newPassword: string }) =>
    apiClient.post<ApiResponse<null>>('/auth/change-password', data),

  getMe: () => apiClient.get<ApiResponse<User>>('/auth/me'),

  updateProfile: (data: Partial<User>) =>
    apiClient.put<ApiResponse<User>>('/auth/profile', data),

  deleteAccount: () => apiClient.delete<ApiResponse<null>>('/auth/account'),
};
"@ | Out-File -FilePath "src\api\auth.api.ts" -Encoding UTF8

@"
import { apiClient } from '@/lib/axios';
import { Project, PaginatedResponse, ApiResponse } from '@/types';

export const projectsApi = {
  getProjects: (params?: {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    featured?: boolean;
    sort?: string;
  }) => apiClient.get<PaginatedResponse<Project>>('/projects', { params }),

  getFeatured: () => apiClient.get<ApiResponse<Project[]>>('/projects/featured'),

  getStatsOverview: () => apiClient.get<ApiResponse<any>>('/projects/stats/overview'),

  getByCategory: (category: string) =>
    apiClient.get<ApiResponse<Project[]>>('/projects/category/' + category),

  getBySlug: (slug: string) =>
    apiClient.get<ApiResponse<Project>>('/projects/slug/' + slug),

  getById: (id: string) =>
    apiClient.get<ApiResponse<Project>>('/projects/' + id),

  create: (data: FormData | Partial<Project>) =>
    apiClient.post<ApiResponse<Project>>('/projects', data),

  update: (id: string, data: Partial<Project>) =>
    apiClient.put<ApiResponse<Project>>('/projects/' + id, data),

  delete: (id: string) =>
    apiClient.delete<ApiResponse<null>>('/projects/' + id),

  getRelated: (id: string) =>
    apiClient.get<ApiResponse<Project[]>>('/projects/' + id + '/related'),
};
"@ | Out-File -FilePath "src\api\projects.api.ts" -Encoding UTF8

@"
import { apiClient } from '@/lib/axios';
import { Blog, PaginatedResponse, ApiResponse } from '@/types';

export const blogsApi = {
  getBlogs: (params?: {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
  }) => apiClient.get<PaginatedResponse<Blog>>('/blogs', { params }),

  getTrending: () => apiClient.get<ApiResponse<Blog[]>>('/blogs/trending'),

  getFeatured: () => apiClient.get<ApiResponse<Blog[]>>('/blogs/featured'),

  getBySlug: (slug: string) =>
    apiClient.get<ApiResponse<Blog>>('/blogs/slug/' + slug),

  getById: (id: string) =>
    apiClient.get<ApiResponse<Blog>>('/blogs/' + id),

  create: (data: Partial<Blog>) =>
    apiClient.post<ApiResponse<Blog>>('/blogs', data),

  update: (id: string, data: Partial<Blog>) =>
    apiClient.put<ApiResponse<Blog>>('/blogs/' + id, data),

  delete: (id: string) =>
    apiClient.delete<ApiResponse<null>>('/blogs/' + id),

  like: (id: string) =>
    apiClient.post<ApiResponse<null>>('/blogs/' + id + '/like'),

  bookmark: (id: string) =>
    apiClient.post<ApiResponse<null>>('/blogs/' + id + '/bookmark'),

  addComment: (id: string, content: string) =>
    apiClient.post<ApiResponse<null>>('/blogs/' + id + '/comments', { content }),
};
"@ | Out-File -FilePath "src\api\blogs.api.ts" -Encoding UTF8

Write-Host "✅ API files created" -ForegroundColor Green

# ============================================
# HOOKS
# ============================================

@"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authApi } from '@/api/auth.api';
import { useAuthStore } from '@/stores/auth-store';
import { useRouter } from 'next/navigation';

export const useLogin = () => {
  const login = useAuthStore((state) => state.login);
  const router = useRouter();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (response) => {
      const { user, accessToken, refreshToken } = response.data.data;
      login(user, accessToken, refreshToken);
      router.push('/dashboard');
    },
  });
};

export const useRegister = () => {
  const login = useAuthStore((state) => state.login);
  const router = useRouter();

  return useMutation({
    mutationFn: authApi.register,
    onSuccess: (response) => {
      const { user, accessToken, refreshToken } = response.data.data;
      login(user, accessToken, refreshToken);
      router.push('/dashboard');
    },
  });
};

export const useLogout = () => {
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      logout();
      router.push('/');
    },
  });
};

export const useCurrentUser = () => {
  const { isAuthenticated } = useAuthStore();

  return useQuery({
    queryKey: ['currentUser'],
    queryFn: () => authApi.getMe().then((res) => res.data.data),
    enabled: isAuthenticated,
  });
};
"@ | Out-File -FilePath "src\hooks\use-auth.ts" -Encoding UTF8

@"
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { projectsApi } from '@/api/projects.api';

export const useProjects = (params?: any) => {
  return useQuery({
    queryKey: ['projects', params],
    queryFn: () => projectsApi.getProjects(params).then((res) => res.data),
  });
};

export const useProject = (id: string) => {
  return useQuery({
    queryKey: ['project', id],
    queryFn: () => projectsApi.getById(id).then((res) => res.data.data),
    enabled: !!id,
  });
};

export const useProjectBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['project', 'slug', slug],
    queryFn: () => projectsApi.getBySlug(slug).then((res) => res.data.data),
    enabled: !!slug,
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: projectsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: projectsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
};
"@ | Out-File -FilePath "src\hooks\use-projects.ts" -Encoding UTF8

Write-Host "✅ Hooks created" -ForegroundColor Green

# ============================================
# CONFIG
# ============================================

@"
export const siteConfig = {
  name: 'TheSiniySky',
  description: 'Premium SaaS Platform for Project Management and Client Services',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  ogImage: '/og-image.png',
  links: {
    twitter: 'https://twitter.com/thesiniysky',
    github: 'https://github.com/thesiniysky',
  },
};

export const apiConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://thesiniysky-backend.onrender.com/api/v1',
  socketURL: process.env.NEXT_PUBLIC_SOCKET_URL || 'https://thesiniysky-backend.onrender.com',
};
"@ | Out-File -FilePath "src\config\site.ts" -Encoding UTF8

@"
export interface NavItem {
  title: string;
  href: string;
  icon?: string;
  children?: NavItem[];
  roles?: string[];
}

export const publicNav: NavItem[] = [
  { title: 'Home', href: '/' },
  { title: 'About', href: '/about' },
  { title: 'Services', href: '/services' },
  { title: 'Projects', href: '/projects' },
  { title: 'Blog', href: '/blog' },
  { title: 'Resources', href: '/resources' },
  { title: 'Contact', href: '/contact' },
];

export const clientNav: NavItem[] = [
  { title: 'Dashboard', href: '/client/dashboard', icon: 'LayoutDashboard' },
  { title: 'Orders', href: '/client/orders', icon: 'ShoppingCart' },
  { title: 'Invoices', href: '/client/invoices', icon: 'FileText' },
  { title: 'Messages', href: '/client/messages', icon: 'MessageSquare' },
  { title: 'Documents', href: '/client/documents', icon: 'FolderOpen' },
  { title: 'Support', href: '/client/support', icon: 'Headphones' },
];

export const adminNav: NavItem[] = [
  { title: 'Dashboard', href: '/admin/dashboard', icon: 'LayoutDashboard' },
  { title: 'Users', href: '/admin/users', icon: 'Users' },
  { title: 'Projects', href: '/admin/projects', icon: 'Briefcase' },
  { title: 'Blogs', href: '/admin/blogs', icon: 'FileEdit' },
  { title: 'Services', href: '/admin/services', icon: 'Wrench' },
  { title: 'Skills', href: '/admin/skills', icon: 'Award' },
  { title: 'Experience', href: '/admin/experience', icon: 'Building2' },
  { title: 'Achievements', href: '/admin/achievements', icon: 'Trophy' },
  { title: 'Testimonials', href: '/admin/testimonials', icon: 'Star' },
  { title: 'Leads', href: '/admin/leads', icon: 'UserPlus' },
  { title: 'Orders', href: '/admin/orders', icon: 'ShoppingCart' },
  { title: 'Payments', href: '/admin/payments', icon: 'CreditCard' },
  { title: 'Invoices', href: '/admin/invoices', icon: 'FileText' },
  { title: 'Newsletter', href: '/admin/newsletter', icon: 'Mail' },
  { title: 'Media', href: '/admin/media', icon: 'Image' },
  { title: 'Analytics', href: '/admin/analytics', icon: 'BarChart3' },
  { title: 'Settings', href: '/admin/settings', icon: 'Settings' },
];
"@ | Out-File -FilePath "src\config\navigation.ts" -Encoding UTF8

Write-Host "✅ Config files created" -ForegroundColor Green

# ============================================
# COMPONENTS - UI
# ============================================

@"
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
"@ | Out-File -FilePath "src\components\ui\button.tsx" -Encoding UTF8

@"
import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
"@ | Out-File -FilePath "src\components\ui\input.tsx" -Encoding UTF8

@"
import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
"@ | Out-File -FilePath "src\components\ui\label.tsx" -Encoding UTF8

@"
import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
"@ | Out-File -FilePath "src\components\ui\card.tsx" -Encoding UTF8

Write-Host "✅ UI components created" -ForegroundColor Green

# ============================================
# LAYOUT COMPONENTS
# ============================================

@"
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/auth-store';
import { useThemeStore } from '@/stores/theme-store';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { publicNav } from '@/config/navigation';

export function PublicHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated, user } = useAuthStore();
  const { theme, setTheme } = useThemeStore();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              TheSiniySky
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            {publicNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === item.href ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          {isAuthenticated ? (
            <Link href={user?.role === 'admin' || user?.role === 'super_admin' ? '/admin/dashboard' : '/client/dashboard'}>
              <Button>Dashboard</Button>
            </Link>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/register">
                <Button>Get Started</Button>
              </Link>
            </div>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t p-4">
          <nav className="flex flex-col gap-3">
            {publicNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === item.href ? 'text-primary' : 'text-muted-foreground'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.title}
              </Link>
            ))}
            {!isAuthenticated && (
              <div className="flex flex-col gap-2 pt-2">
                <Link href="/login">
                  <Button variant="outline" className="w-full">Login</Button>
                </Link>
                <Link href="/register">
                  <Button className="w-full">Get Started</Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
"@ | Out-File -FilePath "src\components\layout\public-header.tsx" -Encoding UTF8

@"
import Link from 'next/link';
import { publicNav } from '@/config/navigation';

export function PublicFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">TheSiniySky</h3>
            <p className="text-sm text-muted-foreground">
              Premium SaaS platform for modern businesses. Transform your digital presence.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {publicNav.slice(0, 5).map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-muted-foreground hover:text-primary">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><Link href="/services" className="text-sm text-muted-foreground hover:text-primary">Web Development</Link></li>
              <li><Link href="/services" className="text-sm text-muted-foreground hover:text-primary">Mobile Apps</Link></li>
              <li><Link href="/services" className="text-sm text-muted-foreground hover:text-primary">UI/UX Design</Link></li>
              <li><Link href="/services" className="text-sm text-muted-foreground hover:text-primary">Cloud Solutions</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">contact@thesiniysky.com</li>
              <li className="text-sm text-muted-foreground">+1 (555) 123-4567</li>
              <li className="text-sm text-muted-foreground">New York, NY 10001</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} TheSiniySky. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
"@ | Out-File -FilePath "src\components\layout\public-footer.tsx" -Encoding UTF8

Write-Host "✅ Layout components created" -ForegroundColor Green

# ============================================
# SECTIONS
# ============================================

@"
'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="absolute inset-0 bg-grid-white/10" />
      
      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Transform Your Digital
              <span className="text-primary block mt-2">
                Presence with TheSiniySky
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Build stunning SaaS applications with our modern platform. 
            Fast, secure, and scalable solutions for your business needs.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/register">
              <Button size="lg" className="group">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="outline" size="lg" className="group">
                <Play className="mr-2 h-4 w-4" />
                View Demo
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
"@ | Out-File -FilePath "src\components\sections\hero-section.tsx" -Encoding UTF8

@"
'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Code2, Palette, Smartphone, Cloud, Shield, Zap } from 'lucide-react';

const services = [
  {
    icon: Code2,
    title: 'Web Development',
    description: 'Modern web applications built with cutting-edge technologies.',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Beautiful and intuitive user interfaces that users love.',
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    description: 'Native and cross-platform mobile applications.',
  },
  {
    icon: Cloud,
    title: 'Cloud Solutions',
    description: 'Scalable cloud infrastructure and deployment.',
  },
  {
    icon: Shield,
    title: 'Security',
    description: 'Enterprise-grade security for your applications.',
  },
  {
    icon: Zap,
    title: 'Performance',
    description: 'Lightning-fast applications optimized for speed.',
  },
];

export function ServicesSection() {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive digital solutions to help your business grow and succeed in the modern world.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <service.icon className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>✓ Custom solutions</li>
                    <li>✓ Modern technology stack</li>
                    <li>✓ 24/7 support</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
"@ | Out-File -FilePath "src\components\sections\services-section.tsx" -Encoding UTF8

@"
'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function CTASection() {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Join thousands of satisfied clients and transform your business with our powerful platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" variant="secondary">
                Start Free Trial
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="bg-transparent border-white hover:bg-white/10">
                Contact Sales
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
"@ | Out-File -FilePath "src\components\sections\cta-section.tsx" -Encoding UTF8

Write-Host "✅ Sections created" -ForegroundColor Green

# ============================================
# PAGES
# ============================================

@"
import { HeroSection } from '@/components/sections/hero-section';
import { ServicesSection } from '@/components/sections/services-section';
import { CTASection } from '@/components/sections/cta-section';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <CTASection />
    </>
  );
}
"@ | Out-File -FilePath "src\app\(public)\page.tsx" -Encoding UTF8

@"
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLogin } from '@/hooks/use-auth';
import Link from 'next/link';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const loginMutation = useLogin();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginForm) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50 py-12 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                {...register('email')}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...register('password')}
              />
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={loginMutation.isPending}>
              {loginMutation.isPending ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            <Link href="/forgot-password" className="text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
          <div className="mt-2 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
"@ | Out-File -FilePath "src\app\(auth)\login\page.tsx" -Encoding UTF8

@"
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useRegister } from '@/hooks/use-auth';
import Link from 'next/link';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const registerMutation = useRegister();
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterForm) => {
    const { confirmPassword, ...registerData } = data;
    registerMutation.mutate(registerData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50 py-12 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
          <CardDescription>
            Enter your information to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                {...register('name')}
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                {...register('email')}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...register('password')}
              />
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                {...register('confirmPassword')}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={registerMutation.isPending}>
              {registerMutation.isPending ? 'Creating account...' : 'Create account'}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link href="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
"@ | Out-File -FilePath "src\app\(auth)\register\page.tsx" -Encoding UTF8

# ============================================
# APP LAYOUT
# ============================================

@"
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TheSiniySky - Premium SaaS Platform',
  description: 'Modern SaaS platform for project management and client services',
  keywords: 'saas, project management, web development, cloud solutions',
  openGraph: {
    title: 'TheSiniySky - Premium SaaS Platform',
    description: 'Modern SaaS platform for project management and client services',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
"@ | Out-File -FilePath "src\app\layout.tsx" -Encoding UTF8

@"
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'sonner';
import { useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000,
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <Toaster position="top-right" richColors />
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
"@ | Out-File -FilePath "src\app\providers.tsx" -Encoding UTF8

@"
import { PublicHeader } from '@/components/layout/public-header';
import { PublicFooter } from '@/components/layout/public-footer';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PublicHeader />
      <main className="min-h-screen">{children}</main>
      <PublicFooter />
    </>
  );
}
"@ | Out-File -FilePath "src\app\(public)\layout.tsx" -Encoding UTF8

@"
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
"@ | Out-File -FilePath "src\app\(auth)\layout.tsx" -Encoding UTF8

Write-Host "✅ App layout created" -ForegroundColor Green

# ============================================
# COMPLETE
# ============================================

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "🎉 SETUP COMPLETE!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Run: npm install" -ForegroundColor White
Write-Host "2. Run: npm run dev" -ForegroundColor White
Write-Host "3. Open: http://localhost:3000" -ForegroundColor White
Write-Host ""