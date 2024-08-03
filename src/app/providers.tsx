"use client";

import { AnalyticsProvider } from "@/contexts/analytics";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export function RootProviders({ children }: { children: React.ReactNode }) {
    return (
        <>
            <AnalyticsProvider>
                <Analytics />
                <SpeedInsights />
                {children}
            </AnalyticsProvider>
        </>
    );
}
