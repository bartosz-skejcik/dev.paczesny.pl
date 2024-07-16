import { Tables } from "@lib/database.types";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import Image from "next/image";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@ui/shadcn/Drawer";
import { useState } from "react";
import { Highlight } from "@/components/ui/Highlight";
import { InputWithLabel } from "@ui/InputWithLabel";
import { createSkill, deleteSkill, updateSkill } from "@lib/supabase/server";
import SimpleDrawer from "@/components/SimpleDrawer";

type Props = {
    skills: Tables<"skills">[];
    setSkills: (skills: Tables<"skills">[]) => void;
    activeCategory: "frontend" | "backend" | "tools";
};

function CategoryView({ skills, activeCategory, setSkills }: Props) {
    const [open, setOpen] = useState(false);
    const [confirmationOpen, setConfirmationOpen] = useState(false);
    const [skillId, setSkillId] = useState<string>("");
    const [action, setAction] = useState<"create" | "edit">();

    const [form, setForm] = useState<Tables<"skills">>({
        ...({} as any),
        category: activeCategory,
    });

    async function handleSubmit() {
        if (action === "create") {
            const { data, error } = await createSkill(form);
            if (error) {
                console.log(error);
            }
            const temp = [...skills, data as Tables<"skills">].sort((a, b) =>
                a.name.localeCompare(b.name),
            );
            setSkills(temp);
            setForm({} as Tables<"skills">);
        } else {
            const { data, error } = await updateSkill(form);
            if (error) {
                console.log(error);
            }

            setSkills(
                skills
                    .map((skill) => (skill.id === data?.id ? data : skill))
                    .sort((a, b) => a.name.localeCompare(b.name)),
            );
            setForm({} as Tables<"skills">);
        }
        setOpen(false);
    }

    async function handleDelete(skill_id?: string) {
        if (confirmationOpen) {
            const { data, error } = await deleteSkill(skillId);
            if (error) {
                console.log(error);
            }

            setSkills(skills.filter((skill) => skill.id !== skillId));
            setSkillId("");
            setConfirmationOpen(false);
        } else {
            setSkillId(skill_id!);
            setConfirmationOpen(true);
        }
    }

    function handleClose() {
        setOpen(false);
        setForm({} as Tables<"skills">);
    }

    return (
        <div className="m-4 grid w-full grid-cols-2 gap-3 sm:mx-0 md:grid-cols-3 lg:max-w-4xl lg:grid-cols-4 lg:gap-6">
            {skills.map((skill) => (
                <Item
                    key={skill.id}
                    skill={skill}
                    onEdit={() => {
                        setAction("edit");
                        setSkillId(skill.id);
                        setForm(skill);
                        setOpen(true);
                    }}
                    onDelete={handleDelete}
                />
            ))}
            <SimpleDrawer
                open={confirmationOpen}
                onOpenChange={setConfirmationOpen}
                onClose={() => {
                    setConfirmationOpen(false);
                }}
                title="Are you sure you want to delete this skill?"
                description="This action cannot be undone."
                color="danger"
                onSubmit={handleDelete}
            />
            <Drawer open={open} onOpenChange={setOpen} onClose={handleClose}>
                <DrawerTrigger
                    onClick={() => setAction("create")}
                    className="fixed bottom-4 left-4 right-16 z-[99] col-span-2 mb-0.5 rounded-full bg-primary py-1.5 font-medium text-neutral-950 transition-all duration-200 md:col-span-3 lg:static lg:col-span-4 lg:mb-0 lg:rounded-lg lg:bg-transparent lg:py-3 lg:text-lg lg:font-normal lg:text-primary lg:ring-1 lg:ring-primary lg:hover:bg-primary lg:hover:text-neutral-950"
                >
                    Create
                </DrawerTrigger>
                <DrawerContent className="z-[99999] lg:left-0 lg:right-0 lg:mx-auto lg:w-1/2">
                    <DrawerHeader>
                        <DrawerTitle>
                            Add a new skill to{" "}
                            <Highlight>{activeCategory}</Highlight>
                        </DrawerTitle>
                        <DrawerDescription>
                            Fill out the form below to add a new skill.
                        </DrawerDescription>
                    </DrawerHeader>
                    <div className="mb-4 mt-3 space-y-3 px-4">
                        <InputWithLabel
                            type="text"
                            label="Name"
                            placeholder="Name"
                            value={form?.name}
                            onChange={(value) =>
                                setForm({ ...form!, name: value })
                            }
                        />
                        <InputWithLabel
                            type="text"
                            label="Icon"
                            placeholder="Icon"
                            value={form?.icon!}
                            onChange={(value) =>
                                setForm({ ...form!, icon: value })
                            }
                        />
                        <InputWithLabel
                            type="text"
                            label="Experience"
                            placeholder="Experience"
                            value={form?.experience!}
                            onChange={(value) =>
                                setForm({ ...form!, experience: value })
                            }
                        />
                    </div>
                    <DrawerFooter>
                        <button
                            onClick={() => {
                                setAction("create");
                                handleSubmit();
                            }}
                            className="rounded-lg bg-transparent py-2 text-lg text-primary ring-1 ring-primary transition-all duration-200 hover:bg-primary hover:text-neutral-950"
                        >
                            {action === "create" ? "Add" : "Update"}
                        </button>
                        <DrawerClose>Close</DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </div>
    );
}

const Item = ({
    skill,
    onEdit,
    onDelete,
}: {
    skill: Tables<"skills">;
    onEdit: (skillId: string) => void;
    onDelete: (skillId: string) => void;
}) => {
    return (
        <div className="group relative aspect-square w-full rounded-xl bg-transparent transition-all duration-500 hover:bg-neutral-950">
            <div className="group-hover:shadow-under absolute inset-0 z-20 flex aspect-square w-full flex-col items-start justify-end gap-8 rounded-xl border border-neutral-800 bg-neutral-900 p-3 transition-all duration-200 group-hover:-top-14 group-hover:shadow-neutral-700/30 md:p-5">
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
                <button
                    onClick={() => onEdit(skill.id)}
                    className="flex items-center gap-1 rounded-md bg-transparent px-2 py-1 text-primary ring-1 ring-primary transition-all duration-200 hover:bg-primary hover:text-neutral-950"
                >
                    <IconPencil className="h-5 w-5" />
                    <span>Edit</span>
                </button>
                <button
                    className="flex items-center gap-1 rounded-md bg-transparent px-2 py-1 text-red-500 ring-1 ring-red-500 transition-all duration-200 hover:bg-red-500 hover:text-primary"
                    onClick={() => onDelete(skill.id)}
                >
                    <IconTrash className="h-5 w-5" />
                    <span>Delete</span>
                </button>
            </div>
        </div>
    );
};

export default CategoryView;
