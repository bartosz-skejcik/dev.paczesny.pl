/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@lib/utils";
import { Button } from "@ui/shadcn/Button";
import { Calendar } from "@ui/shadcn/Calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@ui/shadcn/Popover";

export function DatePicker({
    setDate,
    date,
    placeholder,
}: {
    setDate: any;
    date: Date | string | null;
    placeholder: string;
}) {
    const d = new Date(date ?? new Date());
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-secondary",
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {d && typeof d === "object" ? (
                        d.toLocaleDateString("pl-PL")
                    ) : (
                        <span>{placeholder}</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar date={d} setDate={setDate as any} />
            </PopoverContent>
        </Popover>
    );
}
