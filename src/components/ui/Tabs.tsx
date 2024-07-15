import React, {
    useState,
    useRef,
    useEffect,
    Dispatch,
    SetStateAction,
    ReactNode,
} from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

type TabProps<T> = {
    children: (props: {
        active: boolean;
        onClick: () => void;
        ref: React.RefObject<HTMLDivElement>;
    }) => ReactNode;
    label: string;
    value: T;
};

type TabsProps<T> = {
    children: ReactNode;
    initialActiveTab?: T;
    onChange?: (activeTab: T) => void;
};

type CursorProps = {
    position: { top: number; width: number; height: number; opacity: number };
};

const Cursor = ({ position }: CursorProps) => {
    return (
        <motion.span
            animate={{
                ...position,
            }}
            className="absolute h-full rounded-md bg-neutral-800"
        />
    );
};

function Tabs<T>({ children, initialActiveTab, onChange }: TabsProps<T>) {
    const [activeTab, setActiveTab] = useState<T | null>(
        initialActiveTab || null,
    );
    const [position, setPosition] = useState<{
        top: number;
        width: number;
        height: number;
        opacity: number;
    }>({
        top: 0,
        height: 0,
        width: 0,
        opacity: 0,
    });

    useEffect(() => {
        if (activeTab && onChange) {
            onChange(activeTab);
        }
    }, [activeTab, onChange]);

    return (
        <div className="relative">
            <div
                onMouseLeave={() => {
                    setPosition((pv) => ({
                        ...pv,
                        opacity: 0,
                    }));
                }}
                className="relative flex w-full flex-col overflow-x-auto md:overflow-x-visible"
            >
                {children && Array.isArray(children)
                    ? children.map((child) => {
                          if (child.type !== Tab) {
                              return null;
                          }
                          return React.cloneElement(child, {
                              activeTab,
                              setActiveTab,
                              setPosition,
                          });
                      })
                    : null}
                <Cursor position={position} />
            </div>
        </div>
    );
}

function Tab<T>({
    children,
    label,
    value,
    activeTab,
    setActiveTab,
    setPosition,
}: TabProps<T> & {
    activeTab: T | null;
    setActiveTab: Dispatch<SetStateAction<T | null>>;
    setPosition: Dispatch<
        SetStateAction<{
            top: number;
            width: number;
            height: number;
            opacity: number;
        }>
    >;
}) {
    const ref = useRef<HTMLDivElement>(null);

    return (
        <div
            key={label}
            ref={ref}
            onMouseEnter={() => {
                if (!ref?.current) return;

                const { width, height } = ref.current.getBoundingClientRect();

                setPosition({
                    top: ref.current.offsetTop,
                    height: ref.current.offsetHeight,
                    width: ref.current.offsetWidth,
                    opacity: 1,
                });
            }}
            className="group relative my-1 block w-full"
        >
            <button
                className={twMerge(
                    `group relative z-20 flex w-full flex-row items-center space-x-2 rounded-md px-4 py-2 text-left text-secondary text-zinc-400 transition-all duration-200`,
                    activeTab === value ? "bg-neutral-800 text-primary" : "",
                )}
                onClick={() => {
                    setActiveTab(value);
                }}
            >
                {children({
                    active: activeTab === value,
                    onClick: () => setActiveTab(value),
                    ref,
                })}
            </button>
        </div>
    );
}

export { Tabs, Tab };
