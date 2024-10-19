import { WorkQueryResult } from "@/sanity/types";
import React from "react";
import { DateRange } from "./work-experience/DateRange";
import { JobTitle } from "./work-experience/JobTitle";
import { JobDetails } from "./work-experience/JobDetails";
import { JobDescription } from "./work-experience/JobDescription";
import { SkillList } from "./work-experience/SkillList";

type Props = {
    experience: WorkQueryResult;
};

function Work({ experience }: Props) {
    console.log(experience);
    return (
        <div className="mt-16 grid grid-cols-1 gap-10">
            {experience.map((exp, index) => (
                <div key={index} className="flex">
                    {exp.start_date && exp.end_date && (
                        <DateRange
                            startDate={exp.start_date}
                            endDate={exp.end_date}
                        />
                    )}
                    <div className="flex-grow">
                        {exp.title && exp.company && (
                            <JobTitle title={exp.title} company={exp.company} />
                        )}
                        <JobDetails
                            employment_type={exp.employment_type}
                            location_type={exp.location_type}
                            location={exp.location}
                        />
                        {exp.description && (
                            <JobDescription description={exp.description} />
                        )}
                        {exp.skills && <SkillList skills={exp.skills} />}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Work;
