import { Paragraph } from "@ui/Paragraph";
import { Heading } from "@ui/Heading";
import { IconCircleCheckFilled } from "@tabler/icons-react";
import { getEducation } from "@/sanity/lib/education";
import { EducationQueryResult } from "@/sanity/types";
import { PortableText } from "next-sanity";

function formatDate(date: string, start_date: string, end_date: string) {
    const dateObject = new Date(date || "");
    const startDate = new Date(start_date || "");
    const endDate = new Date(end_date || "");

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    if (start_date && end_date) {
        // check if the year diff is greater than or equal to 1 year
        const yearDiff = endDate.getFullYear() - startDate.getFullYear();
        if (yearDiff >= 1) {
            // return year - year
            return `${startDate.getFullYear()} - ${endDate.getFullYear()}`;
        } else {
            // return month - month
            console.log(startDate.toLocaleString("en-PL"), endDate);
            return `${months[Number(startDate.getMonth().toLocaleString("en-PL"))]} - ${months[endDate.getMonth()]} | ${endDate.getFullYear()}`;
        }
    } else if (start_date && !end_date) {
        // return month, year - "currently"
        return `${months[startDate.getMonth()]}, ${startDate.getFullYear()} - Currently`;
    } else {
        // return date
        return dateObject.toLocaleDateString("en-PL", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    }

    // return dateObject.toLocaleDateString("en-PL", {
    //     year: "numeric",
    //     month: "short",
    // });
}

export const Education = async () => {
    const education: EducationQueryResult = await getEducation();
    return (
        <div>
            {education.map((item) => (
                <div
                    className="relative my-20 flex flex-col space-x-10 space-y-10 md:flex-row md:space-y-0"
                    key={item._id}
                >
                    <Paragraph className="w-40 whitespace-nowrap capitalize">
                        {formatDate(
                            item.date!,
                            item.start_date!,
                            item.end_date!,
                        )}
                    </Paragraph>
                    <div>
                        <Heading
                            as="h5"
                            className="text-lg text-sky-500 md:text-lg lg:text-lg"
                        >
                            {item.level}
                        </Heading>
                        {item.degree && item.field_of_study ? (
                            <Paragraph className="text-base font-medium text-secondary md:text-base lg:text-base">
                                {item.field_of_study} - {item.degree}
                            </Paragraph>
                        ) : (
                            <Paragraph className="text-base font-medium text-secondary md:text-base lg:text-base">
                                {item.degree}
                            </Paragraph>
                        )}
                        {item.school_name && (
                            <Paragraph className="text-base md:text-base lg:text-base">
                                {item.school_name}
                            </Paragraph>
                        )}
                        {item.description && (
                            <Paragraph className="mb-4 text-sm md:text-sm lg:text-sm">
                                {item.description.map((block, idx) => (
                                    <PortableText key={idx} value={block} />
                                ))}
                            </Paragraph>
                        )}

                        {item.skills &&
                            item.skills.length > 0 &&
                            item.skills.split(", ").map((skill, index) => (
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
