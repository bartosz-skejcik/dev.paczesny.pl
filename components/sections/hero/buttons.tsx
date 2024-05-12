"use client";

import { siteConfig } from "@/config/site";
import { Button } from "@nextui-org/button";
import { Github, Mailbox, Rocket } from "lucide-react";
import React from "react";

import { sendGAEvent } from "@next/third-parties/google";

type Props = {};

function Buttons({}: Props) {
    return (
        <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
                size="lg"
                variant="bordered"
                color="secondary"
                startContent={<Github />}
                href={siteConfig.hero.github}
                onClick={() => sendGAEvent("hero", "click", "github")}
            >
                Github
            </Button>
            <Button
                size="lg"
                className="m-2"
                variant="shadow"
                color="warning"
                startContent={<Rocket />}
                onClick={() => sendGAEvent("hero", "click", "projects")}
                href={siteConfig.hero.projects}
            >
                My projects
            </Button>
            <Button
                size="lg"
                variant="bordered"
                color="danger"
                startContent={<Mailbox />}
                onClick={() => sendGAEvent("hero", "click", "contact")}
                href={siteConfig.hero.contact}
            >
                Contact me
            </Button>
        </div>
    );
}

export default Buttons;
