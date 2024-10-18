export const workExperienceType = {
    name: "workExperience",
    title: "Work Experience",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
        },
        {
            name: "employment_type",
            title: "Employment Type",
            type: "string",
            options: {
                list: [
                    { title: "Full-time", value: "fulltime" },
                    { title: "Part-time", value: "parttime" },
                    { title: "Self-employed", value: "self-employed" },
                    { title: "Freelance", value: "freelance" },
                    { title: "Contract", value: "contract" },
                    { title: "Internship", value: "internship" },
                ],
            },
        },
        {
            name: "company",
            title: "Company/Organization",
            type: "string",
        },
        {
            name: "is_currently_working_here",
            title: "Currently Working Here",
            type: "boolean",
        },
        {
            name: "start_date",
            title: "Start Date",
            type: "date",
        },
        {
            name: "end_date",
            title: "End Date",
            type: "date",
        },
        {
            name: "location_type",
            title: "Location Type",
            type: "string",
            options: {
                list: [
                    { title: "Remote", value: "remote" },
                    { title: "Hybrid", value: "hybrid" },
                    { title: "On-site", value: "onsite" },
                ],
            },
        },
        {
            name: "location",
            title: "Location",
            type: "string",
        },
        {
            name: "description",
            title: "Description",
            type: "text",
        },
        {
            name: "skills",
            title: "Skills Used/Learned",
            type: "array",
            of: [{ type: "reference", to: [{ type: "skill" }] }],
        },
    ],
};
