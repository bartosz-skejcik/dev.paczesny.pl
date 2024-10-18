export const projectType = {
    name: "project",
    title: "Project",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
        },
        {
            name: "description",
            title: "Description",
            type: "string",
        },
        {
            name: "content",
            title: "Content",
            type: "text",
        },
        {
            name: "thumbnail",
            title: "Thumbnail",
            type: "image",
        },
        {
            name: "images",
            title: "Images",
            type: "array",
            of: [{ type: "image" }],
        },
        {
            name: "technologies",
            title: "Technologies",
            type: "array",
            of: [{ type: "reference", to: [{ type: "skill" }] }],
        },
        {
            name: "live_preview_url",
            title: "Live Preview URL",
            type: "url",
        },
        {
            name: "github_url",
            title: "GitHub URL",
            type: "url",
        },
    ],
};
