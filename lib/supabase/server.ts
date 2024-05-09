"use server";

// import { Profile } from "@/types/user";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { Database } from "../database.types";

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
        }
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

export async function getSkills() {
    const supabase = await createSupabaseServerClientReadOnly();
    const { data, error } = await supabase.from("skills").select("*");
    if (error || !data) {
        throw error;
    }
    return data;
}

export async function updateProject(project: any) {
    const supabase = await createSupabaseServerClient();
    const skills = project.stack;
    const { stack, ...projectData } = project;
    const { data: projectDataResponse, error: projectError } = await supabase
        .from("projects")
        .update(projectData)
        .eq("id", project.id)
        .select()
        .single();
    if (projectError) {
        throw projectError;
    }

    // for each skill, insert a connection between the project and the skill in the project_skills table

    skills.forEach(async (skill: any) => {
        const { data, error } = await supabase
            .from("skills")
            .select("*")
            .eq("name", skill)
            .single();
        if (error) {
            throw error;
        }

        const skillId = data.id;

        const { data: projectSkillData, error: projectSkillError } =
            await supabase.from("stack").upsert({
                project_id: projectDataResponse.id,
                skill_id: skillId,
            });
        if (projectSkillError) {
            throw projectSkillError;
        }
    });

    return projectDataResponse;
}

export async function createProject(project: any) {
    const supabase = await createSupabaseServerClient();
    const skills = project.stack;
    const { stack, ...projectData } = project;
    const { data: projectDataResponse, error: projectError } = await supabase
        .from("projects")
        .insert(projectData)
        .select()
        .single();
    if (projectError) {
        throw projectError;
    }

    // for each skill, insert a connection between the project and the skill in the project_skills table

    skills.forEach(async (skill: any) => {
        const { data, error } = await supabase
            .from("skills")
            .select("*")
            .eq("name", skill)
            .single();
        if (error) {
            throw error;
        }

        const skillId = data.id;

        const { data: projectSkillData, error: projectSkillError } =
            await supabase.from("stack").upsert({
                project_id: projectDataResponse.id,
                skill_id: skillId,
            });
        if (projectSkillError) {
            throw projectSkillError;
        }
    });

    return projectDataResponse;
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
        throw projectError;
    }
    return projectData;
}

export async function createSkill(skill: any) {
    const supabase = await createSupabaseServerClient();
    const { data: skillData, error: skillError } = await supabase
        .from("skills")
        .insert({ ...skill, category: skill.category.toLowerCase() })
        .select()
        .single();
    if (skillError) {
        throw skillError;
    }
    return skillData;
}

export async function updateSkill(skill: any) {
    const supabase = await createSupabaseServerClient();
    const { data: skillData, error: skillError } = await supabase
        .from("skills")
        .update({ ...skill, category: skill.category.toLowerCase() })
        .eq("id", skill.id)
        .select()
        .single();
    if (skillError) {
        throw skillError;
    }
    return skillData;
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
        throw skillError;
    }
    return skillData;
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
        throw error;
    }
    return data;
}

export async function createEducation(education: any) {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
        .from("education")
        .insert(education)
        .select()
        .single();
    if (error) {
        throw error;
    }
    return data;
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
    return data;
}
