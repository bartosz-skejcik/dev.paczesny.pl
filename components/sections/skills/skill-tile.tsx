"use client";

import { Card } from "@nextui-org/card";
import { Image } from "@nextui-org/react";
import { Tables } from "@/lib/database.types";

import { usePlausible } from "next-plausible";

type Props = {
    skill: Tables<"skills">;
};

function SkillTile({ skill }: Props) {
    const plausible = usePlausible();
    return (
        <Card
            onMouseEnter={() => {
                plausible("skill-tile-hover", {
                    props: {
                        name: skill.name,
                    },
                });
            }}
            onClick={() => {
                plausible("skill-tile-click", {
                    props: {
                        name: skill.name,
                    },
                });
            }}
            className="p-2 aspect-square overflow-hidden relative group"
            radius="lg"
        >
            <div className="inset-0 absolute flex flex-col items-center justify-end top-[155%] blur-sm group-hover:blur-0 z-10 group-hover:top-0 transition-all duration-300 group-hover:backdrop-blur-sm backdrop-filter bg-foreground-100/30 rounded-lg">
                <div className="text-center">
                    <h3 className="text-lg font-medium">{skill.name}</h3>
                    <p className="text-md text-neutral-500">
                        {skill.experience}
                    </p>
                </div>
            </div>
            <div className="gap-5 flex items-center justify-center flex-col w-full h-full relative inset-0 z-0 group-hover:scale-90 transition-all duration-200">
                <Image
                    src={skill.icon!}
                    width={150}
                    height={150}
                    alt={skill.name}
                    className="aspect-square object-contain bg-foreground-200/50 w-full p-2"
                    radius="lg"
                />
            </div>
        </Card>
    );
}

export default SkillTile;
