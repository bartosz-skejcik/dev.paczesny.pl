import { Link } from "@nextui-org/link";
import { Button, ButtonGroup } from "@nextui-org/button";

type Props = {
    metricParam: string;
    setMetricParam: (param: string) => void;
};

function SmallStatFiles({ metricParam, setMetricParam }: Props) {
    return (
        <ButtonGroup>
            <Button
                className="flex flex-col items-start justify-center h-fit py-3 w-32"
                variant={metricParam == "visitorsByDate" ? "solid" : "flat"}
                color={metricParam == "visitorsByDate" ? "primary" : "default"}
                onPress={() => setMetricParam("visitorsByDate")}
            >
                <h4
                    className={`text-md font-semibold ${
                        metricParam != "visitorsByDate"
                            ? "text-foreground-400"
                            : "text-foreground-700"
                    }`}
                >
                    Visitors
                </h4>
                <h4 className="text-4xl font-bold text-foreground">6</h4>
            </Button>
            <Button
                className="flex flex-col items-start justify-center h-fit py-3 w-32"
                variant={metricParam == "pageViewsByDate" ? "solid" : "flat"}
                color={metricParam == "pageViewsByDate" ? "primary" : "default"}
                onPress={() => setMetricParam("pageViewsByDate")}
            >
                <h4
                    className={`text-md font-semibold ${
                        metricParam != "pageViewsByDate"
                            ? "text-foreground-400"
                            : "text-foreground-700"
                    }`}
                >
                    Page Views
                </h4>
                <h4 className="text-4xl font-bold text-foreground">17</h4>
            </Button>
        </ButtonGroup>
    );
}

export default SmallStatFiles;
