import * as React from "react";

import { cn } from "@lib/utils";

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, ...props }, ref) => {
        return (
            <textarea
                className={cn(
                    "flex min-h-32 w-full rounded-md border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm text-primary caret-sky-500 ring-offset-sky-500 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-secondary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-700 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",
                    className,
                )}
                ref={ref}
                {...props}
            />
        );
    },
);
Textarea.displayName = "Textarea";

export { Textarea };
