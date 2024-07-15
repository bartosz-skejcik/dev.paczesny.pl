import { createSupabaseServerClient } from "@lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST() {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
        return new NextResponse(
            JSON.stringify({
                error: error.message,
            }),
            { status: 500 },
        );
    }

    return new NextResponse(null, { status: 200 });
}
