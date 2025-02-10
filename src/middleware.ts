import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";

const publicRoutes = ["/login", "/signin"];
const protectedRoutes = ["/"];

export async function middleware(req: NextRequest) {
	const path = req.nextUrl.pathname;
	const isProtectedRoute = protectedRoutes.includes(path);
	const isPublicRoute = publicRoutes.includes(path);

    const sessionCookie = (await cookies()).get('session')?.value
	let session = null;
	
	try {
		session = sessionCookie ? JSON.parse(sessionCookie) : null;
	} catch (error) {
		console.error("Error parsing session cookie:", error);
	}
	
	if (isProtectedRoute && !session?.username) {
		return NextResponse.redirect(new URL("/login", req.nextUrl));
	}
	
	if (isPublicRoute && session?.username) {
		return NextResponse.redirect(new URL("/", req.nextUrl))
	}
	return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
