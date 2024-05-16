export type GAApiResponse = GAResponseObject[];

export interface GAResponseObject {
    dimensionValues: DimensionValue[];
    metricValues: MetricValue[];
}

export interface DimensionValue {
    value: string;
    oneValue: string;
}

export interface MetricValue {
    value: string;
    oneValue: string;
}
