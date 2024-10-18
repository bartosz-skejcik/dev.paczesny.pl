export const skillType = {
    name: "skill",
    title: "Skill",
    type: "document",
    fields: [
        {
            name: "name",
            title: "Name",
            type: "string",
        },
        {
            name: "icon",
            title: "Icon",
            type: "image",
        },
        {
            name: "category",
            title: "Category",
            type: "string",
            options: {
                list: [
                    { title: "Frontend", value: "frontend" },
                    { title: "Backend", value: "backend" },
                    { title: "Tools", value: "tools" },
                    { title: "Soft Skills", value: "soft_skills" },
                    { title: "Other", value: "other" },
                ],
            },
        },
        {
            name: "experience",
            title: "Experience",
            type: "text",
        },
    ],
};
