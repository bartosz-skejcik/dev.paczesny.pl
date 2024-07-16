/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Tabs, Tab } from "@ui/Tabs";
import { Tables } from "@lib/database.types";
import { getSkills } from "@lib/supabase/server";
import { useEffect, useState } from "react";
import { IconPencilPlus } from "@tabler/icons-react";
import CategoryView from "./category-view";

type Props = {};

function Skills({}: Props) {
    const [skills, setSkills] = useState<Tables<"skills">[]>([]);
    // const [activeEducation, setActiveEducation] = useState<Tables<"education">>(
    //     {} as any,
    // );
    const categories = ["frontend", "backend", "tools"];
    const [activeCategory, setActiveCategory] = useState<
        "frontend" | "backend" | "tools"
    >(categories[0].toLowerCase() as any);
    const [tableHead, setTableHead] = useState<string[]>([]);

    useEffect(() => {
        getSkills().then((skills) => {
            setSkills(skills.sort((a, b) => a.name.localeCompare(b.name)));
            setTableHead(tableHead);
        });
    }, []);

    function handleClearForm() {
        // setActiveEducation(null as any);
        // setForm(null as any);
    }

    return (
        <div className="flex">
            <aside className="hidden min-h-screen w-[20rem] flex-col items-start justify-start gap-3 px-6 py-10 lg:flex">
                <div className="group relative z-20 flex w-full min-w-28 flex-row items-center justify-between space-x-2 rounded-md bg-neutral-800 px-4 py-2 text-left text-primary text-zinc-400 transition-all duration-200">
                    <span>Skills</span>
                    <button
                        className="text-secondary hover:text-primary"
                        onClick={handleClearForm}
                    >
                        <IconPencilPlus className="h-5 w-5" />
                    </button>
                </div>
                <Tabs
                    initialActiveTab={activeCategory}
                    onChange={(categoryId: any) => {
                        setActiveCategory(categoryId);
                    }}
                >
                    {categories.map((category) => (
                        // @ts-ignore TODO: fix this
                        <Tab key={category} label={category} value={category}>
                            {({ ref }) => (
                                <div ref={ref}>
                                    <span className="capitalize">
                                        {category}
                                    </span>
                                </div>
                            )}
                        </Tab>
                    ))}
                </Tabs>
            </aside>
            <div className="m-0 flex min-h-screen w-full items-start justify-center rounded-xl border border-neutral-800/70 bg-neutral-950/30 lg:m-4">
                <CategoryView
                    setSkills={setSkills}
                    activeCategory={activeCategory}
                    skills={skills.filter(
                        (skill) => skill.category === activeCategory,
                    )}
                />
            </div>
        </div>
    );
}

export default Skills;
