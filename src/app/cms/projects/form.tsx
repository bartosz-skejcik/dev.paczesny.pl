/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Heading } from "@/components/ui/Heading";
import { InputWithLabel } from "@/components/ui/InputWithLabel";
import MultiSelect from "@/components/ui/MultiSelect";
import { Input } from "@/components/ui/shadcn/Input";
import { Label } from "@/components/ui/shadcn/Label";
import { Textarea } from "@/components/ui/shadcn/Textarea";
import { Tables } from "@lib/database.types";
import { getSkills } from "@lib/supabase/server";
import { createProject, updateProject } from "@lib/supabase/client";
import { X } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type FormData = Tables<"projects"> & {
    images?: { file?: File; ext?: string; url: string }[];
    skills: { name: string }[];
};

type Props = {
    setProjects: (projects: FormData[]) => void;
    projects: FormData[];
    activeProject: FormData | null;
    data: FormData | null;
};

function Form({ setProjects, projects, activeProject, data }: Props) {
    const [form, setForm] = useState<FormData>(data!);

    const [skills, setSkills] = useState<Tables<"skills">[]>([]);
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [images, setImages] = useState<File[]>([]);
    const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(
        null,
    );
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

    useEffect(() => {
        getSkills().then((skills: Tables<"skills">[]) => {
            setSkills(skills);
        });
    }, []);

    useEffect(() => {
        if (activeProject !== null && data !== null && data.id) {
            setForm(data);
            if (data.thumbnail) {
                if (data.thumbnail.startsWith("http")) {
                    setThumbnailPreview(data.thumbnail);
                } else {
                    setThumbnailPreview(
                        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/projects/${data.thumbnail}`,
                    );
                }
            }
            if (data.images)
                setImagePreviews(data.images.map((image) => image.url));
        } else {
            setForm({
                id: "",
                title: "",
                description: "",
                content: "",
                thumbnail: "",
                link: "",
                github: "",
                images: [],
                skills: [],
            });
            setThumbnailPreview(null);
            setImagePreviews([]);
        }
    }, [data]);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        // transformt the form data.images to be {file: File, ext: string}[]
        const transformedImages = images.map((image) => ({
            file: image,
            ext: image.name.split(".").pop()!,
        }));

        const transformedThumbnail = {
            file: thumbnail!,
            ext: thumbnail!.name.split(".").pop()!,
        };

        if (activeProject) {
            // Update
            const { data, error } = await updateProject({
                ...form,
                images: transformedImages,
                thumbnail: transformedThumbnail,
            });

            if (error) {
                console.log(error);
                return;
            }

            window.location.reload();
        } else {
            // Create
            const { data, error } = await createProject({
                ...form,
                images: transformedImages,
                thumbnail: transformedThumbnail,
            });

            if (error) {
                console.log(error);
                return;
            }

            window.location.reload();
        }
    }

    const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setThumbnail(file!);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setThumbnailPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const newImagePreviews: string[] = [];
        setImages(files);
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                newImagePreviews.push(reader.result as string);
                if (newImagePreviews.length === files.length) {
                    setImagePreviews([...imagePreviews, ...newImagePreviews]);
                }
            };
            reader.readAsDataURL(file);
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="mx-4 my-10 grid w-full grid-cols-2 gap-3 text-primary sm:mx-0 lg:max-w-4xl lg:gap-6"
        >
            <div className="col-span-2">
                <Heading className="mb-2">
                    {form.title || "Add new project"}
                </Heading>
            </div>
            <div className="col-span-2">
                <Label
                    htmlFor={`thumbnail-${form.id}`}
                    className="mb-4 flex aspect-video cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-neutral-700 bg-neutral-800 p-6 text-center text-primary"
                >
                    {thumbnailPreview ? (
                        <Image
                            src={thumbnailPreview}
                            alt="Thumbnail Preview"
                            width={1600}
                            height={900}
                            className="w-full rounded-lg"
                        />
                    ) : (
                        <>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                className="mx-auto mb-4 h-8 w-8"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                                />
                            </svg>
                            <h5 className="mb-2 text-xl font-bold tracking-tight">
                                Upload the thumbnail
                            </h5>
                            <p className="text-sm font-normal text-secondary md:px-5">
                                Choose photo size should be less than 10MB
                            </p>
                            <p className="text-sm font-normal text-neutral-400 md:px-6">
                                and should be in{" "}
                                <b className="text-secondary">
                                    JPG, PNG, or GIF
                                </b>{" "}
                                format.
                            </p>
                        </>
                    )}
                </Label>
                <Input
                    type="file"
                    id={`thumbnail-${form.id}`}
                    name={`thumbnail-${form.id}`}
                    accept="image/*"
                    onChange={handleThumbnailChange}
                    className="hidden w-full"
                />
            </div>
            <div className="col-span-2">
                <Label htmlFor="images">Images</Label>
                <div className="mb-2 flex flex-wrap gap-2">
                    {imagePreviews.map((src, index) => (
                        <div key={index} className="group relative p-1">
                            <Image
                                width={160}
                                height={90}
                                key={index}
                                src={src}
                                alt={`Image Preview ${index}`}
                                className="h-32 object-cover"
                            />
                            <button
                                onClick={() => {
                                    setImagePreviews(
                                        imagePreviews.filter(
                                            (_, i) => i !== index,
                                        ),
                                    );
                                    setImages(
                                        images.filter((_, i) => i !== index),
                                    );
                                }}
                                className="absolute right-1 top-1 hidden rounded-md bg-red-500 text-primary group-hover:flex"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                    ))}
                </div>
                <Input
                    type="file"
                    accept="image/*"
                    name="images"
                    multiple
                    onChange={handleImagesChange}
                    className="w-full"
                />
            </div>
            <InputWithLabel
                type="text"
                label="Title"
                value={form.title}
                onChange={(value) => {
                    setForm({ ...form, title: value });
                }}
                placeholder="Project title"
            />
            <InputWithLabel
                type="text"
                label="Description"
                value={form.description}
                onChange={(value) => {
                    setForm({ ...form, description: value });
                }}
                placeholder="Project description"
            />
            <div className="col-span-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                    value={form.content!}
                    onChange={(e) => {
                        setForm({ ...form, content: e.target.value });
                    }}
                    placeholder="Project content"
                />
            </div>
            <div className="col-span-2">
                <Label htmlFor="skills">Skills</Label>
                <MultiSelect
                    className="text-primary"
                    placeholder="Project skills"
                    defaultOptions={
                        form.skills
                            ? form.skills.map((skill) => {
                                  return {
                                      value: skill.name,
                                      label: skill.name,
                                  };
                              })
                            : []
                    }
                    options={skills.map((skill) => {
                        return { value: skill.name, label: skill.name };
                    })}
                    value={
                        form.skills
                            ? form.skills.map((skill) => {
                                  return {
                                      value: skill.name,
                                      label: skill.name,
                                  };
                              })
                            : []
                    }
                    onChange={(value) => {
                        setForm({
                            ...form,
                            skills: value.map((skill) => {
                                return { name: skill.value };
                            }),
                        });
                    }}
                />
            </div>
            <InputWithLabel
                type="text"
                label="Link"
                value={form.link}
                onChange={(value) => {
                    setForm({ ...form, link: value });
                }}
                placeholder="Project link"
            />
            <InputWithLabel
                type="text"
                label="Github"
                value={form.github}
                onChange={(value) => {
                    setForm({ ...form, github: value });
                }}
                placeholder="Project github"
            />
            <div className="col-span-2 mt-6 lg:mt-0">
                <button
                    type="submit"
                    className="w-full rounded-md bg-transparent py-2 text-primary ring-1 ring-primary transition-all duration-200 hover:bg-primary hover:text-neutral-950"
                >
                    {activeProject ? "Update" : "Create"}
                </button>
            </div>
        </form>
    );
}

export default Form;
