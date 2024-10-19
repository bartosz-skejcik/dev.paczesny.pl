import { defineQuery } from "next-sanity";
import { client } from "@/sanity/lib/client";

const options = {
    //next: {
    //    revalidate: 60,
    //},
};

export async function getWorkExperience() {
    const workQuery = defineQuery(
        `*[_type == "workExperience"][]{..., skills[]->{name}}`,
    );

    const work = await client.fetch(workQuery, {}, options);

    return work;
}
