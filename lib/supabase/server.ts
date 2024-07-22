"use server";

// import { Profile } from "@/types/user";
import { Database } from "../database.types";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createSupabaseServerClientReadOnly() {
    const cookieStore = cookies();

    return createServerClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value;
                },
            },
        },
    );
}

export async function createSupabaseServerClient() {
    const cookieStore = cookies();

    return createServerClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value;
                },
                set(name: string, value: string, options: CookieOptions) {
                    try {
                        cookieStore.set({ name, value, ...options });
                    } catch (error) {
                        // The `set` method was called from a Server Component.
                        // This can be ignored if you have middleware refreshing
                        // user sessions.
                    }
                },
                remove(name: string, options: CookieOptions) {
                    try {
                        cookieStore.set({ name, value: "", ...options });
                    } catch (error) {
                        // The `delete` method was called from a Server Component.
                        // This can be ignored if you have middleware refreshing
                        // user sessions.
                    }
                },
            },
        },
    );
}

export async function singOut() {
    "use server";
    const supabase = await createSupabaseServerClientReadOnly();
    const { error } = await supabase.auth.signOut();

    if (error) {
        throw error;
    }
}

export async function getUserProfile(email: string) {
    const supabase = await createSupabaseServerClientReadOnly();
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

export async function getProjects() {
    const supabase = await createSupabaseServerClientReadOnly();
    const { data, error } = await supabase
        .from("projects")
        .select("*, skills ( name )");
    if (error) {
        throw error;
    }
    return data;
}

export async function getProject(id: string) {
    const supabase = await createSupabaseServerClientReadOnly();
    const { data, error } = await supabase
        .from("projects")
        .select(
            "*, skills ( experience, id, name, icon, category ), images ( id, url )",
        )
        .eq("id", id)
        .single();
    if (error) {
        throw error;
    }
    return data;
}

export async function getSkills() {
    const supabase = await createSupabaseServerClientReadOnly();
    const { data, error } = await supabase.from("skills").select("*");
    if (error || !data) {
        throw error;
    }
    return data;
}

export async function deleteProject(project_id: string) {
    const supabase = await createSupabaseServerClient();
    const { data: projectData, error: projectError } = await supabase
        .from("projects")
        .delete()
        .eq("id", project_id)
        .select()
        .single();
    if (projectError) {
        return { error: projectError };
    }
    return { data: projectData };
}

export async function createSkill(skill: any, fileOptions: { path: string }) {
    const supabase = await createSupabaseServerClient();
    const { data: skillData, error: skillError } = await supabase
        .from("skills")
        .insert({
            ...skill,
            category: skill.category.toLowerCase(),
            icon: fileOptions.path,
        })
        .select()
        .single();

    if (skillError) {
        return { error: skillError };
    }

    return { data: skillData };
}

export async function updateSkill(skill: any, fileOptions: { path: string }) {
    const supabase = await createSupabaseServerClient();
    const { data: skillData, error: skillError } = await supabase
        .from("skills")
        .update({
            ...skill,
            category: skill.category.toLowerCase(),
            icon: fileOptions.path,
        })
        .eq("id", skill.id)
        .select()
        .single();
    if (skillError) {
        return { error: skillError };
    }
    return { data: skillData };
}

export async function deleteSkill(skill_id: string) {
    const supabase = await createSupabaseServerClient();
    const { data: skillData, error: skillError } = await supabase
        .from("skills")
        .delete()
        .eq("id", skill_id)
        .select()
        .single();
    if (skillError) {
        return { error: skillError };
    }
    return { data: skillData };
}

export async function getEducation() {
    const supabase = await createSupabaseServerClientReadOnly();
    const { data, error } = await supabase.from("education").select("*");
    if (error) {
        throw error;
    }
    return data;
}

export async function updateEducation(education: any) {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
        .from("education")
        .update(education)
        .eq("id", education.id)
        .select()
        .single();
    if (error) {
        return { error };
    }
    return { data };
}

export async function createEducation(education: any) {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
        .from("education")
        .insert(education)
        .select()
        .single();
    if (error) {
        return { error };
    }
    return { data };
}

export async function deleteEducation(education_id: string) {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
        .from("education")
        .delete()
        .eq("id", education_id)
        .select()
        .single();
    if (error) {
        throw error;
    }
    return { data };
}

export async function deleteProjectImage(project_id: string, image_id: string) {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
        .from("images")
        .delete()
        .eq("project_id", project_id)
        .eq("id", image_id)
        .select()
        .single();
    if (error) {
        return { error };
    }

    // delete the image from storage
    const { data: storageData, error: storageError } = await supabase.storage
        .from("projects")
        .remove([data.url]);

    if (storageError) {
        return { error: storageError };
    }

    return { data, storageData };
}
