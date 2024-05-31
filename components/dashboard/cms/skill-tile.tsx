import { Tables } from "@/lib/database.types";
import { Card } from "@nextui-org/card";
import { Image } from "@nextui-org/react";
import { Button, ButtonGroup } from "@nextui-org/button";
import React, { useState } from "react";
import { PencilIcon, Trash2Icon } from "lucide-react";
import { deleteSkill, getSkills } from "@/lib/supabase/server";

type Props = {
    skill: Tables<"skills">;
    setSelectedSkill: React.Dispatch<Tables<"skills"> | undefined>;
    onOpenChange: () => void;
    setSkills: React.Dispatch<Tables<"skills">[]>;
};

function SkillTile({
    skill,
    setSelectedSkill,
    onOpenChange,
    setSkills,
}: Props) {
    const [trashHovered, setTrashHovered] = useState(false);
    const [editHovered, setEditHovered] = useState(false);
    return (
        <Card
            className="w-1/7 3xl:w-[8%] p-2 overflow-hidden relative group"
            radius="lg"
        >
            <div className="inset-0 absolute flex flex-col items-center justify-end top-[125%] blur-sm group-hover:blur-0 z-10 group-hover:top-0 transition-all duration-300 group-hover:backdrop-blur-sm backdrop-filter bg-foreground-100/30 rounded-lg">
                <ButtonGroup className="w-full flex items-center justify-evenly p-2 pb-4">
                    <Button
                        variant={trashHovered ? "shadow" : "flat"}
                        size="sm"
                        color={trashHovered ? "danger" : "default"}
                        onMouseEnter={() => setTrashHovered(true)}
                        onMouseLeave={() => setTrashHovered(false)}
                        onPress={async () => {
                            await deleteSkill(skill.id);
                            setSelectedSkill(undefined);
                            const skills = await getSkills();
                            setSkills(skills);
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
                            setSelectedSkill(skill);
                            onOpenChange();
                        }}
                    >
                        <PencilIcon size={20} />
                        Edit
                    </Button>
                </ButtonGroup>
            </div>
            <div className="gap-5 flex items-center justify-center flex-col relative inset-0 z-0 group-hover:scale-95 transition-all duration-200">
                <Image
                    src={skill.icon!}
                    width={150}
                    height={150}
                    alt={skill.name}
                    className="aspect-square object-contain bg-foreground-200/50 w-full p-2"
                    radius="lg"
                />
                <div className="text-center">
                    <h3 className="text-lg font-medium">{skill.name}</h3>
                    <p className="text-md text-neutral-500">
                        {skill.experience}
                    </p>
                </div>
            </div>
        </Card>
    );
}

export default SkillTile;
