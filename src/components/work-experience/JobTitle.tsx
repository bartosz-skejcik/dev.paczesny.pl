type JobTitleProps = {
    title: string;
    company?: string;
};

export function JobTitle({ title, company }: JobTitleProps) {
    return (
        <h3 className="flex items-center gap-2 text-lg font-medium text-white">
            {title}
            {company && <span>• {company}</span>}
        </h3>
    );
}
