"use client";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export function RootProviders({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Analytics />
            <SpeedInsights />
            {children}
        </>
    );
}
