export const viewsByPageTitleAndScreenClass = (propertyId: string) => {
    return {
        property: `properties/${propertyId}`,
        dateRanges: [
            {
                startDate: "2020-01-01",
                endDate: "today",
            },
        ],
        dimensions: [
            {
                name: "unifiedScreenName",
            },
        ],
        metrics: [
            {
                name: "screenPageViews",
            },
        ],
        orderBys: [
            {
                metric: {
                    metricName: "screenPageViews",
                },
                desc: true,
            },
        ],
    };
};

export const newUsersByFirstUserDefaultChannelGroup = (propertyId: string) => {
    return {
        property: `properties/${propertyId}`,
        dateRanges: [
            {
                startDate: "2020-01-01",
                endDate: "today",
            },
        ],
        dimensions: [
            {
                name: "firstUserDefaultChannelGroup",
            },
        ],
        metrics: [
            {
                name: "newUsers",
            },
        ],
        orderBys: [
            {
                metric: {
                    metricName: "newUsers",
                },
                desc: true,
            },
        ],
    };
};

export const eventCountByEventName = (propertyId: string) => {
    return {
        property: `properties/${propertyId}`,
        dateRanges: [
            {
                startDate: "2020-01-01",
                endDate: "today",
            },
        ],
        dimensions: [
            {
                name: "eventName",
            },
        ],
        metrics: [
            {
                name: "eventCount",
            },
        ],
        orderBys: [
            {
                metric: {
                    metricName: "eventCount",
                },
                desc: true,
            },
        ],
    };
};

export const totalUsersByCountry = (propertyId: string) => {
    return {
        property: `properties/${propertyId}`,
        dateRanges: [
            {
                startDate: "2020-01-01",
                endDate: "today",
            },
        ],
        dimensions: [
            {
                name: "country",
            },
        ],
        metrics: [
            {
                name: "totalUsers",
            },
        ],
        orderBys: [
            {
                metric: {
                    metricName: "totalUsers",
                },
                desc: true,
            },
        ],
    };
};

export const viewsPerPagePath = (propertyId: string) => {
    return {
        property: `properties/${propertyId}`,
        dateRanges: [
            {
                startDate: "2020-01-01",
                endDate: "today",
            },
        ],
        dimensions: [
            {
                name: "pagePath",
            },
        ],
        metrics: [
            {
                name: "screenPageViews",
            },
        ],
        orderBys: [
            {
                metric: {
                    metricName: "screenPageViews",
                },
                desc: true,
            },
        ],
    };
};

export const pageViewsByDate = (propertyId: string) => {
    return {
        property: `properties/${propertyId}`,
        dateRanges: [
            {
                startDate: "2020-01-01",
                endDate: "today",
            },
        ],
        dimensions: [
            {
                name: "date",
            },
        ],
        metrics: [
            {
                name: "screenPageViews",
            },
        ],
        orderBys: [
            {
                metric: {
                    metricName: "screenPageViews",
                },
                desc: true,
            },
        ],
        metricAgregations: ["TOTAL"],
    };
};

export const visitorsByDate = (propertyId: string) => {
    return {
        property: `properties/${propertyId}`,
        dateRanges: [
            {
                startDate: "2020-01-01",
                endDate: "today",
            },
        ],
        dimensions: [
            {
                name: "date",
            },
        ],
        metrics: [
            {
                name: "totalUsers",
            },
        ],
        orderBys: [
            {
                dimension: {
                    dimensionName: "date",
                },
                desc: true,
            },
        ],
        metricAgregations: ["TOTAL"],
    };
};
