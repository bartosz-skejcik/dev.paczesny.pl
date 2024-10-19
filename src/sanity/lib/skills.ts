import { defineQuery } from "next-sanity";
import { client } from "@/sanity/lib/client";
import {
    internalGroqTypeReferenceTo,
    SanityImageCrop,
    SanityImageHotspot,
    SkillsByCategoryQueryResult,
} from "../types";

const options = {
    //next: {
    //    revalidate: 60,
    //},
};

const categoryOrder = ["frontend", "backend", "tools", "soft_skills", "other"];

export type GroupedSkillsByCategory = {
    _id: string;
    name: "backend" | "frontend" | "other" | "soft_skills" | "tools" | null;
    skills: Array<{
        _id: string;
        name: string | null;
        icon: {
            asset?: {
                _ref: string;
                _type: "reference";
                _weak?: boolean;
                [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
            };
            hotspot?: SanityImageHotspot;
            crop?: SanityImageCrop;
            _type: "image";
        } | null;
        experience: string | null;
    }>;
};

export async function getSkillsByCategory(): Promise<
    GroupedSkillsByCategory[]
> {
    const skillsByCategoryQuery = defineQuery(`*[_type == "skill"] {
  category,
  _id,
  name,
  icon,
  experience
}`);

    const skills: SkillsByCategoryQueryResult = await client.fetch(
        skillsByCategoryQuery,
        {},
        options,
    );

    // Group by category
    const groupedSkills = skills.reduce((acc: any, skill: any) => {
        const { category } = skill;
        if (!acc[category]) {
            acc[category] = { name: category, skills: [] };
        }
        acc[category].skills.push({
            _id: skill._id,
            name: skill.name,
            icon: skill.icon,
            experience: skill.experience,
        });
        return acc;
    }, {});

    // Convert the object to an array
    const result = Object.values(groupedSkills) as GroupedSkillsByCategory[];

    //// Sort the result by the specified category order
    result.sort((a, b) => {
        return categoryOrder.indexOf(a.name!) - categoryOrder.indexOf(b.name!);
    });

    return result;
}
