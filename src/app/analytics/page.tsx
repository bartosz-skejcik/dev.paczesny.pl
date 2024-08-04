import Browser from "@/components/analytics/Browser";
import Countries from "@/components/analytics/Countries";
import OperatingSystem from "@/components/analytics/OperatingSystem";
import Pages from "@/components/analytics/Pages";
import Referrers from "@/components/analytics/Referrers";
import Event from "@/components/analytics/Event";
import { Views } from "@/components/analytics/Views";

type Props = {};

async function getData() {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_ANALYTICS_URL}/api/pageviews`,
        { cache: "no-store" },
    );
    const data = await res.json();
    return data;
}

async function getSessions() {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_ANALYTICS_URL}/api/sessions?distinct=true`,
        { cache: "no-store" },
    );
    const data = await res.json();
    return data;
}

async function getEvents() {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_ANALYTICS_URL}/api/events`,
        { cache: "no-store" },
    );
    const data = await res.json();
    return data;
}

async function Page({}: Props) {
    const data = await getData();
    const events = await getEvents();
    const sessions = await getSessions();
    console.log(sessions);

    return (
        <main className="mx-auto grid min-h-screen w-full max-w-[90rem] flex-1 grid-cols-1 place-content-center gap-4 py-12 text-primary lg:grid-cols-4 2xl:grid-cols-6">
            <Views data={sessions} />
            <Pages data={data} />
            <Referrers data={sessions} />
            <Countries data={sessions} />
            <OperatingSystem data={sessions} />
            <Browser data={sessions} />
            <Event data={events} />
        </main>
    );
}

export default Page;
