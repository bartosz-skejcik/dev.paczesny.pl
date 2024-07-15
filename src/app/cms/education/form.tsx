/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { DatePicker } from "@ui/DatePicker";
import { Heading } from "@ui/Heading";
import { InputWithLabel } from "@ui/InputWithLabel";
import { Tables } from "@lib/database.types";
import { Label } from "@ui/Label";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { createEducation, updateEducation } from "@lib/supabase/server";

type Props = {
    data: Tables<"education"> | null;
    activeEducation: Tables<"education"> | null;
    setEducation: (education: Tables<"education">[]) => void;
    education: Tables<"education">[];
};

function Form({ data, activeEducation, setEducation, education }: Props) {
    const [form, setForm] = useState<Tables<"education">>(data!);

    useEffect(() => {
        if (activeEducation !== null && data !== null && data.id) {
            setForm(data);
        } else {
            setForm({
                id: "",
                title: "",
                text: "",
                description: "",
                duration: "",
                date: new Date() as any,
                stack: "",
                start_date: new Date() as any,
                end_date: new Date() as any,
            });
        }
    }, [data]);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (activeEducation) {
            // Update
            // data is the current education
            const { data, error } = await updateEducation(form);
            if (error) {
                console.log(error);
                return;
            }

            // update the edited education in the state
            const index = education.findIndex((edu) => edu.id === data.id);
            let edu = education;
            edu[index] = data;
            setEducation(edu);
            window.location.reload();
        } else {
            // Create
            const { data, error } = await createEducation(form);

            if (error) {
                console.log(error);
                return;
            }

            // add the new education to the state
            setEducation([...education, data]);
            window.location.reload();
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="mx-4 grid w-full grid-cols-2 gap-3 sm:mx-0 lg:max-w-4xl lg:gap-6"
        >
            <div className="col-span-2">
                <Heading className="mb-2">{form.title || "Create new"}</Heading>
            </div>
            <InputWithLabel
                type="text"
                label="Title"
                placeholder="Title"
                className="col-span-2 lg:col-span-1"
                value={form.title}
                onChange={(value) => setForm({ ...form, title: value })}
            />
            <InputWithLabel
                type="text"
                label="Text"
                placeholder="Text"
                className="col-span-2 lg:col-span-1"
                value={form.text!}
                onChange={(value) => setForm({ ...form, text: value })}
            />
            <InputWithLabel
                type="text"
                label="Description"
                placeholder="Description"
                className="col-span-2 lg:col-span-1"
                value={form.description!}
                onChange={(value) => setForm({ ...form, description: value })}
            />
            <InputWithLabel
                type="text"
                label="Duration"
                placeholder="Duration"
                className="col-span-2 lg:col-span-1"
                value={form.duration!}
                onChange={(value) => setForm({ ...form, duration: value })}
            />
            <div className="col-span-2 grid w-full items-center gap-1.5 text-secondary lg:col-span-1">
                <Label htmlFor="date">Date</Label>
                <DatePicker
                    date={form.date}
                    setDate={(date: any) => setForm({ ...form, date })}
                    placeholder="Select a date"
                />
            </div>
            <InputWithLabel
                type="text"
                label="Stack"
                placeholder="Item, Item, Item"
                className="col-span-2 lg:col-span-1"
                value={form.stack}
                onChange={(value) => setForm({ ...form, stack: value })}
            />
            <div className="col-span-2 grid w-full items-center gap-1.5 text-secondary lg:col-span-1">
                <Label htmlFor="start_date">Start Date</Label>
                <DatePicker
                    date={form.start_date}
                    setDate={(date: any) =>
                        setForm({ ...form, start_date: date })
                    }
                    placeholder="Select the start date"
                />
            </div>
            <div className="col-span-2 grid w-full items-center gap-1.5 text-secondary lg:col-span-1">
                <Label htmlFor="end_date">End Date</Label>
                <DatePicker
                    date={form.end_date}
                    setDate={(date: any) =>
                        setForm({ ...form, end_date: date })
                    }
                    placeholder="Select the end date"
                />
            </div>
            <div className="col-span-2 mt-6 lg:mt-0">
                <button
                    type="submit"
                    className="w-full rounded-md bg-transparent py-2 text-primary ring-1 ring-primary transition-all duration-200 hover:bg-primary hover:text-neutral-950"
                >
                    {activeEducation ? "Update" : "Create"}
                </button>
            </div>
        </form>
    );
}

export default Form;
