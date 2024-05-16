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
import { BetaAnalyticsDataClient } from "@google-analytics/data";

// Using a default constructor instructs the client to use the credentials
// specified in GOOGLE_APPLICATION_CREDENTIALS environment variable.
const analyticsDataClient = new BetaAnalyticsDataClient({
    credentials: {
        type: "service_account",
        project_id: process.env.GA_PROJECT_ID,
        private_key_id: process.env.GA_PRIVATE_KEY_ID,
        private_key: process.env.GA_PRIVATE_KEY,
        client_email: process.env.GA_CLIENT_EMAIL,
        client_id: process.env.GA_CLIENT_ID,
        universe_domain: process.env.GA_UNIVERSE_DOMAIN,
    },
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

    const res = response.rows?.map((row: any) => {
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
