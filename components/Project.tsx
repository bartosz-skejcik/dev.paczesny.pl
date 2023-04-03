import { ArrowUpOnSquareIcon } from "@heroicons/react/24/outline";
import { slideInVariant } from "@utils/motion";
import { motion } from "framer-motion";
import Image from "next/image";
import { event } from "nextjs-google-analytics";

type Props = {
    project: any;
};

export default function Project({ project }: Props) {
    return (
        <motion.div
            variants={slideInVariant(project.direction ? "left" : "right", 0.2)}
            initial="hidden"
            whileInView={"show"}
            exit="exit"
            className={`flex ${
                project.direction ? "flex-row-reverse" : "flex-row"
            } items-center justify-between lg:justify-around w-11/12 lg:w-5/6 py-12 overflow-hidden`}
        >
            <div
                className={`flex flex-col ${
                    project.direction ? "md:items-end" : "md:items-start"
                } justify-center items-center w-full md:w-1/2 lg:w-1/3`}
            >
                <h1 className="mb-6 text-2xl font-medium text-neutral-100 md:text-3xl 2xl:text-4xl">
                    {project.name}
                </h1>
                <p
                    className={`${
                        project.direction ? "md:text-right" : "md:text-left"
                    } text-center text-neutral-100 text-lg md:text-xl 2xl:text-2xl mb-6`}
                >
                    {project.description}
                </p>
                <div
                    className={`flex flex-wrap items-center ${
                        project.direction
                            ? "md:justify-end"
                            : "md:justify-start"
                    } w-full gap-4 justify-center`}
                >
                    {project.technologies.map(
                        (technology: string, index: number) => (
                            <span
                                key={index}
                                className="py-1 text-sm text-neutral-100 md:text-md 2xl:text-lg text-accent/80"
                            >
                                {technology}
                            </span>
                        )
                    )}
                </div>
                <div className="flex items-center justify-center gap-4 mt-6">
                    <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="text-neutral-300"
                        onClick={() => {
                            event("view_sourcecode", {
                                category: "project",
                                label: project.name,
                            });
                        }}
                    >
                        <svg
                            role="img"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-6 h-6"
                            fill="#0000"
                        >
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                        </svg>
                    </a>
                    <a
                        href={project.website}
                        target="_blank"
                        rel="noreferrer"
                        className="text-neutral-100"
                        onClick={() => {
                            event("view_website", {
                                category: "project",
                                label: project.name,
                            });
                        }}
                    >
                        <ArrowUpOnSquareIcon className="h-7 w-7" />
                    </a>
                </div>
            </div>
            <div className="items-center justify-center hidden w-1/2 md:flex lg:w-1/3">
                <Image
                    src={project.image}
                    alt={project.name}
                    width={500}
                    height={300}
                    className={`bg-center bg-cover bg-no-repeat rounded-2xl opacity-90 lg:shadow-[${
                        project.direction ? "" : "-"
                    }20px_20px_0px_0px_#E94560] scale-100 lg:scale-115 lg:shadow-accent w-full h-full`}
                />
            </div>
        </motion.div>
    );
}
