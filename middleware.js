// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const authToken = request.cookies.get('auth-token');
  
  // Check if the user is trying to access protected routes
  if (request.nextUrl.pathname.startsWith('/dashboard') ||
      request.nextUrl.pathname.startsWith('/templates')) {
    
    if (!authToken) {
      // Redirect to login if there's no token
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    }
  }

  // Allow the request to continue
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/templates/:path*']
};