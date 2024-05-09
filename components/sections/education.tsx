import Meteors from "@/components/meteors";
import { getEducation } from "@/lib/supabase/server";
import { Chip } from "@nextui-org/react";
import { CalendarDays, Timer } from "lucide-react";

type Props = {};

export default async function Education({}: Props) {
    const education = await getEducation();
    if (!education) return null;
    return (
        <section className="w-full flex flex-col items-center justify-center py-14 xl:py-28">
            <h6 className="uppercase text-amber-500 font-medium text-base mb-3">
                Education
            </h6>
            <h1 className="text-5xl font-semibold mb-16">My road so far</h1>
            <div className="grid xl:grid-cols-2 grid-cols-1 xl:grid-rows-2 gap-10 w-2/3 2xl:h-[40vh]">
                {education.map((el, idx) => (
                    <Block
                        key={"education" + idx}
                        title={el.title}
                        text={el.text!}
                        description={el.description!}
                        // @ts-ignore
                        stack={el.stack!}
                        duration={el.duration!}
                        date={el.date!}
                    />
                ))}
            </div>
        </section>
    );
}

type BlockProps = {
    title: string;
    text: string;
    description?: string;
    stack?: string[];
    duration?: string;
    date: string;
};

const Block = ({
    title,
    text,
    description,
    stack,
    duration,
    date,
}: BlockProps) => {
    return (
        <div className="relative group">
            <div className="group-hover:opacity-100 opacity-10 transition-all duration-300 absolute inset-0 h-full w-full bg-gradient-to-r from-purple-600 via-pink-600 to-amber-600 transform scale-[0.85] rounded-2xl blur-xl" />
            <div className="group-hover:scale-[1.02] transition duration-250 relative shadow-xl bg-neutral-100 border-neutral-300 dark:bg-black border dark:border-gray-900  p-4 h-full overflow-hidden rounded-xl flex flex-col justify-start items-start">
                <div className="w-full flex items-center justify-between">
                    <h1 className="font-bold text-xl xl:text-2xl text-start dark:text-neutral-300 text-neutral-700 relative z-50">
                        {title}
                    </h1>
                    <p className="font-normal text-end text-sm xl:text-base text-slate-500 relative z-50">
                        {text}
                    </p>
                </div>
                {description && (
                    <p className="font-normal text-base text-slate-500 relative z-50 pt-1">
                        {description}
                        <br />
                    </p>
                )}
                <div className="flex flex-wrap gap-2 relative z-50 pt-3">
                    {stack?.split(", ").map((el: string, idx: number) => (
                        <Chip key={idx} color="warning" variant="flat">
                            {el}
                        </Chip>
                    ))}
                </div>

                <div className="flex flex-wrap gap-3 relative z-50 pt-3">
                    {duration && (
                        <Chip color="default" variant="flat">
                            <div className="flex items-center justify-center gap-1">
                                <Timer size={16} />
                                {duration}
                            </div>
                        </Chip>
                    )}
                    <Chip color="success" variant="flat">
                        <div className="flex items-center justify-center gap-1">
                            <CalendarDays size={16} />
                            {date}
                        </div>
                    </Chip>
                </div>

                {/* Meaty part - Meteor effect */}
                <Meteors number={20} />
            </div>
        </div>
    );
};
