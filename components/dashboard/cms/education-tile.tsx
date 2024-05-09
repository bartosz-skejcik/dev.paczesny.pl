"use client";

import { Tables } from "@/lib/database.types";
import { Card } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { Button, ButtonGroup } from "@nextui-org/button";
import {
    CalendarDaysIcon,
    PencilIcon,
    TimerIcon,
    Trash2Icon,
} from "lucide-react";
import { useState } from "react";
import { deleteEducation, getEducation } from "@/lib/supabase/server";

type Props = {
    education: Tables<"education">;
    setSelectedEducation: (
        education: Tables<"education"> | null | undefined
    ) => void;
    onOpenChange: () => void;
    setEducation: (education: Tables<"education">[]) => void;
};

function EducationTile({
    education,
    setSelectedEducation,
    onOpenChange,
    setEducation,
}: Props) {
    const [trashHovered, setTrashHovered] = useState(false);
    const [editHovered, setEditHovered] = useState(false);

    return (
        <Card className="bg-foreground-300/60 dark:bg-foreground-100/70 w-[45%] overflow-hidden relative group">
            <div className="inset-0 absolute flex flex-col items-end justify-end top-[300%] blur-sm group-hover:blur-0 z-10 group-hover:top-0 transition-all duration-300 group-hover:backdrop-blur-sm backdrop-filter bg-foreground-100/30 rounded-lg">
                <ButtonGroup className="flex items-center justify-center p-2 pb-4">
                    <Button
                        variant={trashHovered ? "shadow" : "flat"}
                        size="md"
                        color={trashHovered ? "danger" : "default"}
                        onMouseEnter={() => setTrashHovered(true)}
                        onMouseLeave={() => setTrashHovered(false)}
                        onPress={async () => {
                            await deleteEducation(education.id);
                            setSelectedEducation(undefined);
                            const edus = await getEducation();
                            setEducation(edus);
                        }}
                    >
                        <Trash2Icon size={20} />
                        Delete
                    </Button>
                    <Button
                        variant="bordered"
                        size="md"
                        color={editHovered ? "primary" : "default"}
                        onMouseEnter={() => setEditHovered(true)}
                        onMouseLeave={() => setEditHovered(false)}
                        onClick={() => {
                            setSelectedEducation(education);
                            onOpenChange();
                        }}
                    >
                        <PencilIcon size={20} />
                        Edit
                    </Button>
                </ButtonGroup>
            </div>
            <div className="gap-5 flex items-start justify-center flex-col relative inset-0 px-4 py-1 z-0 group-hover:scale-95 transition-all duration-200">
                <div className="w-full py-1">
                    <div className="w-full flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-foreground-800">
                            {education.title}
                        </h1>
                        <p className="text-md text-foreground-600/70 mt-1.5">
                            {education.text}
                        </p>
                    </div>
                    {education.description && (
                        <p className="text-md text-foreground-600/70 mt-1.5">
                            {education.description}
                        </p>
                    )}

                    <div className="flex flex-wrap gap-2 relative z-50 pt-3">
                        {education
                            // @ts-ignore
                            .stack!.split(", ")
                            .map((el: string, idx: number) => (
                                <Chip key={idx} color="warning" variant="flat">
                                    {el}
                                </Chip>
                            ))}
                    </div>

                    <div className="flex flex-wrap gap-3 relative z-50 pt-3">
                        {education.duration && (
                            <Chip color="default" variant="flat">
                                <div className="flex items-center justify-center gap-1">
                                    <TimerIcon size={16} />
                                    {education.duration}
                                </div>
                            </Chip>
                        )}
                        <Chip color="success" variant="flat">
                            <div className="flex items-center justify-center gap-1">
                                <CalendarDaysIcon size={16} />
                                {education.date?.split("-")[0]}-
                                {education.date?.split("-")[1]}
                            </div>
                        </Chip>
                    </div>
                </div>
            </div>
        </Card>
    );
}

export default EducationTile;
