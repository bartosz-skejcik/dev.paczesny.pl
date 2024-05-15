import {
    eventCountByEventName,
    newUsersByFirstUserDefaultChannelGroup,
    totalUsersByCountry,
    viewsByPageTitleAndScreenClass,
    viewsPerPagePath,
} from "@/lib/ga/config";
import { NextResponse } from "next/server";

/**
 * TODO(developer): Uncomment this variable and replace with your
 *   Google Analytics 4 property ID before running the sample.
 */
const propertyId = "440669410";

// Imports the Google Analytics Data API client library.
const { BetaAnalyticsDataClient } = require("@google-analytics/data");

// Using a default constructor instructs the client to use the credentials
// specified in GOOGLE_APPLICATION_CREDENTIALS environment variable.
const analyticsDataClient = new BetaAnalyticsDataClient({
    credentals: {
        client_email: process.env.NEXT_PUBLIC_GA_CLIENT_EMAIL || "",
        private_key: process.env.NEXT_PUBLIC_GA_PRIVATE_KEY || "",
    },
    projectId: process.env.NEXT_PUBLIC_GA_PROJECT_ID || "",
});

const metricFunctions: any = {
    eventCountByEventName,
    newUsersByFirstUserDefaultChannelGroup,
    totalUsersByCountry,
    viewsByPageTitleAndScreenClass,
    viewsPerPagePath,
};

// Runs a simple report.
async function runReport(metric: string) {
    if (!metricFunctions[metric]) {
        throw new Error("Invalid metric name");
    }

    const [response] = await analyticsDataClient.runReport(
        metricFunctions[metric](propertyId)
    );

    const res = response.rows.map((row: any) => {
        return row;
    });

    return res;
}

export async function GET(request: Request) {
    // get the param named 'metric' from the query string
    const { searchParams } = new URL(request.url);

    const metric = searchParams.get("metric");

    if (!metric) {
        return NextResponse.json({
            error: "Missing required parameter 'metric'",
        });
    }

    const result = await runReport(metric);

    return NextResponse.json(result);
}
