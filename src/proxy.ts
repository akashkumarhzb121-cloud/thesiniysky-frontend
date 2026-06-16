import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicPaths = [
  '/', '/about', '/services', '/projects', '/blog', '/resources',
  '/testimonials', '/contact', '/pricing', '/faq', '/career',
  '/login', '/register', '/forgot-password', '/reset-password', '/verify-email',
  '/unsubscribe', '/setup'
];

const isPublicPath = (path: string) => {
  return publicPaths.some(pp => path === pp || path.startsWith(pp + '/'));
};

// Helper: Extract role string from stored auth data
function getRoleFromStorage(): string {
  try {
    const token = localStorage.getItem('auth-storage');
    if (token) {
      const parsed = JSON.parse(token);
      const role = parsed.state?.user?.role;
      if (!role) return '';
      if (typeof role === 'string') return role;
      if (typeof role === 'object' && role.name) return role.name;
    }
  } catch (e) {}
  return '';
}

function isAdminRole(): boolean {
  const role = getRoleFromStorage();
  return ['super_admin', 'admin', 'editor'].includes(role);
}

function isStrictAdmin(): boolean {
  const role = getRoleFromStorage();
  return ['super_admin', 'admin'].includes(role);
}

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (isPublicPath(path)) {
    return NextResponse.next();
  }

  // Strict admin routes - only admin/super_admin
  const strictAdminPaths = ['/admin/users', '/admin/roles', '/admin/newsletter', '/admin/settings', '/admin/system-logs'];
  if (strictAdminPaths.some(p => path.startsWith(p))) {
    if (!isStrictAdmin()) return NextResponse.redirect(new URL('/login', request.url));
    return NextResponse.next();
  }

  // Content admin routes - admin/super_admin/editor
  if (path.startsWith('/admin')) {
    if (!isAdminRole()) return NextResponse.redirect(new URL('/login', request.url));
    return NextResponse.next();
  }

  return NextResponse.next();
}