import Countries from "@/components/analytics/Countries";
import OperatingSystem from "@/components/analytics/OperatingSystem";
import Pages from "@/components/analytics/Pages";
import Referrers from "@/components/analytics/Referrers";

type Props = {};

async function getData() {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_ANALYTICS_URL}/api/pageviews`,
    );
    const data = await res.json();
    return data;
}

async function getEvents() {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_ANALYTICS_URL}/api/custom-events`,
    );
    const data = await res.json();
    return data;
}

async function Page({}: Props) {
    const data = await getData();
    const events = await getEvents();

    return (
        <main className="mx-auto grid min-h-screen w-full max-w-7xl flex-1 grid-cols-1 place-content-center gap-4 text-primary lg:grid-cols-2">
            <Pages data={data} />
            <Referrers data={data} />
            <Countries data={data} />
            <OperatingSystem data={data} />
        </main>
    );
}

export default Page;
