"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function getUserSession() {
    const supabase = await createSupabaseServerClient();
    return supabase.auth.getSession();
}

export async function getUser() {
    const supabase = await createSupabaseServerClient();
    return supabase.auth.getUser();
}
