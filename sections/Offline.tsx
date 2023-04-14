import React from "react";

type Props = {};

export default function Offline({}: Props) {
    return (
        <main className="flex flex-col items-center justify-center w-screen h-screen text-white bg-tertiary">
            <h2 className="space-y-2 text-xl font-medium tracking-tight text-white md:text-4xl">
                <p className="text-pink-600">{"response = {"}</p>
                <p className="ml-5 text-purple-500 md:ml-10">
                    <span>requestUrl: </span>
                    <span className="font-normal text-white">
                        {'" '}https://dev.paczesny.pl{' "'},
                    </span>
                </p>
                <p className="ml-5 text-purple-500 md:ml-10">
                    <span>requestMethod: </span>
                    <span className="font-normal text-white">
                        {'" '}GET{' "'},
                    </span>
                </p>
                <p className="ml-5 text-purple-500 md:ml-10">
                    <span>statusCode: </span>
                    <span className="font-normal text-white">
                        {'" '}
                        <span className="text-accent">
                            404 Portfolio Offline
                        </span>
                        {' "'},
                    </span>
                </p>
                <p className="ml-5 text-purple-500 md:ml-10">
                    <span>message: </span>
                    <span className="font-normal text-white">
                        {'" '}Please try again later{' "'}
                    </span>
                </p>
                <p className="text-pink-600">{"};"}</p>
            </h2>
        </main>
    );
}
