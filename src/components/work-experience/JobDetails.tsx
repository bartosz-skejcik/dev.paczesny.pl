import {
    employmentTypeLabels,
    locationTypeLabels,
} from "@/types/work-experience";
import { WorkQueryResult } from "@/sanity/types";

type JobDetailsProps = Pick<
    WorkQueryResult[0],
    "employment_type" | "location_type" | "location"
>;

export function JobDetails({
    employment_type,
    location_type,
    location,
}: JobDetailsProps) {
    const employmentTypeLabel = employment_type
        ? employmentTypeLabels[employment_type]
        : "Not specified";
    const locationTypeLabel = location_type
        ? locationTypeLabels[location_type]
        : "Not specified";

    return (
        <div className="mt-1 text-sm text-neutral-400">
            <p>
                {employmentTypeLabel} • {locationTypeLabel}
            </p>
            <p>{location || "Location not specified"}</p>
        </div>
    );
}
