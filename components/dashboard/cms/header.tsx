import { Button } from "@nextui-org/button";
import { PlusIcon } from "lucide-react";
import React from "react";

type Props = {
    onOpen?: () => void;
    title?: string;
    buttonText?: string;
};

function Header({
    onOpen,
    title = "Manage Projects",
    buttonText = "Add projects",
}: Props) {
    return (
        <header className="flex items-center justify-between px-5 py-3.5 w-full border-b border-foreground-200 dark:bg-white/5 bg-black/5">
            <h2 className="text-2xl text-foreground-600">{title}</h2>

            <Button
                onClick={onOpen}
                color="primary"
                radius="sm"
                className={`font-medium h-8 ${
                    onOpen ? "cursor-pointer" : "cursor-not-allowed"
                }`}
                disabled={!onOpen}
                size="md"
                startContent={<PlusIcon size={24} />}
            >
                {buttonText}
            </Button>
        </header>
    );
}

export default Header;
