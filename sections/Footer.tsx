import React from "react";

type Props = {};

export default function Footer({}: Props) {
    return (
        <section className="h-1/3 w-full flex flex-col items-center justify-evenly">
            <h3 className="text-neutral-200 py-8">
                Designed & Built by Bartek Paczesny
            </h3>
        </section>
    );
}
