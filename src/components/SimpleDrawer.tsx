import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@ui/shadcn/Drawer";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onClose: () => void;
    title: string | ReactNode;
    description: string;
    color: "primary" | "danger";
    onSubmit: () => void;
};

function SimpleDrawer({
    open,
    onOpenChange,
    onClose,
    title,
    description,
    color,
    onSubmit,
}: Props) {
    return (
        <Drawer open={open} onOpenChange={onOpenChange} onClose={onClose}>
            <DrawerContent className="z-[999999] lg:left-0 lg:right-0 lg:mx-auto lg:w-1/2">
                <DrawerHeader>
                    <DrawerTitle>{title}</DrawerTitle>
                    <DrawerDescription>{description}</DrawerDescription>
                </DrawerHeader>
                <DrawerFooter className="flex w-full flex-row items-center justify-center">
                    <button
                        onClick={onSubmit}
                        className={twMerge(
                            "w-full rounded-lg py-2 text-lg ring-1 transition-all duration-200",
                            color == "danger"
                                ? "bg-red-500 text-primary ring-red-500"
                                : "bg-primary text-neutral-950 ring-primary hover:bg-neutral-200/90",
                        )}
                    >
                        {color == "danger" ? "Delete" : "Submit"}
                    </button>
                    <DrawerClose className="w-full rounded-lg bg-neutral-400/10 py-2 text-lg text-primary transition-all duration-200 hover:bg-neutral-400/15">
                        {color == "danger" ? "Cancel" : "Close"}
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}

export default SimpleDrawer;
