import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicPaths = [
  '/', '/about', '/services', '/projects', '/blog', '/resources',
  '/testimonials', '/contact', '/pricing', '/faq', '/career',
  '/login', '/register', '/forgot-password', '/reset-password', '/verify-email'
];

const isPublicPath = (path: string) => {
  return publicPaths.some(pp => path === pp || path.startsWith(pp + '/'));
};

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get('auth-storage')?.value;
  let isAuthenticated = false;
  let userRole = '';

  if (token) {
    try {
      const parsed = JSON.parse(token);
      isAuthenticated = !!parsed.state?.accessToken;
      userRole = parsed.state?.user?.role || '';
    } catch (e) {}
  }

  if (isPublicPath(path)) {
    if (isAuthenticated && (path === '/login' || path === '/register')) {
      const dashboardPath = ['super_admin', 'admin', 'editor'].includes(userRole) ? '/admin' : '/client';
      return NextResponse.redirect(new URL(dashboardPath, request.url));
    }
    return NextResponse.next();
  }

  // Strict admin routes - only admin/super_admin
  const strictAdminPaths = ['/admin/users', '/admin/roles', '/admin/newsletter', '/admin/settings'];
  if (strictAdminPaths.some(p => path.startsWith(p))) {
    if (!isAuthenticated) return NextResponse.redirect(new URL('/login', request.url));
    if (!['super_admin', 'admin'].includes(userRole)) return NextResponse.redirect(new URL('/', request.url));
    return NextResponse.next();
  }

  // Content admin routes - admin/super_admin/editor
  if (path.startsWith('/admin')) {
    if (!isAuthenticated) return NextResponse.redirect(new URL('/login', request.url));
    if (!['super_admin', 'admin', 'editor'].includes(userRole)) return NextResponse.redirect(new URL('/', request.url));
    return NextResponse.next();
  }

  // Client routes
  if (path.startsWith('/client') || path === '/profile' || path === '/settings' || path === '/change-password') {
    if (!isAuthenticated) return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}
