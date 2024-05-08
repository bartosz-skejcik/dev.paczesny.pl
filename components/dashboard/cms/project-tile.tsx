"use client";

import { Tables } from "@/lib/database.types";
import { Card, CardBody } from "@nextui-org/card";
import { Image } from "@nextui-org/react";
import { Chip } from "@nextui-org/chip";
import { Button, ButtonGroup } from "@nextui-org/button";
import { GithubIcon, LinkIcon, PencilIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { deleteProject, getProjects } from "@/lib/supabase/server";

type Props = {
    project: Tables<"projects">;
    setSelectedProject: (project: Tables<"projects"> | null) => void;
    setOpen: (open: boolean) => void;
};

function ProjectTile({ project, setSelectedProject, setOpen }: Props) {
    const [trashHovered, setTrashHovered] = useState(false);
    const [editHovered, setEditHovered] = useState(false);
    return (
        <Card className="bg-foreground-300/60 dark:bg-default-900/50 w-[60%]">
            <CardBody className="overflow-hidden h-auto flex items-center justify-center flex-1">
                <div className="flex gap-6 md:gap-4 items-center justify-center">
                    <div className="relative w-1/4">
                        <Image
                            alt="Album cover"
                            className="object-cover aspect-video"
                            shadow="md"
                            src={project.thumbnail ?? ""}
                            height="100%"
                        />
                    </div>

                    <div className="relative flex flex-col justify-between w-full flex-1 gap-1 h-full">
                        <div className="flex items-start justify-between w-full">
                            <div>
                                <h1 className="text-2xl font-bold text-foreground-800">
                                    {project.title}
                                </h1>
                                <p className="text-md text-foreground-600/70 mt-1.5">
                                    {project.short_description}
                                </p>
                            </div>
                            <ButtonGroup>
                                <Button
                                    variant={trashHovered ? "shadow" : "flat"}
                                    size="sm"
                                    color={trashHovered ? "danger" : "default"}
                                    onMouseEnter={() => setTrashHovered(true)}
                                    onMouseLeave={() => setTrashHovered(false)}
                                    onPress={async () => {
                                        await deleteProject(project.id);
                                        const projects = await getProjects();
                                        setSelectedProject(null);
                                    }}
                                >
                                    <Trash2Icon size={20} />
                                    Delete
                                </Button>
                                <Button
                                    variant="bordered"
                                    size="sm"
                                    color={editHovered ? "primary" : "default"}
                                    onMouseEnter={() => setEditHovered(true)}
                                    onMouseLeave={() => setEditHovered(false)}
                                    onClick={() => {
                                        setSelectedProject(project);
                                        setOpen(true);
                                    }}
                                >
                                    <PencilIcon size={20} />
                                    Edit
                                </Button>
                            </ButtonGroup>
                        </div>
                        <div className="w-full flex flex-row items-start justify-between">
                            <div className="flex gap-2 mt-2">
                                {/* @ts-ignore */}
                                {project.skills.map((skill) => (
                                    <Chip radius="md" key={skill.name}>
                                        {skill.name}
                                    </Chip>
                                ))}
                            </div>
                            <div className="flex items-end justify-center flex-col gap-2">
                                <Chip
                                    variant="bordered"
                                    radius="md"
                                    size="md"
                                    color="warning"
                                    as={"a"}
                                    href={project.github!}
                                >
                                    <div className="flex gap-1 items-center justify-center flex-row">
                                        <GithubIcon size={16} />
                                        <span>{project.github}</span>
                                    </div>
                                </Chip>
                                <Chip
                                    variant="bordered"
                                    radius="md"
                                    size="md"
                                    color="success"
                                    as={"a"}
                                    href={project.link!}
                                >
                                    <div className="flex gap-1 items-center justify-center flex-row">
                                        <LinkIcon size={16} />
                                        <span>{project.link}</span>
                                    </div>
                                </Chip>
                            </div>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}

export default ProjectTile;
