"use server";

import { Profile } from "@/types/user";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createSupabaseServerClientReadOnly() {
    const cookieStore = cookies();

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value;
                },
            },
        }
    );
}

export async function createSupabaseServerClient() {
    const cookieStore = cookies();

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value;
                },
                set(name: string, value: string, options: CookieOptions) {
                    cookieStore.set({ name, value, ...options });
                },
                remove(name: string, options: CookieOptions) {
                    cookieStore.delete({ name, ...options });
                },
            },
        }
    );
}

export async function getUserProfile(email: string) {
    const supabase = await createSupabaseServerClientReadOnly();
    const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("email", email)
        .single();
    if (error) {
        throw error;
    }
    return data as Profile;
}
