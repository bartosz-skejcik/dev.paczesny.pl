"use client";

import { Tables } from "@/lib/database.types";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from "@nextui-org/modal";
import { GraduationCapIcon, Link2Icon, TypeIcon } from "lucide-react";
import React, { FormEvent, useEffect, useState } from "react";

type Props = {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    skill: Tables<"skills"> | null | undefined;
    category: string;
    onSubmit: (skill: Tables<"skills">) => Promise<void>;
    onCancel?: () => void;
};

function SkillModal({
    isOpen,
    onOpenChange,
    skill,
    category,
    onSubmit,
    onCancel,
}: Props) {
    const [formData, setFormData] = useState<Tables<"skills">>({
        id: "",
        name: "",
        experience: "",
        icon: "",
        category: category,
    } as Tables<"skills">);

    useEffect(() => {
        if (skill !== null && skill !== undefined && category) {
            setFormData({
                id: skill.id,
                name: skill.name,
                experience: skill.experience,
                icon: skill.icon,
                category: skill.category,
            } as Tables<"skills">);
        } else {
            setFormData({
                name: "",
                experience: "",
                icon: "",
                category: category,
            } as Tables<"skills">);
        }
    }, [skill, category]);

    return (
        <Modal
            size="xl"
            backdrop="blur"
            isOpen={isOpen}
            onOpenChange={onCancel ?? onOpenChange}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            <h2 className="font-semibold text-xl">
                                Add new {category} skill
                            </h2>
                            <p className="text-foreground-500 font-normal text-sm">
                                Fill the form to add a new skill. All fields are
                                required.
                            </p>
                        </ModalHeader>
                        <form
                            onSubmit={async (e: FormEvent) => {
                                e.preventDefault();
                                await onSubmit(formData);
                                onClose();
                            }}
                        >
                            <ModalBody>
                                <Input
                                    label="Name"
                                    placeholder="What's the skill name"
                                    variant="bordered"
                                    autoFocus
                                    endContent={<TypeIcon size={24} />}
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            name: e.target.value,
                                        })
                                    }
                                />
                                <Input
                                    label="Experience"
                                    placeholder="How many years of experience"
                                    variant="bordered"
                                    endContent={<GraduationCapIcon size={24} />}
                                    value={formData.experience!}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            experience: e.target.value,
                                        })
                                    }
                                />
                                <Input
                                    label="Icon"
                                    placeholder="Icon URL"
                                    variant="bordered"
                                    value={formData.icon!}
                                    endContent={<Link2Icon size={24} />}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            icon: e.target.value,
                                        })
                                    }
                                />
                            </ModalBody>
                            <ModalFooter className="flex items-center justify-between">
                                <Button
                                    color="danger"
                                    variant="flat"
                                    onPress={() => {
                                        onCancel && onCancel();
                                        onClose();
                                    }}
                                >
                                    Close
                                </Button>
                                <Button color="primary" type="submit">
                                    Save
                                </Button>
                            </ModalFooter>
                        </form>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}

export default SkillModal;
