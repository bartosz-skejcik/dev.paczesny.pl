/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@lib/utils";
import { Button } from "@ui/Button";
import { Calendar } from "@ui/Calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@ui/Popover";
import { useEffect, useState } from "react";

export function DatePicker({ setDate, date, placeholder }: any) {
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
                    {date ? format(date, "PPP") : <span>{placeholder}</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar date={date} setDate={setDate as any} />
            </PopoverContent>
        </Popover>
    );
}
