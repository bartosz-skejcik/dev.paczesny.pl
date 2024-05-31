import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "@nextui-org/modal";
import { Input, Textarea } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import {
    AlignCenterIcon,
    LinkIcon,
    GithubIcon,
    ImageIcon,
    TypeIcon,
    ScrollTextIcon,
} from "lucide-react";

import { Select, SelectItem } from "@nextui-org/select";
import { Tables } from "@/lib/database.types";
import { FormEvent, useEffect, useState } from "react";
import {
    createProject,
    getProjects,
    updateProject,
} from "@/lib/supabase/server";

type Props = {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    skills: Tables<"skills">[];
    project?: Tables<"projects"> | null;
    setProjects: (projects: Tables<"projects">[]) => void;
    setSelectedProject: (project: Tables<"projects"> | null) => void;
};

function ProjectModal({
    isOpen,
    onOpenChange,
    skills,
    project,
    setProjects,
    setSelectedProject,
}: Props) {
    const [formData, setFormData] = useState<Tables<"projects">>({
        id: "",
        title: "",
        short_description: "",
        full_description: "",
        link: "",
        github: "",
        thumbnail: "",
        stack: [""],
    } as Tables<"projects">);

    useEffect(() => {
        if (project !== undefined && project !== null) {
            setFormData({
                id: project.id,
                title: project.title,
                short_description: project.short_description!,
                full_description: project.full_description!,
                link: project.link!,
                github: project.github!,
                thumbnail: project.thumbnail!,
                // @ts-ignore
                stack: project.skills!.map((skill) => skill.name),
            } as Tables<"projects">);
        } else {
            setFormData({
                id: "",
                title: "",
                short_description: "",
                full_description: "",
                link: "",
                github: "",
                thumbnail: "",
                stack: [""],
            } as Tables<"projects">);
        }
    }, [project]);

    return (
        <Modal
            size="xl"
            backdrop="blur"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            <h2 className="font-semibold text-xl">
                                Add new project
                            </h2>
                            <p className="text-foreground-500 font-normal text-sm">
                                Fill the form to add a new project. All fields
                                are required.
                            </p>
                        </ModalHeader>
                        <form
                            onSubmit={async (e: FormEvent) => {
                                e.preventDefault();
                                if (project !== undefined && project !== null) {
                                    // update the project
                                    const pro = await updateProject(formData);
                                    const projects = await getProjects();
                                    setProjects(projects);
                                    setSelectedProject(null);
                                    onClose();
                                } else {
                                    // create the project
                                    const pro = await createProject(formData);
                                    const projects = await getProjects();
                                    setProjects(projects);
                                    setSelectedProject(null);
                                    onClose();
                                }
                            }}
                        >
                            <ModalBody>
                                <Input
                                    label="Title"
                                    placeholder="What's the project title"
                                    variant="bordered"
                                    autoFocus
                                    endContent={<TypeIcon size={24} />}
                                    value={formData.title}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            title: e.target.value,
                                        })
                                    }
                                />
                                <Textarea
                                    label="Short description"
                                    placeholder="What's the project about in a few words"
                                    variant="bordered"
                                    rows={3}
                                    endContent={<AlignCenterIcon size={24} />}
                                    value={formData.short_description!}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            short_description: e.target.value,
                                        })
                                    }
                                />
                                <Textarea
                                    label="Full description"
                                    placeholder="What's the project about in detail"
                                    variant="bordered"
                                    rows={6}
                                    endContent={<ScrollTextIcon size={24} />}
                                    value={formData.full_description!}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            full_description: e.target.value,
                                        })
                                    }
                                />
                                <Input
                                    label="Link"
                                    placeholder="Where can we find the project"
                                    variant="bordered"
                                    endContent={<LinkIcon size={24} />}
                                    value={formData.link!}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            link: e.target.value,
                                        })
                                    }
                                />
                                <Input
                                    label="Github link"
                                    placeholder="Where can we find the project's code"
                                    variant="bordered"
                                    endContent={<GithubIcon size={24} />}
                                    value={formData.github!}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            github: e.target.value,
                                        })
                                    }
                                />
                                <Input
                                    label="Thumbnail link"
                                    placeholder="Where can we find the project's thumbnail"
                                    variant="bordered"
                                    endContent={<ImageIcon size={24} />}
                                    value={formData.thumbnail!}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            thumbnail: e.target.value,
                                        })
                                    }
                                />
                                <Select
                                    label="Stack"
                                    placeholder="Select the project's stack"
                                    variant="bordered"
                                    selectionMode="multiple"
                                    // @ts-ignore
                                    value={formData.stack!.join(",")}
                                    onChange={(e) => {
                                        setFormData({
                                            ...formData,
                                            // @ts-ignore
                                            stack: e.target.value.split(","),
                                        });
                                    }}
                                >
                                    {skills.map((skill) => (
                                        <SelectItem
                                            key={skill.name}
                                            value={skill.name}
                                        >
                                            {skill.name}
                                        </SelectItem>
                                    ))}
                                </Select>
                            </ModalBody>
                            <ModalFooter className="flex items-center justify-between">
                                <Button
                                    color="danger"
                                    variant="flat"
                                    onPress={onClose}
                                >
                                    Close
                                </Button>
                                <Button color="primary" type="submit">
                                    {skills.some((skill) =>
                                        // @ts-ignore
                                        formData.stack!.includes(skill.name)
                                    )
                                        ? "Save"
                                        : "Create"}
                                </Button>
                            </ModalFooter>
                        </form>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}

export default ProjectModal;
