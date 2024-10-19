import { defineQuery } from "next-sanity";
import { client } from "@/sanity/lib/client";

const options = {
    //next: {
    //    revalidate: 60,
    //},
};

export async function getEducation() {
    const educationQuery = defineQuery(
        `*[_type == "education"][]{_id, school_name, level, skills, start_date, end_date, date, currently_studying_here, degree, field_of_study, description}`,
    );

    const education = await client.fetch(educationQuery, {}, options);

    return education;
}
