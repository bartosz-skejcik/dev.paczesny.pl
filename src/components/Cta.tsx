"use client";

import { CtaLinks } from "@/constants/cta";
import { Button } from "./ui/shadcn/Button";
import { useRouter } from "next/navigation";

type Props = {};

function Cta({}: Props) {
    const router = useRouter();
    return (
        <div className="mr-auto flex items-center gap-4">
            {CtaLinks.map((cta) => (
                <Button
                    key={cta.id}
                    onClick={() => {
                        window.logEvent("cta_click", { ctaId: cta.id });
                        router.push(cta.href);
                    }}
                    className="group/button inline-flex h-9 origin-left items-center gap-1 rounded-full bg-neutral-200 px-4 py-0 text-sm font-medium text-black shadow-lg shadow-white/20 ring-neutral-950/60 ring-offset-neutral-100 transition hover:scale-105 focus:outline-none focus-visible:ring-1 focus-visible:ring-offset-2 group-hover/button:scale-[1.005] group-hover/button:bg-neutral-950/15 sm:backdrop-blur-sm"
                >
                    {cta.icon}
                    {cta.label}
                </Button>
            ))}
        </div>
    );
}

export default Cta;
