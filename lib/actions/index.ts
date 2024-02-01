"use server";

import { createSupabaseServerClientReadOnly } from "../supabase/server";
import { unstable_noStore as noStore } from "next/cache";

export async function readUserSession() {
    noStore();
    const supabase = await createSupabaseServerClientReadOnly();
    return await supabase.auth.getSession();
}
