import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function handleLogout() {
    "use server";
    const supabase = await createSupabaseServerClient();

    const { error } = await supabase.auth.signOut();
    if (error) console.log(error);
}
