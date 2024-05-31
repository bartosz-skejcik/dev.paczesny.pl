import { getSkills } from "@/lib/supabase/server";
import React from "react";
import Tabs from "@/components/sections/skills/tabs";

type Props = {};

async function Skills({}: Props) {
    const skills = await getSkills();

    return (
        <section className="flex flex-col items-center w-full justify-center py-14 xl:py-28">
            <h6 className="uppercase text-amber-500 font-medium text-base mb-3">
                Skills
            </h6>
            <h1 className="text-4xl lg:text-5xl font-semibold mb-16 text-center">
                Languages, Frameworks, and Tools {"I've"} worked with
            </h1>
            <Tabs skills={skills} />
        </section>
    );
}

export default Skills;
