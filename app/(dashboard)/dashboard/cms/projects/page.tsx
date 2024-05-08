"use client";

import Header from "@/components/dashboard/cms/header";
import { getProjects, getSkills } from "@/lib/supabase/server";
import { useDisclosure } from "@nextui-org/react";
import { useEffect, useState } from "react";

import { Tables } from "@/lib/database.types";
import ProjectTile from "@/components/dashboard/cms/project-tile";
import ProjectModal from "@/components/dashboard/cms/project-modal";

type Props = {};

function ProjectsCMS({}: Props) {
    const [projects, setProjects] = useState<Tables<"projects">[]>();
    const [skills, setSkills] = useState<Tables<"skills">[]>([]);

    useEffect(() => {
        async function fetchProjects() {
            const projects = await getProjects();
            setProjects(projects);
        }

        async function fetchSkills() {
            const skills = await getSkills();
            setSkills(skills);
        }

        fetchProjects();
        fetchSkills();
    }, []);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [selectedProject, setSelectedProject] = useState<
        Tables<"projects"> | undefined | null
    >();

    return (
        <div className="w-full h-screen flex-col flex items-center justify-start overflow-y-auto">
            <Header
                onOpen={() => {
                    onOpen();
                    setSelectedProject(null);
                }}
            />
            <ProjectModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                skills={skills}
                project={selectedProject}
                setProjects={setProjects}
                setSelectedProject={setSelectedProject}
            />
            <div className="w-full h-full flex flex-col items-center justify-start p-5 gap-8">
                {projects?.map((project) => (
                    <ProjectTile
                        key={project.id}
                        project={project}
                        setSelectedProject={setSelectedProject}
                        setOpen={onOpen}
                    />
                ))}
            </div>
        </div>
    );
}

export default ProjectsCMS;
