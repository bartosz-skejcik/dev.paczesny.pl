"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

import { NextUIProvider } from "@nextui-org/react";

export function Providers({ children, ...props }: ThemeProviderProps) {
    const router = useRouter();

    return (
        <NextUIProvider navigate={router.push}>
            <NextThemesProvider {...props}>{children}</NextThemesProvider>
        </NextUIProvider>
    );
}
