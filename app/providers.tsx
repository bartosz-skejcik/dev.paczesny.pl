"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";

import { NextUIProvider } from "@nextui-org/react";

export function Providers({ children, ...props }: ThemeProviderProps) {
    const router = useRouter();

    return (
        <NextUIProvider navigate={router.push}>
            <NextThemesProvider {...props}>
                <GoogleAnalytics
                    gaId={`${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
                />
                {children}
            </NextThemesProvider>
        </NextUIProvider>
    );
}
