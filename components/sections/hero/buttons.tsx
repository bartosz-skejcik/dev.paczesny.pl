"use client";

import { siteConfig } from "@/config/site";
import { Button } from "@nextui-org/button";
import { Github, Mailbox, Rocket } from "lucide-react";
import React from "react";

import { sendGAEvent } from "@next/third-parties/google";
import { usePlausible } from "next-plausible";

type Props = {};

function Buttons({}: Props) {
    const plausible = usePlausible();

    return (
        <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
                size="lg"
                variant="bordered"
                color="secondary"
                startContent={<Github />}
                onPress={() => {
                    sendGAEvent({
                        category: "hero",
                        action: "click",
                        label: "github",
                    });
                    plausible("github-click", {
                        props: {
                            position: "hero",
                        },
                    });
                    window.location.href = siteConfig.hero.github;
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
                onPress={() => {
                    sendGAEvent({
                        category: "hero",
                        action: "click",
                        label: "projects",
                    });
                    plausible("projects-click", {
                        props: {
                            position: "hero",
                        },
                    });
                    window.location.href = siteConfig.hero.projects;
                }}
            >
                My projects
            </Button>
            <Button
                size="lg"
                variant="bordered"
                color="danger"
                startContent={<Mailbox />}
                onPress={() => {
                    sendGAEvent({
                        category: "hero",
                        action: "click",
                        label: "contact",
                    });
                    plausible("contact-click", {
                        props: {
                            position: "hero",
                        },
                    });
                    window.location.href = siteConfig.hero.contact;
                }}
            >
                Contact me
            </Button>
        </div>
    );
}

export default Buttons;
