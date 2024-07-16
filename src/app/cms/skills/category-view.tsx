import { Tables } from "@lib/database.types";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import Image from "next/image";

type Props = {
    skills: Tables<"skills">[];
};

function CategoryView({ skills }: Props) {
    return (
        <div className="m-4 grid w-full grid-cols-2 gap-3 sm:mx-0 md:grid-cols-3 lg:max-w-4xl lg:grid-cols-4 lg:gap-6">
            {skills.map((skill) => (
                <Item key={skill.id} skill={skill} />
            ))}
        </div>
    );
}

const Item = ({ skill }: { skill: Tables<"skills"> }) => {
    return (
        <div className="group relative aspect-square w-full rounded-xl bg-transparent transition-all duration-500 hover:bg-neutral-950">
            <div className="group-hover:shadow-under absolute inset-0 z-20 flex aspect-square w-full flex-col items-start justify-end gap-3 rounded-xl border border-neutral-800 bg-neutral-900 p-3 transition-all duration-200 group-hover:-top-14 group-hover:shadow-neutral-700/30 md:gap-8 md:p-5">
                <div className="grid aspect-square w-[40%] items-center rounded-lg bg-neutral-700/30 p-1 md:p-2">
                    <Image
                        src={skill.icon!}
                        alt={skill.name}
                        width={100}
                        height={100}
                        className="aspect-square w-full"
                    />
                </div>
                <div className="flex flex-col items-start justify-center">
                    <span className="text-xl font-medium text-primary">
                        {skill.name}
                    </span>
                    <span className="text-secondary">{skill.experience}</span>
                </div>
            </div>
            <div className="absolute bottom-5 left-0 right-0 z-10 flex items-center justify-around px-2 py-3 text-primary transition-all duration-200 group-hover:bottom-0">
                <button className="flex items-center gap-1 rounded-md bg-transparent px-2 py-1 text-primary ring-1 ring-primary transition-all duration-200 hover:bg-primary hover:text-neutral-950">
                    <IconPencil className="h-5 w-5" />
                    <span>Edit</span>
                </button>
                <button className="flex items-center gap-1 rounded-md bg-transparent px-2 py-1 text-red-500 ring-1 ring-red-500 transition-all duration-200 hover:bg-red-500 hover:text-primary">
                    <IconTrash className="h-5 w-5" />
                    <span>Delete</span>
                </button>
            </div>
        </div>
    );
};

export default CategoryView;
