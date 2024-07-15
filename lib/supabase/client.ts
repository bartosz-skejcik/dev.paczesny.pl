import { createBrowserClient } from "@supabase/ssr";
import { Database } from "../database.types";

export default function createSupabaseBrowerClient() {
    return createBrowserClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );
}

export async function getUserProfile(email: string) {
    const supabase = createSupabaseBrowerClient();
    const { data, error } = await supabase
        .from("profiles")
        .select("*, user_roles (role)")
        .eq("email", email)
        .single();
    if (error) {
        throw error;
    }
    return data;
}
