import { Badge } from "@/components/ui/shadcn/Badge";
import { Skill } from "@/types/work-experience";

type SkillListProps = {
    skills: Skill[];
};

export function SkillList({ skills }: SkillListProps) {
    return (
        <div className="mt-3 flex flex-wrap gap-2">
            {skills.map((skill) => (
                <Badge
                    key={skill._id}
                    variant="secondary"
                    className="bg-sky-900/50 text-sky-300 hover:bg-sky-900"
                >
                    {skill.name}
                </Badge>
            ))}
        </div>
    );
}
