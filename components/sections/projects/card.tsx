"use client";

import { Project } from "@/types/project";
import { Button } from "@nextui-org/button";
import { Card as UiCard } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { GithubIcon, LinkIcon } from "lucide-react";
import { usePlausible } from "next-plausible";
import Image from "next/image";
import Link from "next/link";
import randomColor from "randomcolor";

type Props = {
    project: Project;
};

function Card({ project }: Props) {
    const plausible = usePlausible();

    return (
        <UiCard
            onMouseEnter={() => {
                plausible("project-card-hover", {
                    props: {
                        name: project.title,
                    },
                });
            }}
            className="bg-background border-[2px] border-foreground-50 overflow-hidden shadow-lg group"
        >
            <div className="relative z-0">
                <Image
                    alt="Project One"
                    className="w-full h-auto object-cover"
                    height="240"
                    src={project.thumbnail || ""}
                    style={{
                        aspectRatio: "400/240",
                        objectFit: "cover",
                    }}
                    width="400"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 bg-background/70 p-6 backdrop-blur-sm backdrop-filter translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10 flex items-center justify-center">
                    <Button
                        as={Link}
                        variant="bordered"
                        color="warning"
                        href={`/projects/${project.id}`}
                        onClick={() => {
                            plausible("project-card-click", {
                                props: {
                                    name: project.title,
                                },
                            });
                        }}
                    >
                        View Details
                    </Button>
                </div>
            </div>
            <div className="p-6 space-y-4 relative z-20 bg-background">
                <div className="flex items-start justify-between">
                    <h3 className="text-2xl font-semibold dark:text-neutral-300">
                        {project.title}
                    </h3>
                    <div className="flex items-center space-x-2">
                        <Button
                            as={Link}
                            isIconOnly
                            variant="bordered"
                            href={project.github}
                        >
                            <GithubIcon className="h-5 w-5" />
                        </Button>
                        <Button
                            as={Link}
                            isIconOnly
                            variant="bordered"
                            href={project.link}
                        >
                            <LinkIcon className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
                <p className="text-neutral-400">{project.short_description}</p>
                <div className="flex flex-wrap justify-start gap-2">
                    {project.skills.map((skill) => (
                        <Technology key={skill.name} technology={skill.name} />
                    ))}
                </div>
            </div>
        </UiCard>
    );
}

const Technology = ({ technology }: { technology: string }) => {
    const color = randomColor({
        format: "rgb",
    });
    const colorsSplit = color.split("(");
    const colorsValues = colorsSplit[1].split(")");
    colorsValues.pop();
    const rgbColors = colorsValues.join("");
    return (
        <Chip
            style={{
                borderColor: color,
                color: color,
                backgroundColor: `rgba(${rgbColors}, 0.1)`,
            }}
            variant="bordered"
        >
            {technology}
        </Chip>
    );
};

export default Card;
