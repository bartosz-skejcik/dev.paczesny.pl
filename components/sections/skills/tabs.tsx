"use client";

import { Tables } from "@/lib/database.types";
import React, { useEffect, useState } from "react";
import TabHeader from "./tab-header";
import { Button } from "@nextui-org/button";
import SkillTile from "./skill-tile";

import { usePlausible } from "next-plausible";

type Props = {
    skills: Tables<"skills">[];
};

function Tabs({ skills }: Props) {
    const plausible = usePlausible();

    const [categories, setCategories] = useState<{
        [key: string]: Tables<"skills">[];
    }>({});
    const [activeCategory, setActiveCategory] = useState<Tables<"skills">[]>(
        []
    );

    useEffect(() => {
        const newCategories: { [key: string]: Tables<"skills">[] } = {};

        skills.forEach((skill) => {
            if (!newCategories[skill.category]) {
                newCategories[skill.category] = [];
            }
            newCategories[skill.category].push(skill);
        });

        setCategories(newCategories);
        setActiveCategory(newCategories[Object.keys(newCategories)[0]]);
    }, [skills]);

    return (
        <section className="grid grid-cols-4 items-start justify-center w-3/4 h-fit grid-rows-1">
            <TabHeader
                title="Skills"
                description="Programming languages I've worked with in the past"
                className="col-span-4 xl:col-span-1 row-span-2 mb-10 xl:mb-0"
            >
                {Object.keys(categories).map((category, index, skills) => (
                    <Button
                        key={category}
                        className="capitalize w-64 h-fit flex items-start justify-center flex-col gap-y-1 py-3 px-4"
                        variant={
                            activeCategory[0].category === category
                                ? "shadow"
                                : "bordered"
                        }
                        color={
                            activeCategory[0].category === category
                                ? "secondary"
                                : "default"
                        }
                        radius="sm"
                        onPress={() => {
                            setActiveCategory(categories[category]);
                            plausible("skills-tab-click", {
                                props: {
                                    category: category,
                                },
                            });
                        }}
                    >
                        <h3 className="text-2xl font-semibold">{category}</h3>
                        <p>
                            {category == "frontend"
                                ? "List of all frontend frameworks"
                                : category == "backend"
                                ? "List of all backend frameworks"
                                : "List of all tools"}
                        </p>
                    </Button>
                ))}
            </TabHeader>
            {activeCategory && activeCategory.length > 0 && (
                <div className="flex-1 col-span-4 xl:col-span-3 w-full flex flex-col items-center justify-start rounded-lg overflow-hidden bg-foreground-50/50 h-full">
                    <div className="w-full py-3 px-5 flex items-center gap-x-5 justify-start text-xl font-semibold bg-foreground-100">
                        <h3 className="capitalize">
                            {activeCategory[0].category}
                        </h3>
                        <p className="text-foreground-500 text-sm font-normal">
                            <span className="hidden xl:block">
                                Hover over the skills to see more details
                            </span>
                            <span className="block xl:hidden">
                                Click on the skills to see more details
                            </span>
                        </p>
                    </div>
                    <div className="w-full grid grid-cols-2 xl:grid-cols-6 gap-4 p-5">
                        {activeCategory.map((skill) => (
                            <SkillTile key={skill.id} skill={skill} />
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
}

export default Tabs;
