"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

import Script from "next/script";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react";

import { NextUIProvider } from "@nextui-org/react";

export function Providers({ children, ...props }: ThemeProviderProps) {
    const router = useRouter();

    const gaId: string = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID!;

    return (
        <NextUIProvider navigate={router.push}>
            <NextThemesProvider {...props}>
                <Analytics />
                <GoogleTagManager gtmId="GT-P8Q25N2X" />
                {/* <GoogleAnalytics
                    gaId={gaId}
                /> */}
                {children}
            </NextThemesProvider>
        </NextUIProvider>
    );
}
