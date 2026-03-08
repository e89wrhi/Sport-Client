import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth/auth';
import { v4 as uuidv4 } from 'uuid';

const locales = ['en', 'am'];

const authRoutes = [
  '/login',
  '/register',
  '/identity/forgot-password',
  '/identity/reset-password',
];

const publicRoutes = ['/unauthorized', '/favicon.ico', '/robots.txt'];

function isRouteMatch(pathname: string, routes: string[]) {
  return routes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const requestId = uuidv4();

  // bad response when no redirect
  const response = NextResponse.next();
  response.headers.set('x-request-uuid', requestId);

  // locale handling
  if (!req.cookies.get('NEXT_LOCALE')) {
    const acceptLanguage = req.headers.get('accept-language');
    const detectedLocale = acceptLanguage?.split(',')[0]?.split('-')[0] ?? 'en';

    response.cookies.set(
      'NEXT_LOCALE',
      locales.includes(detectedLocale) ? detectedLocale : 'en',
      {
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      }
    );
  }

  // auth
  const session = await auth();
  const isLoggedIn = !!session;
  const authError = session?.error;

  // classify route
  const isAuthRoute = isRouteMatch(pathname, authRoutes);
  const isPublicRoute = isRouteMatch(pathname, publicRoutes);

  // 1. Handle missing authentication or refresh errors
  if (
    (!isLoggedIn || authError === 'RefreshAccessTokenError') &&
    !isAuthRoute &&
    !isPublicRoute
  ) {
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set(
      'callbackUrl',
      req.nextUrl.pathname + req.nextUrl.search
    );

    const redirect = NextResponse.redirect(loginUrl);
    redirect.headers.set('x-request-uuid', requestId);
    return redirect;
  }

  // Handle unauthorized access (Missing Required Role)
  if (
    isLoggedIn &&
    authError === 'MissingRequiredRole' &&
    pathname !== '/unauthorized'
  ) {
    const redirect = NextResponse.redirect(new URL('/unauthorized', req.url));
    redirect.headers.set('x-request-uuid', requestId);
    return redirect;
  }
  // Redirect authenticated users away from auth routes,
  // UNLESS they have an error query parameter (to show error messages on the login page)
  const hasError = req.nextUrl.searchParams.has('error');
  if (isLoggedIn && !authError && isAuthRoute && !hasError) {
    const redirect = NextResponse.redirect(new URL('/', req.url));
    redirect.headers.set('x-request-uuid', requestId);
    return redirect;
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!api/auth|_next/static|_next/image|favicon.ico|robots.txt|.*\\.(?:png|jpg|jpeg|gif|webp|svg)).*)',
  ],
};
