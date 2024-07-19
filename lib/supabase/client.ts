import { createBrowserClient } from "@supabase/ssr";
import { Database } from "../database.types";

export default function createSupabaseBrowerClient() {
    return createBrowserClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );
}

export async function uploadImage(
    project_id: string,
    imageOptions: {
        file: File;
        ext: string;
        id: string;
    },
) {
    const supabase = createSupabaseBrowerClient();

    const { data, error } = await supabase.storage
        .from("projects")
        .upload(
            `${project_id}/${imageOptions.id}.${imageOptions.ext}`,
            imageOptions.file,
            {
                upsert: true,
            },
        );

    if (error) {
        return { error };
    }

    return { data };
}

export async function addProjectImage(
    project_id: string,
    imageOptions: {
        file: File;
        ext: string;
    },
) {
    const randomId = Math.random().toString(36).substring(2, 15);

    const supabase = createSupabaseBrowerClient();

    const { data, error } = await supabase
        .from("images")
        .insert({
            project_id: project_id,
            url: `${project_id}/${randomId}.${imageOptions.ext}`,
        })
        .select()
        .single();
    if (error) {
        return { error };
    }

    // upload the image to storage
    const { data: storageData, error: storageError } = await uploadImage(
        project_id,
        {
            file: imageOptions.file,
            ext: imageOptions.ext,
            id: randomId,
        },
    );

    if (storageError) {
        return { error: storageError };
    }

    return { data, storageData };
}

export async function updateProject(
    project: any,
): Promise<{ data?: any; error?: any }> {
    const supabase = createSupabaseBrowerClient();
    const { stack: skills, images, thumbnail, ...projectData } = project;
    const { data: projectDataResponse, error: projectError } = await supabase
        .from("projects")
        .update({
            ...projectData,
            thumbnail: `${project.id}/thumbnail.${thumbnail.ext}`,
        })
        .eq("id", project.id)
        .select()
        .single();

    if (projectError) {
        return { error: projectError };
    }

    const { data: thumbnailData, error: thumbnailError } = await uploadImage(
        projectDataResponse.id,
        {
            file: thumbnail.file,
            ext: thumbnail.ext,
            id: "thumbnail",
        },
    );

    if (thumbnailError) {
        return { error: thumbnailError };
    }

    skills.forEach(async (skill: any) => {
        const { data, error } = await supabase
            .from("skills")
            .select("*")
            .eq("name", skill)
            .single();
        if (error) {
            return { error };
        }

        const skillId = data.id;

        const { data: projectSkillData, error: projectSkillError } =
            await supabase.from("stack").upsert({
                project_id: projectDataResponse.id,
                skill_id: skillId,
            });
        if (projectSkillError) {
            return { error: projectSkillError };
        }
    });

    if (images.length > 0) {
        for (const image of images) {
            if (typeof image === "string") {
                continue;
            }

            const { data, error } = await addProjectImage(
                projectDataResponse.id,
                image,
            );

            if (error) {
                return { error };
            }
        }
    } else {
        console.log("No images");
    }

    return { data: projectDataResponse };
}

export async function createProject(project: any) {
    const supabase = createSupabaseBrowerClient();
    const { id, skills, images, thumbnail, ...projectData } = project;
    console.log("Project data: ", projectData);
    const { data: projectDataResponse, error: projectError } = await supabase
        .from("projects")
        .insert({
            ...projectData,
            thumbnail: `${project.id}/thumbnail.${thumbnail.ext}`,
        })
        .select()
        .single();

    if (projectError) {
        console.error("Project error: ", projectError);
        return { error: projectError };
    }

    const { data: thumbnailData, error: thumbnailError } = await uploadImage(
        projectDataResponse.id,
        {
            file: thumbnail.file,
            ext: thumbnail.ext,
            id: "thumbnail",
        },
    );

    if (thumbnailError) {
        console.error("Thumbnail error: ", thumbnailError);
        return { error: thumbnailError };
    }

    skills.forEach(async (skill: { name: string }) => {
        const { data, error } = await supabase
            .from("skills")
            .select("*")
            .eq("name", skill.name)
            .single();
        if (error) {
            console.error("Skill error: ", error);
            throw error;
        }

        const skillId = data.id;

        const { data: projectSkillData, error: projectSkillError } =
            await supabase.from("stack").upsert({
                project_id: projectDataResponse.id,
                skill_id: skillId,
            });
        if (projectSkillError) {
            console.error("Project skill error: ", projectSkillError);
            return { error: projectSkillError };
        }
    });

    if (images.length > 0) {
        for (const image of images) {
            if (typeof image === "string") {
                continue;
            }

            const { data, error } = await addProjectImage(
                projectDataResponse.id,
                image,
            );
            if (error) {
                console.error("Image error: ", error);
                return { error };
            }
        }
    } else {
        console.log("No images");
    }

    return { data: projectDataResponse };
}

export async function uploadFile(
    file: File,
    bucket: "projects" | "skills",
    path: string,
) {
    const supabase = createSupabaseBrowerClient();
    const { data, error } = await supabase.storage
        .from(bucket)
        .upload(path, file, {
            upsert: true,
        });
    if (error) {
        return { error };
    }
    return { data };
}

export async function deleteFile(
    bucket: "projects" | "skills",
    fullPath: string,
) {
    const supabase = createSupabaseBrowerClient();
    const { data, error } = await supabase.storage
        .from(bucket)
        .remove([fullPath]);
    if (error) {
        return { error };
    }
    return { data };
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
