"use client";

import { siteConfig } from "@/config/site";
import { Button } from "@nextui-org/button";
import { Github, Mailbox, Rocket } from "lucide-react";
import { usePostHog } from "posthog-js/react";
import React from "react";

type Props = {};

function Buttons({}: Props) {
    const posthog = usePostHog();

    return (
        <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
                size="lg"
                variant="bordered"
                color="secondary"
                startContent={<Github />}
                href={siteConfig.hero.github}
                onClick={() => {
                    posthog.capture("follow_link", {
                        name: "github",
                        component: "hero",
                    });
                }}
            >
                Github
            </Button>
            <Button
                size="lg"
                className="m-2"
                variant="shadow"
                color="warning"
                startContent={<Rocket />}
                href={siteConfig.hero.projects}
                onClick={() => {
                    posthog.capture("follow_link", {
                        name: "projects",
                        component: "hero",
                    });
                }}
            >
                My projects
            </Button>
            <Button
                size="lg"
                variant="bordered"
                color="danger"
                startContent={<Mailbox />}
                onClick={() => {
                    posthog.capture("follow_link", {
                        name: "contact",
                        component: "hero",
                    });
                }}
                href={siteConfig.hero.contact}
            >
                Contact me
            </Button>
        </div>
    );
}

export default Buttons;
