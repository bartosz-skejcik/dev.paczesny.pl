"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

type Props = {};

export default function Page({}: Props) {
    const { data: session } = useSession();
    return (
        <section
            style={{
                overflowX: "hidden",
            }}
            className="flex flex-col items-center justify-center backdrop-blur-3xl bg-[#001120]/10 h-screen text-neutral-50"
        >
            Name: {session?.user?.name}
            <br />
            Email: {session?.user?.email}
            <br />
            Image:{" "}
            <Image
                src={session?.user?.image!}
                width={100}
                height={100}
                alt={session?.user?.name!}
            />
        </section>
    );
}
