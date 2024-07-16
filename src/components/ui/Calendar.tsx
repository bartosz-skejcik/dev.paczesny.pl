"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { pl } from "date-fns/locale";

import { cn } from "@lib/utils";
import { buttonVariants } from "@ui/Button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

type Props = React.ComponentProps<typeof DayPicker> & {
    className?: string;
    classNames?: Record<string, string>;
    showOutsideDays?: boolean;
    date: Date;
    setDate: (date: Date) => void;
};

function Calendar({
    className,
    classNames,
    showOutsideDays = true,
    date,
    setDate,
    ...props
}: Props) {
    // const monthNuber = date.getMonth();
    return (
        <DayPicker
            month={date}
            initialFocus={false}
            selected={date}
            locale={pl}
            // @ts-ignore
            onSelect={(d) => {
                setDate(d as any);
            }}
            mode="single"
            fixedWeeks
            showOutsideDays={showOutsideDays}
            className={cn(
                "rounded-lg bg-neutral-900 p-3 text-primary ring ring-neutral-800",
                className,
            )}
            classNames={{
                months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                month: "space-y-4",
                caption:
                    "flex justify-center pt-1 relative items-center capitalize",
                caption_label: "text-sm font-medium",
                nav: "space-x-1 flex items-center",
                nav_button: cn(
                    buttonVariants({ variant: "outline" }),
                    "h-7 w-7 p-0 opacity-50 hover:opacity-100",
                ),
                nav_button_previous: "absolute left-1",
                nav_button_next: "absolute right-1",
                table: "w-full border-collapse space-y-1",
                head_row: "flex",
                head_cell:
                    "text-secondary rounded-md w-9 font-normal text-[0.8rem] capitalize",
                row: "flex w-full mt-2",
                cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-sky-500/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                day: cn(
                    buttonVariants({ variant: "ghost" }),
                    "h-9 w-9 p-0 font-normal hover:!bg-neutral-800 hover:!text-primary aria-selected:opacity-100",
                ),
                day_range_end: "day-range-end",
                day_selected:
                    "bg-sky-500 text-primary hover:bg-sky-600 hover:!text-primary",
                day_today: "bg-neutral-800 text-primary",
                day_outside:
                    "day-outside text-secondary opacity-50 aria-selected:bg-sky-500/50 aria-selected:text-secondary aria-selected:opacity-30",
                day_disabled: "text-primary opacity-50",
                day_range_middle:
                    "aria-selected:bg-sky-500 aria-selected:text-sky-500-foreground",
                day_hidden: "invisible",
                ...classNames,
            }}
            components={{
                IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
                IconRight: ({ ...props }) => (
                    <ChevronRight className="h-4 w-4" />
                ),
            }}
            {...props}
        />
    );
}
Calendar.displayName = "Calendar";

export { Calendar };
