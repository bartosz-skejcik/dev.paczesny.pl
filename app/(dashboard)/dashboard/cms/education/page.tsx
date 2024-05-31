"use client";

import Header from "@/components/dashboard/cms/header";
import { getEducation } from "@/lib/supabase/server";
import { useDisclosure } from "@nextui-org/modal";
import { useEffect, useState } from "react";

import { Tables } from "@/lib/database.types";
import EducationModal from "@/components/dashboard/cms/education-modal";
import EducationTile from "@/components/dashboard/cms/education-tile";
// import EducationModal from "@/components/dashboard/cms/education-modal";

type Props = {};

function EducationCMS({}: Props) {
    const [education, setEducation] = useState<Tables<"education">[]>();

    useEffect(() => {
        async function fetchEducation() {
            const edu = await getEducation();
            setEducation(edu);
        }

        fetchEducation();
    }, []);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [selectedEducation, setSelectedEducation] = useState<
        Tables<"education"> | undefined | null
    >();

    return (
        <div className="w-full h-screen flex-col flex items-center justify-start overflow-y-auto">
            <Header
                title="Manage Education Path"
                onOpen={() => {
                    onOpen();
                    setSelectedEducation(null);
                }}
            />
            <EducationModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                education={selectedEducation}
                setEducation={setEducation}
                setSelectedEducation={setSelectedEducation}
            />
            <div className="w-full flex flex-row flex-wrap items-start justify-start p-5 gap-8">
                {education?.map((edu) => (
                    <EducationTile
                        key={edu.id}
                        education={edu}
                        setSelectedEducation={setSelectedEducation}
                        onOpenChange={onOpenChange}
                        setEducation={setEducation}
                    />
                ))}
            </div>
        </div>
    );
}

export default EducationCMS;
