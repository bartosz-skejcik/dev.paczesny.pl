/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Tabs, Tab } from "@ui/Tabs";
import { Tables } from "@lib/database.types";
import { getProjects } from "@lib/supabase/server";
import { useEffect, useState } from "react";
import { IconPencilPlus } from "@tabler/icons-react";
import Form from "./form";

type Props = {};

type FormData = Tables<"projects"> & {
    images?: Tables<"images">[];
    skills: { name: string }[];
};

function Projects({}: Props) {
    const [projects, setProjects] = useState<FormData[]>([]);
    const [activeProject, setActiveProject] = useState<FormData>({} as any);
    const [activeTab, setActiveTab] = useState<string>("");

    const [form, setForm] = useState<FormData>({
        id: "",
        title: "",
        description: "",
        content: "",
        thumbnail: "",
        link: "",
        github: "",
        images: [],
        skills: [],
    });

    useEffect(() => {
        getProjects().then((projects: FormData[]) => {
            setProjects(projects);
            setActiveTab(projects[0].id);
            setActiveProject(projects[0]);
        });
    }, []);

    function handleClearForm() {
        setActiveProject(null as any);
        setForm(null as any);
    }

    useEffect(() => {
        if (activeTab) {
            const activeProject = projects.find((edu) => edu.id === activeTab);
            if (activeProject) {
                setActiveProject(activeProject);
            }
        }
    }, [activeTab]);

    return (
        <div className="flex">
            <aside className="hidden min-h-screen w-[20rem] flex-col items-start justify-start gap-3 px-6 py-10 lg:flex">
                <div className="group relative z-20 flex w-full min-w-28 flex-row items-center justify-between space-x-2 rounded-md bg-neutral-800 px-4 py-2 text-left text-primary text-zinc-400 transition-all duration-200">
                    <span>Projects</span>
                    <button
                        className="text-secondary hover:text-primary"
                        onClick={handleClearForm}
                    >
                        <IconPencilPlus className="h-5 w-5" />
                    </button>
                </div>
                <Tabs
                    initialActiveTab={activeTab}
                    onChange={(eduId: string) => {
                        setActiveTab(eduId);
                        activeProject && setActiveProject(activeProject);
                    }}
                >
                    {projects.map((project) => (
                        // @ts-ignore TODO: fix this
                        <Tab
                            key={project.id}
                            label={project.title}
                            value={project.id}
                        >
                            {({ ref }) => (
                                <div ref={ref}>
                                    <span className="capitalize">
                                        {project.title}
                                    </span>
                                </div>
                            )}
                        </Tab>
                    ))}
                </Tabs>
            </aside>
            <div className="m-0 flex min-h-screen w-full items-center justify-center rounded-xl border border-neutral-800/70 bg-neutral-950/30 lg:m-4">
                <Form
                    // @ts-ignore
                    setProjects={setProjects}
                    projects={projects}
                    activeProject={activeProject}
                    data={activeProject ?? form}
                />
            </div>
        </div>
    );
}

export default Projects;
