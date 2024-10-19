import { WorkQueryResult } from "@/sanity/types";
import { PortableText } from "next-sanity";

type JobDescriptionProps = {
    description: NonNullable<WorkQueryResult[0]["description"]>;
};

export function JobDescription({ description }: JobDescriptionProps) {
    return (
        <div className="prose mt-2 text-sm leading-relaxed text-neutral-500">
            {description.map((block, blockIndex) => (
                <PortableText key={blockIndex} value={block} />
            ))}
        </div>
    );
}
