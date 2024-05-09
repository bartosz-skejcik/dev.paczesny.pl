import { Tables } from "@/lib/database.types";
import React from "react";
import SkillTile from "./skill-tile";
import { Button } from "@nextui-org/button";
import { ZapIcon } from "lucide-react";
import { useDisclosure } from "@nextui-org/react";
import SkillModal from "./skill-modal";
import { createSkill, getSkills, updateSkill } from "@/lib/supabase/server";

type Props = {
    category: string;
    skills: Tables<"skills">[];
    setSkills: React.Dispatch<React.SetStateAction<Tables<"skills">[]>>;
};

function SkillCategory({ category, skills, setSkills }: Props) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [selectedSkill, setSelectedSkill] = React.useState<
        Tables<"skills"> | null | undefined
    >(null);

    async function handleAddSkill(skill: Tables<"skills">) {
        const exists = skills.find((s) => s.name === skill.name);
        if (exists) {
            const sk = await updateSkill(skill);
            const skills = await getSkills();
            setSkills(skills);
            setSelectedSkill(undefined);
        } else {
            const sk = await createSkill(skill);
            const skills = await getSkills();
            setSkills(skills);
            setSelectedSkill(undefined);
        }
    }

    return (
        <section className="flex flex-col items-center justify-start w-full">
            <SkillModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                skill={selectedSkill}
                category={category}
                onSubmit={handleAddSkill}
                onCancel={() => {
                    onOpenChange();
                    setSelectedSkill(undefined);
                }}
            />
            <div className="py-3 px-6 flex items-center justify-between w-full border-y border-foreground-100 bg-foreground-50 mb-5">
                <h3 className="text-xl">{category}</h3>
                <Button
                    color="warning"
                    size="md"
                    radius="md"
                    variant="flat"
                    // className="w-22"
                    startContent={<ZapIcon size={16} />}
                    onPress={() => {
                        onOpen();
                        setSelectedSkill(null);
                    }}
                >
                    Add skill
                </Button>
            </div>
            <div className="flex items-start justify-start flex-wrap gap-6 w-full px-6 pb-6 pt-3 mb-5">
                {skills.map((skill) => (
                    <SkillTile
                        key={skill.id}
                        skill={skill}
                        setSelectedSkill={setSelectedSkill}
                        onOpenChange={onOpenChange}
                        setSkills={setSkills}
                    />
                ))}
            </div>
        </section>
    );
}

export default SkillCategory;
