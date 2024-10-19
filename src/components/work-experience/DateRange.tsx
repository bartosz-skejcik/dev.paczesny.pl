import { format } from "date-fns";

type DateRangeProps = {
    startDate: string;
    endDate?: string;
};

export function DateRange({ startDate, endDate }: DateRangeProps) {
    const formatDateRange = (start: string, end?: string): string => {
        const startFormatted = format(new Date(start), "MMM yyyy");
        const endFormatted = end
            ? format(new Date(end), "MMM yyyy")
            : "Present";
        return `${startFormatted} — ${endFormatted}`;
    };

    return (
        <div className="w-56 flex-shrink-0 text-start">
            <span className="whitespace-nowrap text-sm text-sky-400">
                {formatDateRange(startDate, endDate)}
            </span>
        </div>
    );
}
