import { WorkQueryResult } from "@/sanity/types";

export type Skill = {
    _id: string;
    name: string;
};

export const employmentTypeLabels: Record<
    NonNullable<WorkQueryResult[0]["employment_type"]>,
    string
> = {
    fulltime: "Full-time",
    parttime: "Part-time",
    "self-employed": "Self-employed",
    freelance: "Freelance",
    contract: "Contract",
    internship: "Internship",
} as const;

export const locationTypeLabels: Record<
    NonNullable<WorkQueryResult[0]["location_type"]>,
    string
> = {
    remote: "Remote",
    hybrid: "Hybrid",
    onsite: "On-site",
} as const;
