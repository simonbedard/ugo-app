import { NextResponse } from 'next/server';
// This function can be marked `async` if using `await` inside
export async function middleware(request) {
    let response = NextResponse.next();
    
    /**
     * If the cookie is not set, we fetch it from laravel sanctum api
     * We then add it to the current request to let the browser to the reste and read it
     */
    if(!request.cookies.has('XSRF-TOKEN')){
      const SANCTUN_API_TOKEN = "http://localhost/sanctum/csrf-cookie"
      const res = await fetch(SANCTUN_API_TOKEN, {
        credentials: "include"
      })

      // Recommendation: handle errors
      if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch the csrf-token');
      }
  
      const setCookie = res.headers.get('set-cookie')

      response.headers.set('set-cookie', setCookie);
    }

    return response;
}
 
export const config = {
    matcher: [
      /*
       * Match all request paths except for the ones starting with:
       * - api (API routes)
       * - _next/static (static files)
       * - _next/image (image optimization files)
       * - favicon.ico (favicon file)
       */
      '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
  };