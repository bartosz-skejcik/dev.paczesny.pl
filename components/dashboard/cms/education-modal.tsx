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

import { Json, Tables } from "@/lib/database.types";
import { FormEvent, useEffect, useState } from "react";
import {
    createEducation,
    getEducation,
    updateEducation,
} from "@/lib/supabase/server";
import { DatePicker } from "@nextui-org/date-picker";
import { CalendarDate, now, getLocalTimeZone } from "@internationalized/date";

type Props = {
    isOpen: boolean;
    onOpenChange: () => void;
    education?: Tables<"education"> | null;
    setEducation: (education: Tables<"education">[]) => void;
    setSelectedEducation: (education: Tables<"education"> | null) => void;
};

function EducationModal({
    isOpen,
    onOpenChange,
    education,
    setEducation,
    setSelectedEducation,
}: Props) {
    const [formData, setFormData] = useState<Tables<"education">>({
        id: "",
        title: "",
        text: "",
        description: "",
        duration: "",
        date: "",
        stack: "",
    } as Tables<"education">);

    useEffect(() => {
        if (education !== undefined && education !== null) {
            setFormData({
                id: education.id,
                title: education.title,
                text: education.text,
                description: education.description,
                duration: education.duration,
                date: education.date,
                stack: education.stack,
            } as Tables<"education">);
        } else {
            setFormData({
                title: "",
                text: "",
                description: "",
                duration: "",
                date: "",
                stack: [] as Json,
            } as Tables<"education">);
        }
    }, [education]);

    const year = new Date(formData.date!).getFullYear();
    const month = new Date(formData.date!).getMonth();
    const day = new Date(formData.date!).getDate();

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
                                Add new education step
                            </h2>
                            <p className="text-foreground-500 font-normal text-sm">
                                Fill the form to add a new education step. All
                                fields are required.
                            </p>
                        </ModalHeader>
                        <form
                            onSubmit={async (e: FormEvent) => {
                                e.preventDefault();
                                if (
                                    education !== undefined &&
                                    education !== null
                                ) {
                                    // update the education
                                    const edu = await updateEducation(formData);
                                    const educations = await getEducation();
                                    setEducation(educations);
                                    setSelectedEducation(null);
                                    onOpenChange();
                                } else {
                                    // create the education
                                    const edu = await createEducation(formData);
                                    const educations = await getEducation();
                                    setEducation(educations);
                                    setSelectedEducation(null);
                                    onOpenChange();
                                }
                            }}
                        >
                            <ModalBody>
                                <Input
                                    label="Title"
                                    placeholder="Proffesion Exam"
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
                                <Input
                                    label="Text"
                                    placeholder="Zespół Szkół nr 14, Warsaw"
                                    variant="bordered"
                                    endContent={<LinkIcon size={24} />}
                                    value={formData.text!}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            text: e.target.value,
                                        })
                                    }
                                />
                                <Input
                                    label="Description"
                                    placeholder="INF. 02"
                                    variant="bordered"
                                    endContent={<AlignCenterIcon size={24} />}
                                    value={formData.description!}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            description: e.target.value,
                                        })
                                    }
                                />
                                <Input
                                    label="Duration"
                                    placeholder="currently, 1st year"
                                    variant="bordered"
                                    endContent={<GithubIcon size={24} />}
                                    value={formData.duration!}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            duration: e.target.value,
                                        })
                                    }
                                />
                                <Input
                                    label="Stack"
                                    placeholder="pract. 100%, theory 86%"
                                    variant="bordered"
                                    endContent={<GithubIcon size={24} />}
                                    // @ts-ignore
                                    value={formData.stack!}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            stack: e.target.value,
                                        })
                                    }
                                />
                                <DatePicker
                                    label="Date"
                                    variant="bordered"
                                    labelPlacement="inside"
                                    value={
                                        year
                                            ? new CalendarDate(year, month, day)
                                            : now(getLocalTimeZone())
                                    }
                                    onChange={(e) => {
                                        setFormData({
                                            ...formData,
                                            date: `${e.year}-${e.month}-${e.day}`,
                                        });
                                    }}
                                />
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
                                    {education !== undefined &&
                                    education !== null
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

export default EducationModal;
