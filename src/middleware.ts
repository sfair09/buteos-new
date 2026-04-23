import { NextRequest, NextResponse } from 'next/server';
import { getLocationFromHeaders } from '@/utils/location';

export async function middleware(request: NextRequest) {
  // getLocationFromHeaders is async; await it to avoid storing a Promise
  const location = await getLocationFromHeaders();
  const response = NextResponse.next();

  // Ensure we set a string value
  response.headers.set('x-user-location', String(location));

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};