// import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

export async function middleware(req: any) {
    // const res = NextResponse.next();
    // const supabase = createMiddlewareClient({ req, res });

    // const {
    //     data: { user },
    // } = await supabase.auth.getUser();

    // // if user is not signed in and the current path is not / redirect the user to /
    // if (!user && req.nextUrl.pathname !== "/") {
    //     return NextResponse.redirect(new URL("/", req.url));
    // }

    // return res;
    return;
}

// export const config = {
//     matcher: ["/", "/panel", "/dashboard"],
// };
