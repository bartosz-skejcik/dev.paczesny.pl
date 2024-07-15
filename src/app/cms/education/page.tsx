/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Tabs, Tab } from "@ui/Tabs";
import { Tables } from "@lib/database.types";
import { getEducation } from "@lib/supabase/server";
import { useEffect, useState } from "react";
import { IconPencilPlus } from "@tabler/icons-react";
import Form from "./form";

type Props = {};

function Education({}: Props) {
    const [education, setEducation] = useState<Tables<"education">[]>([]);
    const [activeEducation, setActiveEducation] = useState<Tables<"education">>(
        {} as any,
    );
    const [activeTab, setActiveTab] = useState<string>("");

    const [form, setForm] = useState<Tables<"education">>({
        id: "",
        title: "",
        text: "",
        description: "",
        duration: "",
        date: null,
        stack: "",
        start_date: null,
        end_date: null,
    });

    useEffect(() => {
        getEducation().then((education) => {
            setEducation(education);
            setActiveTab(education[0].id);
            setActiveEducation(education[0]);
        });
    }, []);

    function handleClearForm() {
        setActiveEducation(null as any);
        setForm(null as any);
    }

    useEffect(() => {
        if (activeTab) {
            const activeEducation = education.find(
                (edu) => edu.id === activeTab,
            );
            if (activeEducation) {
                setActiveEducation(activeEducation);
            }
        }
    }, [activeTab]);

    return (
        <div className="flex">
            <aside className="hidden min-h-screen w-[20rem] flex-col items-start justify-start gap-3 px-6 py-10 lg:flex">
                <div className="group relative z-20 flex w-full min-w-28 flex-row items-center justify-between space-x-2 rounded-md bg-neutral-800 px-4 py-2 text-left text-primary text-zinc-400 transition-all duration-200">
                    <span>Education</span>
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
                        activeEducation && setActiveEducation(activeEducation);
                    }}
                >
                    {education.map((education) => (
                        // @ts-ignore TODO: fix this
                        <Tab
                            key={education.id}
                            label={education.title}
                            value={education.id}
                        >
                            {({ ref }) => (
                                <div ref={ref}>
                                    <span className="capitalize">
                                        {education.title}
                                    </span>
                                </div>
                            )}
                        </Tab>
                    ))}
                </Tabs>
            </aside>
            <div className="m-0 flex min-h-screen w-full items-center justify-center rounded-xl border border-neutral-800/70 bg-neutral-950/30 lg:m-4">
                <Form
                    setEducation={setEducation}
                    education={education}
                    activeEducation={activeEducation}
                    data={activeEducation ?? form}
                />
            </div>
        </div>
    );
}

export default Education;
