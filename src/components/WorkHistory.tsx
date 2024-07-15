import React from "react";
import { Paragraph } from "@ui/Paragraph";
import { Heading } from "@ui/Heading";
import { getEducation } from "@lib/supabase/server";
import { IconCircleCheckFilled } from "@tabler/icons-react";

function formatDate(date: string) {
    const dateObject = new Date(date);
    return dateObject.toLocaleDateString("en-PL", {
        year: "numeric",
        month: "short",
    });
}

export const WorkHistory = async () => {
    let education = await getEducation();
    education = education.sort(
        (a, b) => new Date(b.date!).getTime() - new Date(a.date!).getTime(),
    );
    return (
        <div>
            {education.map((item) => (
                <div
                    className="relative my-20 flex flex-col space-x-10 space-y-10 md:flex-row md:space-y-0"
                    key={item.id}
                >
                    <Paragraph className="w-40">
                        {item.start_date && item.end_date
                            ? `${formatDate(item.start_date)} - ${formatDate(
                                  item.end_date,
                              )}`
                            : formatDate(item.date!)}
                    </Paragraph>
                    <div>
                        <Heading
                            as="h5"
                            className="text-lg text-sky-500 md:text-lg lg:text-lg"
                        >
                            {item.title}
                        </Heading>
                        {item.text && (
                            <Paragraph className="text-base font-semibold md:text-base lg:text-base">
                                {item.text}
                            </Paragraph>
                        )}
                        {item.duration && (
                            <Paragraph className="mb-4 text-sm md:text-sm lg:text-sm">
                                {item.duration}
                            </Paragraph>
                        )}
                        {item.description && (
                            <Paragraph className="mb-4 text-sm md:text-sm lg:text-sm">
                                {item.description}
                            </Paragraph>
                        )}

                        {item.stack.length > 0 &&
                            item.stack.split(",").map((skill, index) => (
                                <Step key={index}>
                                    <span className="capitalize">{skill}</span>
                                </Step>
                            ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

const Step = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="my-2 flex items-start space-x-1">
            <IconCircleCheckFilled className="mt-1 h-3 w-4 text-neutral-300" />
            <Paragraph className="text-sm md:text-sm lg:text-sm">
                {children}
            </Paragraph>
        </div>
    );
};
