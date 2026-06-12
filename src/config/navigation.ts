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
