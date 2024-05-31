import React from "react";

type Props = {
    title: string;
    description: string;
    children: React.ReactNode;
    className?: string;
};

function TabHeader({ title, description, children, className }: Props) {
    return (
        <div
            className={
                "flex flex-col items-start justify-start gap-y-4" +
                ` ${className}`
            }
        >
            <h2 className="text-4xl font-bold text-foreground-900">{title}</h2>
            <p className="text-foreground-400">{description}</p>
            {children}
        </div>
    );
}

export default TabHeader;
