// User and Auth Types
export type UserRole = 'super_admin' | 'admin' | 'editor' | 'client' | 'visitor';
export type Permission = 'read' | 'write' | 'update' | 'delete' | 'publish';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole | { name: string; displayName?: string; permissions?: any[]; [key: string]: any };
  avatar?: string;
  emailVerified: boolean;
  permissions: Permission[];
  createdAt: string;
  updatedAt: string;
}

export interface Role {
  id: string;
  name: string;
  permissions: Permission[];
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

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface Comment {
  id: string;
  content: string;
  user: User;
  createdAt: string;
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
}

// Achievement Types
export interface Achievement {
  id: string;
  title: string;
  description: string;
  value: string;
  icon?: string;
  order: number;
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
  createdAt: string;
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
