"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

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
    const [clientIp, setClientIp] = useState<string | null>(null);
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        const fetchClientIp = async () => {
            try {
                const res = await fetch("https://api.ipify.org?format=json");
                if (!res.ok) {
                    throw new Error("Failed to fetch client IP");
                }
                const data = await res.json();
                setClientIp(data.ip);
                setIsInitialized(true);
            } catch (error) {
                console.error("Error fetching client IP:", error);
                setIsInitialized(true); // Still set to initialized even if IP fetch fails
            }
        };

        fetchClientIp();
    }, []);

    useEffect(() => {
        if (!isInitialized) return;

        const logPageView = async (url: string) => {
            try {
                const data = {
                    url,
                    timestamp: new Date().toISOString(),
                    user_agent: navigator.userAgent,
                    ip: clientIp,
                    referrer: document.referrer,
                    os: navigator.platform,
                    browser: navigator.userAgent,
                };

                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_ANALYTICS_URL}/api/pageview`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(data),
                    },
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const responseData = await response.json();
                console.log("Pageview logged successfully:", responseData);
            } catch (error) {
                console.error("Failed to log pageview:", error);
            }
        };

        const url =
            pathname +
            (searchParams.toString() ? `?${searchParams.toString()}` : "");
        logPageView(url);
    }, [pathname, searchParams, isInitialized, clientIp]);

    const logEvent = async (name: string, data: Record<string, any> = {}) => {
        try {
            const eventData = {
                name,
                timestamp: new Date().toISOString(),
                data,
            };

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_ANALYTICS_URL}/api/event`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(eventData),
                },
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const responseData = await response.json();
            console.log("Event logged successfully:", responseData);
        } catch (error) {
            console.error("Failed to log event:", error);
        }
    };

    return (
        <AnalyticsContext.Provider value={{ logEvent }}>
            {children}
        </AnalyticsContext.Provider>
    );
};
