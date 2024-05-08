"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

// ANALYTICS
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

import { NextUIProvider } from "@nextui-org/react";

export function Providers({ children, ...props }: ThemeProviderProps) {
    const router = useRouter();

    if (typeof window !== "undefined") {
        posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
            ui_host: "https://eu.posthog.com",
            api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
        });
    }

    return (
        <NextUIProvider navigate={router.push}>
            <NextThemesProvider {...props}>
                <PostHogProvider client={posthog}>{children}</PostHogProvider>
            </NextThemesProvider>
        </NextUIProvider>
    );
}
