/* eslint-disable react-hooks/exhaustive-deps */
// contexts/analytics.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import path from "path";

interface AnalyticsContextType {
    logEvent: (name: string, data?: Record<string, any>) => void;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(
    undefined,
);

export const useAnalytics = () => {
    const context = useContext(AnalyticsContext);
    if (context === undefined) {
        throw new Error(
            "useAnalytics must be used within an AnalyticsProvider",
        );
    }
    return context;
};

interface AnalyticsProviderProps {
    children: React.ReactNode;
}

export const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({
    children,
}) => {
    const [isInitialized, setIsInitialized] = useState(false);
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [clientIp, setClientIp] = useState("");

    useEffect(() => {
        // Initialize analytics here if needed
        setIsInitialized(true);
    }, []);

    useEffect(() => {
        if (!isInitialized) return;

        // Function to log page view
        const logPageView = async (url: string) => {
            const res = await fetch("https://api.ipify.org?format=json");

            if (!res.ok) {
                console.error("Failed to fetch client IP");
                return;
            }

            const d = await res.json();
            setClientIp(d.ip);

            const data = {
                url,
                timestamp: new Date().toISOString(),
                user_agent: navigator.userAgent,
                ip: clientIp,
                referrer: document.referrer,
                os:
                    (navigator.userAgent as any).platform ||
                    navigator?.platform,
                browser: navigator.userAgent,
            };

            // map over the data object to check if each value is not null

            if (
                Object.values(data).includes(null) ||
                Object.values(data).length === 0 ||
                Object.values(data).includes("")
            ) {
                console.error("Data is null");
                return;
            }

            fetch(`${process.env.NEXT_PUBLIC_ANALYTICS_URL}/api/pageview`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify(data),
            }).catch((error) => console.log("Analytics error:", error));
        };

        // Construct the full URL
        const url =
            pathname +
            (searchParams.toString() ? `?${searchParams.toString()}` : "");

        // Log page view
        logPageView(url);
    }, [pathname, searchParams, isInitialized]);

    const logEvent = (name: string, data: Record<string, any> = {}) => {
        const eventData = {
            name,
            timestamp: new Date().toISOString(),
            data,
        };

        fetch(`${process.env.NEXT_PUBLIC_ANALYTICS_URL}/api/event`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(eventData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => console.log(data))
            .catch((error) => console.error("Analytics error:", error));
    };

    return (
        <AnalyticsContext.Provider value={{ logEvent }}>
            {children}
        </AnalyticsContext.Provider>
    );
};
