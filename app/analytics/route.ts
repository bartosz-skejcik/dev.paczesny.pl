import {
    eventCountByEventName,
    newUsersByFirstUserDefaultChannelGroup,
    totalUsersByCountry,
    viewsByPageTitleAndScreenClass,
    viewsPerPagePath,
} from "@/lib/ga/config";
import { NextResponse } from "next/server";

const metricFunctions: any = {
    eventCountByEventName,
    newUsersByFirstUserDefaultChannelGroup,
    totalUsersByCountry,
    viewsByPageTitleAndScreenClass,
    viewsPerPagePath,
};

// Runs a simple report.
async function runReport(
    metric: string,
    client_email: string,
    private_key: string,
    project_id: string
) {
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
            client_email,
            private_key,
        },
        projectId: project_id,
    });

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

    try {
        const client_email = process.env.NEXT_PUBLIC_GA_CLIENT_EMAIL!;
        const private_key = process.env.NEXT_PUBLIC_GA_PRIVATE_KEY!;
        const project_id = process.env.NEXT_PUBLIC_GA_PROJECT_ID!;
        console.log(
            "Before runReport",
            metric,
            client_email,
            private_key,
            project_id
        );
        const result = await runReport(
            metric,
            client_email,
            private_key,
            project_id
        );
        console.log(
            "After runReport",
            result,
            metric,
            client_email,
            private_key,
            project_id
        );

        return NextResponse.json(result);
    } catch (e: any) {
        console.error(e);
        console.log(
            process.env.NEXT_PUBLIC_GA_CLIENT_EMAIL,
            process.env.NEXT_PUBLIC_GA_PRIVATE_KEY,
            process.env.NEXT_PUBLIC_GA_PROJECT_ID
        );
        return NextResponse.json({
            error: e.message,
        });
    }
}
