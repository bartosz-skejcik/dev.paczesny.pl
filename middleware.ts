import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

export async function middleware(req: any) {
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-url", req.url);

    const res = NextResponse.next({
        request: {
            // Apply new request headers
            headers: requestHeaders,
        },
    });

    const supabase = createMiddlewareClient({ req, res });

    const {
        data: { user },
    } = await supabase.auth.getUser();

    // if user is not signed in and the current path is not / redirect the user to /
    if (!user && req.nextUrl.pathname !== "/") {
        return NextResponse.redirect(new URL("/auth", req.url));
    }

    return res;
}

export const config = {
    matcher: ["/", "/dashboard", "/dashboard/analytics"],
};
