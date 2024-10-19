import { Paragraph } from "@ui/Paragraph";
import { IconCircleCheckFilled } from "@tabler/icons-react";
import { getEducation } from "@/sanity/lib/education";
import { EducationQueryResult } from "@/sanity/types";
import { format } from "date-fns";
import { SkillList } from "./work-experience/SkillList";
import { JobDescription } from "./work-experience/JobDescription";
import { JobTitle } from "./work-experience/JobTitle";

function formatDate(date: string, start_date: string, end_date: string) {
    const dateObject = new Date(date || "");
    const startDate = new Date(start_date || "");
    const endDate = new Date(end_date || "");

    if (start_date && end_date) {
        const startFormatted = format(startDate, "MMM yyyy");
        const endFormatted = endDate ? format(endDate, "MMM yyyy") : "Present";

        // check if the year diff is greater than or equal to 1 year
        const yearDiff = endDate.getFullYear() - startDate.getFullYear();
        if (yearDiff >= 1) {
            // return year - year
            return `${startFormatted} — ${endFormatted}`;
        } else {
            // return month - month
            const startMonth = format(startDate, "MMM yy");
            const endMonth = format(endDate, "MMM yy");
            return `${startMonth} — ${endMonth}`;
        }
    } else if (start_date && !end_date) {
        // return month, year - "currently"
        const startMonth = format(startDate, "MMM yyyy");
        return `${startMonth} — Present`;
    } else {
        // return date
        return format(dateObject, "dd MMMM yyyy");
    }

    // return dateObject.toLocaleDateString("en-PL", {
    //     year: "numeric",
    //     month: "short",
    // });
}

export const Education = async () => {
    const education: EducationQueryResult = await getEducation();
    return (
        <div className="mt-16 grid grid-cols-1 gap-10">
            {education.map((item) => (
                <div key={item._id} className="flex">
                    <div className="w-56 flex-shrink-0 text-start">
                        <span className="whitespace-nowrap text-sm text-sky-400">
                            {formatDate(
                                item.date!,
                                item.start_date!,
                                item.end_date!,
                            )}
                        </span>
                    </div>
                    <div className="flex-grow">
                        {item.level && <JobTitle title={item.level} />}
                        <div className="mt-1 text-sm text-neutral-400">
                            {item.degree && item.field_of_study ? (
                                <p>
                                    {item.field_of_study} • {item.degree}
                                </p>
                            ) : (
                                <p>{item.degree}</p>
                            )}
                            {item.school_name && <p>{item.school_name}</p>}
                        </div>
                        {item.description && (
                            <JobDescription description={item.description} />
                        )}
                        {item.skills && (
                            <SkillList
                                skills={item.skills
                                    .split(", ")
                                    .map((i, idx) => ({
                                        _id: idx.toString(),
                                        name: i.toUpperCase(),
                                    }))}
                            />
                        )}
                    </div>

                    {/* <Heading
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
                    */}
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
