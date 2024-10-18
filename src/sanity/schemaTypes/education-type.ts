export const educationType = {
    name: "education",
    title: "Education",
    type: "document",
    fields: [
        {
            name: "school_name",
            title: "School Name",
            type: "string",
        },
        {
            name: "skills",
            title: "Skills Learned/Used",
            type: "array",
            of: [{ type: "reference", to: [{ type: "skill" }] }],
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
            name: "currently_studying_here",
            title: "Currently Studying Here",
            type: "boolean",
        },
        {
            name: "degree",
            title: "Degree",
            type: "string",
        },
        {
            name: "field_of_study",
            title: "Field of Study",
            type: "string",
        },
    ],
};
