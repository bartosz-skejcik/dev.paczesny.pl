"use client";

import Header from "@/components/dashboard/cms/header";
import SkillCategory from "@/components/dashboard/cms/skill-category";
import { Tables } from "@/lib/database.types";
import { getSkills } from "@/lib/supabase/server";
import React, { useEffect, useState } from "react";

type Props = {};

function SkillsCMS({}: Props) {
    const [skills, setSkills] = useState<Tables<"skills">[]>([]);

    useEffect(() => {
        async function fetchSkills() {
            const skills = await getSkills();
            setSkills(skills);
        }

        fetchSkills();
    }, []);

    return (
        <div className="w-full h-screen flex-col flex items-center justify-start overflow-y-auto">
            <Header title="Manage Skills" buttonText="Add category" />
            <p></p>
            <div className="flex flex-col items-center justify-start w-full">
                <SkillCategory
                    category="Frontend"
                    skills={skills.filter(
                        (skill) => skill.category === "frontend"
                    )}
                    setSkills={setSkills}
                />
                <SkillCategory
                    category="Backend"
                    skills={skills.filter(
                        (skill) => skill.category === "backend"
                    )}
                    setSkills={setSkills}
                />
                <SkillCategory
                    category="Tools"
                    skills={skills.filter(
                        (skill) => skill.category === "tools"
                    )}
                    setSkills={setSkills}
                />
            </div>
        </div>
    );
}

export default SkillsCMS;
